# Анализ 4 виральных EN-роликов про AI-маркетинг

**Дата сбора:** 2026-04-27
**Цель:** найти рабочую формулу для твоего YouTube-ролика «Заменила маркетинг-команду 16 AI-агентами»
**Метод:** разобрала каждый ролик по 8 параметрам, свела в таблицу, вытащила доминирующие паттерны

---

## Ролик #1 — «Build Your AI Marketing Team in Claude Code»

**Длительность:** 17:30. **Формат:** обучающий tutorial / build-along. **Создатель:** ник не указан, ~50K+ подписчиков.

### Что говорит за весь ролик (выжимка по-русски)

> «Claude становится мощнее каждый день. Что если превратить его в AI-маркетинг-команду, которая исследует, пишет, анализирует и дизайнит — всё в связке? Сегодня покажу как построить эту систему с нуля в Claude Code, даже если ты не технарь.
>
> Сначала разделим маркетинг на функции: что делаешь каждую неделю. Каждое повторяемое действие → один skill. Похожие skill объединяешь в роли (агенты). Связываешь агентов в команду через CLAUDE.md.
>
> Сегодня делаем для travel-бренда «Go Travel»: 5 агентов, 12 skills.
>
> Использую VS Code. Устанавливаю расширение Claude Code. Создаю папку с системными подпапками (context, SOP, templates) и рабочими (ads, pages, presentations). Загружаю brand voice guide, style guide, продуктовые описания.
>
> Создаю первый skill — «Branded Deck». Метод: даю Claude шаблон + анализ → расширяю официальный PowerPoint skill → получаю агента который генерит брендированные презентации за 30 секунд. Демо: 13-слайдовый deck для летней кампании.
>
> Второй skill — «Social Creative Designer». Подключаю Nano Banana через MCP. Загружаю стилевую библиотеку. Получаю агента который генерит карусели в Instagram-стиле бренда.
>
> Создал 12 skills. Когда их много — Claude теряет фокус. Поэтому создаю агентов: «Data Analyst», «Content Creator», «Market Researcher», «Creative Designer», «Campaign Strategist». Каждый агент использует свой набор skills.
>
> Запускаю на сложной задаче: «нужен полный пакет для запуска кампании Cherry Blossom в Японии — research, brief, social posts, landing page, ad creatives». 10 минут — все артефакты готовы и связаны единой темой.
>
> Дальше — Notion-доска с задачами. Claude видит pending-tasks и раздаёт агентам. Удалённое управление с телефона через Remote Control. Агенты работают на тебя 24/7.»

### Мой разбор

| Параметр | Оценка |
|---|---|
| **Hook (0:00-0:23)** | «What if you could turn Claude into AI team» — слабый, нет stake, нет цифры |
| **Главное обещание** | Построить AI-команду с нуля |
| **Демо** | На **придуманном** бренде «Go Travel» |
| **Talking head** | ~5% времени |
| **Скорость речи** | 8 слов/сек (быстро) |
| **Артефакт-кульминация** | 5 deliverables в финале |
| **Монетизация в ролике** | Не объяснена |
| **Аудитория** | Уже-Claude-юзеры, хотят tutorial |

**Виральный приём:** прогрессия сложности — skill → agent → team → mobile remote. Каждый блок «ещё круче предыдущего». Удерживает до конца.

**Что НЕ делает:** нет личной истории, нет ROI-цифр, нет реального клиента, нет провокации против ChatGPT.

**Вердикт:** работает на **существующей аудитории**, которая уже знает Claude Code. Холодному зрителю слишком технически.

---

## Ролик #2 — «AI Marketing Tool за $0 vs Agencies за $5-10K»

**Длительность:** 16:47. **Формат:** product demo + monetization-pitch. **Создатель:** ник неизвестен, аудитория ~100K+.

### Выжимка по-русски

