/**
 * Генерирует before-скриншоты для всех кейсов из content/gallery.json
 * через публичный сервис image.thum.io.
 *
 * Запуск: npx tsx scripts/generate-gallery-screenshots.ts
 *
 * Сохраняет:  public/demo/gallery/{slug}/before.png
 */

import { mkdir, writeFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import galleryData from "../content/gallery.json" with { type: "json" };

type GalleryItem = {
  slug: string;
  title: string;
  originalUrl: string;
  beforeScreenshot: string;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, "..");
const PUBLIC_ROOT = join(PROJECT_ROOT, "public");

const items = galleryData as GalleryItem[];

async function exists(path: string): Promise<boolean> {
  try { await access(path); return true; } catch { return false; }
}

async function downloadShot(item: GalleryItem): Promise<void> {
  const diskPath = join(PUBLIC_ROOT, item.beforeScreenshot.replace(/^\//, ""));
  if (await exists(diskPath)) {
    console.log(`  ✓ skip (exists): ${item.slug}`);
    return;
  }
  const thumUrl = `https://image.thum.io/get/width/1280/crop/900/url/${encodeURIComponent(item.originalUrl)}`;
  console.log(`  ⬇ ${item.slug} <- ${item.originalUrl}`);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45000);
  try {
    const res = await fetch(thumUrl, { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) {
      console.error(`    ✗ HTTP ${res.status} for ${item.slug}`);
      return;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 2000) {
      console.error(`    ✗ suspicious size ${buf.length} bytes — thum.io may have returned placeholder`);
      return;
    }
    await mkdir(dirname(diskPath), { recursive: true });
    await writeFile(diskPath, buf);
    console.log(`    ✓ saved ${buf.length} bytes → ${diskPath}`);
  } catch (err) {
    clearTimeout(timeout);
    console.error(`    ✗ failed ${item.slug}:`, (err as Error).message);
  }
}

async function main() {
  console.log(`🖼  Generating ${items.length} screenshots...\n`);
  for (const item of items) {
    await downloadShot(item);
  }
  console.log(`\n✅ Done.`);
}

main().catch(err => {
  console.error("Fatal:", err);
  process.exit(1);
});
