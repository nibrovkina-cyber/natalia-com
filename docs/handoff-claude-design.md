# Claude Design → Content Factory · handoff для коворка

Документ для **коворка**: как использовать Claude Design и готовые промты
(отработанные на natalia.com) для создания дизайна «Контент Завода».

---

## ⚡ TL;DR

1. Заходи на **https://claude.ai/design**
2. Открой нужный промт ниже → **копируй целиком** → вставляй в Claude Design
3. Прикрепи один файл (портрет автора или скриншот референса)
4. Получи HTML → скачай zip → передай на порт в React

**3 готовых промта ниже:** pricing · case study · studio.

---

## 🔧 Workflow (отработанный, экономит токены)

### Шаг 1 — Подготовка
В Claude Design: `New prototype` → `High-fidelity` → `No design system`
(систему создадим промтом, не встроенной) → придумай имя проекту.

### Шаг 2 — Прикрепление
Прикрепляй **минимум**. Claude Design знает Lenny's, Kinfolk, Pentagram,
Arc, v0.dev по названиям — картинки дают только +15% точности, а
запутывают чаще чем помогают.

**Прикрепить нужно:** только портрет автора (если hero-секция персональная).

### Шаг 3 — Промт
Вставляй промт ЦЕЛИКОМ. Не редактируй по ходу. Один промт = одна страница.

### Шаг 4 — Questionnaire
Claude Design спросит 5-7 вопросов. **Отвечай все** — это экономит 3-4
итерации потом. Не пропускай кнопкой «skip».

### Шаг 5 — Tweaks panel
После первой версии Claude Design даст слайдеры (палитра, размер hero,
spacing, font). **Играйся слайдерами**, не пиши новые промты. Экономит
60-80% токенов.

### Шаг 6 — Микро-правки
Если что-то конкретное не нравится: **клик по элементу** → комментарий →
send. Не переделывай всю страницу.

### Шаг 7 — Экспорт
`Share` → `Download as zip` → передай разработчику.

---

## 📋 ПРОМТ 1 — Pricing (отработан на natalia.com)

**Референсы:** Lenny's Newsletter, Stratechery, Substack Pro, Pentagram case studies.
**Signature moment:** цена Playfair 200-240px как hero.

```
Контекст: pricing-страница для [НАЗВАНИЕ] — [ОПИСАНИЕ ПРОДУКТА].
Автор — [ИМЯ АВТОРА] (портрет прикреплён). Два тарифа:

ТАРИФ 1 — «[НАЗВАНИЕ]» — [ЦЕНА]/мес
  [3 строки что внутри]

ТАРИФ 2 — «[НАЗВАНИЕ]» — [ЦЕНА] разово
  [3 строки что внутри, более премиум]

Целевая: [КТО, ВОЗРАСТ, КОНТЕКСТ].

РЕФЕРЕНСЫ (ты знаешь эти сайты):
— Lenny's Newsletter — solo-эксперт, crisp typography, pricing
— Stratechery (Ben Thompson) — B2B editorial тон
— Substack Pro — как показывать тарифы без таблицы
— Pentagram case studies — подача с редакторским нарративом

НЕ референсы: Stripe, Linear, Vercel, Notion, Tilda, типовой SaaS.
Aesop и Kinfolk — тоже НЕ (косметика/fashion, не наша ниша).

BRAND SYSTEM (жёстко):
— Цвета ТОЛЬКО: navy #0D1B2A, gold #C8B79C, cream #F5F3EF,
  mint #5BBFA5, steel #6B7A8F
— Шрифты: Playfair Display для headlines/цен, Inter body/UI,
  JetBrains Mono для технических меток
— Воздух: 160-200px между секциями на desktop
— Русский, редакционный, без маркетингового жаргона

SIGNATURE MOMENT:
Цена Playfair 200-240px как hero страницы. «[ЦЕНА]/мес» почти
весь первый экран. Под ней коротко — что это. Остальное — благородный фон.

СТРУКТУРА:
1. Sticky nav: logo + CTA
2. Hero: kicker «Два способа работать», заголовок Playfair 96-120px
   «[ДВЕ ОПЦИИ ОДНОЙ ФРАЗОЙ]»
3. Первая цена Тариф-1: Playfair 220px на cream. Абзац-эссе 60 слов.
   3-4 буллета БЕЗ ✓. Кнопка-underline.
4. Редакционный разделитель: цитата классика Playfair italic 32px
5. Вторая цена Тариф-2: navy фон, Playfair 220px gold.
   Справа портрет автора 72px. Абзац-эссе. Кнопка underline.
6. БЕЗ сравнительной таблицы. Два вертикальных столбца эссе:
   «Если у тебя есть 2 часа в неделю» vs «Если времени нет».
7. FAQ: одна вертикальная колонка, вопрос Playfair italic 22px,
   ответ Inter 14px/1.7 steel. БЕЗ details/summary.

ЗАПРЕТЫ: pill-кнопки с градиентом, trusted-by полоса, Most popular,
сравнительная таблица с ✓, 01/02/03 карточки, details-summary FAQ,
эмодзи, стат-полоса, зачёркнутая цена, gradient mesh,
purple/pink/blue-violet, card-grid 1:1.

MOBILE: Playfair 96px на mobile. Колонки → одна.

TWEAKS PANEL: palette, hero size, price size (180-260px),
section rhythm (120-240px), FAQ layout, CTA style.

OUTPUT: один файл pricing-v3.html, один сильный вариант.
```

