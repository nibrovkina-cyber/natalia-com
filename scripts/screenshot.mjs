#!/usr/bin/env node
// Usage:
//   node scripts/screenshot.mjs <url> <name> [--mobile]
// Examples:
//   node scripts/screenshot.mjs http://localhost:3000/pricing pricing_after-v2
//   node scripts/screenshot.mjs http://localhost:3000/pricing pricing_mobile --mobile
//
// Saves to temp_screenshots/<name>.png (full page).
// Claude Code reads the saved PNG to verify its own output.

import puppeteer from "puppeteer";
import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const [, , url, name, ...flags] = process.argv;

if (!url || !name) {
  console.error("Usage: node scripts/screenshot.mjs <url> <name> [--mobile]");
  process.exit(1);
}

const mobile = flags.includes("--mobile");
const outDir = path.resolve("temp_screenshots");
if (!existsSync(outDir)) await mkdir(outDir, { recursive: true });

const outPath = path.join(outDir, `${name}.png`);

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  defaultViewport: null,
});
const page = await browser.newPage();

if (mobile) {
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 1.5, isMobile: true });
  await page.setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148");
} else {
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
}

try {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 1200));
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = 600;
      const timer = setInterval(() => {
        window.scrollTo(0, y);
        y += step;
        if (y >= document.body.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 80);
    });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: outPath, fullPage: true, captureBeyondViewport: true });
  console.log(`OK ${outPath} (${mobile ? "mobile 375×812" : "desktop 1440×900"})`);
} catch (err) {
  console.error(`FAIL ${err.message}`);
  process.exit(1);
} finally {
  await browser.close();
}