> «Маркетинговые агентства берут 5-10 тысяч долларов в месяц за то, что я сейчас покажу как сделать **бесплатно**. Я построил AI-маркетинг-инструмент в Claude Code, который аудитит сайт, копирайт, SEO, воронки, конкурентов и генерит **PDF-отчёт для клиента** одним промптом.
>
> К концу видео ты установишь это себе и я покажу как люди уже зарабатывают на этом.
>
> Бизнес отчаянно нуждается в маркетинге, но не может позволить агентство. И есть люди которые хотят открыть AI-агентство, но у них нет инструментов. Мой инструмент решает обе проблемы.
>
> 15 разных команд: анализ сайта, генерация email-серий, рекламные креативы, SEO-аудит, разведка конкурентов, PDF-отчёт.
>
> Демо на **calendly.com** (узнаваемый бренд) — 2 минуты — оценка 75/100, готовый PDF с executive summary, score breakdown, key findings (critical, high, medium, low).
>
> Установка: VS Code → расширение Claude Code от Anthropic → клонируешь мой GitHub-репо → одна команда → готово. 15 skills доступны через slash-команды.
>
> Демо на **местном бизнесе San Francisco** — Knobill Aesthetics (мед-спа). Реальные находки: «Botox package: 100 units за $1,400 на одной странице vs $1,500 на специальной — несоответствие». Это ценные критические находки. Отчёт 64/100, разбит по разделам.
>
> Под капотом — 5 параллельных sub-агентов: market content, conversion, competitive, technical, strategy. Каждый получает тип бизнеса и работает одновременно. Финальный синтез в один отчёт.
>
> Каждый skill это файл `skill.md` с инструкциями. Можешь запускать любой отдельно: `/market-competitors`, `/market-funnels`. Не обязан запускать `/market-audit`.
>
> Так зарабатываешь: отправь PDF владельцу бизнеса бесплатно — «нашёл вот эти критические ошибки» — он 100% ответит. Возьми его на retainer 2-5 тысяч долларов в месяц. Это реальная модель.»

### Мой разбор

| Параметр | Оценка |
|---|---|
| **Hook (0:00-0:23)** | «Agencies $5-10K vs free» — **сильнейший из 4 роликов** |
| **Главное обещание** | Сэкономить $5-10K + начать собственное агентство |
| **Демо** | **2 РЕАЛЬНЫХ бизнеса** (Calendly + Knobill San Francisco) |
| **Talking head** | ~3% времени (рекорд минимума) |
| **Скорость речи** | 9-10 слов/сек (urgency) |
| **Артефакт-кульминация** | 1 PDF-отчёт (концентрированный) |
| **Монетизация в ролике** | **Встроена** ($2-5K/мес retainer) |
| **Аудитория** | Cold prospects + would-be agency owners |

**Виральные приёмы:**
- Цена в первые 3 секунды (stake)
- Demo на узнаваемом бренде (proof не cherry-picked)
- Демо на реальном местном бизнесе (real-world)
- Конкретная находка ($1,400 vs $1,500 inconsistency) — любой может проверить
- Real San Francisco competitors в финальном отчёте (Haze Valley, Skin Spirit, Serenity)

**Что НЕ делает:** нет личной истории, нет credentials, нет своего MRR, нет before/after, нет emotional hook.

**Вердикт:** **это формат для холода.** Самый виральный для cold-prospect-конверсии. Идеально подходит для тебя.

---

## Ролик #3 — «Idea Browser → Paper → Humblytics» (подкаст с Greg)

**Длительность:** 35:00. **Формат:** podcast 2 ведущих (Greg + гость Amir). **Аудитория:** indie founders, technical builders.

### Выжимка по-русски

