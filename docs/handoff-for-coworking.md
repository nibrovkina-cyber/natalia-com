# Handoff для коворка — как работать с natashabrovkina.com

Документ-передача: всё, что нужно знать чтобы продолжать дизайн **natashabrovkina.com** в том же визуальном языке и не терять качество.

---

## 📦 Что уже собрано

**natashabrovkina.com** — Next.js 16 / React 19 / TypeScript сайт AI-маркетинг студии Натальи Бровкиной с 16 AI-агентами на методологии Ogilvy / Schwartz / Hopkins.

### 8 роутов (все editorial-уровня)

| URL | Роль | Статус |
|---|---|---|
| `/` | Главная — editorial hero + продуктовый preview + эссе + кейсы + 16 агентов | ✅ v3 |
| `/pricing` | Тарифы — цена Playfair 240px как hero, два эссе-столбца | ✅ v3 |
| `/method` | Методология — Огилви/Шварц/Хопкинс с правилами и применением | ✅ v3 |
| `/gallery` | Индекс кейсов | ✅ v3 |
| `/gallery/[slug]` | Разбор кейса — drag-slider 85vh + метрика Playfair | ✅ v3 |
| `/tool` | Студия — 16 агентов + чат + Studio + Team Mode | ✅ editorial chrome |
| `/api/chat` | Anthropic proxy + Firecrawl + BYOK + rate-limit | ✅ |
| `/_not-found` | 404 | дефолт |

### Production build clean — 0 ошибок, 0 TS-проблем

---

## 🎨 Дизайн-система (не отклоняться)

**Единственный источник правды:** [`brand_assets/brand-guidelines.md`](../brand_assets/brand-guidelines.md) + [`app/globals.css`](../app/globals.css) + [`CLAUDE.md`](../CLAUDE.md)

### Палитра (только эти цвета — никаких других!)

| Token | Hex | Использование |
|---|---|---|
| `var(--navy)` | `#0D1B2A` | Тёмный фон, текст на светлом |
| `var(--navy-2)` | `#142638` | Второстепенный тёмный |
| `var(--gold)` | `#C8B79C` | Primary accent, кнопки, акцент |
| `var(--gold-2)` | `#E0D3BB` | Hover gold |
| `var(--cream)` | `#F5F3EF` | Светлый фон |
| `var(--cream-2)` | `#EFEBE2` | Карточки |
| `var(--steel)` | `#6B7A8F` | Secondary text |
| `var(--mint)` | `#5BBFA5` | Kicker / supertitle |

**Запреты:** inline `#hex`, purple/pink/blue-violet градиенты, gradient mesh.

### Типографика (через next/font)

| Переменная | Шрифт | Использование |
|---|---|---|
| `var(--font-serif)` | Playfair Display | H1/H2, цены, цитаты, editorial moments |
| `var(--font-sans)` | Inter | Body, UI, buttons, длинный текст |
| `var(--font-mono)` | JetBrains Mono | Таймеры, даты, мета, «I/II/III» |

**Правило:** Playfair — **только для заголовков и signature-моментов**. Body-копия (абзацы 2+ строки) — **Inter**.

### Spacing editorial-уровня

- Между секциями: **160-200px** на desktop, 80-100px на mobile
- Padding страницы: 48px desktop, 24px mobile
- Внутри карточки: 48px padding
- Hero price / signature цифры: Playfair 200-240px

---

## 🧱 Shared-компоненты (всегда использовать)

Никогда не писать инлайн nav/footer/kicker — брать из [`app/components/`](../app/components/):

| Компонент | Назначение |
|---|---|
| [SiteNav](../app/components/SiteNav.tsx) | Sticky top nav. `variant="light"` или `"dark"`. Опция `showStickyPrice` |
| [SiteFooter](../app/components/SiteFooter.tsx) | Navy footer с 4 линками: Метод / Кейсы / Тарифы / Telegram |
| [Kicker](../app/components/Kicker.tsx) | Editorial supertitle (11px uppercase mint). Опция `withDot` для пульсации |
| [Reveal](../app/components/Reveal.tsx) | Scroll-reveal wrapper. `delay` в мс |

