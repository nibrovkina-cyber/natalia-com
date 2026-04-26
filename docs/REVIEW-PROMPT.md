# Промт для внешнего код-ревью (другая Claude-сессия)

Скопируй всё что ниже разделителя `---` и вставь в новый чат с Claude (web, Cursor, Claude Code, или другой Claude-инстанс). Он проверит проект независимо и даст честный отчёт.

---

# Задача — независимый аудит продукта natashabrovkina.com

Ты выступаешь внешним ревьюером. Я (предыдущая Claude-сессия) работала над этим проектом много часов и могу быть слишком оптимистична. **Твоя задача — найти то, что я пропустила, переоценила или замяла.** Будь жёстким — не вежливым.

## 1. Контекст продукта

**Что строим:** `natashabrovkina.com` — AI Marketing Studio. Open-source на GitHub + платная hosted-версия. 16 AI-агентов на методологии Огилви / Шварца / Хопкинса для SMB в России.

**Бизнес-стадия:** pre-launch, pre-revenue.
- Аудитория: TG 32 / YouTube 4 (2 видео сняты) / LinkedIn 141 / VK 220 (друзья) / Twitter 0
- Платящих клиентов: 0
- MRR: 0
- Кейсы: MEDEA Dent ×3.4 заявок за 90 дней, Simbios Marketing +58% конверсии за 60 дней (оба — pre-launch консалтинг, не клиенты SaaS)
- Домен НЕ куплен (планируется natashabrovkina.com)

**Цель ближайшего месяца:** снять YouTube-ролик «Как заменить маркетинговый отдел AI-агентами» с демо на стоматологии MEDEA. **Цель ролика — собрать email-ы в waitlist, не продажи.**

**ICP продукта:**
- Primary: владелец SMB 5-50М₽ в России, ведёт маркетинг сам
- Secondary: владелец малого digital-агентства 3-10 чел., хочет масштабироваться без найма
- Tertiary: маркетолог-фрилансер, хочет AI как leverage

**Тарифы:**
- Free — open-source GitHub-репо со skills (нужен свой Anthropic-ключ)
- Self-Serve — 2 990 ₽/мес — hosted UI (waitlist mode, не запущено)
- Personal — 49 000 ₽ разово — 30 дней моей личной работы (3 места/мес)

## 2. Где код — два публичных GitHub-репо

```
1. nibrovkina-cyber/natalia-com
   Local: c:/проект опенсорс/ai-marketing-natalia/
   Стэк: Next.js 16.2.4 (Turbopack) + React 19 + TypeScript 5
   API: Anthropic SDK 0.90 + Firecrawl
   Auth: BYOK (пользователь вставляет свой ключ в localStorage)
   Hosting: пока localhost, готов к Vercel deploy

2. nibrovkina-cyber/natalia-marketing-department
   Local: c:/проект опенсорс/natalia-marketing-department/
   Содержимое: 22 SKILL.md (16 функциональных агентов + 6 meta) + 4 HTML-template
   License: MIT
   Назначение: open-source библиотека skills для использования с Claude Code/Cursor/ChatGPT
```

## 3. Структура продукта-сайта

### Страницы (`app/`)
- `app/page.tsx` — главная (hero, эссе с drop-cap, 16 агентов editorial-индекс, кейсы, two-ways-grid, FAQ, CTA)
- `app/pricing/page.tsx` — 3 тарифа + матрица сравнения + 6 testimonials + 4-week phases (для Personal) + risk-items + FAQ
- `app/tool/page.tsx` — главный продукт. Sidebar с 16 агентами, чат, Brand Memory форма, Team Mode (parallel queries), Студия (URL → HTML лендинг). 1500+ строк.
- `app/method/page.tsx` — методология Огилви/Шварца/Хопкинса
- `app/gallery/page.tsx` — галерея кейсов
- `app/gallery/[slug]/page.tsx` — кейс-детали с drag-slider до/после
- `app/waitlist/page.tsx` — форма waitlist (имя/email/telegram/бизнес)
- `app/api/chat/route.ts` — endpoint к Anthropic Sonnet 4.6 + Firecrawl scrape (rate-limit 5/день для не-BYOK)
- `app/api/waitlist/route.ts` — приём waitlist, console.log + опц. Telegram bot + опц. webhook
- `app/opengraph-image.tsx` — динамическая OG (1200×630, ImageResponse edge runtime)
- `app/layout.tsx` — корневой layout, шрифты Inter / Playfair / JetBrains Mono через next/font
- `app/globals.css` — design tokens (warm-AI палитра по умолчанию + navy editorial альтернатива)

