# Handoff: natashabrovkina.com — AI-маркетинг SaaS для малого бизнеса

## Overview

**natashabrovkina.com** — лендинг + SaaS-продукт от маркетолога Натальи Бровкиной. Суть продукта: 16 AI-агентов на методологиях Ogilvy, Schwartz, Hopkins, Kennedy — собирают премиум-лендинги за ~60 секунд из URL конкурента или брифа. Два тарифа: **Self-Serve** (2 990 ₽/мес — работаешь сама через инструмент) и **Personal** (49 000 ₽ разово — Наталья лично ведёт проект 30 дней).

Этот handoff содержит дизайн-прототипы четырёх ключевых экранов:
1. **Studio** — основной инструмент (форма брифа + live-превью + loader с 16 агентами)
2. **Pricing** — страница тарифов (сравнение Self-Serve vs Personal)
3. **Case study (Medea Dent)** — кейс с drag-to-compare слайдером (до/после)
4. **Demo lendings** — два HTML-лендинга (до/после), используемые внутри кейса и Studio-превью

## About the Design Files

Файлы в папке `designs/` — это **дизайн-референсы, сделанные в HTML**. Это прототипы для демонстрации внешнего вида и поведения, **не продакшен-код для копирования напрямую**.

Задача разработчика: **воссоздать эти дизайны в production-стеке проекта** (Next.js + React + Tailwind / shadcn — рекомендуемый стек для этого типа SaaS), используя установленные в кодовой базе паттерны. Если кодовой базы ещё нет, выбрать стек самостоятельно — рекомендую **Next.js 14 App Router + TypeScript + Tailwind CSS + Framer Motion** (для анимаций агентов).

## Fidelity

**High-fidelity (hifi).** Финальные цвета, типографика, spacing, интеракции — всё точное. Разработчик должен воспроизвести UI пиксель-в-пиксель, используя библиотеки и паттерны проекта.

---

## Design Tokens

### Colors
```
--navy:      #0D1B2A    /* основной тёмный фон, типографика */
--navy-2:    #142638    /* карточки на navy-фоне, sidebars */
--navy-3:    #1C3148    /* hover-состояния на navy */
--gold:      #C8B79C    /* primary accent — кнопки, курсив, acцентный текст */
--gold-2:    #E0D3BB    /* hover для gold */
--cream:     #F5F3EF    /* основной светлый фон страниц */
--cream-2:   #EFEBE2    /* вторичный светлый фон (карточки) */
--steel:     #6B7A8F    /* secondary text, muted */
--mint:      #5BBFA5    /* success state, галочки, kicker-text */

--line:       rgba(13,27,42,0.08)    /* разделители на light-фоне */
--line-dark:  rgba(245,243,239,0.08) /* разделители на navy */
--line-dark-2: rgba(245,243,239,0.14) /* акцентные разделители на navy */
```

### Typography
```
Playfair Display — заголовки (weight 500/600/700; italic 500/600)
Inter           — body + UI (weight 400/500/600/700)
JetBrains Mono  — monospace в Studio (URL-префикс, timer, agent-status)
```

Правила:
- Заголовки `h1–h4` всегда Playfair Display, `letter-spacing: -0.015em`
- `<em>` внутри заголовков — italic + gold (на navy) или italic + steel (на cream)
- Body text — Inter 14–16px, `line-height: 1.5`–`1.55`
- Kicker-text (supertitle): 11–12px, uppercase, `letter-spacing: 0.22em`, цвет `--mint`

### Spacing Scale
Базовые отступы: 4, 6, 8, 10, 12, 14, 16, 20, 22, 28, 32, 36, 44, 48, 56, 80 px. Используется свободно, без жёсткой сетки.

### Border Radius
```
4px  — бейджи, маленькие чипы
6px  — inputs, tabs
8px  — базовые карточки, кнопки
10px — крупные карточки, modals
12–14px — action-bars, frames
18–22px — hero cards (Pricing plans)
999px — pill-chips, CTA-кнопки навигации
```

### Shadows
```
/* Главный premium shadow (frames в Studio) */
box-shadow: 0 40px 100px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06);

/* Floating action-bar */
box-shadow: 0 20px 40px rgba(0,0,0,0.3);
```

### Brand Gradients
```css
/* Golden radial (на navy-картах типа Personal plan) */
background:
  radial-gradient(ellipse at 110% -10%, rgba(200,183,156,0.18), transparent 55%),
  radial-gradient(ellipse at -10% 110%, rgba(200,183,156,0.08), transparent 55%);

/* Preview pane background */
background:
  radial-gradient(ellipse at 80% -10%, rgba(200,183,156,0.08), transparent 55%),
  var(--navy);
```

