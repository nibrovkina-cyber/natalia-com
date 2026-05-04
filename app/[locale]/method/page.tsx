import Link from "next/link";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import Kicker from "../../components/Kicker";
import Reveal from "../../components/Reveal";

export const metadata = {
  title: "Метод · Ogilvy / Schwartz / Hopkins · natashabrovkina.com",
  description: "Методология direct response школы которой 70 лет. David Ogilvy (заголовки решают 80%), Eugene Schwartz (5 уровней осознанности), Claude Hopkins (Scientific Advertising). Применена к 16 AI-агентам.",
  keywords: ["David Ogilvy", "Eugene Schwartz", "Claude Hopkins", "Breakthrough Advertising", "Scientific Advertising", "уровни осознанности", "direct response", "методология копирайтинга"],
  alternates: { canonical: "https://natashabrovkina.com/method" },
  openGraph: {
    title: "Метод · Ogilvy / Schwartz / Hopkins",
    description: "Direct response школа которой 70 лет — применена к AI-маркетингу для малого бизнеса.",
    url: "https://natashabrovkina.com/method",
    type: "article",
    locale: "ru_RU",
  },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Что такое 5 уровней осознанности по Eugene Schwartz?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Eugene Schwartz в книге Breakthrough Advertising (1966) выделил 5 уровней: Most Aware (готов покупать), Product Aware (знает продукт, сомневается), Solution Aware (выбирает между решениями), Problem Aware (знает боль, не знает решений), Unaware (не знает даже о проблеме). Каждый уровень требует своего текста, своего хука, своего CTA.",
      },
    },
    {
      "@type": "Question",
      name: "Что говорит David Ogilvy про заголовки?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "David Ogilvy в Confessions of an Advertising Man (1963): заголовок читают в 5 раз больше людей чем основной текст. Поэтому заголовок решает 80% успеха рекламы. Правила: называй аудиторию прямо, используй слово 'как', добавляй конкретику, тестируй негативные заголовки.",
      },
    },
    {
      "@type": "Question",
      name: "Что такое verifiable claims по Claude Hopkins?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Claude Hopkins в Scientific Advertising (1923): каждое утверждение должно быть проверяемым. Не 'высокое качество' — а '847 клиентов, 92% вернулись'. Не 'удваиваем продажи' — а '+43% к конверсии за 14 дней'. Конкретика вместо общих слов.",
      },
    },
    {
      "@type": "Question",
      name: "Чем AI-маркетинг по этой методологии отличается от ChatGPT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ChatGPT — универсальный AI без методологии. AI-агенты с встроенной методологией Ogilvy/Schwartz/Hopkins всегда: спрашивают на каком уровне осознанности находится аудитория перед написанием, дают 3-5 вариантов заголовка (а не один), блокируют попытки написать 'качественный' или 'эффективный' без verifiable claim.",
      },
    },
    {
      "@type": "Question",
      name: "Можно ли применить методологию без AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Да. Методология самодостаточна — её используют маркетологи 70 лет до появления AI. AI-агенты просто делают её применение быстрее: бриф клиента за 15 минут вместо 3 часов, лендинг за 60 секунд из URL.",
      },
    },
  ],
};

const SCHWARTZ_LEVELS = [
  {
    n: "I",
    name: "Most Aware",
    desc: "Знают тебя, готовы купить. Нужна только цена и срочность.",
    example: "«49 000 ₽ · три места в этом месяце · Telegram →»",
  },
  {
    n: "II",
    name: "Product Aware",
    desc: "Знают о продукте, сомневаются. Закрывать возражения, показывать отличия.",
    example: "«Чем отличается от ChatGPT Plus за $20?»",
  },
  {
    n: "III",
    name: "Solution Aware",
    desc: "Знают что решения существуют, выбирают между ними. Показать механизм.",
    example: "«Вместо агентства за 300 тысяч — AI-команда из 16 агентов за 2 990 ₽»",
  },
  {
    n: "IV",
    name: "Problem Aware",
    desc: "Знают боль, не знают решения. Называть боль точно.",
    example: "«Сайт красивый, а клиентов нет»",
  },
  {
    n: "V",
    name: "Unaware",
    desc: "Не знают даже о проблеме. Заходить через историю или провокацию.",
    example: "«Купила квартиру за 40% от рынка. Покажу как»",
  },
];