---

## 🎯 Визуальные паттерны (повторять)

### 1. Editorial hero

```tsx
<Kicker>Контекст · Moscow</Kicker>
<h1 style={{
  fontFamily: "var(--font-serif)",
  fontSize: "clamp(48px, 7vw, 104px)",
  lineHeight: 0.98,
  letterSpacing: "-0.025em",
  fontWeight: 500,
}}>
  Главная идея.
  <span style={{ fontStyle: "italic", color: "var(--steel)" }}>
    Второй акцент.
  </span>
</h1>
```

### 2. Signature hero с цифрой (Pricing, Gallery metric)

Цена/метрика — Playfair 200-240px, почти весь первый экран. Пример из `/pricing`:

```tsx
<div style={{
  fontFamily: "var(--font-serif)",
  fontSize: "clamp(88px, 16vw, 240px)",
  lineHeight: 0.92,
  letterSpacing: "-0.035em",
  fontWeight: 500,
}}>
  2&nbsp;990&nbsp;<span style={{ fontSize: "0.25em", fontStyle: "italic", color: "var(--steel)" }}>₽/мес</span>
</div>
```

### 3. Pull-quote между секциями

```tsx
<blockquote style={{
  borderLeft: "3px solid var(--gold)",
  paddingLeft: 32,
  fontFamily: "var(--font-serif)",
  fontStyle: "italic",
  fontSize: "clamp(22px, 2.4vw, 34px)",
  lineHeight: 1.4,
}}>
  «Цитата классика.»
</blockquote>
```

### 4. Editorial index (римские цифры)

Использовать для «16 агентов», «Правила Огилви», «Уровни Шварца»:

```tsx
<div style={{ gridTemplateColumns: "48px 1fr" }}>
  <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--gold)", fontSize: 22 }}>
    III
  </span>
  <div>...</div>
</div>
```

### 5. Product preview card (hero home)

Navy-карточка с border-radius 18px, subtle gradient-glow, Playfair quote внутри, пульсирующие точки. Паттерн в [`app/page.tsx`](../app/page.tsx) под «hero-preview».

---

## 🚫 Жёсткие запреты (SaaS-клише)

Никогда без явной просьбы пользователя не добавлять:

- Pill-кнопки с градиентом
- «Trusted by» логотип-полоса
- Badge «Most popular» на тарифе
- Сравнительная таблица с ✓ галочками
- «01 / 02 / 03» нумерованные feature-карточки
- FAQ как `<details>` с «+/×» toggle
- Эмодзи в заголовках (📎 ⚡ 🔥 💎)
- Hero со стат-полосой «47 млн / 20 / 16»
- Зачёркнутая цена со стрелкой →
- Gradient mesh на фоне
- Card-grid 1:1 для тарифов

---

## 🎨 Промты для Claude Design (проверенные)

Готовые промты лежат в [`docs/claude-design-prompts.md`](claude-design-prompts.md). Три ключевых:

### Промт 1 — `/pricing` editorial v3
Цена Playfair 220px, два эссе-столбца вместо таблицы, editorial divider с цитатой Огилви.

### Промт 2 — Case Study (`/gallery/[slug]`)
Референсы: Kinfolk / Pentagram. Цифра-метрика Playfair 240px как hero, drag-slider 85vh во весь viewport, scroll-reveal narrative.

### Промт 3 — Studio (`/tool`)
Референсы: Arc Browser / v0.dev. Empty state как art-piece с Playfair-цитатой Огилви + 16 dot-агентов. Loader с ротацией цитат синхронно с прогрессом.

