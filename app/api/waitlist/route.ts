import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { checkLimit } from "@/app/lib/rate-limit";

export const runtime = "nodejs";

type Entry = {
  tier: string;
  name: string;
  email_hash: string;       // hash в логи (152-ФЗ PII redaction)
  email_domain: string;     // домен видим для аналитики
  telegram?: string;
  business?: string;
  createdAt: string;
  ip_hash: string;          // hash IP, не plain
};

// SHA-256 hash для PII в логах. Email/IP не должны попадать в plaintext
// в Vercel logs — это 152-ФЗ adjacent риск.
function hashPII(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex").slice(0, 16);
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    // Distributed rate-limit через Vercel KV (или in-memory fallback в dev).
    // Раньше был in-memory Map — на serverless cold-start = 0 защиты.
    const rl = await checkLimit(`waitlist:${ip}`, 1, 30);
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Слишком часто. Попробуй через минуту." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { tier = "self-serve", name = "", email = "", telegram = "", business = "" } = body || {};

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Введи валидный email" }, { status: 400 });
    }
    if (!name || name.trim().length < 2) {
      return NextResponse.json({ error: "Введи имя" }, { status: 400 });
    }

    const trimmedEmail = String(email).trim().slice(0, 200);
    const trimmedIp = ip.slice(0, 64);
    const emailDomain = trimmedEmail.split("@")[1] || "unknown";

    // Запись для логов — БЕЗ plaintext PII (152-ФЗ).
    // Plain email + IP попадают только в защищённые каналы (Telegram boт владельца, webhook).
    const entry: Entry = {
      tier: String(tier).slice(0, 50),
      name: String(name).trim().slice(0, 120),
      email_hash: hashPII(trimmedEmail.toLowerCase()),
      email_domain: emailDomain,
      telegram: telegram ? String(telegram).trim().slice(0, 80) : undefined,
      business: business ? String(business).trim().slice(0, 500) : undefined,
      createdAt: new Date().toISOString(),
      ip_hash: hashPII(trimmedIp),
    };

    // 1. Logs — без plaintext email/IP. Видны только domain + hash.
    console.log("[waitlist]", JSON.stringify(entry));

    // Plain payload для приватных каналов (только webhook + Telegram bot владельца)
    const privatePayload = {
      ...entry,
      email: trimmedEmail,
      ip: trimmedIp,
    };

    // 2. Optional: forward to webhook (Telegram bot, Zapier, etc.)
    const webhook = process.env.WAITLIST_WEBHOOK_URL;
    if (webhook) {
      try {
        await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(privatePayload),
          signal: AbortSignal.timeout(5000),
        });
      } catch (e) {
        console.error("[waitlist] webhook failed:", e instanceof Error ? e.message : "unknown");
      }
    }

    // 3. Optional: send Telegram notification via bot
    const tgToken = process.env.TELEGRAM_BOT_TOKEN;
    const tgChatId = process.env.TELEGRAM_CHAT_ID;
    if (tgToken && tgChatId) {
      const tgText = [
        `🆕 *Новая заявка в waitlist*`,
        `Тариф: \`${entry.tier}\``,
        `Имя: ${entry.name}`,
        `Email: ${trimmedEmail}`,
        entry.telegram && `Telegram: ${entry.telegram}`,
        entry.business && `Бизнес: ${entry.business}`,
      ]
        .filter(Boolean)
        .join("\n");
      try {
        await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: tgChatId,
            text: tgText,
            parse_mode: "Markdown",
          }),
          signal: AbortSignal.timeout(5000),
        });
      } catch (e) {
        console.error("[waitlist] telegram failed:", e instanceof Error ? e.message : "unknown");
      }
    }

    // Position = stable hash of email mod 1000 + 50 (so first looks like #50-#100)
    const position =
      50 +
      Math.abs(
        email.split("").reduce((acc: number, c: string) => (acc * 31 + c.charCodeAt(0)) | 0, 0)
      ) %
        500;

    return NextResponse.json({ ok: true, position });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