---

## 📋 ПРОМТ 2 — Case Study (отработан на /gallery/medea-dent-moscow)

**Референсы:** Kinfolk Magazine, Pentagram case studies, Porto Rocha.
**Signature moment:** гигантская метрика Playfair 280px + drag-slider 85vh.

```
Контекст: страница-кейс разбора [ТИП КЛИЕНТА/КЕЙСА] в галерее
[САЙТ]. Бизнес-клиент: [ОПИСАНИЕ]. Основная функция страницы —
быть социальным доказательством ("вот что [ПРОДУКТ] сделал с реальным бизнесом").

Цель: страница которую можно показать потенциальному клиенту и
он скажет "я хочу такое же".

Подача — editorial-уровня Kinfolk / Pentagram:

1. HERO ВМЕСТО БЕЙДЖЕЙ И МЕТРИК
   Не нужно "Ниша / Город / Дата" горизонтально.
   Вместо: одна гигантская цифра (например "↑ 3,4×")
   Playfair 200-280px на cream-фоне, под ней мелко
   "[что означает цифра] — после [ПРОДУКТ]".
   Остальная информация (дата, ниша, город) —
   микро-текстом сбоку, не главное.

2. DRAG-SLIDER КАК ЦЕНТРАЛЬНАЯ СТАТУЯ
   Занимает почти весь viewport (85vh). Без карточки-контейнера.
   Фулскрин. Единственная видимая интерактивность на странице.

3. SCROLL-REVEAL STORY
   После слайдера — вертикальный narrative как статья:
   — "До" (короткое эссе о проблеме, 2-3 абзаца)
   — "Что изменили" (5 пунктов как нумерованные micro-essays
     с римскими цифрами I, II, III)
   — "Почему это работает" (методология — каждый принцип с
     цитатой автора pull-quote)

4. ТИПОГРАФИКА УРОВНЯ ЖУРНАЛА
   — Drop-cap в начале раздела
   — Цитаты классиков крупным italic в центре
   — Номера разделов римскими (I, II, III)
   — Line-height 1.7+ для эссе

5. CTA НЕ КАК CTA
   Вместо "Хочешь такое?": "— [ИМЯ АВТОРА]" курсивом как подпись,
   и ниже "если хочешь обсудить свой кейс, пиши в Telegram".

BRAND SYSTEM:
— Navy / gold / cream / mint палитра
— Playfair + Inter + JetBrains Mono
— 160-200px между секциями

Output: один файл case-[slug].html. Не делай 3 варианта. Один сильный.
```

---

## 📋 ПРОМТ 3 — Studio (отработан на /tool)