**Что прикреплять к промту:** [`brand_assets/portrait.png`](../brand_assets/portrait.png). Всё. Референсы известны Claude Design по названию (Kinfolk, Lenny's, Pentagram).

---

## 📸 Screenshot-workflow (важно!)

Для любого визуального изменения — **скрин-верификация обязательна**. Скрипт [`scripts/screenshot.mjs`](../scripts/screenshot.mjs) делает full-page PNG:

```bash
# Desktop
npm run screenshot http://localhost:3000/ home_v3

# Mobile (375×812)
npm run screenshot http://localhost:3000/pricing pricing_mobile --mobile
```

Результат в `temp_screenshots/<name>.png`. Сравнивать с референсом из `docs/references/`.

**Два прохода минимум:** один desktop, один mobile. Не закрывать задачу после одного.

---

## 🔗 Ключевые файлы для быстрого погружения

Если коворк открывает проект впервые:

1. [`CLAUDE.md`](../CLAUDE.md) — правила работы для Claude Code / любого AI-ассистента
2. [`brand_assets/brand-guidelines.md`](../brand_assets/brand-guidelines.md) — полная дизайн-система
3. [`app/globals.css`](../app/globals.css) — CSS-переменные (токены)
4. [`app/layout.tsx`](../app/layout.tsx) — шрифты через next/font
5. [`app/page.tsx`](../app/page.tsx) — главная как референс для editorial-паттернов
6. [`app/method/page.tsx`](../app/method/page.tsx) — longread-страница с pull-quote + editorial index
7. [`content/gallery.json`](../content/gallery.json) — данные кейсов + метрики
8. [`docs/claude-design-prompts.md`](claude-design-prompts.md) — промты-шаблоны для итераций

---

## 🧪 Локальный запуск

```bash
cd ai-marketing-natalia
npm install
npm run dev
# Открыть http://localhost:3000
```

Для тестирования генерации в `/tool` нужен `ANTHROPIC_API_KEY` в `.env.local`. Без него работает **demo-mode** без API:

- `http://localhost:3000/tool?demo=medea` — показывает готовый лендинг MEDEA
- `http://localhost:3000/tool?demo=simbios` — показывает готовый лендинг Simbios

---

## 🛠 Если нужна «Дизайн Контент Завода»

Если идея в том что коворк делает аналогичный «Content Factory» на той же базе:

### Что переиспользовать напрямую

1. **Дизайн-токены** (`globals.css`) — просто скопировать, палитра универсальная
2. **Shared-компоненты** (`components/`) — SiteNav/SiteFooter/Kicker/Reveal — бренд-агностичны
3. **Screenshot-workflow** (`scripts/screenshot.mjs`) — переиспользуемо
4. **Editorial-паттерны** из секции «Визуальные паттерны» — можно применить к любому продукту

### Что нужно заменить

1. **Копирайт** — voice Натальи (личный эксперт + AI-команда) заменить на voice контент-завода
2. **`/method`** — методология Ogilvy/Schwartz/Hopkins → своя методология
3. **`gallery.json`** — кейсы Натальи → кейсы контент-завода
4. **Агенты в `/tool`** — 16 маркетинг-агентов → агенты контент-фабрики (например: writer / editor / SEO / researcher / fact-checker / illustrator / publisher / analyst)

### Советы по итерации

- **Один dimension за промт** (Claude Design сливает несколько задач)
- **Wireframe сначала, hi-fi потом** — экономит токены
- **Референсы текстом**, не картинками (Claude Design знает Kinfolk/Aesop/Lenny по именам)
- **Tweaks-panel** в промте — добавить «создай панель тонкой настройки» — экономит итерации
- **Screenshot-луп** после каждой визуальной правки

---

## 📞 Контакты / вопросы

Если у коворка возникнут вопросы по коду или дизайну — все решения задокументированы либо в комментариях файлов, либо в этом документе. Нет «чёрных ящиков».

Главный принцип: **editorial-уровень, не SaaS-шаблон**. Любое решение проверяется вопросом «Kinfolk или Stripe?» — если Stripe, переделываем.
