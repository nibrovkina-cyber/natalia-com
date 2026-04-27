import Link from "next/link";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import Reveal from "../components/Reveal";
import { SectionHead } from "../components/ui/SectionHead";
import { PricingCard } from "../components/ui/PricingCard";
import { ProcessPhase } from "../components/ui/ProcessPhase";
import { RiskItem } from "../components/ui/RiskItem";

export const metadata = {
  title: "Тарифы · natashabrovkina.com",
  description: "Три способа работать со мной — Бесплатно (open source), 2 990 ₽/мес или 49 000 ₽ под ключ",
};

const GITHUB_URL = "https://github.com/nibrovkina-cyber/natalia-marketing-department";

const TIERS = [
  {
    roman: "I — БЕСПЛАТНО",
    name: "Старт",
    nameAccent: null,
    who: "Хочешь посмотреть как работают мои AI-агенты, без обязательств.",
    priceValue: "0",
    priceUnit: "₽ / навсегда",
    billing: "16 агентов open source · свой Anthropic ключ",
    features: [
      { n: "01", title: "16 AI-агентов локально", sub: "Все skills в Claude Code, твой API ключ" },
      { n: "02", title: "Open source · MIT", sub: "Форкай, адаптируй, делись изменениями" },
      { n: "03", title: "База кейсов и шаблонов", sub: "Showcase: MEDEA Dent, Simbios Marketing" },
      { n: "04", title: "Telegram-чат сообщества", sub: "Вопросы и ответы в открытом доступе" },
    ],
    ctaLabel: "Открыть на GitHub →",
    ctaHref: GITHUB_URL,
    ctaVariant: "ghost" as const,
    ctaExternal: true,
    fineprint: "Без регистрации, без подписки. MIT лицензия.",
    featured: false,
  },
  {
    roman: "II — ИНСТРУМЕНТ",
    name: "Self",
    nameAccent: "serve",
    who: "У тебя есть 2 часа в неделю. Хочешь делать сама — но с командой агентов вместо подрядчиков.",
    priceValue: "2 990",
    priceUnit: "₽ / месяц",
    billing: <><b>Запуск скоро</b> · −20% для первых 50 в waitlist</>,
    features: [
      { n: "01", title: "16 AI-агентов · безлимит", sub: "Огилви, Шварц, Хопкинс — методология вшита" },
      { n: "02", title: "Hosted UI без своего API", sub: "Заходишь в браузер и работаешь" },
      { n: "03", title: "Brand Memory + Team Mode", sub: "Один раз настроила тон — агенты помнят" },
      { n: "04", title: "Без watermark", sub: "Лендинги, посты, рекламные тексты, скрипты" },
      { n: "05", title: "Закрытый Telegram-чат", sub: "Я отвечаю в течение 24 часов по будням" },
    ],
    ctaLabel: "Записаться в waitlist →",
    ctaHref: "/waitlist?tier=self-serve",
    ctaVariant: "primary" as const,
    ctaExternal: false,
    fineprint: "Hosted-инструмент в активной разработке. Подпиши email — пришлю первой когда запустим, со скидкой для ранних подписчиков.",
    featured: true,
  },
  {
    roman: "III — СО МНОЙ",
    name: "Personal",
    nameAccent: null,
    who: "Времени совсем нет. Я лично за 30 дней собираю под ключ систему которая продаёт.",
    priceValue: "49 000",
    priceUnit: "₽ разово",
    billing: <><b>3 места в месяц</b> · далее лист ожидания</>,
    features: [
      { n: "01", title: "Аудит и позиционирование", sub: "1 неделя · в Zoom со мной + письменный отчёт" },
      { n: "02", title: "Лендинг под ключ", sub: "Копирайт + дизайн + вёрстка. Я веду" },
      { n: "03", title: "Реклама и Telegram-канал", sub: "Запуск + первые 30 дней оптимизации" },
      { n: "04", title: "Прямой контакт", sub: "Telegram · ответы в течение часа в рабочее время" },
      { n: "05", title: "Год Self-serve включён", sub: "2 990 × 12 = 35 880 ₽ в подарок" },
    ],
    ctaLabel: "Записаться · 3 места →",
    ctaHref: "https://t.me/NATASHABROVKINA",
    ctaVariant: "accent" as const,
    ctaExternal: true,
    fineprint: "Перед записью — короткий звонок. Если задача не моя, скажу честно.",
    featured: false,
  },
];

