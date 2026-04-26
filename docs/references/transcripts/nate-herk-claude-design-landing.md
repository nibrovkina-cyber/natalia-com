# Nate Herk — Claude Design Landing Page Workflow

Транскрипт + ключевые insights для нашего проекта.

## Workflow Nate Herk-а (full pipeline)

1. **Идея в чат с Claude** → попросить brand spec (positioning, voice, visual identity, sections, copy, colors)
2. **Hero background:**
   - Image prompt → key.ai / Nano Banana 2 (16:9 ratio) → получаем still mug-image
   - Video prompt → Kling 2.0 → first frame = last frame = still image, камера не двигается → получаем looping animation
3. **Claude Design** → New prototype → high-fidelity → no design system (если новый бренд)
4. **Sketch tool** в Claude Design — рисуешь boxes (hero video bg, hero text, navbar) → даёт визуальный bridge для Claude
5. **Drag MP4** в проект (cap ~30-40 MB, до 15-20 секунд)
6. **Paste brand spec** из чата как artifact
7. **First generation** (Opus 4.7) → следишь за to-do list, останавливаешь если не туда идёт
8. **motions.ai** для inspiration — копируешь prompt сцены, даёшь Claude Design
9. **Tweaks panel** — palette / accent hue / font / headline size / layout / video dim / section rhythm / card style
10. **Inline edits:** click → edit text inline; circle + comment для drawing-feedback; size shortcuts «make 15»
11. **Section-by-section** — не строй всё разом, по одной секции
12. **Export ZIP** → Cloud Code → push GitHub → Vercel deploy
13. **Custom domain** — 5 минут DNS

## Что сохранять для нашего проекта

### Token-saving practices

- **Wireframe first → potом hi-fi** (меньше итераций)
- **Plan dump up front** — sketch + brand spec + один большой context-блок
- **Tweaks > новые промты** — не запрашивай заново, двигай слайдеры
- **One visual dimension per prompt** — не «измени 5 вещей разом»
- **Negative prompts** — «не используй эти шрифты / цвета»
- **Real references** — «linear 2023 с higher density» вместо «clean»
- **Export to fresh session** — когда context window засорен, экспорт ZIP → новая сессия
- **Model by stage** — Opus 4.7 для plan, Sonnet 4.6 для tweaks
- **Stop early** если идёт не туда — не дай Claude сжечь токены на ненужном

### Burn rate (важно для Натальи)

- 20$/мес после 1 сайта + 1 design system → почти всё съедено
- Max 5x → 4-5 серьёзных промтов
- 20x plan → несколько проектов до лимита
- Design system creation = 10-15 мин work + много токенов

### Mobile

- Claude Design **не оптимизирует мобайл автоматически** — нужно явно сказать
- Перед deploy → F12 → mobile view → итерация под mobile отдельным промтом
- На mobile: video может быть вниз, font в 1 строку

## Что забираем в наш workflow

### Уже есть у нас
- ✅ Token-cascade через design-system → `globals.css` → все компоненты
- ✅ Auto-import script `npm run import-design <zip>`
- ✅ shadcn-style components с CSS-переменными (Button, Card, Tag, PricingCard, …)
- ✅ Screenshot-loop через puppeteer
- ✅ Tweaks panel из Claude Design сохраняется как `tweaks-panel.jsx` для reference

### Стоит добавить (ещё не сделано)

1. **`scripts/generate-hero-video.mjs`** — pipeline:
   - Принимает image prompt
   - Генерит через Kling/Nano Banana API (если есть key)
   - Возвращает MP4 для hero
2. **Sketch-pad workflow** — папка `docs/sketches/<page>.png` для drag-в-Claude-Design до prompt
3. **Mobile-first review checklist** в `CLAUDE.md` — обязательная проверка перед deploy
4. **Token budget tracker** — записывать сколько потратили в Claude Design на каждой итерации, чтобы понимать ROI

## Использование сейчас

Когда Наталья будет делать новый Claude Design прототип:

1. Открывает `docs/handoff-claude-design.md` — читает promt-шаблон
2. Готовит sketch + brand spec из `brand_assets/brand-guidelines.md` целиком
3. Использует Tweaks panel как первичный механизм правок
4. Скачивает ZIP когда довольна
5. Запускает `npm run import-design ~/Downloads/<zip>` → tokens применяются автоматически
6. Если нужны компоненты — мы их добавим в `app/components/ui/` руками

## Ключевые цитаты

> «Best practice — watch what it's doing. Stop it if it's going down the wrong path.»

> «Tweaks save you more time and session limit than back-and-forth conversation.»

> «Linear 2023 with higher density» beats «clean and minimal».

> «Export to fresh session when context gets long.»