---

## Screens

### 1. Studio (`designs/studio.html`)

**Purpose.** Главный инструмент продукта. Пользователь заполняет бриф слева, нажимает «Запустить агентов», смотрит как 16 AI-агентов работают, получает готовый лендинг в превью справа.

**Layout.** Fixed-viewport split-screen (`height: 100vh; overflow: hidden`):
- Top chrome: 56px, full-width, `var(--navy-2)` фон
- Main stage: grid `420px 1fr` — form pane слева, preview pane справа

**Top chrome.**
- `← Назад` → ссылка на pricing
- Divider, затем brand block: 28px round avatar (с gold border 1.5px, portrait.png, `background-position: center 12%`) + "natalia" (Playfair 15px) + "Studio" (10px, `letter-spacing: 0.16em`, uppercase, gold)
- Справа: plan badge "План · **Инструмент** · 6 из 7 дней" (11px, uppercase, `letter-spacing: 0.14em`, gold-акцент) + 32px round user avatar с градиентом `linear-gradient(135deg, #3a5a7a 0%, #1a2f44 100%)` и инициалами

**Form pane (420px).**
Все поля с 22px vertical rhythm. Лейблы: 11px uppercase, `letter-spacing: 0.14em`, `rgba(cream, 0.5)`.

- **URL input:** flex-row с proto-префиксом `https://` в `JetBrains Mono` (steel color) + 1px divider + input (transparent bg, cream text). Контейнер: navy bg, 1px `--line-dark-2` border, `border-radius: 8px`. Focus — `border-color: var(--gold)`. Высота 42px.
- **Niche chips:** pill-chips (padding 8px 12px, `border-radius: 999px`). Default: navy bg, steel text, `--line-dark-2` border. Active: gold bg, navy text, font-weight 600. Hover (non-active): gold border, cream text.
- **Textarea:** `height: 72px; resize: none`, navy bg, 1px border, focus gold.
- **Mode cards** (3 карточки вертикально, gap 8px):
  - Solo · «один агент» — бейдж mint «быстро», "1 агент · ~30 сек"
  - **Team · «команда из 16»** (active default) — бейдж gold «рекомендую»
  - Parallel · «4 версии» — бейдж steel «сравнение», "4 агента параллельно · ~90 сек"

  Каждая карточка: 14–16px padding, border-radius 10px. Default — navy bg, `--line-dark-2` border. Active — `rgba(gold, 0.06)` bg, gold border. Название — Playfair 16px, italic-подтайтл в gold weight 500. Desc — 12px, `rgba(cream, 0.5)`. Внизу mint-строка "N агентов · ~Xс" (11px, `letter-spacing: 0.04em`).
- **Submit button:** полная ширина, gold bg, navy text, weight 600, 15px, padding 16px, radius 10px. Hover: `translateY(-1px)` + `--gold-2`. В loading — показывает spinner (14px rotating circle).
- **Form hint:** `rgba(mint, 0.08)` bg, `rgba(mint, 0.2)` border, 12px text.

**Preview pane.**

- **Preview top (44px):** слева — 4 таба (Превью/Код HTML/Бриф/Лог агентов). Активный: navy-2 bg, gold text. Справа — domain label в JetBrains Mono (`{slug}.natashabrovkina.com`) + viewport switch (Desktop/Mobile pill-group).
- **Preview body:** centered, `max-width: 1280px`, padding 40px. Frame container: white bg, `border-radius: 10px`, premium shadow. Internal iframe 100%/100%.
- **Empty state:** центрированная композиция. 120×120 art-block с двумя пульсирующими gold-кольцами (animation `pulse 3s ease-in-out infinite`, delays 0 и 1.5s, scale 0.6→1.0, opacity 0→0.5→0), в центре 48px gold-circle с italic-буквой N (Playfair 22px). Ниже — Playfair italic `h3` (20px) «Готов начать» + body (13px, `rgba(cream, 0.35)`).

**Loader overlay (during generation):**

Covers preview body, `background: rgba(navy, 0.85)`, backdrop-filter blur(8px). Grid `1fr 1fr` max-width 1000px:

- **Left:**
  - Kicker «АГЕНТЫ РАБОТАЮТ»
  - Playfair h2 «Собираю *твой лендинг*» (42px, em → gold)
  - Sub (14px, `rgba(cream, 0.55)`)
  - Progress bar: 3px height, `--line-dark-2` track, gold fill (`transition: width 0.5s ease`)
  - Meta row: «N/16 · {agent_name}» + percentage (gold bold)