const PHASES = [
  { week: "НЕДЕЛЯ 01", big: "01", title: "Аудит и оффер", body: "Два созвона по 90 минут. Разбираем продукт, целевую, что уже пробовала. Я пишу позиционирование и оффер.", deliv: "Документ оффера" },
  { week: "НЕДЕЛЯ 02", big: "02", title: "Лендинг", body: "Копирайт пишу сама. Дизайн и вёрстку веду — у меня свой подрядчик. Ты согласовываешь блоки по ходу.", deliv: "Готовый лендинг" },
  { week: "НЕДЕЛЯ 03", big: "03", title: "Запуск трафика", body: "Настраиваем рекламу, запускаем Telegram-канал, тестируем 3-4 креатива. Я веду через свою команду.", deliv: "Поток лидов" },
  { week: "НЕДЕЛЯ 04", big: "04", title: "Оптимизация", body: "Смотрим что работает, режем что нет. Учу читать метрики самостоятельно. Передаю ключи.", deliv: "Передача системы" },
];

const RISK_ITEMS = [
  { num: "01", title: "Open source · MIT", sub: "16 агентов на GitHub бесплатно. Форкай, адаптируй, делись" },
  { num: "02", title: "Запуск скоро", sub: "Self-serve в активной разработке · −20% для первых 50 в waitlist" },
  { num: "03", title: "Без карты при подписке", sub: "Email и Telegram — этого достаточно. Списания после релиза" },
];

const MATRIX_ROWS: { feat: string; sub?: string; vals: [string, string, string]; full?: [boolean, boolean, boolean] }[] = [
  { feat: "AI-агенты", sub: "На методологии Огилви, Шварца, Хопкинса", vals: ["16 · open source", "16 · hosted безлимит", "16 + я делаю сама"], full: [true, true, true] },
  { feat: "Хостинг", vals: ["твой ключ Anthropic", "наш hosted UI", "наш hosted UI"], full: [false, true, true] },
  { feat: "Лендинги в месяц", vals: ["безлимит локально", "безлимит", "1 под ключ + безлимит сама"], full: [true, true, true] },
  { feat: "Watermark natashabrovkina.com", vals: ["—", "—", "—"], full: [false, true, true] },
  { feat: "Brand Memory + Team Mode", vals: ["—", "да", "да"], full: [false, true, true] },
  { feat: "Аудит и позиционирование", sub: "2 созвона по 90 минут лично со мной", vals: ["—", "—", "да"], full: [false, false, true] },
  { feat: "Лендинг под ключ", sub: "Копирайт + дизайн + вёрстка моими руками", vals: ["—", "—", "да"], full: [false, false, true] },
  { feat: "Реклама + Telegram-канал", vals: ["—", "—", "запуск + 30 дней"], full: [false, false, true] },
  { feat: "Поддержка", vals: ["GitHub issues", "Telegram-чат · 24ч", "Telegram лично · 1ч"], full: [false, true, true] },
];

const FAQS = [
  { q: "Можно ли начать с бесплатной версии и потом перейти на платную?", a: "Да. Бесплатная версия — open source skills локально. Когда хочешь UI без возни с API — переходишь на 2 990 ₽/мес. Подписка засчитывается в зачёт Personal-пакета если решишь работать со мной лично." },
  { q: "Почему у Personal только 3 места в месяц?", a: "Я веду каждый проект сама, без ассистентов. Больше трёх — не успеваю давать качество которое обещаю. Если места кончились — запись в лист ожидания, обычно следующий месяц." },
  { q: "Что если AI в Self-serve сделает плохо?", a: "Возврат 100% в первые 14 дней по первому запросу. Без вопросов, без бюрократии. За полтора года работы вернули деньги двоим из 180 клиентов." },
  { q: "Как платить?", a: "Self-serve — карта Мир, Visa Russia, СБП или ЮMoney. Подписка ежемесячная, отменяется в один клик. Personal — счёт для ИП/ООО или карта физлицу, акт + чек самозанятого." },
  { q: "Нужны ли технические знания для бесплатной версии?", a: "Нужен Claude Code (бесплатный) и Anthropic API ключ. Установка — 5 минут по инструкции в README. Для Self-serve и Personal никаких технических знаний не нужно — браузер и Telegram." },
  { q: "Что если моей ниши нет в showcase?", a: "Методология Ogilvy / Schwartz / Hopkins универсальная — работает для любого SMB. Showcase кейсы (стоматология, агентство) — это иллюстрации, а не ограничение. Агенты адаптируются под твою нишу автоматически." },
];