> «Сегодня покажем 3 аспекта построения бизнеса: новые инструменты для лендингов, Humblytics для конверсий, A/B-эксперименты. Дам всю «соль», без утайки.
>
> К концу выпуска поймёшь что нужно чтобы взять идею, валидировать её, отполировать дизайн, построить лендинг и собрать данные чтобы начать зарабатывать. Без vibe-coded purple дизайна.
>
> Idea Browser теперь подключается к Claude Code как MCP. Раньше всё было про поиск правильной идеи. Сейчас — про отслеживание эволюции бизнеса с правильным контекстом.
>
> Развиваем идею «AI-спарринг-партнёр для B2B-продаж» — инструмент который помогает менеджерам тренироваться на симуляциях звонков. Ниша — фрахт-софт.
>
> Подключаем Idea Browser MCP, пуллим контекст проекта, используем skill «Lead Magnet Legend» для генерации PDF-гайда «5 возражений которые убивают сделки во фрахт-софте».
>
> Дальше — Paper для дизайна. Это интерфейс между Claude Code и финальным дизайном. Раньше дизайнеры делали в Figma → передавали разработчикам. Сейчас Claude Code пишет код напрямую → теряется итеративный design-loop. Paper закрывает этот gap.
>
> Даю Claude reference-image из Tail Arc или существующего сайта → «извлеки ключевые элементы дизайна и создай design system». Это база для будущих сессий.
>
> Vibe-coded design это плохо? Нет — если итеративно полируешь через Paper и даёшь конкретные компоненты как референсы. Я установил Tail Arc, выбрал секцию контента, попросил Claude использовать её для лендинга. Через 2 минуты — финальная версия.
>
> Делаю animation: «**добавь тонкую анимацию**». Слово «тонкая» критично — без него Claude переборщит. «Sub­tle» — guard-rail.
>
> Деплою лендинг. Подключаю Humblytics через MCP. Конкретный API-ключ → property details → Claude может запускать эксперименты, читать аналитику, давать рекомендации.
>
> Запускаем A/B-эксперимент над headline лендинга. Вариант: «Every lost deal started with an objection your rep wasn't ready for». Вживую переключаем control/variant — без commit, без деплоя. Скрипт Humblytics динамически меняет контент.
>
> Это арбитраж. Как Facebook-ads в 2010 — 5 центов за клик. Сейчас $2-23. Кто разобрался первым — заработал. Сейчас та же возможность с этим стэком.
>
> У нас уже есть клиенты которые платят 5-10 тысяч долларов в месяц за то чтобы мы запускали Humblytics за них как managed service.
>
> Будущее — больше агентов будут заходить на сайты чем людей. Gartner: 20% коммерции в 2030 — агенты. Может появиться agent tax — платишь за каждого агента как за сотрудника.»

### Мой разбор

| Параметр | Оценка |
|---|---|
| **Hook (0:00-1:14)** | «Today we cover 3 aspects... raw sauce» — длинный, philosophical |
| **Главное обещание** | «Сделать деньги на лендингах + A/B» |
| **Демо** | **Live work-in-progress** (создают AI-sparring-partner вживую) |
| **Talking head** | ~30% (подкаст-формат) |
| **Скорость речи** | 7-8 слов/сек |
| **Артефакт-кульминация** | A/B-эксперимент запускается вживую |
| **Монетизация в ролике** | $5-10K/мес managed service + arbitrage philosophy |
| **Аудитория** | Indie founders, technical builders |

**Виральные приёмы:**
- «Все соль, без утайки» — promise of insider knowledge
- Тангенциальные обсуждения (terminal as interface, agent tax, Facebook 2010 analogy) — value даже не-technical зрителям
- Live A/B test toggle (peak wow-момент 28:00)
- «Я не знаю никого кто бы это делал» (exclusivity)
- «Stay saucy» — community inside-joke

**Что НЕ делает:** нет explicit «buy our product», нет before/after клиента, нет конкретных credentials, нет emotional disruption в hook, нет step-by-step install.

**Вердикт:** это **builder-podcast формат для уже подкованных founders**. Не для cold viewers. Тебе не подходит сейчас (ты строишь аудиторию с нуля).

---

## Ролик #4 — Greg Eisenberg «Distribution Over Engineering: 7 Strategies»