**Референсы:** Arc Browser, Linear changelog, v0.dev, Replit ghostwriter.
**Signature moment:** empty state как art-piece + loader с ротацией цитат.

```
Контекст: главный рабочий инструмент [ПРОДУКТ]. Пользователь
вставляет [INPUT], нажимает "Запустить", видит как N AI-агентов
работают, получает [OUTPUT].

Референсы:
— Arc Browser (arc.net) — tech с личностью, anti-corporate
— Linear.app changelog — quality > quantity
— Replit ghostwriter — код как искусство
— v0.dev от Vercel — generative AI с эстетическим голосом
— Figma's blog — минимализм + subtle motion

Архитектура:
— Top chrome 56px navy-2
— Split grid 420px + 1fr
— Form pane: input, tabs, brief textarea, mode cards, submit
— Preview pane: tabs, domain label, frame container
— Loader overlay: progress + N agent list

ЧТО ПОДНЯТЬ НА EDITORIAL-TIER:

1. EMPTY STATE ПРЕВЬЮ КАК ART-PIECE
   Целая композиция на весь preview pane:
   — Крупная Playfair-цитата типа "[ЦИТАТА КЛАССИКА]"
     (Огилви, 1963 / другой классик)
   — Под цитатой N мелких точек-меток в сетку 8×2 (если N=16),
     каждая — имя агента (серая opacity 0.3), hover — задача
   — Внизу monospace-строка "ожидает брифа..."
   ОБУЧАЕТ о продукте до того как пользователь начнёт работать.

2. LOADER КАК ТЕАТРАЛЬНАЯ СЦЕНА
   Пока агенты работают внизу в узкой строке, в центре preview-pane
   крупно появляются ЦИТАТЫ связанные с текущим активным агентом:
   — [Агент-1]: "[цитата]"
   — [Агент-2]: "[цитата]"
   Смена цитаты синхронна со сменой агента. 10+ цитат в пуле.

3. FORM PANE — РЕДАКЦИОННЫЕ АКЦЕНТЫ
   Input: подсказка "[инструкция]" микро-италиком над полем.
   Chips: не pill-кнопки. Маленькие tab-underlined как в inDesign.
   Mode cards: каждая своего характера (Solo минимализм, Team
   плотная, Parallel split). Три разные личности.

4. ACTION-BAR ПОСЛЕ УСПЕХА
   Не 4 одинаковых кнопки. Вместо:
   — "Опубликовать" — крупная gold primary слева
   — Скачать / Правки / Ещё — text-links compact справа
   Visual hierarchy.

5. ТИПОГРАФИКА: JETBRAINS MONO АГРЕССИВНЕЕ
   Для всех UI-элементов с числом: "1 агент · ~30 сек",
   "N/16" в loader, "16 агентов · 52 сек" после успеха.
   Ощущение IDE для [ПРОДУКТ], не веб-формы.

6. РАССКАЗ БЕЗ КНОПОК
   После генерации, под iframe — одна строка italic:
   "Готово за 52 секунды. 16 агентов. Методология X.
   Это — итерация 1 из бесконечности."

BRAND SYSTEM:
— Navy / gold / cream / mint
— Split-screen structure
— Mobile: form sticks, preview stacks below

Output: один файл studio-v2.html.
```

---

## 🏭 Адаптация под «Контент Завод»

Если продукт — **контент-фабрика**, а не маркетинг-студия, замените в промтах:

### 1. Контекст и ценности
| Натальин контекст | → | Контент-завод контекст |
|---|---|---|
| «AI-маркетинг студия» | → | «AI контент-фабрика» |
| «16 агентов на методологии Ogilvy/Schwartz/Hopkins» | → | «[N] агентов на [ВАША МЕТОДОЛОГИЯ]» |
| «Огилви / Шварц / Хопкинс» | → | классики журналистики: Hemingway / White / Strunk, либо СMO / контент-гуру — [АРНДТ, РАЙС, ТИМ ФЕРРИС] |
| «AI-команда из копирайтера, SEO, таргетолога» | → | «AI-команда из writer / editor / fact-checker / SEO / illustrator» |

