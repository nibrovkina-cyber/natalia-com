import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import Kicker from "../../components/Kicker";
import Reveal from "../../components/Reveal";
import Link from "next/link";

export const metadata = {
  title: "Маркетинговый отдел · 16 AI-агентов · natashabrovkina.com",
  description: "Шестнадцать специализированных AI-агентов по direct response методологии Ogilvy, Schwartz, Hopkins. Позиционирование, копирайтинг, SEO, таргет, email, воронки — один инструмент вместо отдела.",
  keywords: ["AI-агенты маркетинг", "маркетинговый отдел", "Ogilvy", "Schwartz", "Hopkins", "AI копирайтер", "AI SEO", "AI таргетолог"],
  alternates: { canonical: "https://natashabrovkina.com/team" },
  openGraph: {
    title: "16 AI-агентов · Маркетинговый отдел",
    description: "Шестнадцать специалистов. Один инструмент.",
    url: "https://natashabrovkina.com/team",
    type: "article",
    locale: "ru_RU",
  },
};

const METHOD_COLORS: Record<string, string> = {
  Ogilvy: "var(--gold)",
  Schwartz: "var(--mint)",
  Hopkins: "var(--steel)",
};

const AGENTS = [
  {
    n: "I",
    role: "Позиционирование",
    method: "Ogilvy",
    note: "Находит угол, который отличает от всех",
    detail: "Анализирует рынок, конкурентов, аудиторию. Формулирует уникальное торговое предложение по Ogilvy — конкретно, проверяемо, без пустых прилагательных.",
  },
  {
    n: "II",
    role: "Копирайтер",
    method: "Schwartz",
    note: "Прямой отклик по Schwartz и Hopkins",
    detail: "Тексты под уровень осознанности аудитории. Заголовки, лиды, CTA — по структуре Breakthrough Advertising. Каждое утверждение подкреплено цифрой.",
  },
  {
    n: "III",
    role: "Лендинг / CRO",
    method: "Hopkins",
    note: "Аудит и переписка страниц",
    detail: "Находит где страница теряет конверсию. Переписывает секции по Scientific Advertising: гипотеза → тест → цифра. Без дизайна — только копирайтинг и структура.",
  },
  {
    n: "IV",
    role: "Лид-магнит",
    method: "Ogilvy",
    note: "Оффер который скачивают + BUILD MODE",
    detail: "Создаёт лид-магниты которые реально скачивают: чеклисты, гайды, шаблоны. BUILD MODE — автоматически генерирует PDF-контент под нишу.",
  },
  {
    n: "V",
    role: "SEO-специалист",
    method: "Hopkins",
    note: "Яндекс · Google · GEO для AI-поиска",
    detail: "Кластеры ключевых слов, метаданные, структура H1-H6. GEO-оптимизация для AI Overviews и ChatGPT Search. Аудит конкурентов по трафику.",
  },
  {
    n: "VI",
    role: "Таргетолог",
    method: "Schwartz",
    note: "VK Ads + Яндекс.Директ креативы",
    detail: "Аудитории, форматы, тексты объявлений. Уровни осознанности по Schwartz для каждой группы. A/B тексты заголовков по Ogilvy-принципам.",
  },
  {
    n: "VII",
    role: "Telegram / VK",
    method: "Ogilvy",
    note: "Контент-план 30 дней + маркировка",
    detail: "Редполитика канала, контент-план на месяц, тексты постов. Маркировка рекламы по закону. Рубрики, голос бренда, вовлечение аудитории.",
  },
  {
    n: "VIII",
    role: "Email-маркетолог",
    method: "Hopkins",
    note: "Welcome, nurture, запуск — серии",
    detail: "Welcome-серия, прогрев, письма запуска. Строится по Hopkins: заголовок обещает, тело доказывает, CTA одно и конкретное. Сегментация по поведению.",
  },
  {
    n: "IX",
    role: "Атомайзер",
    method: "Ogilvy",
    note: "1 пост → 15 форматов для всех платформ",
    detail: "Берёт одну идею и разворачивает под каждую платформу: Instagram Reels, Telegram, LinkedIn, TikTok, YouTube Shorts, email-дайджест. Сохраняет голос бренда.",
  },
  {
    n: "X",
    role: "Аналитик конкурентов",
    method: "Schwartz",
    note: "Разведка по 10 пунктам + позиционирование",
    detail: "Анализирует 10 конкурентов: оффер, аудитория, канал продаж, уровень осознанности по Schwartz. Находит рыночный пробел для дифференциации.",
  },
  {
    n: "XI",
    role: "Funnel-стратег",
    method: "Schwartz",
    note: "Карта воронки: где теряют, где растут",
    detail: "Строит карту воронки от первого касания до оплаты. Идентифицирует узкие места, предлагает офферы под каждый этап. Метрики конверсии на каждом шаге.",
  },
  {
    n: "XII",
    role: "Launch-плейбук",
    method: "Ogilvy",
    note: "Запуск продукта по фазам 30-60-90",
    detail: "Пошаговый план запуска: прогрев за 30 дней, открытие продаж, дожимы. Каждая фаза с конкретными действиями, текстами, метриками успеха.",
  },
  {
    n: "XIII",
    role: "Бренд-войс",
    method: "Ogilvy",
    note: "Tone of voice + гайдлайны письма",
    detail: "Гайдлайн голоса бренда: как звучите, что никогда не говорите, примеры на каждое правило. Проверяет готовые тексты на соответствие голосу.",
  },
  {
    n: "XIV",
    role: "Newsletter-редактор",
    method: "Schwartz",
    note: "Издательская подача для подписок",
    detail: "Еженедельные письма в стиле журнальных редакторов: тема, угол, структура. Строит доверие через экспертизу, не через продажи. Удержание аудитории.",
  },
  {
    n: "XV",
    role: "Веб-дизайнер",
    method: "Hopkins",
    note: "Премиум-лендинг за 60 секунд из URL",
    detail: "Анализирует сайт конкурента или клиента по URL. Выдаёт полный дизайн-бриф: цвета, типографика, структура секций, рекомендации по конверсии.",
  },
  {
    n: "XVI",
    role: "Коммерческий",
    method: "Hopkins",
    note: "Предложения и договоры для клиентов",
    detail: "Коммерческие предложения по структуре Hopkins: проблема — доказательство — оффер — гарантия. Шаблоны договоров, NDA, акты. Деловой стиль без воды.",
  },
];