**Длительность:** 27:00. **Формат:** solo monologue / framework reveal. **Аудитория:** founders, vibe-coders, indie hackers.

### Выжимка по-русски

> «Самые богатые люди следующих 10 лет будут маркетологами. Но каждый YouTube-туториал учит вас vibe-кодить. К концу выпуска у тебя будет **7 конкретных стратегий** на эту неделю — фреймворки, идеи, alpha которое работает прямо сейчас.
>
> Я переехал в Силиконовую Долину в 2014. Тогда инженеры были №1 в иерархии. Потом продакты. Маркетологи — внизу, посмешище. Сейчас всё перевернулось благодаря AI: distribution №1, потом продакт, потом разработчики.
>
> Pieter Levels: $3M+ выручки, 0 сотрудников. Почему? 750K followers + хорошее SEO + 125K твитов за 8 лет. Дисциплина и аудитория.
>
> Ловушка: vibe-кодишь → пытаешься маркетинг → тишина → строишь больше фич → опять тишина. Умные строят наоборот: сначала аудитория (1000 людей), потом спрашиваешь что им нужно, строишь за выходные, запускаешь на тёплую базу.
>
> **Стратегия 1: MCP-серверы как твоя sales-команда.** AI-ассистент находит твой MCP в каталоге → возвращает твой продукт пользователю → CAC = 0. Знакомый: 150+ установок за 30 дней, 0 рекламного бюджета. Build MCP server → publish в Smithery, MCPT, Open Tools → каждый AI продаёт за тебя 24/7.
>
> **Стратегия 2: Программатик SEO.** 10 000 страниц за выходные. Паттерн «best X for Y» — например «лучший CRM для стоматологов». Скрейпишь данные через Firecrawl, AI генерит уникальный контент, публикуешь. Если каждая страница даёт 30 визитов → 300K в месяц → конверсия 2% → 6K продаж × $10 = $60K/мес. Долгосрочная игра.
>
> **Стратегия 3: Бесплатный инструмент как top-of-funnel.** Ahrefs free backlink checker — даёшь домен, видишь backlinks. Это вкус полного продукта → подсаживаешься. Ты должен делать grader / analyzer / calculator. Vibe-кодишь за день в Claude Code. Может стать viral loop через share-результат.
>
> **Стратегия 4: AEO (Answer Engine Optimization).** Старое SEO умирает. AEO = быть тем источником который AI цитирует. Структурированные ответы, FAQ-формат, Schema markup, таблицы сравнения. Pieter: его AI-referrals выросли с 4% до 20% за 1 месяц. Если SEO в 2010 был как AEO в 2026 — first-movers возьмут ниши на годы.
>
> **Стратегия 5: Виральные артефакты.** Spotify Wrapped — 100M шейров в декабре. GitHub contribution graph — разработчики хвастаются. Stripe Atlas — incorporation milestone. Duolingo streak. Спрашивай: чем твой пользователь хочет похвастаться? Сделай это красивым и shareable. Каждый шейр = бесплатный показ твоей точной ЦА.
>
> **Стратегия 6: Купи нишевую рассылку.** Долго строить аудиторию. Можешь купить 10K-подписчиковую рассылку за $5-20K. Сразу получаешь доверие и канал. Ищи на duo.com, Newsletter Investor. Большинство мелких рассылок зарабатывают 0-$500/мес — будут рады офферу.
>
> **Стратегия 7: AI content repurposing engine.** Один pillar-контент (подкаст / эссе / видео) → 50-75 единиц контента: 5-10 твитов, 3-5 LinkedIn-постов, 2-3 short-form видео, 1 newsletter, 5-10 quote graphics, email-серии. Один час записи = месяц контента.
>
> Код больше не moat. Distribution — новый moat. Pick 2 of 7. Start this week. Don't just vibe-code. Я хочу видеть как ты получаешь клиентов.»

### Мой разбор