### Компоненты (`app/components/`)
- `SiteNav.tsx` — sticky nav с портретом, light/dark variant, mobile-CTA
- `SiteFooter.tsx` — navy footer
- `Kicker.tsx` — editorial supertitle
- `Reveal.tsx` — scroll-reveal wrapper
- `WaitlistForm.tsx` — форма
- `AgentNetwork.tsx` — animated canvas с 16 агентами (НЕ интегрирована)
- `ui/` — Button, Tag, SectionHead, PricingCard, TestimonialCard, ProcessPhase, RiskItem (cva-based shadcn-style)

### Контент (`content/`)
- `gallery.json` — 2 кейса с метаданными
- `video-script.md` — детальный сценарий 10-12 мин ролика (фокус на Simbios, hook→problem→demo→price→CTA)
- `youtube-description.md` — описание + pinned comment + thumbnails A/B + stock-ответы
- `article-vc.md`, `article-dzen.md` — статьи для VC.ru и Дзен
- `launch-checklist.md` — чек-лист запуска

### Demo-данные (`public/demo/`)
- `medea-after.html`, `simbios-after.html` — pre-recorded AI-лендинги
- `medea-brand-memory.json` — Brand Memory MEDEA с маркерами `[UNVERIFIED]` для непроверенных полей
- `agent-responses/medea/` — 5 markdown ответов pre-recorded (copy.md, proposal.md, seo.md, funnel.md, email.md)
- `gallery/medea-dent-moscow/before.png`, `gallery/simbios-marketing-moscow/before.png` — скриншоты ДО

### Brand assets (`brand_assets/`)
- `portrait.png` — фото Натальи (используется в SiteNav)
- `brand-guidelines.md` — voice + палитра + типографика

### Скрипты (`scripts/`)
- `screenshot.mjs` — Puppeteer screenshot
- `screenshot-viewport.mjs` — viewport-only
- `import-claude-design.mjs` — импорт Claude Design v3 ZIP с автозаменой токенов в `globals.css`
- `rename-domain.mjs` — массовая замена домена (использовался для natalia.studio → natashabrovkina.com)
- `agents/wordstat-runner.mjs` — Playwright + persistent auth для Wordstat (не использован — нужен Yandex логин)
- `agents/competitors-runner.mjs` — own-site + SimilarWeb (блочит headless) + vc.ru (парсер сломан)
- `generate-gallery-screenshots.ts` — генератор screenshots для кейсов

### Deploy (`vercel.json` + `docs/DEPLOY-CHECKLIST.md`)
- vercel.json — fra1 region, security headers, redirects /medeadent → /gallery/medea-dent-moscow
- Пошаговая инструкция по REG.RU + Vercel + DNS + Telegram-bot

### Документация (`docs/`)
- `DEPLOY-CHECKLIST.md` — деплой
- `README.md` — основная докумен
- `handoff-claude-design.md`, `handoff-for-coworking.md` — рабочие документы
- `claude-design-prompts.md` — Claude Design промпты
- `references/transcripts/` — транскрипты Nate Herk + Claude Design + Claude Skills видео

### CLAUDE.md + AGENTS.md
- `CLAUDE.md` — правила для Claude Code (скриншот workflow, design system, запреты SaaS-клише, shared компоненты, screenshot-loop)
- `AGENTS.md` — `@AGENTS.md` ссылается на `node_modules/next/dist/docs/` (Next.js 16 имеет breaking changes)

