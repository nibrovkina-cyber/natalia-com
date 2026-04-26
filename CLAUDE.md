@AGENTS.md

# natashabrovkina.com — правила для Claude Code

## 🎯 Цель проекта

Editorial-уровень премиум-сайт для AI-маркетинг студии natashabrovkina.com.
**Референсы:** Aesop, Kinfolk, Pentagram, Substack Pro, SSENSE.
**НЕ референсы:** Stripe, Linear, Vercel, типовой SaaS.

## ⚡ Skills — подключать ОБЯЗАТЕЛЬНО

**Всегда инвокай `front-end-design` skill ПЕРЕД написанием любого front-end кода.**
Никаких исключений. Если skill недоступен — останавливаемся и просим установить.

Если задача про конкретный компонент (drag-slider, animated background, hero с видео) —
ищи готовый prompt на [21st.dev](https://21st.dev) прежде чем писать с нуля.

## 📸 Screenshot workflow (Puppeteer)

После любого визуального изменения страницы:
1. Запустить `npm run dev` (порт 3000)
2. Запустить `node scripts/screenshot.mjs <url> <name>` — делает full-page скриншот в `temp_screenshots/<name>.png`
3. Прочитать свой скриншот
4. Сравнить с целью (брифом, референсом из `docs/references/`, brand_assets)
5. Если рассогласование — итерировать

**Два прохода минимум.** Не заканчивать задачу после одного прохода.

Имя скриншота = page + timestamp (например `pricing_2026-04-24_after-v2.png`), не `screenshot_1.png`.

**Мобильный чек обязателен.** После desktop-скриншота — запустить screenshot в mobile viewport (375×812).

## 🎨 Design system — правила

**Все цвета — только через CSS-переменные из [app/globals.css](app/globals.css):**
- `var(--navy)` `var(--navy-2)` `var(--navy-3)`
- `var(--gold)` `var(--gold-2)`
- `var(--cream)` `var(--cream-2)`
- `var(--mint)` `var(--steel)`

**Запрещено:**
- Инлайн-хекс (`#0D1B2A`, `#C8B79C`, `#F5F3EF`) — всегда заменять на `var(--*)`
- `Georgia` как шрифт — только `var(--font-playfair)` из next/font
- `@import` Google Fonts внутри `<style>` — шрифты ТОЛЬКО через next/font в [app/layout.tsx](app/layout.tsx)
- Tailwind utility + inline style одновременно в одном элементе — выбрать одно

**Шрифты — только через next/font переменные:**
- Headlines / price / editorial: `var(--font-playfair)`
- Body / UI / buttons: `var(--font-inter)`
- Meta / timers / technical: `var(--font-mono)` (JetBrains Mono)

**Spacing (editorial, не SaaS):**
- Между секциями на desktop: **160-200px**, не 80
- Внутри карточки: 48px padding
- Hero price / signature moments: Playfair 180-240px

## 🧱 Shared-компоненты — обязательно использовать

Эти уже существуют в [app/components/](app/components/). **Не дублировать инлайн:**

- [SiteNav](app/components/SiteNav.tsx) — sticky top nav, variant `light`/`dark`
- [SiteFooter](app/components/SiteFooter.tsx) — navy footer с 4 линками
- [Kicker](app/components/Kicker.tsx) — editorial supertitle с mint-dot
- [Reveal](app/components/Reveal.tsx) — scroll-reveal wrapper

Если видишь инлайн nav/footer/kicker в [app/page.tsx](app/page.tsx) или [app/pricing/page.tsx](app/pricing/page.tsx) — это баг. Заменяй на shared.

## 📁 Brand assets

Папка [brand_assets/](brand_assets/) — логотип, портрет, brand guidelines.
**Всегда читай** `brand_assets/brand-guidelines.md` перед визуальными задачами.

Портрет — **один файл** `public/assets/portrait.png` (не `natalia.png`, не два разных).

## ❌ SaaS-клише — запреты

Не использовать без явной просьбы пользователя:
- Pill-кнопки с градиентом
- "Trusted by" полоса логотипов
- Badge "Most popular" / "Best value" на тарифе
- Сравнительная таблица с галочками ✓
- "01 / 02 / 03" нумерованные feature-карточки
- FAQ как `<details>` с "+/×" toggle
- Эмодзи в заголовках (📎, ⚡, 🔥)
- Hero со стат-полосой "47 млн / 20 / 16"
- Зачёркнутая цена со стрелкой →
- Gradient mesh на фоне

## 🔁 Workflow — один dimension per prompt

Не пихать в один промт "измени цвет, spacing, шрифт и hero". **Одна визуальная плоскость за раз.**
Это из опыта: Claude делает первую нормально, остальные игнорит.

## 🎬 Референсы для клонирования

Когда пользователь просит editorial-страницу:
1. Смотри в `docs/references/` — там screenshots Aesop/Kinfolk, если есть
2. Если нет — предложи пользователю снять screenshot через F12 → Ctrl+Shift+P → "screenshot"
3. Клонируй структуру референса → накладывай наш брендинг из `brand_assets/`

## ✅ Project status

Что работает: /pricing (v1, слабо), /tool, /gallery, /gallery/[slug], /api/chat, /

Что в процессе (editorial v3):
- /pricing → ждёт Claude Design v3 zip ИЛИ клона Aesop
- /gallery/[slug] → нужен drag-slider 75vh (21st.dev)
- /tool → нужен 16-agent loader с Ogilvy-цитатами
