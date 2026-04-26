#!/usr/bin/env node
/**
 * wordstat-runner.mjs — реальные объёмы Wordstat через Playwright + persistent auth.
 *
 * Подход Nate Herk: Playwright CLI с сохранённой сессией обходит капчу,
 * потому что залогиненный пользователь Яндекса не блокируется так агрессивно,
 * как анонимный скрейпер (Firecrawl-вариант, который вернул `null` в старом
 * `geo-content-system/scripts/research/wordstat_fetcher.py`).
 *
 * Использование:
 *
 *   1) Один раз залогиниться в Яндекс:
 *        node scripts/agents/wordstat-runner.mjs login
 *      → Откроется окно Chromium. Введи логин/пароль/2FA.
 *      → Когда увидишь интерфейс Wordstat, нажми Enter в терминале.
 *      → Сессия сохранится в .playwright-auth.json (gitignored).
 *
 *   2) Получить объёмы по списку ключей:
 *        node scripts/agents/wordstat-runner.mjs fetch "ai маркетолог" "brand memory"
 *      → JSON выводится в stdout + сохраняется в temp_wordstat/<timestamp>.json
 *
 *   3) Headless-режим (для CI / cron):
 *        node scripts/agents/wordstat-runner.mjs fetch --headless "ключ1" "ключ2"
 *
 * Прерывание: Ctrl+C закрывает браузер чисто (graceful shutdown).
 */

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");
const AUTH_FILE = path.join(ROOT, ".playwright-auth.json");
const OUT_DIR = path.join(ROOT, "temp_wordstat");

const args = process.argv.slice(2);
const command = args[0];
const headlessFlag = args.includes("--headless");
const keywords = args
  .slice(1)
  .filter((a) => a !== "--headless")
  .map((a) => a.trim())
  .filter(Boolean);

if (!command || (command !== "login" && command !== "fetch")) {
  console.error("Usage:");
  console.error("  node scripts/agents/wordstat-runner.mjs login");
  console.error('  node scripts/agents/wordstat-runner.mjs fetch "keyword1" "keyword2" [--headless]');
  process.exit(1);
}

async function login() {
  console.error("🚀 Открываю Chromium для логина в Яндекс...");
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  });
  const page = await context.newPage();
  await page.goto("https://wordstat.yandex.ru/", { waitUntil: "domcontentloaded" });

  console.error("");
  console.error("👉 1. Залогинься в Яндекс в открывшемся окне.");
  console.error("👉 2. Дождись, пока увидишь поле поиска Wordstat.");
  console.error("👉 3. Вернись сюда и нажми Enter — я сохраню сессию.");
  console.error("");

  const rl = readline.createInterface({ input: process.stdin, output: process.stderr });
  await new Promise((resolve) => rl.question("[Enter после логина] > ", () => { rl.close(); resolve(); }));

  await context.storageState({ path: AUTH_FILE });
  console.error(`✅ Auth saved → ${AUTH_FILE}`);
  await browser.close();
}

async function fetchVolumes(kws, headless) {
  if (!fs.existsSync(AUTH_FILE)) {
    console.error("❌ Auth-файл не найден. Сначала выполни:");
    console.error("   node scripts/agents/wordstat-runner.mjs login");
    process.exit(1);
  }

  console.error(`🔍 Запрашиваю Wordstat для ${kws.length} ключей (headless=${headless})...`);
  const browser = await chromium.launch({ headless });
  const context = await browser.newContext({
    storageState: AUTH_FILE,
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();

  const results = [];

  for (const kw of kws) {
    const url = `https://wordstat.yandex.ru/?words=${encodeURIComponent(kw)}`;
    let total = null;
    let related = [];
    let captchaSeen = false;
    let raw = "";

    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.waitForTimeout(2500);

      const bodyText = (await page.locator("body").textContent()) || "";
      raw = bodyText.slice(0, 3000);

      if (/captcha|подтвердите, что запросы отправляли вы/i.test(bodyText)) {
        captchaSeen = true;
        console.error(`⚠️  ${kw} — капча. Запусти login заново или подожди.`);
      }

      const totalMatch = bodyText.match(/(\d[\d\s\u00a0]{1,9})\s*(?:показ|impressions)/i);
      if (totalMatch) {
        total = parseInt(totalMatch[1].replace(/[\s\u00a0]/g, ""), 10);
      }

      const tableRows = await page
        .locator('table tr, [class*="table"] tr, [class*="report"] [role="row"]')
        .allTextContents()
        .catch(() => []);
      related = tableRows
        .map((r) => r.replace(/\s+/g, " ").trim())
        .filter((r) => r.length > 4 && r.length < 200)
        .slice(0, 20);
    } catch (e) {
      console.error(`⚠️  ${kw} — ошибка: ${e.message}`);
    }

    const result = {
      keyword: kw,
      total_shows_per_month: total,
      related_top: related,
      captcha_detected: captchaSeen,
      source_url: url,
      raw_excerpt: raw,
    };
    results.push(result);
    console.error(
      `  ${kw}: ${total !== null ? total.toLocaleString("ru-RU") + " показов/мес" : "(не извлечено)"}`
    );

    await page.waitForTimeout(2000 + Math.random() * 1500);
  }

  await browser.close();

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const outPath = path.join(OUT_DIR, `wordstat-${stamp}.json`);
  const payload = {
    run_date: new Date().toISOString(),
    headless,
    results,
  };
  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2), "utf-8");
  console.error(`✅ Сохранено → ${outPath}`);

  process.stdout.write(JSON.stringify(payload, null, 2));
  process.stdout.write("\n");
}

let cleanupDone = false;
process.on("SIGINT", async () => {
  if (cleanupDone) return;
  cleanupDone = true;
  console.error("\n⏹  Остановлено. Закрываю браузер...");
  process.exit(130);
});

try {
  if (command === "login") {
    await login();
  } else {
    if (keywords.length === 0) {
      console.error("❌ Нужен хотя бы один ключ. Пример:");
      console.error('   node scripts/agents/wordstat-runner.mjs fetch "ai маркетолог"');
      process.exit(1);
    }
    await fetchVolumes(keywords, headlessFlag);
  }
} catch (e) {
  console.error(`❌ Fatal: ${e.message}`);
  process.exit(1);
}