- **Right (agent-log):** left-border 1px, padding-left 22px, height 320px, overflow hidden.
  - H4 «АКТИВНОСТЬ · timer` (11px, letter-spacing 0.18em)
  - Scrolling list of 16 agents. Each item:
    - 6px dot (left)
    - Name (Inter 13px)
    - Status (JetBrains Mono 11px, `letter-spacing: 0.06em`)

  **States:**
  - `idle` — opacity 0.25, steel dot, status "idle"
  - `.working` — opacity 1, cream text, **gold pulsing dot** with 10px gold glow + `workPulse` animation 1s (opacity 1→0.4→1), status in gold
  - `.done` — opacity 0.75, mint dot (no glow), status in mint

  Список transforms Y для auto-scroll, чтобы активный агент был в центре viewport (7 items visible, itemH 34px, clamp: `Math.min((i - 3) * 34, (16 - 7) * 34)`).

**Success state:**
- Banner top-right: navy-2 bg, mint-border 30%, mint check + «Готово. 16 агентов, 0 ошибок. {mm:ss}» в JetBrains Mono
- Action bar bottom-center (floating): navy-2 bg, 4 кнопки:
  1. **Опубликовать на домен** (gold primary, check-icon SVG 14×14)
  2. Скачать HTML (download icon)
  3. Правки в агента (arrow-right icon)
  4. Ещё вариант (refresh icon → resets view)
- Frame container показывает iframe с medea-after.html (или результат генерации)

**Interactions.**
- Chip click: toggle active, snake single-select
- Mode card click: single-select
- Viewport switch: toggles `frame-container[data-vp]`; mobile = `max-width: 380px` (centered)
- Submit → run 16-step animation (`stepMs = 3200ms`, total ~52s):
  - Previous agent → `.done` + status "done"
  - Current agent → `.working` + status = `agent.t`
  - Transform list Y для keep-in-view
  - Progress = round((i + 0.5) / 16 * 100)
- After step 16: `progress=100, "Готово"` → 700ms delay → hide loader, show iframe + banner + action-bar
- Reset button: clears iframe, restores empty state

**Agent list (16 agents, order matters):**
```
1. Стратег · парсит URL
2. Ogilvy · копирайтер · собирает нарратив
3. Schwartz · заголовок · 12 вариантов H1
4. Hopkins · доказательства · регалии, цифры
5. UX · структура · иерархия блоков
6. Kennedy · офферы · цены и гарантии
7. SEO-агент · meta + semcore
8. Брендинг · цвет + типографика
9. Фотодиректор · подбор плейсхолдеров
10. Вёрстка · HTML · семантика
11. Вёрстка · CSS · grid + адаптив
12. Мобильный агент · проверка 375px
13. Форма-агент · валидация + UTM
14. SMM · Telegram-пост · анонс готов
15. Аудитор · a11y · контраст, aria
16. Сборщик · финал · публикация
```

---

### 2. Pricing (`designs/pricing.html`)

**Purpose.** Страница тарифов — сравнение Self-Serve vs Personal.

**Layout.**
- Sticky nav 14px vertical padding, `rgba(cream, 0.92)` bg + backdrop-blur 14px
- Page head: centered, 80px top / 48px bottom padding
- Plans grid: `1fr 1fr` gap 28px
- Compare table: 3 columns `1.4fr 1fr 1fr`
- FAQ 2×2 grid
- Dark navy footer

**Nav.** Same brand pattern as Studio (40px avatar + natalia/tagline + gold border). CTA right: "Открыть инструмент →" (navy pill, cream text, padding 10px 20px).

**Page head.**
- Kicker "ДВА СПОСОБА РАБОТАТЬ СО МНОЙ" (mint)
- Playfair h1 72px «Запусти сама — или *передай мне на 30 дней*» (em = italic + steel)
- Lede 18px, steel, max-width 620px

**Self-Serve plan card.**
- White bg, 1px line border, radius 22px, padding 48px 44px
- Badge row (border-bottom): `•` dot + «SELF-SERVE · ИНСТРУМЕНТ» (uppercase tracked)
- H2 «Инструмент» 48px Playfair
- Desc 15px steel max-width 340px
- Price block (bottom-border): `2 990` (Playfair 68px weight 600, letter-spacing -0.025em) + «₽ / мес» (steel 16px). Fine text 13px.
- Feature list (5 items): каждый с mint left-bar (20px × 2px) как маркером. Items separated by 1px line dividers (14px vertical padding). Bold name, `<small>` — steel 13px subtitle
- CTA block bottom: navy button «Попробовать 7 дней бесплатно →» (18px padding, 12px radius) + sub-text «КАРТУ ВВОДИТЬ НЕ НУЖНО»

**Personal plan card.**
- Navy bg, premium gradient ::before (golden radials). Border 1px navy
- Badge row: gold dot + «PERSONAL · СО МНОЙ» + **right-aligned slots pill** «3 мест в этом месяце» (gold bold для цифры «3», `rgba(cream, 0.6)` для текста)
- **Head row:** 72px portrait avatar (gold border 1.5px) + Playfair h2 «Со *мной*» (48px, em = italic + gold)
- Price: `49 000` (gold 68px) + «₽ разово»
- Feature list: gold left-bar markers, `--line-dark` dividers, cream text + `rgba(cream, 0.5)` subtitles
- CTA: gold button «Записаться в Telegram →» + sub «@NATASHABROVKINA · ответ в течение дня»

**Comparison table.**

Header row: пустая ячейка + «Инструмент · 2 990₽» + «Со мной · 49 000₽» (последняя с navy bg, gold text). 8 data rows:

| Вопрос | Self-Serve | Personal |
|---|---|---|
| 16 AI-агентов в Студии | ✓ | ✓ |
| Генерация лендинга за 60 сек | ✓ | ✓ |
| Публикация на твоём домене | самостоятельно | я делаю |
| Аудит + стратегия на 90 дней | — | ✓ |
| Рекламные объявления VK Ads / Директ | — | 3 готовых |
| Telegram-канал и контент-план | — | 10 постов |
| Личное сопровождение в Telegram | — | 30 дней |
| Подходит если… | есть 1–2 часа в неделю | нет времени вообще |

- ✓ = mint `.check` (font-weight 700)
- — = `.dash` class (`--line` color, very muted)
- Personal column has subtle `rgba(navy, 0.03)` bg

**FAQ (2×2 grid, gap 32px 48px):**
1. Можно ли начать с Инструмента, потом перейти на Со мной? → Да, 40% так делают
2. Почему 3 места в месяц? → Веду сама, без ассистентов
3. Что если AI плохо сделает? → Возврат 100% в 14 дней
4. Как платить? → Карта/СБП/счёт ИП/самозанятый

Каждый item: Inter 16px h4 bold + 14px steel paragraph, line-height 1.6.

---

### 3. Case study: Medea Dent (`designs/cases/medea-dent.html`)

**Purpose.** Демонстрация кейса (стоматология) с центральным drag-to-compare слайдером между старым Tilda-сайтом и новым премиум-лендингом.

**Layout.**
1. Nav (same as pricing)
2. Breadcrumb «Кейсы → Medea Dent»
3. Hero: бейдж ниши/города/даты, Playfair h1, метрики-плитка (4 карточки ↑3,4× заявок / ↑€ чек / 4 дня / 7 из 16 агентов)
4. **Drag slider 75vh** — главный фокус
5. Two-col sections:
   - «Что AI исправил» — нумерованный список 01–05 с Playfair-цифрами в gold
   - «Методология» — 3 цитаты Ogilvy/Schwartz/Hopkins с блоком «Как применили»
6. CTA block navy, gold italic текст, подпись «— Наталья»

**Drag-slider mechanics.**
- Container 75vh. Two 100%-overlayed iframes. Iframes используют `transform: scale()` чтобы фикс-ширина 1280px помещалась в контейнер.
- Правая iframe = medea-after.html, левая iframe = medea-before.html.
- Clip-path на before-side: `clip-path: inset(0 {100% - pos%} 0 0)` управляется drag.
- Gold vertical handle (2px) по центру позиции + 48px круглая ручка с двойной стрелкой.
- Chip labels: «01 · До» слева вверху on before-side, «02 · После» справа вверху on after-side.
- **Параллакс-пины:** 4 абсолютных метки с текстом проблем на before-iframe (например «Пульсирующая кнопка → раздражает», «WhatsApp-виджет закрывает форму»). Visible только когда `sliderPos >= 88%`, плавно исчезают ниже.
- **Auto-demo:** IntersectionObserver — когда слайдер в viewport первый раз, анимация `position: 50% → 12% → 88% → 50%` с `cubic-bezier(0.22,1,0.36,1)`, 1.4s на phase.
- Control buttons bottom: `[Только до | 50/50 | Только после | ▶ Показать разницу]`.

---

### 4. Demo landings (`designs/demo/`)

- **medea-before.html** — типичный Tilda 2022: кричащий градиент hero, пульсирующая кнопка, WhatsApp-виджет, прайс-таблица, cookie popup. Намеренно «уродливо».
- **medea-after.html** — премиум-лендинг с nav bar, navy hero + mint accent, Playfair h1 с italic, форма записи в hero, 4 врача с регалиями, галерея работ, прозрачные цены «под ключ», FAQ accordion, 2 локации на карте, footer.

Эти два файла **являются частью основного продукта** (natashabrovkina.com демонстрирует их внутри кейсов и Studio-превью), но **тоже являются дизайн-референсами** для production-имплементации.

---

## Interactions & Behavior (высокоуровнево)

- **Studio generation flow:** После click на Submit — form disabled, loader visible, 16 agents animate sequentially (`setInterval` с 3.2s step), progress 0→100, timer counts up. После last agent — 700ms delay для satisfaction, затем hide loader + show iframe + banner + action-bar.
- **Viewport switch:** синхронно меняет data-attribute на frame-container, CSS делает остальное.
- **Reset (Ещё вариант):** возвращает к empty state, очищает все агенты в idle, iframe.src = 'about:blank'.
- **Chip / mode select:** класс `.active` toggle через event delegation.
- **Drag slider (case):** pointer events, boundary clamp 0–100%, smooth animation при auto-demo, IntersectionObserver для trigger.

## State Management

### Studio
```ts
type AgentStatus = 'idle' | 'working' | 'done'
type Mode = 'solo' | 'team' | 'parallel'

