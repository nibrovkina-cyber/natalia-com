import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const FREE_LIMIT = 5;
const WINDOW_MS = 24 * 60 * 60 * 1000;

function checkRateLimit(ip: string): { ok: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, remaining: FREE_LIMIT - 1 };
  }
  entry.count += 1;
  rateLimitMap.set(ip, entry);
  return { ok: entry.count <= FREE_LIMIT, remaining: Math.max(0, FREE_LIMIT - entry.count) };
}

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
  const { messages, systemPrompt, apiKey, scrapeUrl, maxTokens } = await req.json();
  const key = apiKey || process.env.ANTHROPIC_API_KEY;
  if (!key) return NextResponse.json({ content: "API-ключ не найден." }, { status: 400 });

  // Rate-limit только для запросов без BYOK
  if (!apiKey) {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
            || req.headers.get("x-real-ip")
            || "unknown";
    const rl = checkRateLimit(ip);
    if (!rl.ok) {
      return NextResponse.json(
        { content: "Ты использовала 5 бесплатных запросов за сегодня. Введи свой API-ключ в настройках (🔑) — он хранится только у тебя в браузере, и тогда лимита не будет. Или возвращайся завтра." },
        { status: 429 }
      );
    }
  }

  let enhancedMessages = messages;
  let scrapeWarning = "";
  if (scrapeUrl) {
    const scraped = await scrapeWithFirecrawl(scrapeUrl);
    if (scraped) {
      const lastMsg = messages[messages.length - 1];
      const truncated = scraped.slice(0, 14000);
      enhancedMessages = [
        ...messages.slice(0, -1),
        { ...lastMsg, content: `${lastMsg.content}\n\nСОДЕРЖИМОЕ ИХ САЙТА (${scrapeUrl}):\n${truncated}` },
      ];
    } else {
      scrapeWarning = "Не удалось прочитать сайт (таймаут или сайт блокирует скрейпинг). Работаю по описанию.";
    }
  }

  const client = new Anthropic({ apiKey: key });
  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: maxTokens || 4096,
      system: systemPrompt,
      messages: enhancedMessages,
    });
    const content = response.content[0].type === "text" ? response.content[0].text : "";
    return NextResponse.json({ content, scrapeWarning: scrapeWarning || undefined });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Ошибка API";
    return NextResponse.json({ content: `Ошибка: ${msg}` }, { status: 500 });
  }
}
