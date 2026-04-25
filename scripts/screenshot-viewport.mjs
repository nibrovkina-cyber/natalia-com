#!/usr/bin/env node
// Capture only visible viewport (not full page) — useful for hero close-up.
// Usage: node scripts/screenshot-viewport.mjs <url> <name>

import puppeteer from "puppeteer";
import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const [, , url, name] = process.argv;
if (!url || !name) {
  console.error("Usage: node scripts/screenshot-viewport.mjs <url> <name>");
  process.exit(1);
}

const outDir = path.resolve("temp_screenshots");
if (!existsSync(outDir)) await mkdir(outDir, { recursive: true });
const outPath = path.join(outDir, `${name}.png`);

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

try {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 1500));
  await page.screenshot({ path: outPath, fullPage: false });
  console.log(`OK ${outPath}`);
} catch (err) {
  console.error(`FAIL ${err.message}`);
  process.exit(1);
} finally {
  await browser.close();
}