interface StudioState {
  url: string
  niche: string                 // active chip value
  brief: string                 // textarea
  mode: Mode
  running: boolean
  agents: { name: string; task: string; status: AgentStatus }[]
  progress: number              // 0..100
  currentStep: number           // 0..16
  elapsed: number               // seconds
  result: { html: string } | null
  viewport: 'desktop' | 'mobile'
}
```

Переходы: `idle → running (через runAgents()) → done (result set) → idle (reset)`

### Pricing — статическая страница, no state

### Case / Slider
```ts
interface SliderState {
  position: number              // 0..100
  autoDemoComplete: boolean
  pinsVisible: boolean          // derived: position >= 88
}
```

## Responsive

- **Studio:** ниже 1000px → stage становится grid-row (form-pane 50vh max, preview под ней). Loader grid переходит в single-column.
- **Pricing:** ниже 900px → plans stack vertically, h1 40px, compare-table tighter padding, FAQ 1-col.
- **Case:** mobile — nav compacts, метрики 2×2, slider 56vh, проблемные пины скрываются на small viewports.

## Assets

- `designs/assets/portrait.png` — портрет Натальи (используется в avatar всех экранов)
- Все иконки — **inline SVG** 14×14 viewBox в action-bar (check, download, arrow-right, refresh)
- Google Fonts: Playfair Display, Inter, JetBrains Mono

## Backend Contracts (предложение для имплементации)

- `POST /api/studio/generate` → `{ url, niche, brief, mode }` → возвращает `{ jobId }`
- `GET /api/studio/stream/:jobId` → SSE stream с events: `{ agent: string, status: AgentStatus, progress: number }`, финальный event `{ type: 'done', html: string }`
- `POST /api/studio/publish` → публикует HTML на `{slug}.natashabrovkina.com`

## Files in this handoff

```
designs/
├── studio.html                    # Main tool UI
├── pricing.html                   # Pricing page
├── cases/
│   └── medea-dent.html            # Case study with drag-slider
├── demo/
│   ├── medea-before.html          # "Before" reference landing
│   └── medea-after.html           # "After" reference landing
└── assets/
    └── portrait.png               # Natalia portrait
