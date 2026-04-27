# Финальный промт для внешнего ревью — natashabrovkina.com

Скопируй всё что **после разделителя `---`** (большого) и вставь в новый чат с любым Claude (claude.ai, Cursor, Claude Code) или GPT-5. Внешний AI независимо проверит **продукт, сайт, скрипт ролика, контент-стратегию, безопасность, SEO** и даст жёсткий отчёт по 7 областям.

---

# Финальный аудит проекта natashabrovkina.com — перед записью YouTube-ролика

Ты выступаешь внешним экспертом-консультантом и QA-аудитором. Я (предыдущая Claude-сессия) работала с владелицей Натальей Бровкиной много часов. **Завершён первый аудит, применены 9 фиксов, переписан скрипт под Scenario C, добавлены 30 title + 5 derivative-идей + 60 промо-постов.** Теперь нужна **последняя независимая проверка** перед записью ролика. Будь жёстким — не вежливым.

## 1. Контекст

**Что строится:** `natashabrovkina.com` — AI Marketing Studio. Open-source GitHub-репо + платная hosted-версия. 16 AI-агентов на методологии Огилви/Шварца/Хопкинса для SMB в России.

**Бизнес-стадия:** pre-launch, pre-revenue.
- Аудитория: TG 32, YouTube 4 (2 ролика сняты), LinkedIn 141, VK 220 (друзья), Twitter 0
- Платящих клиентов: 0
- MRR: 0
- Кейсы: MEDEA Dent ×3.4 заявок за 90 дней, Simbios Marketing +58% за 60 дней (pre-launch консалтинг)
- Домен НЕ куплен (план: natashabrovkina.com)

**Ближайшая цель:** записать **YouTube-ролик 10:00** по [content/video-script-v3.md](content/video-script-v3.md) → собрать email-ы в waitlist + GitHub-stars.

**Тарифы:**
- Free — open-source GitHub-репо (свой Anthropic-ключ ~$5/мес)
- Self-Serve — 2 990 ₽/мес — hosted UI (waitlist mode)
- Personal — 49 000 ₽ разово — 30 дней лично с Натальей (3 места/мес)

## 2. История изменений (что уже было исправлено)

Внешний аудит [content/pre-recording-audit-2026-04-27.md](content/pre-recording-audit-2026-04-27.md) нашёл **3 critical + 3 important blocker'а**. **Закрыто 9 из 11**. Остаются 2 действия от Натальи (consent MEDEA, покупка домена).

**Что уже исправлено (commit history):**
- Hero H1 «Удвоила выручку 20 малых бизнесов» (непроверяемо при 2 кейсах) → «Маркетинг по Огилви. *Запускает один человек.*» (outcome-based без числа)
- 6 fabricated testimonials на /pricing → 2 реальных кейса (MEDEA + Simbios) с ссылками
- Имена «Анна», «Доктор Петров», «Татьяна Г.» в demo-ответах → плейсхолдеры `{имя}`, `{доктор}`
- «Los Angeles» в byline → убран (CLAUDE.md строгий blacklist)
- `t.me/natalia_agents_bot` (бот не настроен) → GitHub-репо ссылка
- Pricing inconsistency в youtube-description.md → синхронизирован
- Monetization «49К × 5/нед = 1М/мес» → «49К × 2/мес + 15-30К Self-Serve = цель 200К MRR к осени»
- Создан `public/demo/clinic-demo-brand-memory.json` — fallback без `[UNVERIFIED]` полей если consent от MEDEA не получен
- Скрипт переписан под Scenario C (одна аудитория, один агент в фокусе)

## 3. Все ссылки — открой каждую

### 🌐 GitHub-репо (публичные)

- **Продукт-сайт:** https://github.com/nibrovkina-cyber/natalia-com
- **Open-source skills:** https://github.com/nibrovkina-cyber/natalia-marketing-department

### 💻 Localhost (попроси Наталью запустить `npm run dev`)

- http://localhost:3000 — главная (новый Hero «Маркетинг по Огилви»)
- http://localhost:3000/pricing — 3 тарифа + 2 кейса (testimonials удалены)
- http://localhost:3000/tool — главный продукт-инструмент
- http://localhost:3000/tool?demo=medea — Студия demo (без API)
- http://localhost:3000/tool?demo=simbios — второй demo
- http://localhost:3000/method — методология
- http://localhost:3000/gallery — галерея
- http://localhost:3000/gallery/medea-dent-moscow — кейс с drag-slider
- http://localhost:3000/gallery/simbios-marketing-moscow — кейс агентства
- http://localhost:3000/waitlist — форма
- http://localhost:3000/opengraph-image — динамическая OG
- http://localhost:3000/robots.txt — AI-краулеры разрешены
- http://localhost:3000/sitemap.xml — все страницы

