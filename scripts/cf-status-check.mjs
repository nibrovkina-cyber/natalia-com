import { chromium } from "playwright";
import fs from "node:fs";

const PROFILE_DIR = "C:/tmp/playwright-cloudflare-profile";
fs.mkdirSync(PROFILE_DIR, { recursive: true });

const ctx = await chromium.launchPersistentContext(PROFILE_DIR, {
  headless: false,
  viewport: { width: 1440, height: 900 },
  channel: "chromium",
});

const page = ctx.pages()[0] || (await ctx.newPage());

console.log("Открываю dash.cloudflare.com...");
await page.goto("https://dash.cloudflare.com/?to=/:account/workers-and-pages", {
  waitUntil: "domcontentloaded",
  timeout: 30000,
});

await page.waitForTimeout(3000);

// Check what page we're on
const url = page.url();
const title = await page.title();
console.log("URL:", url);
console.log("Title:", title);

// Take screenshot
const screenshotPath = "C:/tmp/cf-status.png";
await page.screenshot({ path: screenshotPath, fullPage: false });
console.log("Скриншот:", screenshotPath);

// If on login page, tell user to login
const isLogin =
  url.includes("/login") ||
  url.includes("/sign-up") ||
  (await page.getByText(/log in|sign in|войти/i).first().isVisible({ timeout: 1500 }).catch(() => false));

if (isLogin) {
  console.log("\n>>> НУЖНО ВОЙТИ <<<");
  console.log("Залогинься в окне Chromium которое открылось.");
  console.log("После входа я смогу видеть статус Cloudflare билдов.");
  console.log("Скрипт будет ждать 10 минут...");

  const start = Date.now();
  while (Date.now() - start < 10 * 60 * 1000) {
    await page.waitForTimeout(3000);
    if (!page.url().includes("/login") && !page.url().includes("/sign-up")) {
      console.log("Залогинилась успешно!");
      break;
    }
  }
}

// Try to find project info on Workers & Pages page
await page.waitForTimeout(2000);
const finalUrl = page.url();
console.log("\nФинальный URL:", finalUrl);

await page.screenshot({ path: "C:/tmp/cf-final.png", fullPage: true });
console.log("Финальный скриншот: C:/tmp/cf-final.png");

// Try to extract status info
const bodyText = await page.locator("body").textContent().catch(() => "");
if (bodyText) {
  // Look for project names and statuses
  const lines = bodyText.split("\n").map((l) => l.trim()).filter((l) => l.length > 5 && l.length < 200);
  console.log("\nТекст страницы (фрагменты):");
  for (const l of lines.slice(0, 50)) {
    if (
      /natalia|natasha|deploy|build|сбор|развёрт|успех|ошибк|fail|success/i.test(l)
    ) {
      console.log("  ·", l);
    }
  }
}

console.log("\nОставляю окно открытым 10 минут — можешь сама посмотреть.");
await new Promise((r) => setTimeout(r, 10 * 60 * 1000));
await ctx.close();