```

## Recommendations для Claude Code

1. **Stack:** Next.js 14 App Router + TypeScript + Tailwind CSS + Framer Motion + Radix UI primitives. Если уже есть другой stack — используй его.
2. **Fonts:** `next/font/google` для Playfair Display, Inter, JetBrains Mono (CSS variables в root).
3. **Design tokens:** положи все переменные в `tailwind.config.ts` как `theme.extend.colors` + CSS-переменные в `globals.css`.
4. **Components:**
   - `<PlanCard variant="self|personal">` для Pricing
   - `<AgentList>` + `<AgentItem>` для Studio loader
   - `<CompareSlider before={} after={} pins={}>` для case
   - `<BriefForm>`, `<PreviewFrame>`, `<ActionBar>` для Studio
5. **Animations:**
   - Framer Motion для agent pulse / glow / list scroll
   - CSS transitions для progress bar, chip-select, frame viewport switch
6. **AI integration:** Self-Serve tier использует Anthropic API через Vercel Edge Functions. Stream результат через SSE. **Важно:** никогда не коммить API key в клиент — всегда proxy через backend.
7. **Priority order:** (1) Pricing — статичная, быстро покажет результат; (2) Case + drag-slider — высокое впечатление от демо; (3) Studio — самое сложное, делать последним.
