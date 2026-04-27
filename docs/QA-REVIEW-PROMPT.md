# Промт для внешнего AI-ревью

Скопируй всё что ниже разделителя `---` в новый чат с любым Claude (claude.ai, Cursor, Claude Code) или GPT-5. Он независимо оценит **идею, продукт, сайт, сценарий, экранные ассеты ролика** и даст отчёт.

---

# Задача — независимый аудит проекта natashabrovkina.com

Ты выступаешь внешним экспертом-консультантом. Я (предыдущая Claude-сессия) работала над этим проектом много часов параллельно с владелицей продукта Натальей Бровкиной. **Мы готовимся к записи YouTube-ролика. До запуска нужна независимая оценка по 5 областям.** Будь жёстким — не вежливым.

## 1. Контекст

**Что строится:** `natashabrovkina.com` — AI Marketing Studio. Open-source GitHub-репо + платная hosted-версия. 16 AI-агентов на методологии Огилви/Шварца/Хопкинса для SMB в России.

**Бизнес-стадия:** pre-launch, pre-revenue.
- Аудитория: TG 32, YouTube 4 (2 ролика сняты), LinkedIn 141, VK 220 (друзья), Twitter 0
- Платящих клиентов: 0
- MRR: 0
- Кейсы: MEDEA Dent ×3.4 заявок за 90 дней, Simbios Marketing +58% конверсии за 60 дней (оба — pre-launch консалтинг, не клиенты SaaS)
- Домен НЕ куплен (планируется natashabrovkina.com)

**Цель ближайшего месяца:** записать YouTube-ролик «Заменила маркетинг-команду 16 AI-агентами» → собрать **email-ы в waitlist + GitHub-stars**.

**ICP продукта:**
- Primary: владелец SMB 5-50М₽ в России, ведёт маркетинг сам
- Secondary: владелец малого digital-агентства 3-10 чел.
- Tertiary: маркетолог-фрилансер

**Тарифы:**
- Free — open-source GitHub-репо (свой Anthropic-ключ)
- Self-Serve — 2 990 ₽/мес — hosted UI (waitlist mode, не запущено)
- Personal — 49 000 ₽ разово — 30 дней личной работы (3 места/мес)

## 2. Все ссылки — открой каждую и оцени

### 🌐 GitHub-репо (публичные)

- **Продукт-сайт:** https://github.com/nibrovkina-cyber/natalia-com
  - README, package.json, app/page.tsx, app/tool/page.tsx, app/api/chat/route.ts
- **Open-source skills:** https://github.com/nibrovkina-cyber/natalia-marketing-department
  - README, LICENSE (MIT), 22 SKILL.md в `skills/`, 4 шаблона в `templates/`

### 💻 Localhost (если у тебя есть доступ к запуску — скажи Наталье запустить `npm run dev`)

- http://localhost:3000 — главная
- http://localhost:3000/pricing — 3 тарифа
- http://localhost:3000/tool — главный продукт-инструмент
- http://localhost:3000/tool?demo=medea — Студия demo (без API)
- http://localhost:3000/tool?demo=simbios — второй demo
- http://localhost:3000/method — методология
- http://localhost:3000/gallery — галерея
- http://localhost:3000/gallery/medea-dent-moscow — кейс с drag-slider
- http://localhost:3000/gallery/simbios-marketing-moscow — кейс агентства
- http://localhost:3000/waitlist — форма
- http://localhost:3000/opengraph-image — динамическая OG (1200×630)
- http://localhost:3000/robots.txt — AI-краулеры разрешены
- http://localhost:3000/sitemap.xml — все страницы

### 📁 Файлы для прямого чтения (абсолютные пути)

**Сценарий ролика (главный артефакт):**
- `c:/проект опенсорс/ai-marketing-natalia/content/video-script-v2.md` — production-ready скрипт 10:30
- `c:/проект опенсорс/ai-marketing-natalia/content/video-references-analysis.md` — анализ 4 виральных EN-роликов на основе которых построен сценарий
- `c:/проект опенсорс/ai-marketing-natalia/content/youtube-description.md` — описание + pinned comment + thumbnails A/B + stock-ответы
- `c:/проект опенсорс/ai-marketing-natalia/content/launch-checklist.md`

**Демо-данные для ролика (что появится на экране):**
- `c:/проект опенсорс/ai-marketing-natalia/public/demo/medea-after.html` — pre-recorded AI-лендинг MEDEA
- `c:/проект опенсорс/ai-marketing-natalia/public/demo/simbios-after.html` — для Simbios
- `c:/проект опенсорс/ai-marketing-natalia/public/demo/medea-brand-memory.json` — Brand Memory с маркерами `[UNVERIFIED]`
- `c:/проект опенсорс/ai-marketing-natalia/public/demo/agent-responses/medea/copy.md` — Strategy 1 demo
- `c:/проект опенсорс/ai-marketing-natalia/public/demo/agent-responses/medea/proposal.md` — Strategy 4 demo
- `c:/проект опенсорс/ai-marketing-natalia/public/demo/agent-responses/medea/seo.md`
- `c:/проект опенсорс/ai-marketing-natalia/public/demo/agent-responses/medea/funnel.md`
- `c:/проект опенсорс/ai-marketing-natalia/public/demo/agent-responses/medea/email.md`