## 4. Что было сделано — последние 5 коммитов

```
8397bdb feat: MEDEA demo-pack + Vercel deploy готовность
ad78c6e feat: dynamic OG-image + Twitter card + metadataBase
9a173d7 feat: mobile fixes + Studio magic URL + honest /pricing strips
2e23b59 chore: rename natalia.studio/com → natashabrovkina.com everywhere
ef9775c feat(pricing): waitlist для Self-serve (честный CTA вместо trial)
37b2404 feat: initial commit — natalia.com Next.js site
```

Конкретные фичи:
- Замена домена в 94 местах в 35 файлах (natalia.studio/com → natashabrovkina.com)
- Magic URL в Студии (`medeadent.tilda.ws` → подгрузка готового HTML без API)
- Demo-mode chat: pre-recorded markdown ответы для 5 агентов через `?demo=medea`
- Mobile-фиксы (subtitle прячется на <640px, CTA «Студия →» вместо обрезанного «Открыть ин...», hero clamp 34px вместо 48px)
- Pricing risk-items больше не врут про «trial 7 дней» / «возврат 14 дней»
- OG-image: editorial 1200×630 с cream/ink/accent + Twitter card
- Brand Memory MEDEA с честными `[UNVERIFIED]` маркерами

## 5. Что НЕ сделано (известные блокеры)

- ❌ Домен не куплен (мне нужно купить natashabrovkina.com на REG.RU за ~990 ₽)
- ❌ На Vercel не задеплоено (нужен мой Vercel-аккаунт)
- ❌ MEDEA Brand Memory имеет много `[UNVERIFIED]` полей (нужны реальные цифры от клиники)
- ❌ Pre-recorded ответы только для 5 из 16 агентов на MEDEA
- ❌ Wordstat-runner написан, но не использован (нужен мой Yandex-логин)
- ❌ Apify + Perplexity API-ключи в `c:/geo-content-system/.env` НЕ подключены к `app/api/chat/route.ts`
- ❌ Нет реальных платящих клиентов и аудитории — продукт строится «в пустоту»
- ❌ vc.ru parser сломан в `competitors-runner.mjs` (вернул 0 на tilda.cc)
- ❌ SimilarWeb блочит headless Playwright даже со stealth (CloudFront 403)
- ❌ AgentNetwork.tsx написан, но не интегрирован в hero
- ❌ Промпты 16 агентов дублируются — inline в `app/tool/page.tsx` (production) и в `natalia-marketing-department/skills/*.md` (open-source). Не синхронизированы. Production beднее (нет RU-context, нет showcase из SKILL.md)

## 6. Что мне нужно от тебя — конкретные вопросы

### Стратегические (важнее всего)

1. **Бизнес-модель**: ICP пишет «владелец SMB 5-50М₽» + «владелец малого агентства» + «маркетолог-фрилансер». Это 3 разных ICP с разными болями и каналами. **Не переразмыто ли позиционирование?**

2. **Цена 2 990 ₽/мес** против ChatGPT Plus $20 (~1 800 ₽). У ChatGPT Plus теперь GPTs, projects, web search. **Чем продукт реально отличается с т.зрения покупателя**, не с т.зрения автора?

3. **Personal-тариф 49 000 ₽ разово** — описан как «30 дней моей личной работы». Но проект создан соло-фрилансером без штата. **3 места в месяц × 49К = 147К/мес — это весь возможный доход.** Реалистична ли модель? Может правильнее productize (брать 5 раз дороже за разовую установку, а потом подписку)?

4. **Open-source стратегия** — оба репо публичные. Free пользователи могут self-host через npm + свой ключ. Нет watermark, нет лимитов. **Что мешает первому форку зеркалить продукт под другим брендом?** Нужен AGPL вместо MIT?

5. **«Снять YouTube-ролик чтобы собрать email-ы в waitlist»** — типичная стратегия маленького авторского контента. **Реалистично ли с 4 подписчиков на YouTube + 32 в TG получить виральность?** Какие есть проверенные паттерны для launch с нуля? (Pieter Levels, Greg Eisenberg)