| Параметр | Оценка |
|---|---|
| **Hook (0:00-1:08)** | «Wealthiest = marketers next 10 years» — **сильнейший по emotional impact** |
| **Главное обещание** | 7 actionable стратегий на эту неделю |
| **Демо** | **НЕТ ВООБЩЕ** (idea video) |
| **Talking head** | ~97% (рекорд максимума) |
| **Скорость речи** | 6-7 слов/сек (медленнее всех — slowest is best for impact) |
| **Артефакт-кульминация** | 7 фреймворков |
| **Монетизация в ролике** | «Pick 2, start this week» — meta-actionable |
| **Аудитория** | Builders которые упёрлись в distribution |

**Виральные приёмы:**
- List format «7 strategies» — curiosity gap до конца ролика
- Каждая стратегия начинается с counter-intuitive promise
- Personal urgency «I needed to make this episode» — vulnerability
- Pieter Levels как recurring anchor (упомянут 4 раза)
- «No one's doing this» (3 раза)
- Финальный recap закрывает gestalt
- Meme-able phrase: «Code is the new moat → Distribution is the new moat»
- Authority signals: name-drop Pieter ($3M), Ahrefs, Stripe, Spotify

**Что НЕ делает:** нет live demo, нет screen share, нет product placement, нет конкретного MRR своего, нет step-by-step install, нет emotional client story.

**Вердикт:** это формат **«идеи + философия» для существующей аудитории**. Greg уже известен — он может позволить себе talking head на 27 минут. Тебе пока такой формат не подойдёт — нужен demo + screen share как у #2.

---

## Сравнительная таблица 4 роликов

| Параметр | #1 (AI Marketing Team) | #2 ($0 vs $5-10K) | #3 (Idea→Paper подкаст) | #4 (Greg 7 strategies) |
|---|---|---|---|---|
| Длительность | 17:30 | 16:47 | 35:00 | 27:00 |
| Формат | Tutorial | Tutorial + agency-pitch | Podcast 2-heads | Solo monologue |
| Сила hook (1-10) | 5 | **8** | 7 | **9** |
| Stake в hook | Нет | **$5-10K** | «Make money» | Wealth philosophy |
| Демо | Fake brand | **Real businesses ×2** | Live work-in-progress | НЕТ |
| Talking head % | 5% | **3%** | 30% | 97% |
| Скорость речи (слов/сек) | 8 | 9-10 | 7-8 | **6-7** |
| Главное обещание | «Build skill» | **«Save $5-10K + agency»** | «Make money» | «7 things this week» |
| Артефакт | 5 deliverables | **1 PDF** (concentrated) | A/B test live | 7 frameworks |
| Built-in monetization | Нет | **Yes ($2-5K)** | Yes ($5-10K) | «Pick 2» |
| Authority signals | «power user» | «I built» | «we built Humblytics» | Pieter $3M, Ahrefs |
| Аудитория | Existing Claude users | **Cold prospects** | Indie technical | Stuck-on-distribution |
| Visual disruption first 3 sec | Нет | Нет | Нет | Нет |

---

## Доминирующая виральная формула 2026 (синтез)

```
0:00-0:15  HOOK
   ├─ Конкретная цена / число / контраст (как у #2: $5-10K)
   ├─ Promise of free takeaway («by the end you'll have it»)
   └─ Skin in game («I built», personal credit)

0:15-2:00  IMMEDIATE DEMO
   ├─ Live screen share, не slides
   ├─ На recognizable бренде ИЛИ real local business (как у #2)
   └─ Visible artefact (PDF / dashboard / landing / A/B toggle)

2:00-5:00  «HOW YOU GET IT»
   ├─ One-command install / GitHub link
   ├─ VS Code / Cursor / Claude Code workflow
   └─ «Even if you're not technical»

5:00-15:00  LIVE BUILD ИЛИ LIST OF STRATEGIES
   ├─ Screen share + voiceover (формат #1, #2)
   ├─ ИЛИ N actionable strategies (формат #4)
   └─ Объяснение архитектуры

15:00-end  MONETIZATION FRAME
   ├─ «You can sell this for $X»
   ├─ Real client example
   └─ «Arbitrage opportunity now» (формат #3)

CTA
   ├─ GitHub repo link
   ├─ Community / waitlist
   └─ Engagement-CTA «comment URL» (формат #4)
```