**Open-source SKILL.md (что покажет в ролике на 2:50):**
- `c:/проект опенсорс/natalia-marketing-department/skills/natalia-copy/SKILL.md`
- `c:/проект опенсорс/natalia-marketing-department/skills/natalia-positioning/SKILL.md`
- `c:/проект опенсорс/natalia-marketing-department/skills/natalia-proposal/SKILL.md`
- `c:/проект опенсорс/natalia-marketing-department/skills/natalia-funnel/SKILL.md`
- `c:/проект опенсорс/natalia-marketing-department/skills/natalia-brand-voice/SKILL.md`

**Brand-guidelines:**
- `c:/проект опенсорс/ai-marketing-natalia/brand_assets/brand-guidelines.md`
- `c:/проект опенсорс/ai-marketing-natalia/CLAUDE.md` — правила для Claude Code

**Безопасность:**
- `c:/проект опенсорс/ai-marketing-natalia/app/api/chat/route.ts` — валидация + BYOK strict
- `c:/проект опенсорс/ai-marketing-natalia/app/api/waitlist/route.ts` — Telegram-bot integration
- `c:/проект опенсорс/ai-marketing-natalia/app/lib/rate-limit.ts` — Vercel KV distributed rate-limit

**SEO/AI-discoverability:**
- `c:/проект опенсорс/ai-marketing-natalia/app/robots.ts`
- `c:/проект опенсорс/ai-marketing-natalia/app/sitemap.ts`
- `c:/проект опенсорс/ai-marketing-natalia/app/layout.tsx` — JSON-LD schema
- `c:/проект опенсорс/ai-marketing-natalia/app/opengraph-image.tsx`

## 3. 5 областей оценки

### 🎯 Область 1 — Идея (бизнес-модель)

Оцени **концепт**:

- Кому это нужно? ICP описан как 3 разных сегмента (SMB-владелец, agency-owner, фрилансер). Не переразмыто ли позиционирование?
- Цена 2 990 ₽/мес против ChatGPT Plus 1 800 ₽ (с GPTs, projects, web search) — чем продукт реально отличается с точки зрения **покупателя**, не с т.зрения автора?
- Personal-тариф 49 000 ₽ × 3 места/мес = 147К/мес — реалистична ли модель для фрилансера-соло?
- Open-source MIT — что мешает первому форку зеркалить продукт под другим брендом? Стоит ли AGPL?
- «Снять YouTube-ролик чтобы собрать email-ы в waitlist» с 4 подписчиками на YT и 32 в TG — реалистично ли?
- Конкуренты: ChatGPT, Claude Pro, Jasper, Copy.ai, Tilda+AI, Сезам.ИИ. Где moat?

**Дай прямой ответ:** **«Идея жизнеспособна»** / **«Нужны корректировки X, Y, Z»** / **«Нужен пивот в направление...»**

### 🛠 Область 2 — Продукт (`/tool` + 16 агентов)

Запусти dev-сервер (или попроси Наталью). Открой:

1. **`/tool`** — пустое состояние
2. **`/tool?demo=medea`** — Студия с MEDEA
3. Введи `medeadent.tilda.ws` в форму Студии вручную → должен подгрузить demo без API
4. **`/tool?demo=medea`** + клик на Copy/Proposal/SEO/Funnel/Email → отправь любое сообщение → должен подгрузить markdown без API

Оцени:

- UX интерфейса: понятно ли с первого взгляда что делать?
- Empty state с цитатой Огилви: работает или загромождает?
- Качество pre-recorded ответов на MEDEA — соответствуют ли SKILL.md? Не выдуманы?
- Brand Memory: концепт хороший. Но `[UNVERIFIED]` поля — критика: 70% полей помечены, что означает реальная ценность Brand Memory падает.
- Студия: 16-сек fake-loading + готовый HTML — это работает или зритель ролика заметит подвох?
- Mobile UX (375×812) — все страницы читаемы? Sidebar превращается в горизонтальный scroll корректно?

### 🎨 Область 3 — Сайт (визуальное качество)

Открой все страницы. Оцени **с точки зрения первого впечатления холодного зрителя ролика**:

