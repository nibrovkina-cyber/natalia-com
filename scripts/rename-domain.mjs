#!/usr/bin/env node
/**
 * rename-domain.mjs — массовая замена старого домена на новый по обоим репо.
 * Исторические design-snapshots пропускаются.
 *
 * Конфиг — переменные `NEW` и `OLD_PATTERNS` ниже. Текущий запуск (2026-04-25)
 * заменил natalia.studio + natalia.com → natashabrovkina.com (самосломал
 * комментарии при первом проходе — они теперь зачищены).
 *
 * Использование:
 *   node scripts/rename-domain.mjs --dry    # показать что изменится
 *   node scripts/rename-domain.mjs           # реально применить
 */
import fs from "node:fs";
import path from "node:path";

const NEW = "natashabrovkina.com";
const OLD_PATTERNS = [/natalia\.studio/gi, /natalia\.com/gi];
const dryRun = process.argv.includes("--dry");

const REPOS = [
  "c:/проект опенсорс/ai-marketing-natalia",
  "c:/проект опенсорс/natalia-marketing-department",
];

// Пропускаем исторические артефакты — они перетираются при следующем импорте Claude Design
const SKIP_PATTERNS = [
  /[/\\]node_modules[/\\]/,
  /[/\\]\.next[/\\]/,
  /[/\\]\.git[/\\]/,
  /[/\\]docs[/\\]design-snapshots[/\\]/,
  /[/\\]docs[/\\]design_handoff_v2[/\\]/,
  /[/\\]docs[/\\]design_handoff_natalia_com[/\\]/,
  /[/\\]public[/\\]design-preview[/\\]/,
  /[/\\]public[/\\]pricing-v\d+\.html$/,
  /temp_research[/\\]/,
  /temp_screenshots[/\\]/,
  /temp_wordstat[/\\]/,
  /\.playwright-auth\.json$/,
];

const ALLOWED_EXT = new Set([
  ".tsx", ".ts", ".js", ".mjs", ".jsx",
  ".md", ".html", ".json",
  ".py", ".css",
]);

function shouldSkip(file) {
  return SKIP_PATTERNS.some((p) => p.test(file));
}

function walk(dir, out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (shouldSkip(full)) continue;
    if (e.isDirectory()) walk(full, out);
    else if (e.isFile() && ALLOWED_EXT.has(path.extname(e.name).toLowerCase())) {
      out.push(full);
    }
  }
  return out;
}

let filesScanned = 0;
let filesChanged = 0;
let totalReplacements = 0;
const changeLog = [];

for (const repo of REPOS) {
  if (!fs.existsSync(repo)) {
    console.error(`⚠️  Not found: ${repo}`);
    continue;
  }
  const files = walk(repo);
  for (const file of files) {
    filesScanned++;
    let content;
    try {
      content = fs.readFileSync(file, "utf-8");
    } catch (e) {
      continue; // binary / unreadable
    }
    let newContent = content;
    let fileReplacements = 0;
    for (const pattern of OLD_PATTERNS) {
      const matches = newContent.match(pattern);
      if (matches) {
        fileReplacements += matches.length;
        newContent = newContent.replace(pattern, NEW);
      }
    }
    if (fileReplacements > 0) {
      filesChanged++;
      totalReplacements += fileReplacements;
      const rel = path.relative(path.dirname(repo), file);
      changeLog.push({ file: rel, replacements: fileReplacements });
      if (!dryRun) {
        fs.writeFileSync(file, newContent, "utf-8");
      }
    }
  }
}

console.log(`\n${dryRun ? "[DRY RUN] " : ""}Просканировано файлов: ${filesScanned}`);
console.log(`${dryRun ? "Будет изменено" : "Изменено"} файлов: ${filesChanged}`);
console.log(`${dryRun ? "Будет заменено" : "Заменено"} вхождений: ${totalReplacements}`);
console.log(`Замена: ${OLD_PATTERNS.map((p) => p.source.replace(/\\\./g, ".")).join(" | ")} → ${NEW}\n`);

changeLog
  .sort((a, b) => b.replacements - a.replacements)
  .forEach(({ file, replacements }) => {
    console.log(`  ${replacements.toString().padStart(3)} × ${file}`);
  });

if (dryRun) {
  console.log(`\n${dryRun ? "Ничего не изменено. " : ""}Запусти без --dry чтобы применить.`);
}