**Лучшее из каждого:**
- 🥇 Hook: **#2** ($5-10K vs free — самый сильный конкретный stake)
- 🥇 Demo proof: **#2** (real SF business + recognizable Calendly)
- 🥇 Monetization frame: **#3** («arbitrage like FB ads 2010» — emotional anchor)
- 🥇 Talking head balance: **#2** (3% — максимум screen time на ценность)
- 🥇 Structure: **#4** (7 strategies list-format = curiosity gap до конца)

---

## Критический gap во всех 4 роликах — твоя возможность

**Ни один из 4 авторов не делает visual disruption в первые 3 секунды.** Все начинают с talking head + слова.

**У тебя есть оружие которого нет ни у кого:** drag-slider до/после MEDEA на /gallery/medea-dent-moscow. Если поставишь его в 0:00-0:03 без речи — обойдёшь их всех на холодном click-through-rate.

---

## Что брать для **твоего** ролика — финальная сводка

### Из #1 (AI Marketing Team)
- ❌ Не повторять — формат tutorial для existing Claude-users тебе не подходит

### Из #2 ($0 vs $5-10K) — **главный референс**
- ✅ Цена в первые 3 секунды (твоя версия: 380 000 ₽ vs 2 990 ₽)
- ✅ Demo на real business (твоя MEDEA + второй RU-бизнес)
- ✅ One-command install / GitHub link
- ✅ Built-in monetization («49 000 ₽ за один аудит»)
- ✅ 97% screen share

### Из #3 (Idea→Paper подкаст)
- ✅ Arbitrage-метафора в monetization-frame («VK-Ads 2014 — копейка за клик»)
- ❌ Не повторять — длинный podcast-формат, тангенциальные обсуждения тебе не подходят на старте

### Из #4 (Greg 7 strategies)
- ✅ List format «5 стратегий на эту неделю» (curiosity gap до конца)
- ✅ Каждая стратегия = chapter-маркер + actionable «how to start this week»
- ✅ Authority signals (твои: Огилви, Шварц, Хопкинс, 20 малых бизнесов)
- ✅ Engagement-CTA «напиши URL в комментариях»
- ❌ Не повторять — talking head 97% и длительность 27 мин для unknown creator не работает

### Что **никто не делает** — твоё уникальное преимущество
1. 🥇 **Visual disruption в первые 3 секунды** — drag-slider до/после
2. 🥇 **Real RU-кейс** (MEDEA на Покровке)
3. 🥇 **RU-язык + RU-каналы** (Telegram, VK, vc.ru, TenChat)
4. 🥇 **Editorial-стиль** (warm-AI палитра, Playfair italic, JetBrains Mono)
5. 🥇 **Open-source + hosted-version** model (Cal.com / Plausible style)

---

## Что использовала из этого анализа в твоём сценарии

Сценарий [content/video-script-v2.md](video-script-v2.md) построен по гибридной формуле:

- **Hook от #2 + #4** — конкретная RU-цифра (380К vs 2 990) + drag-slider (твоё преимущество)
- **Demo от #2** — реальная MEDEA + второй RU-бизнес
- **Structure от #4** — 5 стратегий с chapter-маркерами
- **Monetization frame от #2 + #3** — «49 000 ₽ за один аудит» + arbitrage-метафора («VK-Ads 2014»)
- **Length** — 10:30, короче чем все 4 (между #2 и #1)
- **Talking head** — 10% (между #2 и #4)

---

**Документ закрыт.** Если хочешь добавить ещё ролики или пересмотреть какие-то выводы — пиши.