- **Главная** — Hero «Удвоила выручку 20 малых бизнесов. Без команды.» — сильно или слабо для холодного RU-зрителя?
- **Эссе на главной** — длинный editorial текст с drop-cap, 6 параграфов. Работает на главной или убивает конверсию?
- **`/pricing`** — 3 тарифа честные. Но **6 testimonials** с инициалами (МК, АС, ЕП...) — это плейсхолдеры. Должны быть удалены или маркированы как fake до получения реальных?
- **`/gallery/medea-dent-moscow`** — drag-slider до/после. Это **главный wow-артефакт ролика**. Достаточно ли он быстрый/плавный/виральный?
- **`/method`** — длинный editorial. На отдельной странице ОК или избыточно?
- **OG-image** — `/opengraph-image` — premium ли стиль для шеринга в Telegram/X?
- **Mobile** — проверь 5 ключевых страниц на 375×812. Где ломается?

### 📝 Область 4 — Сценарий ролика

Прочитай файл `content/video-script-v2.md`. Это сценарий 10:30 на основе анализа 4 виральных EN-роликов (Greg Eisenberg, Amir, AI Marketing Team, $0 vs $5-10K Tool — анализ в `content/video-references-analysis.md`).

Оцени:

- **Hook (0:00-0:18)** — drag-slider до/после в первые 3 секунды без слов + цифра «380К vs 2 990 ₽». Это сильный hook для холодного RU-YouTube viewer?
- **Demo блок (0:18-1:45)** — есть ли логические дыры? Зритель поймёт что показывается?
- **5 стратегий (2:30-8:30)** — каждая 60-90 сек:
  1. Скачай 21 SKILL.md
  2. Brand Memory
  3. Студия за 60 секунд
  4. Pre-recorded ответы для холодных продаж (49К аудит)
  5. Open-source как лид-магнит
  - Достаточно ли actionable «как это сделать на этой неделе»?
  - Какая самая слабая? Какую заменить?
- **Monetization frame (8:30-9:30)** — «49 000 ₽ за один аудит, миллион в месяц с 5 клиентов». Правдоподобно для RU SMB?
- **CTA (9:30-10:30)** — 3 CTA (GitHub / waitlist / комментарии). Engagement loop рабочий?

**Дай прямой ответ:** «Записывай как есть» / «Перепиши блок X» / «Сценарий не сработает потому что...»

### 🎥 Область 5 — Экранные ассеты для записи

Сценарий показывает на экране **минимум 30 разных кадров**. Полный shot-list в [content/video-script-v2.md](content/video-script-v2.md) (раздел «Production Checklist»).

Проверь визуально что **каждый артефакт** который попадёт в YouTube-ролик выглядит достойно:

- [ ] Drag-slider /gallery/medea-dent-moscow — handle двигается плавно, нет lag
- [ ] /tool?demo=medea — Студия рендерится корректно ДО/ПОСЛЕ
- [ ] medea-after.html — лендинг профессионально выглядит, нет broken images, нет lorem-ipsum
- [ ] simbios-after.html — то же
- [ ] Все 5 markdown-ответов агентов — содержат реальную методологию, заканчиваются блоком «🧠 Почему я так сделал»
- [ ] medea-brand-memory.json — структура читабельна для зрителя, `[UNVERIFIED]` маркеры явные
- [ ] OG-image — премиум editorial для шеринга
- [ ] Все pages mobile-friendly (375×812 и 390×844 для iPhone 12-14)
- [ ] Console errors на каждой странице — должно быть 0 errors
- [ ] Lighthouse на главной — Performance / SEO / Accessibility / Best Practices score?
- [ ] Network errors — особенно 404 на favicon, OG, fonts

## 4. Формат отчёта от тебя

```markdown
## Idea — Область 1
- Оценка концепта: [жизнеспособна / нужны правки / пивот]
- Главный риск: ...
- Что бы я изменил: ...

## Product — Область 2
### Critical (блокеры запуска)
1. ...

### Important
1. ...

### OK (работает)
- ...

## Site — Область 3
[то же 3-уровневое деление]

## Script — Область 4
- Hook сила: 1-10
- Самый слабый блок: ...
- Самый сильный блок: ...
- Конкретные правки: ...

## Recording assets — Область 5
[конкретные баги по shot-list]

## Топ-5 действий перед записью ролика
1. ...
2. ...
3. ...
4. ...
5. ...

## Что бы я сделал по-другому если бы строил с нуля
[свободный комментарий]

## Прогноз ролика
- Ожидаемые просмотры за 30 дней (диапазон): ...
- Ожидаемые waitlist-emails: ...
- Главный риск ролика: ...
```

## 5. Что мне НЕ нужно

- ❌ Архитектурные refactor-предложения (1500-line `tool/page.tsx` отложен)
- ❌ «Используйте Y вместо X» (стэк зафиксирован: Next.js, Anthropic SDK, Vercel)
- ❌ Комплименты или вежливость
- ❌ Длинные эссе на каждый пункт — короткие конкретные ответы

## 6. Время на проверку

30-45 минут на полный прогон. Если найдёшь критичный блокер — останавливайся и пиши, не доделывай остальное.

Спасибо. Жди критики, не комплиментов. Цель — **поймать проблемы до публикации ролика**.
