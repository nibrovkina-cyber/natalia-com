#!/usr/bin/env node
// Run through all pages, collect console errors/warnings + broken links
import puppeteer from "puppeteer";

const PAGES = ["/", "/pricing", "/method", "/gallery", "/gallery/medea-dent-moscow", "/gallery/simbios-marketing-moscow", "/tool", "/tool?demo=medea"];
const BASE = "http://localhost:3000";

const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });

for (const path of PAGES) {
  const page = await browser.newPage();
  const errors = [];
  const warnings = [];
  const failedReq = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
    if (msg.type() === "warning") warnings.push(msg.text());
  });
  page.on("pageerror", (e) => errors.push(`[pageerror] ${e.message}`));
  page.on("requestfailed", (req) => failedReq.push(`${req.url()} — ${req.failure()?.errorText}`));

  await page.setViewport({ width: 1440, height: 900 });
  try {
    await page.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 30000 });
    await new Promise((r) => setTimeout(r, 2500));
  } catch (e) {
    errors.push(`[navigation] ${e.message}`);
  }

  console.log(`\n=== ${path} ===`);
  console.log(`errors: ${errors.length}`);
  errors.forEach((e) => console.log(`  ❌ ${e.slice(0, 240)}`));
  console.log(`warnings: ${warnings.length}`);
  warnings.slice(0, 5).forEach((w) => console.log(`  ⚠  ${w.slice(0, 200)}`));
  console.log(`failedRequests: ${failedReq.length}`);
  failedReq.slice(0, 5).forEach((f) => console.log(`  🚫 ${f.slice(0, 200)}`));

  await page.close();
}

await browser.close();