const OGILVY_RULES = [
  {
    title: "Заголовок — 80% бюджета рекламы",
    body: "Пять из шести читателей смотрят только заголовок. Если заголовок не остановил — остальной текст не прочитан. Слабый заголовок = 80% бюджета в помойку.",
  },
  {
    title: "Называть аудиторию прямо",
    body: "«Для владельцев стоматологий в Москве» работает в 2-4 раза лучше, чем «Для бизнеса». Ощущение «это обо мне» важнее изящного языка.",
  },
  {
    title: "Magnetic words",
    body: "«Как», «новый», «раскрытый», «бесплатно», «впервые», «секрет», «доказано». Каждое — повод у читателя задержаться на заголовке ещё на полсекунды.",
  },
  {
    title: "Sell the product, not the ad",
    body: "Красивый дизайн без результата — искусство, а не реклама. Reader's Digest на тонкой бумаге в серой обложке продавал лучше глянца — потому что заголовки держали.",
  },
  {
    title: "Proof over claims",
    body: "«Мы надёжные» не работает. «Страхуем ваш груз на 10 миллионов в компании X, которая выплатила 847 страховок за последний год» — работает.",
  },
];

const HOPKINS_PAIRS = [
  { weak: "Качественное обслуживание", strong: "Среднее время ответа — 3 минуты. 97% пациентов записались повторно." },
  { weak: "Доступные цены", strong: "Консультация 0 ₽. Лечение от 2 000 ₽, чек средний — 18 400 ₽." },
  { weak: "Опытные врачи", strong: "4 врача. 10-25 лет практики. 847 сложных случаев — закрыты без направлений." },
  { weak: "Индивидуальный подход", strong: "Каждое лечение начинается с 3D-снимка и плана на 3 визита вперёд." },
  { weak: "Современное оборудование", strong: "Cerec для коронок за визит. Intraoral-сканер без слепков. Лазер Waterlase." },
];

