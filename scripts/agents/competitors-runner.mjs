#!/usr/bin/env node
/**
 * competitors-runner.mjs — реальная разведка конкурентов через Playwright.
 *
 * Что отдаёт без логина:
 *   • SimilarWeb (бесплатная публичная страница): visits/мес, bounce, pages/visit,
 *     avg duration, global/country rank, топ каналов трафика, топ стран.
 *   • Сайт самого конкурента: title, meta description, h1/h2, hero-текст.
 *   • Опционально (если задан) — vc.ru search для медийных упоминаний (RU).
 *
 * Использование:
 *   node scripts/agents/competitors-runner.mjs "jasper.ai"
 *   node scripts/agents/competitors-runner.mjs "jasper.ai" "copy.ai" "writesonic.com"
 *   node scripts/agents/competitors-runner.mjs --headless "jasper.ai"
 *   node scripts/agents/competitors-runner.mjs --no-similarweb "natashabrovkina.com"
 *
 * Вывод: JSON в stdout + копия в temp_research/competitors-<timestamp>.json
 */

import { chromium as baseChromium } from "playwright";
import { chromium as extraChromium, addExtra } from "playwright-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");
const OUT_DIR = path.join(ROOT, "temp_research");

const args = process.argv.slice(2);
const headlessFlag = args.includes("--headless");
const skipSimilarWeb = args.includes("--no-similarweb");
const skipVcRu = args.includes("--no-vcru");
const domains = args
  .filter((a) => !a.startsWith("--"))
  .map((d) => d.replace(/^https?:\/\//, "").replace(/\/.*$/, "").trim())
  .filter(Boolean);

if (domains.length === 0) {
  console.error("Usage:");
  console.error('  node scripts/agents/competitors-runner.mjs "jasper.ai" [--headless] [--no-similarweb]');
  process.exit(1);
}

async function scrapeOwnSite(page, domain) {
  const url = `https://${domain}`;
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(1500);

    const data = await page.evaluate(() => {
      const meta = (name) => {
        const el =
          document.querySelector(`meta[name="${name}"]`) ||
          document.querySelector(`meta[property="og:${name}"]`);
        return el ? el.getAttribute("content") : null;
      };
      const txt = (el) => (el ? el.textContent.replace(/\s+/g, " ").trim() : null);
      const h1s = Array.from(document.querySelectorAll("h1")).map((e) => txt(e)).filter(Boolean);
      const h2s = Array.from(document.querySelectorAll("h2")).slice(0, 8).map((e) => txt(e)).filter(Boolean);
      return {
        final_url: location.href,
        title: document.title,
        meta_description: meta("description"),
        og_title: meta("title"),
        og_description: meta("description"),
        h1: h1s,
        h2: h2s,
        body_excerpt: document.body.innerText.replace(/\s+/g, " ").trim().slice(0, 1500),
      };
    });
    return { ok: true, ...data };
  } catch (e) {
    return { ok: false, error: e.message, url };
  }
}

function parseSimilarWebText(text) {
  const result = {};
  const visits = text.match(/Total Visits\s*\n\s*([\d.,KMB]+)/i);
  if (visits) result.total_visits = visits[1];

  const bounce = text.match(/Bounce Rate\s*\n\s*([\d.]+%)/i);
  if (bounce) result.bounce_rate = bounce[1];

  const pages = text.match(/Pages per Visit\s*\n\s*([\d.]+)/i);
  if (pages) result.pages_per_visit = parseFloat(pages[1]);

  const dur = text.match(/Avg Visit Duration\s*\n\s*([\d:]+)/i);
  if (dur) result.avg_visit_duration = dur[1];

  const globalRank = text.match(/Global Rank\s*\n\s*#?([\d,]+)/i);
  if (globalRank) result.global_rank = globalRank[1];

  const countryRank = text.match(/Country Rank\s*\n\s*#?([\d,]+)\s*([\d,]*)\s*\n*\s*([A-Za-zА-Яа-я ]+)/i);
  if (countryRank) {
    result.country_rank = countryRank[1];
    result.top_country = countryRank[3]?.trim();
  }

  const catRank = text.match(/Category Rank\s*\n\s*#?([\d,]+)[\s\S]{0,80}?\n\n([A-Za-z0-9, &()]+?)\s*\(?In/i);
  if (catRank) {
    result.category_rank = catRank[1];
    result.category = catRank[2].trim();
  }

  // Top traffic sources — capture the ranked list
  const sourcesBlock = text.match(/Marketing Channels Distribution\s*\n\s*([\d.]+%)\s*\n([A-Za-z]+)\s*\n1st Place\s*\n([A-Za-z ]+)\s*\n2nd Place\s*\n([A-Za-z ]+)\s*\n3rd Place/i);
  if (sourcesBlock) {
    result.traffic_channels = [
      { rank: 1, channel: sourcesBlock[2].trim(), share: sourcesBlock[1] },
      { rank: 2, channel: sourcesBlock[3].trim() },
      { rank: 3, channel: sourcesBlock[4].trim() },
    ];
  }

  // Top countries — name + share pairs
  const countriesSection = text.match(/Top Countries\s*\n([\s\S]{0,500}?)(?:Others|See all)/i);
  if (countriesSection) {
    const countryLines = countriesSection[1].trim().split("\n").map((l) => l.trim()).filter(Boolean);
    const countries = [];
    for (let i = 0; i < countryLines.length - 1; i += 2) {
      const name = countryLines[i];
      const share = countryLines[i + 1];
      if (name && share && /%$/.test(share)) {
        countries.push({ country: name, share });
      }
    }
    if (countries.length) result.top_countries = countries.slice(0, 6);
  }

  return result;
}

async function scrapeSimilarWeb(page, domain) {
  const url = `https://www.similarweb.com/website/${domain}/`;
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

    // Ждём пока React-компоненты прорендерят основные блоки.
    // SimilarWeb раздаёт метрики из API после первого рендера, нужен явный wait.
    await page
      .waitForFunction(
        () => /Total Visits/i.test(document.body.innerText) || /not enough data/i.test(document.body.innerText),
        { timeout: 12000 }
      )
      .catch(() => {});
    await page.waitForTimeout(1500);

    const text = await page.evaluate(() => document.body.innerText);

    if (/not enough data|too small/i.test(text)) {
      return { ok: false, reason: "insufficient_data", url };
    }
    if (text.length < 500) {
      return { ok: false, reason: "page_blocked_or_empty", url };
    }

    const parsed = parseSimilarWebText(text);
    const hasAnyMetric = parsed.total_visits || parsed.global_rank || parsed.bounce_rate;

    if (!hasAnyMetric) {
      // Парсер промахнулся — отдаём raw excerpt чтобы можно было дописать regex
      return {
        ok: false,
        reason: "parse_failed",
        url,
        raw_excerpt: text.slice(0, 2000),
      };
    }

    return { ok: true, source_url: url, ...parsed };
  } catch (e) {
    return { ok: false, error: e.message, url };
  }
}

async function scrapeVcRu(page, brandTerm) {
  // vc.ru — крупнейшая медийная площадка для RU-tech. Открытый поиск без логина.
  // Возвращает топ свежих статей где упоминается домен/бренд.
  const url = `https://vc.ru/search/v2?query=${encodeURIComponent(brandTerm)}`;
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(2500);

    const data = await page.evaluate(() => {
      // vc.ru использует разные селекторы — собираем по нескольким стратегиям
      const articles = [];
      // Strategy 1: новые карточки контента
      document
        .querySelectorAll('a[href*="/p/"], a[href*="/u/"]')
        .forEach((a) => {
          const href = a.getAttribute("href");
          const text = a.textContent.replace(/\s+/g, " ").trim();
          if (href && text.length > 20 && text.length < 200) {
            const fullUrl = href.startsWith("http") ? href : `https://vc.ru${href}`;
            if (!articles.find((x) => x.url === fullUrl)) {
              articles.push({ title: text, url: fullUrl });
            }
          }
        });

      const totalText = document.body.innerText;
      const noResults = /ничего не нашлось|по запросу.*не найдено|no results/i.test(totalText);

      return {
        articles: articles.slice(0, 12),
        no_results: noResults,
        body_length: totalText.length,
      };
    });

    return {
      ok: !data.no_results && data.articles.length > 0,
      query: brandTerm,
      mentions_count: data.articles.length,
      top_mentions: data.articles,
      source_url: url,
      no_results: data.no_results,
    };
  } catch (e) {
    return { ok: false, error: e.message, url, query: brandTerm };
  }
}

function brandFromDomain(domain) {
  // jasper.ai → "jasper"; tilda.cc → "tilda"; getcourse.ru → "getcourse"
  return domain.split(".")[0];
}

async function run() {
  console.error(`🔎 Разведка ${domains.length} конкурента(ов): ${domains.join(", ")}`);
  console.error(
    `   headless=${headlessFlag} · similarweb=${!skipSimilarWeb} · vcru=${!skipVcRu} · stealth=on`
  );

  // Stealth plugin обходит bot-detection (CloudFront, Cloudflare, hCaptcha-precheck).
  // SimilarWeb / Cloudflare-protected сайты иначе возвращают 403 в headless.
  const chromium = addExtra(extraChromium);
  chromium.use(StealthPlugin());
  const browser = await chromium.launch({ headless: headlessFlag });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  });
  const page = await context.newPage();

  const results = [];
  for (const domain of domains) {
    console.error(`\n→ ${domain}`);

    const ownSite = await scrapeOwnSite(page, domain);
    console.error(`  own site: ${ownSite.ok ? "✓ " + (ownSite.title || "(no title)").slice(0, 60) : "✗ " + ownSite.error}`);

    let similarWeb = null;
    if (!skipSimilarWeb) {
      similarWeb = await scrapeSimilarWeb(page, domain);
      if (similarWeb.ok) {
        console.error(
          `  similarweb: ✓ ${similarWeb.total_visits || "—"} visits, rank #${similarWeb.global_rank || "—"}, top: ${similarWeb.traffic_channels?.[0]?.channel || "—"}`
        );
      } else {
        console.error(`  similarweb: ✗ ${similarWeb.reason || similarWeb.error}`);
      }
    }

    let vcRu = null;
    if (!skipVcRu) {
      const brand = brandFromDomain(domain);
      vcRu = await scrapeVcRu(page, brand);
      if (vcRu.ok) {
        console.error(`  vc.ru: ✓ ${vcRu.mentions_count} упоминаний по «${brand}»`);
      } else {
        console.error(`  vc.ru: ✗ ${vcRu.no_results ? "no results" : vcRu.error || "skipped"}`);
      }
    }

    results.push({ domain, own_site: ownSite, similarweb: similarWeb, vc_ru: vcRu });
    await page.waitForTimeout(1500);
  }

  await browser.close();

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const outPath = path.join(OUT_DIR, `competitors-${stamp}.json`);
  const payload = {
    run_date: new Date().toISOString(),
    domains_count: domains.length,
    results,
  };
  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2), "utf-8");
  console.error(`\n✅ Сохранено → ${outPath}`);

  process.stdout.write(JSON.stringify(payload, null, 2) + "\n");
}

let cleanupDone = false;
process.on("SIGINT", () => {
  if (cleanupDone) return;
  cleanupDone = true;
  console.error("\n⏹ Остановлено.");
  process.exit(130);
});

try {
  await run();
} catch (e) {
  console.error(`❌ Fatal: ${e.message}`);
  process.exit(1);
}
