# 🚀 Deploy checklist — natashabrovkina.com

Пошаговая инструкция запуска продукта в production. Следуй сверху вниз.

---

## Шаг 1 — купить домен (10 мин, ~990 ₽)

1. https://www.reg.ru/domain/new/?searchword=natashabrovkina
2. Выбрать `.com` (рекомендую) или `.ru` (если хочешь обе — обе)
3. Снять галочки с лишнего: SSL, хостинг, защита данных, email
4. Регистрация на 1 год, оплата СБП / МИР

---

## Шаг 2 — Vercel-проект (15 мин)

### 2.1 Подключить GitHub-репо к Vercel

1. https://vercel.com/new
2. Войти через GitHub
3. Импортировать `nibrovkina-cyber/natalia-com`
4. Framework — Next.js (определяется автоматически)
5. **Не нажимай Deploy сразу** — сначала добавь env-переменные (Шаг 2.2)

### 2.2 Environment Variables (обязательно)

В Vercel → Settings → Environment Variables добавь:

| Имя | Значение | Обязательно? |
|---|---|---|
| `ANTHROPIC_API_KEY` | твой ключ `sk-ant-...` | ✅ для работы /api/chat |
| `FIRECRAWL_API_KEY` | твой ключ Firecrawl | ✅ для Студии scraping URL |
| `TELEGRAM_BOT_TOKEN` | токен `@natalia_agents_bot` | 🟡 опц., для уведомлений о waitlist |
| `TELEGRAM_CHAT_ID` | твой Chat ID | 🟡 опц., см. Шаг 4 |
| `WAITLIST_WEBHOOK_URL` | (если используешь Zapier/Make) | 🟢 опц., альтернатива Telegram |

> Для production-пробы на запуске ролика **обязательны только** `ANTHROPIC_API_KEY` и `FIRECRAWL_API_KEY`. Telegram добавишь когда будет первый лид.

### 2.3 Первый деплой

Жми **Deploy**. Через 90-120 секунд получишь URL вида `natalia-com-xxx.vercel.app`. Проверь все 9 страниц.

---

## Шаг 3 — подключить домен к Vercel (5 мин)

### 3.1 В Vercel

1. Project → Settings → Domains
2. Add → `natashabrovkina.com` + `www.natashabrovkina.com`
3. Vercel покажет какие DNS-записи нужны

### 3.2 В REG.RU (DNS)

Войти в Личный кабинет REG.RU → Мои домены → natashabrovkina.com → DNS-серверы.

**Простой путь — DNS REG.RU + A-запись:**

| Тип | Имя | Значение |
|---|---|---|
| A | @ | `76.76.21.21` (Vercel IP, проверь в их panel) |
| CNAME | www | `cname.vercel-dns.com.` |

**Лучший путь — DNS Vercel:**

В REG.RU поменять NS на:
- `ns1.vercel-dns.com`
- `ns2.vercel-dns.com`

DNS пропагация — до 24 часов, обычно 1-3 часа.

### 3.3 Проверка

```
nslookup natashabrovkina.com
```

Должен вернуть IP Vercel (76.x). После этого SSL выдаётся автоматически.

---

## Шаг 4 — настроить Telegram-bot для waitlist (опц., 10 мин)

### 4.1 Создать бота

1. В Telegram открой [@BotFather](https://t.me/BotFather)
2. Команда `/newbot` → имя `natashabrovkina notifications` → username `@natashabrovkina_bot` (или какой свободен)
3. BotFather пришлёт токен `1234567890:AAA...` — это `TELEGRAM_BOT_TOKEN`

### 4.2 Получить твой Chat ID

1. Открыть бота в Telegram, нажать `/start`
2. В браузере открыть: `https://api.telegram.org/bot<TOKEN>/getUpdates`
3. Найти `"chat":{"id":XXXXXXXXX}` — это `TELEGRAM_CHAT_ID`

### 4.3 Добавить в Vercel env vars

`TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID` → пересобрать (Vercel → Deployments → Redeploy).

После каждой записи в waitlist — придёт сообщение в Telegram-бот.

---

## Шаг 5 — после ролика, отслеживание

| Метрика | Где смотреть |
|---|---|
| Просмотры YouTube | YouTube Studio |
| Трафик на сайт | Vercel Analytics (бесплатно встроена) |
| Конверсия в waitlist | Vercel logs `[waitlist]` или Telegram-бот |
| Demo-режим использование (?demo=medea) | Vercel logs |
| Ошибки | Vercel → Project → Logs |

---

## Чек-лист перед публикацией ролика

- [ ] Домен куплен и резолвится на Vercel
- [ ] SSL зелёный замочек на natashabrovkina.com
- [ ] Все 9 страниц открываются, drag-slider работает
- [ ] /tool?demo=medea показывает ДО/ПОСЛЕ
- [ ] Студия magic URL: ввести `medeadent.tilda.ws` → получить лендинг
- [ ] /tool?demo=medea + agent=copy показывает pre-recorded ответ
- [ ] /waitlist форма принимает ввод и показывает «ты №N»
- [ ] OG-image отображается при шеринге ссылки в Telegram (проверить через [opengraph.xyz](https://www.opengraph.xyz))
- [ ] favicon в табе браузера
- [ ] Mobile-вид у ВСЕХ страниц проверен на 375×812
- [ ] Hero не обрезается, navbar не обрезается

---

## Что НЕ деплоить публично

| Не |
|---|
| `.env.local` (есть в .gitignore) |
| `.playwright-auth.json` (есть в .gitignore) |
| `temp_screenshots/`, `temp_research/`, `temp_wordstat/` |

Все эти пути в `.gitignore` — ничего лишнего не уйдёт в репо.