export default function MethodPage() {
  return (
    <div style={{ background: "var(--cream)", color: "var(--navy)", minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <SiteNav variant="light" />

      <main>
        {/* ============ HERO ============ */}
        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "120px 48px 80px" }}>
          <Reveal>
            <Kicker>Метод · 2026</Kicker>
          </Reveal>
          <Reveal delay={80}>
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(48px, 8vw, 128px)",
                lineHeight: 0.98,
                letterSpacing: "-0.025em",
                fontWeight: 500,
                marginTop: 28,
                maxWidth: 1120,
              }}
            >
              Три&nbsp;классика.{" "}
              <span style={{ fontStyle: "italic", color: "var(--steel)" }}>
                Одна дисциплина.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(18px, 1.6vw, 22px)",
                lineHeight: 1.65,
                color: "var(--steel)",
                maxWidth: 760,
                marginTop: 40,
                fontStyle: "italic",
              }}
            >
              Огилви, Шварц, Хопкинс&nbsp;— три автора, которые вместе продали печатной рекламой
              на&nbsp;десятки миллиардов долларов. Их&nbsp;правила&nbsp;— не&nbsp;теория.
              Это&nbsp;— научные протоколы, которые работают семьдесят лет и&nbsp;дальше.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 17,
                lineHeight: 1.75,
                color: "var(--navy)",
                maxWidth: 760,
                marginTop: 28,
              }}
            >
              На&nbsp;этой странице&nbsp;— не&nbsp;пересказ книг. Это&nbsp;— как именно каждый
              принцип превращается в&nbsp;правило работы AI-агента в&nbsp;natashabrovkina.com. И&nbsp;как
              ты&nbsp;можешь проверить любой маркетинговый материал&nbsp;— твой или&nbsp;агентства&nbsp;—
              по&nbsp;тем&nbsp;же&nbsp;критериям.
            </p>
          </Reveal>
        </section>

        {/* ============ I · OGILVY ============ */}
        <section
          style={{
            borderTop: "1px solid var(--line)",
            padding: "160px 48px",
          }}
        >
          <div style={{ maxWidth: 1120, margin: "0 auto" }}>
            <Reveal>
              <div style={{ display: "flex", alignItems: "baseline", gap: 32, flexWrap: "wrap" }}>
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: "clamp(56px, 6vw, 96px)",
                    color: "var(--gold)",
                    fontWeight: 500,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  I
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--steel)",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                    }}
                  >
                    David Ogilvy · 1911–1999
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(36px, 5vw, 68px)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.02em",
                      fontWeight: 500,
                      marginTop: 12,
                    }}
                  >
                    Отец современной рекламы
                  </h2>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(18px, 1.5vw, 22px)",
                  lineHeight: 1.75,
                  color: "var(--navy)",
                  marginTop: 64,
                  maxWidth: 820,
                }}
              >
                Огилви основал Ogilvy &amp; Mather в&nbsp;1948&nbsp;году с&nbsp;капиталом
                в&nbsp;6&nbsp;тысяч долларов. Через двадцать лет агентство стоило
                миллиард. Потому что он&nbsp;единственный в&nbsp;индустрии измерял
                рекламу, а&nbsp;не&nbsp;восторгался ей.
              </p>
            </Reveal>

            {/* Pull-quote */}
            <Reveal delay={160}>
              <blockquote
                style={{
                  borderLeft: "3px solid var(--gold)",
                  paddingLeft: 32,
                  margin: "80px 0",
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: "clamp(22px, 2.4vw, 34px)",
                  lineHeight: 1.4,
                  color: "var(--navy)",
                  letterSpacing: "-0.01em",
                  fontWeight: 500,
                  maxWidth: 820,
                }}
              >
                «Заголовок&nbsp;— это 80% бюджета вашей рекламы. Если&nbsp;ты
                написал слабый заголовок, ты&nbsp;потратил 80% бюджета впустую.»
              </blockquote>
            </Reveal>

            <Reveal delay={220}>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--mint)",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  marginBottom: 40,
                }}
              >
                Пять правил Огилви
              </div>
            </Reveal>

            <div style={{ borderTop: "1px solid var(--line)" }}>
              {OGILVY_RULES.map((rule, i) => (
                <Reveal key={i} delay={240 + i * 60}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "56px 1fr 1fr",
                      gap: 48,
                      padding: "32px 0",
                      borderBottom: "1px solid var(--line)",
                      alignItems: "baseline",
                    }}
                    className="rule-row"
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        fontSize: 22,
                        color: "var(--gold)",
                        fontWeight: 500,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "clamp(20px, 2vw, 26px)",
                          lineHeight: 1.25,
                          letterSpacing: "-0.015em",
                          fontWeight: 500,
                          margin: 0,
                        }}
                      >
                        {rule.title}
                      </h3>
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: 16,
                        lineHeight: 1.7,
                        color: "var(--steel)",
                        margin: 0,
                      }}
                    >
                      {rule.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={560}>
              <div
                style={{
                  marginTop: 80,
                  padding: "40px 48px",
                  background: "var(--cream-2)",
                  borderLeft: "3px solid var(--gold)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--mint)",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    marginBottom: 16,
                  }}
                >
                  Как это в natashabrovkina.com
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 18,
                    lineHeight: 1.7,
                    color: "var(--navy)",
                    margin: 0,
                  }}
                >
                  Агент-копирайтер не&nbsp;пишет один заголовок. Он&nbsp;пишет&nbsp;три
                  варианта по&nbsp;Огилви&nbsp;— (а)&nbsp;named-audience, (б)&nbsp;как+выгода+срок,
                  (в)&nbsp;против тренда. И&nbsp;объясняет почему каждый сработает
                  на&nbsp;конкретной аудитории. Ты&nbsp;получаешь не&nbsp;текст&nbsp;—
                  выбор с&nbsp;аргументацией.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ II · SCHWARTZ ============ */}
        <section
          style={{
            borderTop: "1px solid var(--line)",
            padding: "160px 48px",
            background: "var(--navy)",
            color: "var(--cream)",
          }}
        >
          <div style={{ maxWidth: 1120, margin: "0 auto" }}>
            <Reveal>
              <div style={{ display: "flex", alignItems: "baseline", gap: 32, flexWrap: "wrap" }}>
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: "clamp(56px, 6vw, 96px)",
                    color: "var(--gold)",
                    fontWeight: 500,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  II
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--mint)",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                    }}
                  >
                    Eugene Schwartz · 1927–1995
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(36px, 5vw, 68px)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.02em",
                      fontWeight: 500,
                      marginTop: 12,
                      color: "var(--cream)",
                    }}
                  >
                    Глубинный психолог рынка
                  </h2>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(18px, 1.5vw, 22px)",
                  lineHeight: 1.75,
                  color: "rgba(245,243,239,0.88)",
                  marginTop: 64,
                  maxWidth: 820,
                }}
              >
                Шварц написал «Breakthrough Advertising»&nbsp;— книгу, которую
                редко покупают за&nbsp;300 долларов в&nbsp;переиздании на&nbsp;Amazon.
                Её&nbsp;главное открытие&nbsp;— рекламные сообщения должны соответствовать
                уровню осознанности аудитории. На&nbsp;одну боль есть пять разных
                подходов&nbsp;— и&nbsp;четыре из&nbsp;них гарантированно провалятся.
              </p>
            </Reveal>

            <Reveal delay={160}>
              <blockquote
                style={{
                  borderLeft: "3px solid var(--gold)",
                  paddingLeft: 32,
                  margin: "80px 0",
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: "clamp(22px, 2.4vw, 34px)",
                  lineHeight: 1.4,
                  color: "var(--cream)",
                  letterSpacing: "-0.01em",
                  fontWeight: 500,
                  maxWidth: 820,
                }}
              >
                «Прежде чем написать хоть одно слово, ты&nbsp;должен знать&nbsp;—
                к&nbsp;кому пишешь. Каждый сегмент рынка находится на&nbsp;одном
                из&nbsp;пяти уровней осознанности, и&nbsp;это меняет всё.»
              </blockquote>
            </Reveal>

            <Reveal delay={220}>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--mint)",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  marginBottom: 40,
                }}
              >
                Пять уровней осознанности
              </div>
            </Reveal>

            <div style={{ borderTop: "1px solid rgba(245,243,239,0.1)" }}>
              {SCHWARTZ_LEVELS.map((level, i) => (
                <Reveal key={i} delay={240 + i * 60}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "56px 1fr 1.2fr",
                      gap: 48,
                      padding: "36px 0",
                      borderBottom: "1px solid rgba(245,243,239,0.1)",
                      alignItems: "baseline",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        fontSize: 22,
                        color: "var(--gold)",
                        fontWeight: 500,
                      }}
                    >
                      {level.n}
                    </span>
                    <div>
                      <h3
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "clamp(20px, 2vw, 26px)",
                          lineHeight: 1.25,
                          letterSpacing: "-0.015em",
                          fontWeight: 500,
                          margin: 0,
                          color: "var(--cream)",
                        }}
                      >
                        {level.name}
                      </h3>
                      <p
                        style={{
                          fontSize: 15,
                          lineHeight: 1.6,
                          color: "rgba(245,243,239,0.7)",
                          marginTop: 10,
                        }}
                      >
                        {level.desc}
                      </p>
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        fontSize: 18,
                        lineHeight: 1.55,
                        color: "var(--gold)",
                      }}
                    >
                      {level.example}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={560}>
              <div
                style={{
                  marginTop: 80,
                  padding: "40px 48px",
                  background: "rgba(245,243,239,0.04)",
                  borderLeft: "3px solid var(--mint)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--mint)",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    marginBottom: 16,
                  }}
                >
                  Как это в natashabrovkina.com
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 18,
                    lineHeight: 1.7,
                    color: "rgba(245,243,239,0.92)",
                    margin: 0,
                  }}
                >
                  До&nbsp;того как написать хоть слово, агент-позиционерщик спрашивает:
                  «На&nbsp;каком уровне осознанности твоя аудитория?» Если&nbsp;ты
                  не&nbsp;знаешь&nbsp;— он&nbsp;выдвигает гипотезу на&nbsp;основе ниши.
                  Копирайтер потом пишет текст под точный уровень&nbsp;— не&nbsp;«для
                  всех»&nbsp;— и&nbsp;ответ меняется радикально.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ III · HOPKINS ============ */}
        <section
          style={{
            borderTop: "1px solid var(--line)",
            padding: "160px 48px",
          }}
        >
          <div style={{ maxWidth: 1120, margin: "0 auto" }}>
            <Reveal>
              <div style={{ display: "flex", alignItems: "baseline", gap: 32, flexWrap: "wrap" }}>
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: "clamp(56px, 6vw, 96px)",
                    color: "var(--gold)",
                    fontWeight: 500,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  III
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--steel)",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                    }}
                  >
                    Claude Hopkins · 1866–1932
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(36px, 5vw, 68px)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.02em",
                      fontWeight: 500,
                      marginTop: 12,
                    }}
                  >
                    Инженер Scientific Advertising
                  </h2>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(18px, 1.5vw, 22px)",
                  lineHeight: 1.75,
                  color: "var(--navy)",
                  marginTop: 64,
                  maxWidth: 820,
                }}
              >
                Хопкинс создал купонную систему отклика в&nbsp;1907&nbsp;году&nbsp;—
                впервые в&nbsp;истории можно было измерить, какая реклама работает,
                а&nbsp;какая&nbsp;— нет. «Scientific Advertising» (1923) называют
                Библией&nbsp;— Огилви писал, что никто не&nbsp;имеет права заниматься
                рекламой, не&nbsp;прочитав её&nbsp;семь&nbsp;раз.
              </p>
            </Reveal>

            <Reveal delay={160}>
              <blockquote
                style={{
                  borderLeft: "3px solid var(--gold)",
                  paddingLeft: 32,
                  margin: "80px 0",
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: "clamp(22px, 2.4vw, 34px)",
                  lineHeight: 1.4,
                  color: "var(--navy)",
                  letterSpacing: "-0.01em",
                  fontWeight: 500,
                  maxWidth: 820,
                }}
              >
                «Реклама&nbsp;— это не&nbsp;искусство. Это&nbsp;— продавец в&nbsp;печати.
                Настоящий продавец не&nbsp;говорит «мы&nbsp;команда профессионалов».
                Он&nbsp;говорит&nbsp;— «из&nbsp;847&nbsp;клиентов 92% вернулись».»
              </blockquote>
            </Reveal>

            <Reveal delay={220}>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--mint)",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  marginBottom: 40,
                }}
              >
                Принцип — прилагательные → цифры
              </div>
            </Reveal>

            <div
              className="hopkins-pairs"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 0,
                borderTop: "1px solid var(--line)",
              }}
            >
              <div
                style={{
                  padding: "20px 32px",
                  borderBottom: "1px solid var(--line)",
                  borderRight: "1px solid var(--line)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--steel)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                Слабо · прилагательное
              </div>
              <div
                style={{
                  padding: "20px 32px",
                  borderBottom: "1px solid var(--line)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--gold)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                Сильно · цифра
              </div>
              {HOPKINS_PAIRS.map((p, i) => (
                <div key={i} style={{ display: "contents" }}>
                  <Reveal delay={260 + i * 50}>
                    <div
                      style={{
                        padding: "28px 32px",
                        borderBottom: "1px solid var(--line)",
                        borderRight: "1px solid var(--line)",
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        fontSize: 18,
                        lineHeight: 1.45,
                        color: "var(--steel)",
                      }}
                    >
                      {p.weak}
                    </div>
                  </Reveal>
                  <Reveal delay={260 + i * 50}>
                    <div
                      style={{
                        padding: "28px 32px",
                        borderBottom: "1px solid var(--line)",
                        fontFamily: "var(--font-serif)",
                        fontSize: 18,
                        lineHeight: 1.45,
                        color: "var(--navy)",
                      }}
                    >
                      {p.strong}
                    </div>
                  </Reveal>
                </div>
              ))}
            </div>

            <Reveal delay={600}>
              <div
                style={{
                  marginTop: 80,
                  padding: "40px 48px",
                  background: "var(--cream-2)",
                  borderLeft: "3px solid var(--gold)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--mint)",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    marginBottom: 16,
                  }}
                >
                  Как это в natashabrovkina.com
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 18,
                    lineHeight: 1.7,
                    color: "var(--navy)",
                    margin: 0,
                  }}
                >
                  Каждый агент, перед тем как выдать текст, проверяет&nbsp;— есть&nbsp;ли
                  в&nbsp;нём прилагательные «качественный», «профессиональный»,
                  «надёжный». Если есть&nbsp;— заменяет на&nbsp;цифру или удаляет.
                  Это правило встроено в&nbsp;системный промпт методологически,
                  а&nbsp;не&nbsp;ситуативно. Тебе не&nbsp;нужно просить «сделай
                  конкретнее»&nbsp;— агент сам никогда не&nbsp;выдаст абстракцию.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ CTA · try the tool ============ */}
        <section
          style={{
            borderTop: "1px solid var(--line)",
            padding: "160px 48px 180px",
            background: "var(--cream-2)",
          }}
        >
          <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
            <Reveal>
              <Kicker align="center">Применение</Kicker>
            </Reveal>
            <Reveal delay={80}>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(36px, 5vw, 68px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  fontWeight: 500,
                  marginTop: 28,
                }}
              >
                Три&nbsp;классика.{" "}
                <span style={{ fontStyle: "italic", color: "var(--steel)" }}>
                  Шестнадцать агентов.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(17px, 1.5vw, 20px)",
                  lineHeight: 1.7,
                  color: "var(--steel)",
                  marginTop: 36,
                  maxWidth: 620,
                  margin: "36px auto 0",
                  fontStyle: "italic",
                }}
              >
                Вся методология&nbsp;— не&nbsp;на&nbsp;этой странице. Она&nbsp;—
                в&nbsp;рабочем инструменте. Вставляешь URL, бриф&nbsp;— получаешь
                лендинг, в&nbsp;котором каждое правило уже применено.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <Link
                href="/tool"
                style={{
                  display: "inline-block",
                  marginTop: 56,
                  fontSize: 19,
                  fontWeight: 500,
                  color: "var(--navy)",
                  textDecoration: "none",
                  borderBottom: "2px solid var(--navy)",
                  paddingBottom: 5,
                }}
              >
                Попробовать инструмент →
              </Link>
            </Reveal>
            <Reveal delay={300}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "var(--steel)",
                  marginTop: 28,
                  letterSpacing: "0.06em",
                }}
              >
                без регистрации · первые 3 лендинга бесплатно
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />

      <style>{`
        @media (max-width: 900px) {
          .rule-row {
            grid-template-columns: 48px 1fr !important;
            gap: 24px !important;
          }
          .rule-row > p {
            grid-column: 2 / 3;
            margin-top: 12px;
          }
          .hopkins-pairs {
            grid-template-columns: 1fr !important;
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
