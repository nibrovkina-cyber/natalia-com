import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { checkLimit } from "@/app/lib/rate-limit";

// Edge runtime for Cloudflare Workers / Vercel Edge compatibility.
// Anthropic SDK and fetch() are edge-safe. maxDuration is Vercel-only;
// on Cloudflare each Worker invocation has its own platform timeout.
export const runtime = "edge";
export const maxDuration = 60;

// Лимиты на запрос для cost-amplification DoS защиты.
// Атакующий мог отправить maxTokens: 200000 + 1000 messages — слил бы наш
// ANTHROPIC_API_KEY за минуты. Жёсткие границы:
const LIMITS = {
  MAX_MESSAGES: 30,
  MAX_TOTAL_CHARS: 60_000,
  MAX_SYSTEM_PROMPT_CHARS: 10_000,
  MAX_OUTPUT_TOKENS: 4_096,
  MAX_SCRAPE_URL_LEN: 500,
} as const;

const FREE_LIMIT = 5;
const WINDOW_SECONDS = 24 * 60 * 60;
// rate-limit делегирован в app/lib/rate-limit.ts — Vercel KV если доступен,
// иначе in-memory fallback. KV provisioning — см. DEPLOY-CHECKLIST.md.

async function scrapeWithFirecrawl(url: string): Promise<string | null> {
  const fcKey = process.env.FIRECRAWL_API_KEY;
  if (!fcKey) return null;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch("https://api.firecrawl.dev/v1/scrape", {
      method: "POST",
      headers: { "Authorization": `Bearer ${fcKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ url, formats: ["markdown"], onlyMainContent: true }),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data?.markdown || null;
  } catch {
    clearTimeout(timeout);
    return null;
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { messages, systemPrompt, apiKey, scrapeUrl, maxTokens } = body;

  // === Input validation — cost-amplification DoS защита ===
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ content: "messages должен быть непустым массивом" }, { status: 400 });
  }
  if (messages.length > LIMITS.MAX_MESSAGES) {
    return NextResponse.json(
      { content: `Слишком много сообщений (>${LIMITS.MAX_MESSAGES}). Начни новый чат.` },
      { status: 400 }
    );
  }
  const totalChars = messages.reduce(
    (acc: number, m: unknown) => acc + (typeof (m as { content?: unknown })?.content === "string" ? ((m as { content: string }).content.length) : 0),
    0
  );
  if (totalChars > LIMITS.MAX_TOTAL_CHARS) {
    return NextResponse.json(
      { content: `Сообщения слишком длинные (${totalChars} > ${LIMITS.MAX_TOTAL_CHARS} знаков).` },
      { status: 400 }
    );
  }
  const safeSystemPrompt = String(systemPrompt || "").slice(0, LIMITS.MAX_SYSTEM_PROMPT_CHARS);
  const safeMaxTokens = Math.min(
    Math.max(parseInt(String(maxTokens), 10) || 4096, 256),
    LIMITS.MAX_OUTPUT_TOKENS
  );
  const safeScrapeUrl =
    typeof scrapeUrl === "string" && scrapeUrl.length <= LIMITS.MAX_SCRAPE_URL_LEN
      ? scrapeUrl
      : undefined;

  // === Auth: BYOK strict (защита от forking exploit) ===
  // Атакующий мог форкнуть фронт, не передавать apiKey, и тратить наш бюджет.
  // Free fallback на process.env.ANTHROPIC_API_KEY работает ТОЛЬКО когда:
  // (а) пользователь не передал свой ключ И (б) IP не превысил daily limit.
  const userKey = typeof apiKey === "string" && apiKey.startsWith("sk-ant-") ? apiKey : null;
  let key: string | undefined = userKey || undefined;

  if (!userKey) {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
            || req.headers.get("x-real-ip")
            || "unknown";
    const rl = await checkLimit(`chat:${ip}`, FREE_LIMIT, WINDOW_SECONDS);
    if (!rl.ok) {
      return NextResponse.json(
        { content: "Ты использовала 5 бесплатных запросов за сегодня. Введи свой API-ключ в настройках (🔑) — он хранится только у тебя в браузере, и тогда лимита не будет. Или возвращайся завтра." },
        { status: 429 }
      );
    }
    key = process.env.ANTHROPIC_API_KEY;
    if (!key) {
      return NextResponse.json(
        { content: "Сервер временно не настроен. Введи свой API-ключ в настройках (🔑)." },
        { status: 503 }
      );
    }
  }

  let enhancedMessages = messages;
  let scrapeWarning = "";
  if (safeScrapeUrl) {
    const scraped = await scrapeWithFirecrawl(safeScrapeUrl);
    if (scraped) {
      const lastMsg = messages[messages.length - 1];
      const truncated = scraped.slice(0, 14000);
      enhancedMessages = [
        ...messages.slice(0, -1),
        { ...lastMsg, content: `${lastMsg.content}\n\nСОДЕРЖИМОЕ ИХ САЙТА (${safeScrapeUrl}):\n${truncated}` },
      ];
    } else {
      scrapeWarning = "Не удалось прочитать сайт (таймаут или сайт блокирует скрейпинг). Работаю по описанию.";
    }
  }

  const client = new Anthropic({ apiKey: key });
  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: safeMaxTokens,
      system: safeSystemPrompt,
      messages: enhancedMessages,
    });
    const content = response.content[0].type === "text" ? response.content[0].text : "";
    return NextResponse.json({ content, scrapeWarning: scrapeWarning || undefined });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Ошибка API";
    return NextResponse.json({ content: `Ошибка: ${msg}` }, { status: 500 });
  }
}