### 📁 Файлы для прямого чтения (абсолютные пути)

#### Контент для ролика (главное)
- `c:/проект опенсорс/ai-marketing-natalia/content/video-script-v3.md` — **финальный скрипт 10:00 (Scenario C)**
- `c:/проект опенсорс/ai-marketing-natalia/content/video-script-v2.md` — старая версия для сравнения
- `c:/проект опенсорс/ai-marketing-natalia/content/youtube-titles-30.md` — 30 title по психо-триггерам (TOP-5 для A/B-теста)
- `c:/проект опенсорс/ai-marketing-natalia/content/content-ideas-5.md` — 5 идей деривативных контентов на 7 дней посева
- `c:/проект опенсорс/ai-marketing-natalia/content/promo-posts-60.md` — 60 RU-постов на 14-дневную промо-кампанию
- `c:/проект опенсорс/ai-marketing-natalia/content/video-references-analysis.md` — анализ 4 EN-роликов на основе которых построен v3
- `c:/проект опенсорс/ai-marketing-natalia/content/pre-recording-audit-2026-04-27.md` — внешний аудит (закрыт)
- `c:/проект опенсорс/ai-marketing-natalia/content/youtube-description.md` — описание + pinned comment + thumbnails

#### Демо-данные (что появится на экране)
- `c:/проект опенсорс/ai-marketing-natalia/public/demo/medea-after.html` — pre-recorded AI-лендинг MEDEA
- `c:/проект опенсорс/ai-marketing-natalia/public/demo/simbios-after.html` — для Simbios
- `c:/проект опенсорс/ai-marketing-natalia/public/demo/clinic-demo-brand-memory.json` — **новый: чистая Brand Memory без `[UNVERIFIED]` (Клиника Дента — fallback)**
- `c:/проект опенсорс/ai-marketing-natalia/public/demo/medea-brand-memory.json` — старая (с `[UNVERIFIED]`, не использовать в видео без consent)
- `c:/проект опенсорс/ai-marketing-natalia/public/demo/agent-responses/medea/copy.md`
- `c:/проект опенсорс/ai-marketing-natalia/public/demo/agent-responses/medea/proposal.md` — *имена нейтрализованы*
- `c:/проект опенсорс/ai-marketing-natalia/public/demo/agent-responses/medea/seo.md`
- `c:/проект опенсорс/ai-marketing-natalia/public/demo/agent-responses/medea/funnel.md`
- `c:/проект опенсорс/ai-marketing-natalia/public/demo/agent-responses/medea/email.md` — *имена нейтрализованы*

#### Open-source SKILL.md (что покажет в ролике)
- `c:/проект опенсорс/natalia-marketing-department/skills/natalia-copy/SKILL.md`
- `c:/проект опенсорс/natalia-marketing-department/skills/natalia-positioning/SKILL.md`
- `c:/проект опенсорс/natalia-marketing-department/skills/natalia-proposal/SKILL.md`
- `c:/проект опенсорс/natalia-marketing-department/skills/natalia-funnel/SKILL.md`
- `c:/проект опенсорс/natalia-marketing-department/skills/natalia-brand-voice/SKILL.md`

#### Brand-guidelines + правила
- `c:/проект опенсорс/ai-marketing-natalia/brand_assets/brand-guidelines.md`
- `c:/проект опенсорс/ai-marketing-natalia/CLAUDE.md`
- `c:/проект опенсорс/ai-marketing-natalia/AGENTS.md`

#### Безопасность
- `c:/проект опенсорс/ai-marketing-natalia/app/api/chat/route.ts` — валидация + BYOK strict (после фикса DoS-уязвимости)
- `c:/проект опенсорс/ai-marketing-natalia/app/api/waitlist/route.ts` — Telegram-bot integration
- `c:/проект опенсорс/ai-marketing-natalia/app/lib/rate-limit.ts` — Vercel KV distributed rate-limit

#### SEO/AI-discoverability
- `c:/проект опенсорс/ai-marketing-natalia/app/robots.ts` — AI-краулеры разрешены (GPTBot, ClaudeBot, PerplexityBot)
- `c:/проект опенсорс/ai-marketing-natalia/app/sitemap.ts`
- `c:/проект опенсорс/ai-marketing-natalia/app/layout.tsx` — JSON-LD schema (Person + Org + SoftwareApplication)
- `c:/проект опенсорс/ai-marketing-natalia/app/opengraph-image.tsx` — обновлённый OG