### 2. Структура агентов
Замени 16 маркетинг-агентов на агентов контент-завода. Пример:
1. Researcher (источники и факты)
2. Writer (текст)
3. Editor (структура)
4. Fact-checker (проверка)
5. SEO specialist (оптимизация)
6. Headline writer (заголовок)
7. Subhead writer (подзаголовки)
8. Summariser (тезисы)
9. Illustrator briefer (визуал)
10. Social adapter (посты)
11. Newsletter adapter (рассылка)
12. Video scriptwriter (сценарий)
13. Distribution planner
14. Analytics setter
15. Translator (многоязычие)
16. Quality reviewer (финал)

### 3. Signature метрика для Hero
| Natalia | Контент-завод |
|---|---|
| «3,4× заявок в месяц» | «42 статьи в месяц» / «3,2× органический трафик» / «1 бриф → 16 форматов» |

### 4. Цитаты классиков в loader (замени на):
- **Hemingway:** «Первый черновик всегда дрянь.»
- **Strunk & White:** «Исключайте ненужные слова.»
- **William Zinsser:** «Пиши так, будто говоришь с одним человеком.»
- **Ann Handley:** «Хороший контент говорит с человеком, не с аудиторией.»

### 5. Editorial hero-заголовок
Формула: `[ДЕЙСТВИЕ] + [ЦИФРА] + [РЕЗУЛЬТАТ]. [Italic дополнение].`

Примеры:
- Natalia: «Удвоила выручку 20 малых бизнесов. *Без команды.*»
- Контент-завод: «Произвела 847 статей для 23 компаний. *Без редакции.*»
- Или: «42 статьи в месяц. *Один автор в штате.*»

### 6. Что НЕ менять (оставить как есть)
- Дизайн-токены (navy/gold/cream/mint работают для любого премиум-продукта)
- Playfair + Inter + JetBrains Mono (универсальная тройка)
- Editorial-принцип (160-200px между секциями, Playfair для heroes, Inter для body)
- Запреты (SaaS-клише, pill-кнопки с градиентом, «01/02/03» карточки и т.п.)

---

## 📁 Ссылки на исходники

Если коворку нужны живые примеры всех паттернов:

- **Pricing:** http://localhost:3000/pricing
- **Case study:** http://localhost:3000/gallery/medea-dent-moscow
- **Studio:** http://localhost:3000/tool
- **Метод (longread):** http://localhost:3000/method
- **Home:** http://localhost:3000/

Код открытый, паттерны можно скопировать:
- [app/page.tsx](../app/page.tsx) — hero + эссе + 4×4 agents grid
- [app/method/page.tsx](../app/method/page.tsx) — longread с pull-quotes
- [app/gallery/[slug]/page.tsx](../app/gallery/[slug]/page.tsx) — metric hero + drag-slider
- [app/pricing/page.tsx](../app/pricing/page.tsx) — два hero-цена 240px + эссе-столбцы
- [brand_assets/brand-guidelines.md](../brand_assets/brand-guidelines.md) — полная дизайн-система

---

## ⚠ Важные правила (чтобы не потерять качество)

1. **Один промт = одна страница.** Не смешивай pricing + case study в одном промте.
2. **Tweaks panel > новые промты.** Если что-то не нравится — двигай слайдер.
3. **Inline-комменты на элементе.** Кликаешь конкретный блок → комментарий → send.
4. **Вопросы questionnaire — заполнять все.** Это не формальность, а контекст.
5. **Не делай 3 варианта.** Напиши «один сильный». 3 варианта = 3 средних.
6. **Mobile — отдельным промтом или tweakом.** Не уменьшать desktop.
7. **После экспорта — скриншот-чек.** Перед портом проверить визуально.

---

## 📞 Если вопросы

Все решения (почему так, а не иначе) — в [`CLAUDE.md`](../CLAUDE.md) и
[`brand_assets/brand-guidelines.md`](../brand_assets/brand-guidelines.md).

Главный принцип проверки: **Kinfolk или Stripe?** Если похоже на Stripe —
переделываем. Если похоже на Kinfolk / Lenny's / Pentagram — оставляем.