export default function TeamPage() {
  return (
    <div style={{ background: "var(--cream)", color: "var(--navy)", minHeight: "100vh" }}>
      <SiteNav variant="light" />

      <main>
        {/* HERO */}
        <section
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            padding: "120px 48px 100px",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <Kicker withDot>Маркетинговый отдел</Kicker>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(38px, 7vw, 96px)",
              lineHeight: 0.98,
              letterSpacing: "-0.025em",
              fontWeight: 500,
              marginTop: 28,
              maxWidth: 1000,
            }}
          >
            Шестнадцать специалистов.{" "}
            <span style={{ fontStyle: "italic", color: "var(--steel)" }}>
              Один инструмент.
            </span>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 19,
              lineHeight: 1.7,
              color: "var(--steel)",
              fontStyle: "italic",
              maxWidth: 680,
              marginTop: 36,
            }}
          >
            Вместо того чтобы нанимать бренд-стратега, копирайтера, SEO-специалиста,
            таргетолога по очереди. Они работают вместе, знают твой бизнес,
            не&nbsp;уходят в&nbsp;отпуск.
          </p>

          {/* Method legend */}
          <div
            style={{
              display: "flex",
              gap: 40,
              marginTop: 56,
              flexWrap: "wrap",
            }}
          >
            {[
              { color: "var(--gold)", label: "Ogilvy", sub: "заголовки решают 80%" },
              { color: "var(--mint)", label: "Schwartz", sub: "5 уровней осознанности" },
              { color: "var(--steel)", label: "Hopkins", sub: "цифры вместо прилагательных" },
            ].map((m) => (
              <div key={m.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: m.color,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      color: m.color,
                    }}
                  >
                    {m.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.1em",
                      color: "var(--steel)",
                      marginLeft: 8,
                    }}
                  >
                    — {m.sub}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AGENTS GRID */}
        <section style={{ padding: "100px 48px 160px" }}>
          <div style={{ maxWidth: 1440, margin: "0 auto" }}>
            <div
              className="team-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 0,
                borderTop: "1px solid var(--line)",
                borderLeft: "1px solid var(--line)",
              }}
            >
              {AGENTS.map((a, i) => (
                <Reveal key={i} delay={40 + (i % 8) * 30}>
                  <div
                    className="team-card"
                    style={{
                      padding: "36px 32px 36px",
                      borderRight: "1px solid var(--line)",
                      borderBottom: "1px solid var(--line)",
                      background: "var(--cream)",
                      transition: "background .3s ease",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Header row */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        marginBottom: 20,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontStyle: "italic",
                          fontSize: 24,
                          color: "var(--gold)",
                          fontWeight: 500,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {a.n}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 9,
                          color: METHOD_COLORS[a.method] || "var(--steel)",
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          fontWeight: 600,
                        }}
                      >
                        {a.method}
                      </span>
                    </div>

                    {/* Role */}
                    <div
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: 20,
                        fontWeight: 500,
                        color: "var(--navy)",
                        letterSpacing: "-0.01em",
                        lineHeight: 1.2,
                        marginBottom: 10,
                      }}
                    >
                      {a.role}
                    </div>

                    {/* Short note */}
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        letterSpacing: "0.06em",
                        color: "var(--steel)",
                        lineHeight: 1.5,
                        marginBottom: 20,
                      }}
                    >
                      {a.note}
                    </div>

                    {/* Detail */}
                    <div
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: 14,
                        lineHeight: 1.65,
                        color: "var(--steel)",
                        fontStyle: "italic",
                        flexGrow: 1,
                        borderTop: "1px solid var(--line)",
                        paddingTop: 16,
                      }}
                    >
                      {a.detail}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            borderTop: "1px solid var(--line)",
            background: "var(--navy)",
            color: "var(--cream)",
            padding: "120px 48px",
          }}
        >
          <div
            style={{
              maxWidth: 800,
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <Reveal>
              <Kicker><span style={{ color: "var(--mint)" }}>Следующий шаг</span></Kicker>
            </Reveal>
            <Reveal delay={80}>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(32px, 4vw, 56px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  fontWeight: 500,
                  marginTop: 24,
                }}
              >
                Бесплатный AIOS-аудит
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 18,
                  lineHeight: 1.7,
                  color: "rgba(245,243,239,0.72)",
                  fontStyle: "italic",
                  marginTop: 24,
                  maxWidth: 520,
                  margin: "24px auto 0",
                }}
              >
                Разберу твой бизнес, определю какие из 16 агентов нужны прямо сейчас
                и покажу с чего начать.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div style={{ marginTop: 48, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                <Link
                  href="/waitlist"
                  style={{
                    display: "inline-block",
                    padding: "16px 40px",
                    background: "var(--gold)",
                    color: "var(--navy)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "opacity .2s",
                  }}
                >
                  Записаться на аудит
                </Link>
                <Link
                  href="/"
                  style={{
                    display: "inline-block",
                    padding: "16px 40px",
                    border: "1px solid rgba(245,243,239,0.24)",
                    color: "var(--cream)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "border-color .2s",
                  }}
                >
                  На главную
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
      <style>{`
        @media (max-width: 1100px) {
          .team-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 860px) {
          .team-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .team-grid { grid-template-columns: 1fr !important; }
          main section { padding-left: 24px !important; padding-right: 24px !important; }
        }
        .team-card:hover { background: rgba(13,27,42,0.04) !important; }
      `}</style>
    </div>
  );
}