#### Deploy
- `c:/проект опенсорс/ai-marketing-natalia/vercel.json`
- `c:/проект опенсорс/ai-marketing-natalia/docs/DEPLOY-CHECKLIST.md`
- `c:/проект опенсорс/ai-marketing-natalia/scripts/get-telegram-chat-id.mjs`

## 4. 7 областей оценки

### 🎯 Область 1 — Идея (бизнес-модель)

Прочитай pricing/page.tsx, app/page.tsx, README репо. Оцени:

- ICP описан как 3 разных сегмента (SMB-владелец / agency-owner / freelancer). v3-скрипт сузил до 1 (владелец клиники/салона). **Корректно ли это сужение?**
- Цена 2 990 ₽/мес против ChatGPT Plus 1 800 ₽ — чем продукт реально отличается с т.зрения **покупателя**?
- Personal 49 000 ₽ × 3 места/мес = 147К/мес — реалистично для соло-фрилансера?
- Open-source MIT — что мешает форку? AGPL?
- «Снять YouTube-ролик чтобы собрать email-ы в waitlist» с 4 подписчиками — реалистично?

### 🛠 Область 2 — Продукт (`/tool` + 16 агентов)

Запусти dev-server. Открой:
1. `/tool` — пустое состояние с цитатой Огилви
2. `/tool?demo=medea` — Студия с MEDEA
3. `/tool` magic URL: введи `medeadent.tilda.ws` в форму Студии → должен подгрузить demo без API
4. `/tool?demo=medea` + клик на чат-агента → должен подгрузить markdown без API

Оцени:
- UX: понятно ли с первого взгляда?
- **Качество demo-ответов** в `public/demo/agent-responses/medea/` — после нейтрализации имён всё ещё убедительно?
- **Brand Memory** — старый `medea-brand-memory.json` (с `[UNVERIFIED]`) vs новый `clinic-demo-brand-memory.json` (clean) — какой использовать в ролике?
- Студия magic URL: видит ли зритель что это pre-recorded? Или выглядит как живая генерация?
- Mobile UX (375×812) — все страницы читаемы?

### 🎨 Область 3 — Сайт (визуальное качество ПОСЛЕ ФИКСОВ)

Открой все страницы. **Главное — проверь что фиксы из аудита реально применены:**

- ✅ Hero H1 на главной — должен быть «Маркетинг по Огилви. Запускает один человек.» (не «20 малых бизнесов»)
- ✅ Byline эссе — должен быть «AI Marketing Studio · Москва» (не «Moscow · Los Angeles»)
- ✅ /pricing — должно быть **2 кейса** с ссылками на /gallery, **НЕ 6 testimonials с именами**
- ✅ Footer + meta — domain `natashabrovkina.com` (не natalia.studio/com)
- ✅ Lead magnet CTA на главной — GitHub (не Telegram-бот)
- ✅ OG-image — должен показывать «Маркетинг по Огилви» в Playfair, не «Удвоила выручку 20»

Дополнительно:
- Drag-slider на /gallery/medea-dent-moscow — работает плавно?
- Mobile (375×812) — навигация без обрезки?
- Lighthouse score — Performance / SEO / Accessibility / Best Practices?

### 📝 Область 4 — Скрипт ролика (v3 vs v2)

Прочитай оба скрипта:
- `content/video-script-v3.md` — финальный (Scenario C, одна аудитория, один агент)
- `content/video-script-v2.md` — предыдущий для сравнения

Оцени **именно v3**:

- **Hook 0:00-0:10** — drag-slider (немо 5 сек) + провокация «Уволила маркетинг-команду. Зарабатываю больше». Сильно?
- **Главное демо (Copy-агент глубоко 2:20)** — вместо растянутых 5 стратегий v2. Это улучшение?
- **Methodology в 1 блоке 2 мин** (Schwartz 5 уровней + Ogilvy + Hopkins + Brand Memory) — плотно или слишком?
- **3 агента быстро по 30 сек** (Proposal, SEO, Atomizer) + **GitHub в финальном CTA** (не отдельный блок) — баланс?
- **Honest monetization** «49К × 2/мес + 15-30К Self-Serve = 200К MRR к осени» — правдоподобно?
- **CTA + engagement loop** «напиши URL в комментариях» — рабочий?

### 🎬 Область 5 — Контент-стратегия (новые файлы)

Прочитай:
- `content/youtube-titles-30.md` — 30 title по 3 формулам и 4 психо-триггерам
- `content/content-ideas-5.md` — 5 идей деривативных контентов
- `content/promo-posts-60.md` — 60 RU-постов

