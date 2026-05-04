import { chromium } from "playwright";
import fs from "node:fs";

const PROFILE_DIR = "C:/tmp/playwright-cloudflare-profile";
fs.mkdirSync(PROFILE_DIR, { recursive: true });

console.log("Запускаю Chromium с persistent profile в", PROFILE_DIR);

const ctx = await chromium.launchPersistentContext(PROFILE_DIR, {
  headless: false,
  viewport: { width: 1440, height: 900 },
  channel: "chromium",
});

const page = ctx.pages()[0] || (await ctx.newPage());

// Step 1 — open Cloudflare Pages
await page.goto("https://dash.cloudflare.com/?to=/:account/pages/new");

console.log("\n=================================================");
console.log("Залогинись в Cloudflare в открывшемся браузере.");
console.log("Когда увидишь страницу 'Создать новое приложение' — вернись в чат и скажи 'готова'.");
console.log("Скрипт будет ждать 10 минут.");
console.log("=================================================\n");

// Wait for the user to log in. We watch URL change.
const start = Date.now();
const TIMEOUT = 10 * 60 * 1000; // 10 min

while (Date.now() - start < TIMEOUT) {
  const url = page.url();
  if (url.includes("/pages/new") || url.includes("/workers-and-pages")) {
    // Check if we're past login by looking for known UI element
    const hasGitHub = await page
      .getByText("Подключите GitHub", { exact: false })
      .or(page.getByText("Connect to GitHub", { exact: false }))
      .or(page.getByText("Create application", { exact: false }))
      .or(page.getByText("Подключите репозиторий", { exact: false }))
      .first()
      .isVisible({ timeout: 2000 })
      .catch(() => false);
    if (hasGitHub) {
      console.log("Вижу страницу подключения GitHub → готов кликать");
      break;
    }
  }
  await page.waitForTimeout(2000);
}

console.log("\nProfile saved at", PROFILE_DIR);
console.log("Закрой это окно когда захочешь — sessions сохранены, можно перезапустить с теми же cookies.");

// Don't close — leave browser open for user to interact
await new Promise((resolve) => setTimeout(resolve, 60_000 * 60)); // keep alive 1h
