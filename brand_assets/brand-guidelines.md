# natalia.com — Brand Guidelines

Брендинг natalia.com — AI-маркетинг студия с 16 AI-агентами на методологии
Ogilvy / Schwartz / Hopkins. Премиум-сегмент для SMB в России.

## Позиционирование

**Имя:** Natalia Brovkina
**Компания:** natalia.com — AI Marketing Studio
**Город:** Moscow · Los Angeles
**Tone of voice:** редакторский, уверенный, без пафоса, без маркетингового жаргона.
«Журнал Kinfolk», а не «SaaS pricing».

## Цветовая палитра

**ТОЛЬКО эти цвета. Никаких purple / blue-violet / pink / gradient-mesh.**

| Token | Hex | Использование |
|---|---|---|
| `--navy` | `#0D1B2A` | Основной тёмный фон, текст на светлом |
| `--navy-2` | `#142638` | Второстепенный тёмный фон |
| `--navy-3` | `#1C3148` | Hover / borders на тёмном |
| `--gold` | `#C8B79C` | Primary accent, кнопки, акцентный текст |
| `--gold-2` | `#E0D3BB` | Hover на золоте, более светлый tint |
| `--cream` | `#F5F3EF` | Основной светлый фон, текст на тёмном |
| `--cream-2` | `#EFEBE2` | Карточки на cream-фоне |
| `--steel` | `#6B7A8F` | Secondary text, labels |
| `--mint` | `#5BBFA5` | Kicker / supertitles / мелкие акценты |

**Градиенты разрешённые:**
- Radial gold glow на navy: `radial-gradient(ellipse at 110% -10%, rgba(200,183,156,0.18), transparent 55%)`
- Никаких других.

## Типографика

**Три семейства, все подключены через next/font в [app/layout.tsx](../app/layout.tsx):**

### Playfair Display — editorial headlines
- Переменная: `var(--font-playfair)`
- Weights: 500, 600, 700, 800
- Italic: поддерживается
- **Для:** H1 / H2 / цены / цитаты / editorial signature moments
- **Размеры:**
  - Hero price: 180-240px
  - H1: 92-120px
  - H2: 48-64px
  - H3: 32-40px
- **Letter-spacing:** -0.02em для крупных, -0.015em для средних
- **Line-height:** 0.95-1.05 для крупных, 1.1 для средних

### Inter — UI / body / buttons
- Переменная: `var(--font-inter)`
- Weights: 400, 500, 600, 700
- **Для:** body (17px/1.65), buttons, labels, nav
- **Подзаголовки-kicker:** 11-13px, uppercase, letter-spacing 0.22-0.28em

### JetBrains Mono — technical meta
- Переменная: `var(--font-mono)`
- Weights: 400, 500, 600
- **Для:** таймеры, domain labels (`.natalia.studio`), метаданные, "1 агент · 30 сек"
- Создаёт ощущение IDE / режиссёрского инструмента

## Spacing (editorial, не SaaS)

| Место | Desktop | Mobile |
|---|---|---|
| Между секциями | **160-200px** | 80-100px |
| Padding страницы | 48px | 24px |
| Внутри карточки | 48px | 28px |
| Между h1 и подзаголовком | 24-32px | 16-20px |

## Портрет / Логотип

**Портрет:** [public/assets/portrait.png](../public/assets/portrait.png) — единственный файл портрета в проекте. Не использовать `/natalia.png` — это дубль старой эры.

**Логотип:** текстовый — "natalia" в Playfair Display 600 + "AI · MARKETING STUDIO" в Inter 500 uppercase letter-spacing 0.12em.

## Signature moments — что делает natalia.com editorial

В каждой важной странице должна быть **одна** визуальная фишка, которую запоминают:
- `/` — hero-видео с 16 точками-агентами (abstract loop)
- `/pricing` — цена Playfair 200-240px как hero, не как деталь карточки
- `/gallery/[slug]` — drag-slider 75vh во весь экран, без контейнера
- `/tool` — empty state как art-piece с крупной цитатой Огилви

**Не пытайся добавить wow в каждый блок** — выбери один и усиль его.

## Запреты по визуалу

- Pill-кнопки с градиентом
- "Trusted by" логотип-полоса
- Сравнительная таблица с галочками ✓
- "01 / 02 / 03" нумерованные карточки
- FAQ `<details>` с "+/×"
- Эмодзи в заголовках (📎, ⚡, 🔥, 💎)
- Hero со стат-полосой ("47 млн / 20 / 16")
- Зачёркнутая цена со стрелкой →
- Gradient mesh на фоне
- Purple / pink / blue-violet tones

## Tone в копирайтинге

**Писать как:**
- "Запусти сама — или передай мне на 30 дней"
- "Два способа работать со мной"
- "Одна методология. Разная степень моего участия."

**Не писать как:**
- "Unlock your growth potential with AI"
- "Best-in-class marketing automation"
- "Game-changing results for your business"
- "Revolutionary / Cutting-edge / Disruptive"

Русский — главный язык. Английский — опционально под LA-аудиторию, но НЕ Russian-to-English machine-translate стиль.
