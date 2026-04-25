#!/usr/bin/env node
// Captures full-page screenshot of an external reference site.
// Usage: node scripts/capture-reference.mjs <url> <name>
// Saves to docs/references/<name>.png

import puppeteer from "puppeteer";
import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const [, , url, name] = process.argv;
if (!url || !name) {
  console.error("Usage: node scripts/capture-reference.mjs <url> <name>");
  process.exit(1);
}

const outDir = path.resolve("docs/references");
if (!existsSync(outDir)) await mkdir(outDir, { recursive: true });
const outPath = path.join(outDir, `${name}.png`);

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.setUserAgent(
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
);

try {
  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 2500));

  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = 500;
      const timer = setInterval(() => {
        window.scrollTo(0, y);
        y += step;
        if (y >= document.body.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 120);
    });
  });
  await new Promise((r) => setTimeout(r, 1500));

  await page.screenshot({ path: outPath, fullPage: true });
  console.log(`OK ${outPath}`);
} catch (err) {
  console.error(`FAIL ${url}: ${err.message}`);
  process.exit(1);
} finally {
  await browser.close();
}
