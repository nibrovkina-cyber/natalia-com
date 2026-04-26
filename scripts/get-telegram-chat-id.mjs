#!/usr/bin/env node
/**
 * get-telegram-chat-id.mjs — автоматизация получения TELEGRAM_CHAT_ID для waitlist.
 *
 * Без этого скрипта пришлось бы:
 * 1. Открыть бота в Telegram, нажать /start
 * 2. Открыть в браузере https://api.telegram.org/bot<TOKEN>/getUpdates
 * 3. Найти "chat":{"id":XXXXX}
 *
 * С этим скриптом — одна команда:
 *   node scripts/get-telegram-chat-id.mjs <BOT_TOKEN>
 *
 * Или если токен в .env.local как TELEGRAM_BOT_TOKEN:
 *   node scripts/get-telegram-chat-id.mjs
 *
 * Скрипт ждёт пока ты напишешь боту /start, потом печатает CHAT_ID.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ENV_PATH = path.resolve(__dirname, "..", ".env.local");

function loadEnvToken() {
  if (!fs.existsSync(ENV_PATH)) return null;
  const text = fs.readFileSync(ENV_PATH, "utf-8");
  const match = text.match(/^\s*TELEGRAM_BOT_TOKEN\s*=\s*(.+?)\s*$/m);
  if (!match) return null;
  return match[1].replace(/^["']|["']$/g, "").trim();
}

const token = process.argv[2] || loadEnvToken();
if (!token) {
  console.error("❌ Нужен TELEGRAM_BOT_TOKEN.");
  console.error("Использование:");
  console.error("  node scripts/get-telegram-chat-id.mjs <TOKEN>");
  console.error("Или добавь TELEGRAM_BOT_TOKEN=... в .env.local");
  console.error("");
  console.error("Получить токен: открыть @BotFather в Telegram → /newbot → копировать токен");
  process.exit(1);
}

if (!/^\d+:[A-Za-z0-9_-]+$/.test(token)) {
  console.error(`❌ Token не похож на правильный (формат '12345:abc...'). Получено: ${token.slice(0, 12)}...`);
  process.exit(1);
}

console.error("✅ Токен валиден. Сейчас:");
console.error("   1. Открой бота в Telegram (узнаёшь имя через https://api.telegram.org/bot" + token + "/getMe)");
console.error("   2. Нажми /start или напиши любое сообщение");
console.error("   3. Этот скрипт сразу подхватит CHAT_ID");
console.error("");
console.error("⏳ Жду сообщение от тебя боту...");

let attempts = 0;
const maxAttempts = 60; // 5 минут
let lastUpdateId = 0;

async function poll() {
  attempts++;
  if (attempts > maxAttempts) {
    console.error("\n⏱  Таймаут (5 минут). Запусти скрипт заново и напиши боту в течение 5 минут.");
    process.exit(1);
  }

  try {
    const url = `https://api.telegram.org/bot${token}/getUpdates?offset=${lastUpdateId + 1}&timeout=5`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data.ok) {
      console.error(`❌ Telegram API: ${data.description || "unknown error"}`);
      process.exit(1);
    }

    if (data.result.length === 0) {
      process.stderr.write(".");
      setTimeout(poll, 2000);
      return;
    }

    // Нашли сообщение — берём первый chat
    const chatIds = new Set(
      data.result
        .map((u) => u.message?.chat?.id || u.edited_message?.chat?.id || u.channel_post?.chat?.id)
        .filter(Boolean)
    );

    console.error("");
    console.error("");
    console.error(`✅ Найдено ${chatIds.size} chat(ов):`);
    for (const id of chatIds) {
      console.error(`   TELEGRAM_CHAT_ID=${id}`);
    }
    console.error("");
    console.error("Скопируй нужный ID и добавь в .env.local или Vercel env vars:");
    console.error(`   TELEGRAM_CHAT_ID=${[...chatIds][0]}`);
    console.error("");
    console.error("После этого все waitlist-заявки будут падать тебе в Telegram-бот.");

    // первый ID в stdout — для удобной интеграции в shell-скрипты
    process.stdout.write(`${[...chatIds][0]}\n`);
    process.exit(0);
  } catch (e) {
    console.error(`\n❌ Ошибка запроса: ${e.message}`);
    process.exit(1);
  }
}

poll();