### Технические

6. **Промпты 16 агентов дублируются в двух местах.** Какие риски и как правильно решить? (extract в shared package? читать SKILL.md из файлов на runtime? удалить inline и оставить только SKILL.md?)

7. **Demo-mode** — `/tool?demo=medea` грузит pre-recorded HTML и markdown без API. Это работает для ролика. **Не нарушает ли это доверие зрителей** («они показали кэш, не живую генерацию»)? Как лучше — magic URL прозрачно («это закешированный пример»), или скрытно («выглядит как живая генерация»)?

8. **Brand Memory** — сейчас в localStorage, теряется при clear cache. **Нужна ли cloud-синхронизация для Self-Serve тарифа?** Как сделать с минимальной overhead (Supabase? KV-store Vercel?)?

9. **`/api/chat`** имеет один tool — Firecrawl scrape. **Что бы ты добавил первым** из списка непод­ключённых tools (Apify, Perplexity web search, Yandex Direct API, GA, Notion)? Каков ROI каждого?

10. **TypeScript строгость** — `tsc --noEmit` чист. Но 1500-строчный `app/tool/page.tsx` это огромный файл с десятками state. **Стоит ли разбить на модули прямо сейчас или оставить до второй версии?**

### Качество кода / Best practices

11. **Mobile** — я проверила 5 страниц на 375×812. Какие edge cases я могла пропустить? (iPad portrait, landscape phones, foldables, retina)

12. **Performance** — главная страница использует много `Reveal` (scroll-reveal через IntersectionObserver), Reveal делает full-page screenshot невозможным. **Это хороший pattern или антипаттерн?** Что с FCP/LCP?

13. **Accessibility** — я не делала специально a11y-ревью. **Что наиболее болезненно** для скрин-ридеров / клавиатурной навигации в editorial-сайте такого типа?

14. **Безопасность** — `/api/chat` принимает `apiKey` от пользователя в JSON body, шлёт в Anthropic. localStorage хранит ключ. **Какие риски** (XSS, CSRF, leak через open-redirect)?

15. **SEO** — для медицины (MEDEA-кейс) я добавила Schema.org Dentist. **Какой schema для самого natashabrovkina.com** (Organization? Person? SoftwareApplication?). Что с robots.txt, sitemap, hreflang для RU+EN?

### Контент

16. **Сценарий ролика** в `content/video-script.md` — фокус на Simbios (агентство), но я говорила что показываю на стоматологии MEDEA. **Какой кейс сильнее для холодного зрителя YouTube?** Маркетинговое агентство (мета-ирония) или стоматология (понятная боль каждому)?

17. **Эссе на главной** (`app/page.tsx`) — длинный editorial текст с drop-cap, 6 параграфов с философией. **На главной странице это работает или убивает конверсию?** Может вынести на /about?

18. **Pricing testimonials** — 6 отзывов с инициалами (МК, АС, ЕП, ИВ, ОФ, ДТ). **Это плейсхолдеры или реальные?** Если плейсхолдеры — как маркировать честно (или удалить до первых реальных)?

19. **Brand voice в SKILL.md** говорит «не используй gradient mesh, не используй pill-кнопки». **Не противоречит ли это** общим визуальным трендам 2026, которые ICP ожидает?

## 7. Формат ответа

**Кратко по каждому вопросу.** Не нужны длинные эссе. Хочу:

- 🔴 Critical — блокер для запуска ролика, нужно фиксить ДО
- 🟡 Important — важно, но можно после ролика
- 🟢 Nice — улучшение, не блокер
- ✅ ОК — это уже хорошо, не трогать

Для каждого critical/important — **один абзац объяснения + один концретный шаг** что делать.

В конце дай **топ-3 действия на сегодня** в порядке приоритета (не топ-10, не «всё важно» — выбери три).

И финально: **что бы ты сделал по-другому** на моём месте, если бы строил этот продукт с нуля сейчас?

Спасибо. Жди критики, не комплиментов.