Оцени:
- **Title TOP-5** — действительно ли #1 «Уволила маркетинг-команду. Зарабатываю больше» сильнее текущего «Заменила маркетинг-команду 16 AI-агентами»?
- **5 derivative ideas** — каждая с Paradox + Transformation Arc + Actionable Steps. Применимы ли они на практике для 4-подписчиков-канала?
- **60 RU-постов** в 6 категориях — какие 10 самых сильных? Какие 10 опасных (могут навредить репутации до запуска)?
- **14-дневный план посева** — реалистична ли нагрузка 4-5 постов в день для соло-founder?

### 🔒 Область 6 — Security + SEO

#### `app/api/chat/route.ts`:
- Валидация `messages.length ≤ 30`, total chars ≤ 60K, `maxTokens ≤ 4096`, `systemPrompt ≤ 10K`, `scrapeUrl ≤ 500` ✅
- BYOK strict: format `sk-ant-*`, fallback на env только если `!apiKey AND rate-limit OK` ✅
- Rate-limit через Vercel KV `app/lib/rate-limit.ts` (с in-memory fallback) ✅

#### `app/api/waitlist/route.ts`:
- Rate-limit 30 сек/IP, валидация email, optional Telegram-bot

#### SEO:
- `/robots.txt` — AI-краулеры (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) разрешены
- `/sitemap.xml` — 6 главных + 2 кейса
- JSON-LD в layout.tsx — Person + Organization + SoftwareApplication
- `metadataBase` = `https://natashabrovkina.com`

**Что я мог пропустить?** CSP headers? X-Frame-Options? Lighthouse Audit?

### 🎥 Область 7 — Recording assets (что попадёт в ролик)

Прочитай `content/video-script-v3.md` раздел Production Checklist + shot list. Проверь визуально:

- [ ] Drag-slider /gallery/medea-dent-moscow — handle двигается плавно
- [ ] /tool?demo=medea — Студия рендерится корректно ДО/ПОСЛЕ
- [ ] medea-after.html — лендинг профессионально выглядит
- [ ] simbios-after.html — то же
- [ ] Все 5 markdown-ответов агентов содержат блок «🧠 Почему я так сделал»
- [ ] **clinic-demo-brand-memory.json** — структура читабельна, **нет `[UNVERIFIED]`** ✅
- [ ] OG-image — premium editorial (новая версия с «Маркетинг по Огилви»)
- [ ] Все pages mobile-friendly (375×812 и 390×844)
- [ ] Console errors на каждой странице — должно быть 0

## 5. Главный вопрос — должна ли Наталья записывать ролик СЕЙЧАС?

Дай прямой ответ:

**🟢 ЗАПИСЫВАЙ** — если все 9 фиксов работают и оставшиеся 2 (домен + consent) — **не блокеры** для записи (можно записать на localhost, потом перенести)

**🟡 ЖДАТЬ** — если есть критичные visual bugs которые я не заметил, или domain-блокер критичен

**🔴 НЕ ЗАПИСЫВАТЬ** — если есть НОВЫЙ critical блокер который мы пропустили

## 6. Формат отчёта

```markdown
## Область 1 — Идея
- Жизнеспособна / нужны правки / пивот
- Главный риск
- Конкретный шаг

## Область 2 — Продукт
### Critical
1. ...
### Important
1. ...
### OK
- ...

## Область 3 — Сайт (после фиксов)
[все ли фиксы из истории применены реально?]

## Область 4 — Скрипт v3
- Hook сила: 1-10
- Самый слабый блок
- Самый сильный блок
- Конкретные правки

## Область 5 — Контент-стратегия
- Топ-5 title (выбранные тобой из 30)
- Самая сильная derivative-идея
- Топ-10 постов из 60 / Топ-10 опасных

## Область 6 — Security + SEO
[критичные находки]

## Область 7 — Recording assets
[конкретные баги по shot-list]

## Главный вердикт
🟢 / 🟡 / 🔴 + объяснение

## Топ-5 действий перед записью
1. ...

## Прогноз ролика (30 дней)
- Просмотры: ___
- Waitlist email-ы: ___
- Главный риск ролика: ___
- Что бы я сделал по-другому: ___
```

## 7. Что НЕ нужно

- ❌ Архитектурные refactor-предложения (1500-line `tool/page.tsx` отложен)
- ❌ Бизнес-советы про монетизацию (это уже обсуждалось в первом аудите)
- ❌ «Используйте framework X вместо Y» — стэк зафиксирован
- ❌ Длинные эссе на каждый пункт — короткие конкретные ответы
- ❌ Комплименты или вежливость

## 8. Время на проверку

40-60 минут. Если найдёшь критичный блокер — останавливайся и пиши, не доделывай остальное.

Спасибо. Жди критики, не комплиментов. Цель — **поймать любую проблему ДО записи ролика и публикации**, потому что после публикации YouTube-метрики не дают второго шанса.