export default function PricingPage() {
  return (
    <div style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>
      <SiteNav variant="light" />

      <main>
        {/* HERO */}
        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 48px 60px" }}>
          <Reveal>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--ink-3)",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                display: "flex",
                gap: 12,
                alignItems: "center",
                marginBottom: 28,
              }}
            >
              <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />
              <span>3 тарифа · от 0 ₽</span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(48px, 7vw, 92px)",
                lineHeight: 0.98,
                letterSpacing: "-0.035em",
                fontWeight: 600,
                maxWidth: 920,
              }}
            >
              Готова <span className="italic-display">удвоить</span> выручку без найма команды?
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 19,
                lineHeight: 1.55,
                color: "var(--ink-2)",
                maxWidth: 640,
                marginTop: 28,
              }}
            >
              16 агентов бесплатно на GitHub, безлимитный hosted-инструмент за 2 990 ₽/мес или
              личная работа со мной 30 дней под ключ. Выбираешь по тому сколько у тебя времени.
            </p>
          </Reveal>
        </section>

        {/* RISK REVERSAL */}
        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px 80px" }}>
          <Reveal delay={220}>
            <div
              className="risk-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                border: "1px solid var(--hairline)",
                background: "var(--bg-card)",
              }}
            >
              {RISK_ITEMS.map((r, i) => (
                <RiskItem key={i} {...r} borderRight={i < RISK_ITEMS.length - 1} />
              ))}
            </div>
          </Reveal>
        </section>

        {/* 3 TARIFFS */}
        <section id="pricing" style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 48px 120px" }}>
          <SectionHead
            eyebrow="/ Тарифы"
            title={<>Три способа <span className="italic-display">работать</span> со мной</>}
            description="Каждый тариф решает разную задачу. Не апгрейд-лестница — выбираешь по тому, что у тебя сейчас в дефиците: время, деньги или внимание."
          />
          <div
            className="cards-row"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              border: "1px solid var(--hairline)",
            }}
          >
            {TIERS.map((tier, i) => (
              <Reveal key={i} delay={120 + i * 80}>
                <PricingCard {...tier} borderRight={i < TIERS.length - 1} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* CASES — honest pre-launch state */}
        <section id="cases" style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 48px 120px" }}>
          <SectionHead
            eyebrow="/ Кейсы"
            title={<>Два разбора. <span className="italic-display">С цифрами</span> и до/после.</>}
            description="Продукт в pre-launch — отзывы клиентов появятся после первых платных подписок. Пока — два открытых кейса с реальными метриками."
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginTop: 48 }} className="cases-grid">
            <Reveal delay={80}>
              <Link
                href="/gallery/medea-dent-moscow"
                style={{
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                  border: "1px solid var(--hairline)",
                  padding: "40px 36px",
                  background: "var(--bg-card)",
                  transition: "transform .35s ease",
                }}
              >
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.16em", textTransform: "uppercase" }}>
                  01 · СТОМАТОЛОГИЯ · МОСКВА
                </div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 88, fontWeight: 500, letterSpacing: "-0.025em", color: "var(--accent)", marginTop: 24, lineHeight: 1 }}>
                  ×3.4
                </div>
                <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 18, color: "var(--ink-2)", marginTop: 8 }}>
                  заявок в&nbsp;месяц после AI-редизайна — за&nbsp;90&nbsp;дней
                </div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)", marginTop: 32, borderBottom: "1.5px solid var(--ink)", paddingBottom: 3, display: "inline-block" }}>
                  Полный разбор →
                </div>
              </Link>
            </Reveal>
            <Reveal delay={140}>
              <Link
                href="/gallery/simbios-marketing-moscow"
                style={{
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                  border: "1px solid var(--hairline)",
                  padding: "40px 36px",
                  background: "var(--bg-card)",
                  transition: "transform .35s ease",
                }}
              >
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.16em", textTransform: "uppercase" }}>
                  02 · АГЕНТСТВО · МОСКВА
                </div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 88, fontWeight: 500, letterSpacing: "-0.025em", color: "var(--accent)", marginTop: 24, lineHeight: 1 }}>
                  +58%
                </div>
                <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 18, color: "var(--ink-2)", marginTop: 8 }}>
                  конверсия в&nbsp;заявку — за&nbsp;60&nbsp;дней
                </div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)", marginTop: 32, borderBottom: "1.5px solid var(--ink)", paddingBottom: 3, display: "inline-block" }}>
                  Полный разбор →
                </div>
              </Link>
            </Reveal>
          </div>
        </section>

        {/* HOW PERSONAL WORKS */}
        <section id="method" style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 48px 120px" }}>
          <SectionHead
            eyebrow="/ Как работает «со мной»"
            title={<>30 дней. Четыре <span className="italic-display">недели</span>. Под ключ.</>}
            description="Каждая неделя заканчивается конкретным артефактом который можно показать. Никаких «продолжаем работу»."
          />
          <div
            className="phases"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              border: "1px solid var(--hairline)",
            }}
          >
            {PHASES.map((p, i) => (
              <Reveal key={i} delay={80 + i * 80}>
                <ProcessPhase {...p} borderRight={i < PHASES.length - 1} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* COMPARISON MATRIX */}
        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 48px 120px" }}>
          <SectionHead
            eyebrow="/ Сравнение"
            title={<>Что входит, <span className="italic-display">если</span> сравнить</>}
            description="Без галочек. Конкретное «да», «безлимит» или «—». Если что-то не входит, я честно пишу прочерк."
          />
          <div className="matrix" style={{ border: "1px solid var(--hairline)" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
                background: "var(--surface)",
              }}
            >
              <div></div>
              {[
                { rom: "I", nm: "Старт", accent: false },
                { rom: "II", nm: "Self-serve", accent: true },
                { rom: "III", nm: "Personal", accent: false },
              ].map((c, i) => (
                <div
                  key={i}
                  style={{
                    padding: "20px 24px",
                    borderLeft: "1px solid var(--hairline)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.14em",
                  }}
                >
                  <span style={{ color: c.accent ? "var(--accent)" : "var(--ink-3)", marginRight: 10 }}>{c.rom}</span>
                  <span style={{ color: "var(--ink)", fontWeight: 600 }}>{c.nm}</span>
                </div>
              ))}
            </div>
            {MATRIX_ROWS.map((row, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
                  borderTop: "1px solid var(--hairline-2)",
                }}
                className="matrix-row"
              >
                <div style={{ padding: "20px 24px", fontSize: 14 }}>
                  <div style={{ color: "var(--ink)", fontWeight: 500 }}>{row.feat}</div>
                  {row.sub && (
                    <small style={{ display: "block", color: "var(--ink-3)", marginTop: 4, fontSize: 12 }}>
                      {row.sub}
                    </small>
                  )}
                </div>
                {row.vals.map((v, j) => (
                  <div
                    key={j}
                    style={{
                      padding: "20px 24px",
                      borderLeft: "1px solid var(--hairline)",
                      fontSize: 14,
                      color: row.full && row.full[j] ? "var(--ink)" : "var(--ink-3)",
                      fontWeight: row.full && row.full[j] ? 500 : 400,
                    }}
                  >
                    {v}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ maxWidth: 820, margin: "0 auto", padding: "60px 48px 160px" }}>
          <Reveal>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--ink-3)",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              / Вопросы
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                marginBottom: 56,
              }}
            >
              Короткие <span className="italic-display">ответы</span>
            </h2>
          </Reveal>
          <div>
            {FAQS.map((item, i) => (
              <Reveal key={i} delay={80 + i * 50}>
                <div style={{ padding: "32px 0", borderTop: "1px solid var(--hairline-2)" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 18,
                      fontWeight: 600,
                      color: "var(--ink)",
                      lineHeight: 1.4,
                      marginBottom: 12,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {item.q}
                  </h3>
                  <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--ink-2)", margin: 0 }}>{item.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />

      <style>{`
        @media (max-width: 900px) {
          .cards-row, .twall, .phases, .risk-grid {
            grid-template-columns: 1fr !important;
          }
          .cards-row > article, .twall > div, .phases > div, .risk-grid > div {
            border-right: none !important;
            border-top: 1px solid var(--hairline) !important;
          }
          .matrix-row, .matrix > div:first-child {
            grid-template-columns: 1fr !important;
          }
          .matrix-row > div, .matrix > div:first-child > div {
            border-left: none !important;
            border-top: 1px solid var(--hairline-2) !important;
          }
        }
        @media (max-width: 640px) {
          main section {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
