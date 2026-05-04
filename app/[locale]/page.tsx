import Link from "next/link";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import Kicker from "../components/Kicker";
import Reveal from "../components/Reveal";
import galleryData from "../../content/gallery.json";
import galleryDataEn from "../../content/gallery.en.json";
import { getDictionary } from "../i18n/get-dictionary";
import { type Locale, isLocale } from "../i18n/config";

type GalleryItem = {
  slug: string; title: string; niche: string; nicheLabel: string; city: string;
  originalUrl: string; beforeScreenshot: string; afterFile: string; description: string;
  rating: number | null; reviewCount: number | null; date: string; featured: boolean;
  metric?: { value: string; label: string; period: string };
  fixes: string[]; methodology: string[];
};
function getGalleryFeatured(locale: Locale) {
  const data = locale === "en" ? galleryDataEn : galleryData;
  return (data as GalleryItem[]).filter(g => g.featured).slice(0, 2);
}

const METHOD_COLORS: Record<string, string> = {
  Ogilvy: "var(--gold)",
  Schwartz: "var(--mint)",
  Hopkins: "var(--steel)",
};

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "ru";
  const dict = await getDictionary(locale);
  const galleryFeatured = getGalleryFeatured(locale);
  return (
    <div style={{ background: "var(--cream)", color: "var(--navy)", minHeight: "100vh" }}>
      <SiteNav variant="light" />

      <main>
        {/* ============ HERO — split: typography + product preview ============ */}
        <section
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            padding: "120px 48px 140px",
          }}
        >
          <div
            className="hero-split"
            style={{
              display: "grid",
              gridTemplateColumns: "1.3fr 1fr",
              gap: 80,
              alignItems: "center",
            }}
          >
            <div>
              {/* Above-the-fold контент БЕЗ Reveal — Lighthouse LCP / SEO crawler */}
              <Kicker withDot>{dict.home.hero.kicker}</Kicker>
              <h1
                className="hero-h1"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(34px, 7vw, 104px)",
                  lineHeight: 0.98,
                  letterSpacing: "-0.025em",
                  fontWeight: 500,
                  marginTop: 28,
                  overflowWrap: "break-word",
                  wordBreak: "normal",
                  hyphens: "auto",
                }}
              >
                {dict.home.hero.h1Line1}<br />
                <span
                  style={{
                    display: "block",
                    fontStyle: "italic",
                    color: "var(--steel)",
                    fontWeight: 500,
                    marginTop: 8,
                  }}
                >
                  {dict.home.hero.h1Line2}
                </span>
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 19,
                  lineHeight: 1.55,
                  color: "var(--steel)",
                  maxWidth: 540,
                  marginTop: 32,
                  fontWeight: 400,
                  }}
                >
                  {dict.home.hero.subhead}
                </p>
              <div
                className="hero-cta"
                style={{
                  display: "flex",
                  gap: 20,
                  marginTop: 44,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="https://github.com/nibrovkina-cyber/natalia-marketing-department"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    background: "var(--ink)",
                    color: "var(--bg)",
                    padding: "16px 26px",
                    borderRadius: 14,
                    fontSize: 15,
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "transform .2s ease, background .2s ease",
                    boxShadow: "0 8px 24px -12px rgba(31,27,22,0.4)",
                  }}
                >
                  {dict.home.hero.ctaPrimary}
                </a>
                <Link
                  href="/tool"
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                    color: "var(--ink)",
                    textDecoration: "none",
                    borderBottom: "1.5px solid var(--hairline)",
                    paddingBottom: 3,
                  }}
                >
                  {dict.home.hero.ctaSecondary}
                </Link>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--steel)",
                  marginTop: 24,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {dict.home.hero.ctaNote}
              </div>
            </div>

            {/* Product preview card — editorial tool empty-state mockup */}
            <Reveal delay={320}>
              <div
                className="hero-preview"
                style={{
                  background: "var(--navy)",
                  color: "var(--cream)",
                  borderRadius: 18,
                  padding: "40px 36px 44px",
                  boxShadow: "0 40px 80px -30px rgba(13,27,42,0.35), 0 0 0 1px rgba(13,27,42,0.04)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(ellipse at 100% 0%, rgba(200,183,156,0.12), transparent 55%), radial-gradient(ellipse at 0% 100%, rgba(91,191,165,0.08), transparent 55%)",
                    pointerEvents: "none",
                  }}
                />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: "rgba(245,243,239,0.55)",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      marginBottom: 32,
                    }}
                  >
                    <span>{dict.home.preview.domainLabel}</span>
                    <span style={{ color: "var(--mint)" }}>{dict.home.preview.statusLabel}</span>
                  </div>
                  <blockquote
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontSize: "clamp(22px, 2vw, 30px)",
                      lineHeight: 1.25,
                      color: "var(--cream)",
                      letterSpacing: "-0.015em",
                      fontWeight: 500,
                      margin: 0,
                    }}
                  >
                    {dict.home.preview.quote}
                  </blockquote>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "rgba(245,243,239,0.55)",
                      letterSpacing: "0.14em",
                      marginTop: 14,
                    }}
                  >
                    {dict.home.preview.quoteAuthor}
                  </div>
                  <div
                    style={{
                      borderTop: "1px solid rgba(245,243,239,0.1)",
                      marginTop: 32,
                      paddingTop: 28,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        color: "var(--mint)",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        fontWeight: 500,
                        marginBottom: 18,
                      }}
                    >
                      {dict.home.preview.agentsLabel}
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(8, 1fr)",
                        gap: 8,
                      }}
                    >
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div
                          key={i}
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: "var(--gold)",
                            opacity: 0.35,
                            animation: `heroDot 2.6s ease-in-out ${i * 0.16}s infinite`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <style>{`
                  @keyframes heroDot {
                    0%, 100% { opacity: 0.2; transform: scale(1); }
                    50% { opacity: 0.85; transform: scale(1.15); }
                  }
                `}</style>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ ESSAY — editorial longread with drop-cap ============ */}
        <section
          style={{
            borderTop: "1px solid var(--line)",
            padding: "160px 48px",
          }}
        >
          <div style={{ maxWidth: 820, margin: "0 auto" }}>
            <Reveal>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--steel)",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                }}
              >
                Эссе · Натальи Бровкиной · Апрель 2026
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(36px, 5vw, 72px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  fontWeight: 500,
                  marginTop: 28,
                }}
              >
                Почему я собрала AI-команду из&nbsp;шестнадцати агентов{" "}
                <span style={{ fontStyle: "italic", color: "var(--steel)" }}>
                  вместо найма маркетологов.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={160}>
              <p
                className="essay-lede"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(18px, 1.6vw, 22px)",
                  lineHeight: 1.75,
                  color: "var(--navy)",
                  marginTop: 56,
                  fontWeight: 400,
                }}
              >
                <span
                  className="drop-cap"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(84px, 9vw, 132px)",
                    lineHeight: 0.85,
                    fontStyle: "italic",
                    fontWeight: 500,
                    color: "var(--gold)",
                    float: "left",
                    marginRight: 18,
                    marginTop: 6,
                    marginBottom: -4,
                    letterSpacing: "-0.04em",
                  }}
                >
                  П
                </span>
                ять&nbsp;лет веду маркетинг для предпринимателей в&nbsp;России&nbsp;—
                от&nbsp;стоматологов в&nbsp;Подмосковье до&nbsp;SaaS-основателей, которые
                продают в&nbsp;США и&nbsp;Европу. За&nbsp;это время я&nbsp;увидела две
                закономерности, которые не&nbsp;уходят никуда.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(17px, 1.4vw, 20px)",
                  lineHeight: 1.8,
                  color: "var(--navy)",
                  marginTop: 32,
                }}
              >
                Первая: самые красивые сайты не&nbsp;продают. Клиент приходит
                с&nbsp;Tilda за&nbsp;80&nbsp;тысяч, которая визуально выглядит
                на&nbsp;три миллиона, и&nbsp;спрашивает&nbsp;— «почему не&nbsp;звонят?».
                Потому что сайт не&nbsp;был задачей. Задачей была продажа. Никто
                не&nbsp;спросил, кому это продаётся, какое возражение закрывает,
                почему заголовок читается таким равнодушным.
              </p>
            </Reveal>

            <Reveal delay={260}>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(17px, 1.4vw, 20px)",
                  lineHeight: 1.8,
                  color: "var(--navy)",
                  marginTop: 28,
                }}
              >
                Вторая: большинство маркетологов работает по&nbsp;чувству. Они
                не&nbsp;знают правил Огилви, не&nbsp;читали Шварца, не&nbsp;видели
                архив Хопкинса. Они пишут «качественные услуги от&nbsp;профессиональной
                команды», называют это «продающим текстом» и&nbsp;удивляются,
                что конверсия 0,4%.
              </p>
            </Reveal>

            {/* Pull-quote */}
            <Reveal delay={320}>
              <blockquote
                style={{
                  borderLeft: "3px solid var(--gold)",
                  paddingLeft: 32,
                  margin: "64px 0 64px",
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: "clamp(22px, 2.2vw, 32px)",
                  lineHeight: 1.4,
                  color: "var(--navy)",
                  letterSpacing: "-0.01em",
                  fontWeight: 500,
                  maxWidth: 680,
                }}
              >
                Методология&nbsp;— это контракт с&nbsp;AI. Без&nbsp;правил
                ChatGPT даёт пресный корпоративный текст. С&nbsp;правилами
                Огилви и&nbsp;Шварца&nbsp;— продаёт.
              </blockquote>
            </Reveal>

            <Reveal delay={360}>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(17px, 1.4vw, 20px)",
                  lineHeight: 1.8,
                  color: "var(--navy)",
                  marginTop: 28,
                }}
              >
                Когда появились серьёзные LLM&nbsp;— GPT-4, Claude&nbsp;— я&nbsp;поняла
                простую вещь. Работу исполнительного маркетолога AI&nbsp;может
                делать в&nbsp;десять раз быстрее. Но&nbsp;только если&nbsp;ты знаешь,
                что просить. Если идёшь в&nbsp;ChatGPT с&nbsp;фразой «напиши мне
                лендинг»,&nbsp;— получаешь пресный корпоративный текст, который
                никого ни&nbsp;в&nbsp;чём не&nbsp;убеждает.
              </p>
            </Reveal>

            <Reveal delay={420}>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(17px, 1.4vw, 20px)",
                  lineHeight: 1.8,
                  color: "var(--navy)",
                  marginTop: 28,
                }}
              >
                Я&nbsp;взяла три библиотеки правил, которые работают семьдесят&nbsp;лет.
                Огилви&nbsp;— на&nbsp;заголовки и&nbsp;правило 80/20. Шварц&nbsp;—
                на&nbsp;пять уровней осознанности аудитории. Хопкинс&nbsp;—
                на&nbsp;цифры вместо прилагательных. Собрала&nbsp;16 специализированных
                AI-агентов. Каждый не&nbsp;просто подсказывает текст. Он&nbsp;следует
                конкретным правилам. Копирайтер не&nbsp;пишет «лучшее качество»&nbsp;—
                он&nbsp;пишет «92% вернулись в&nbsp;течение года». Позиционерщик
                не&nbsp;даёт абстракцию «для всех»&nbsp;— сужает до&nbsp;конкретного
                сегмента, где продукт реально выигрывает.
              </p>
            </Reveal>

            <Reveal delay={480}>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(17px, 1.4vw, 20px)",
                  lineHeight: 1.8,
                  color: "var(--navy)",
                  marginTop: 28,
                }}
              >
                Это не&nbsp;ChatGPT с&nbsp;системным промптом. Это тридцать лет
                маркетинговой дисциплины, зашитые в&nbsp;инструмент. Я&nbsp;не&nbsp;продаю
                AI-хайп. Я&nbsp;продаю систему, которая работает, потому что
                не&nbsp;я&nbsp;её&nbsp;придумала. Я&nbsp;только собрала её&nbsp;для
                русского маркетингового рынка, где 80% агентств и&nbsp;фрилансеров
                работают по&nbsp;наитию.
              </p>
            </Reveal>

            <Reveal delay={540}>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(17px, 1.4vw, 20px)",
                  lineHeight: 1.8,
                  color: "var(--navy)",
                  marginTop: 28,
                }}
              >
                Если&nbsp;ты читаешь это сейчас и&nbsp;у&nbsp;тебя бизнес
                в&nbsp;России&nbsp;— твоя проблема не&nbsp;в&nbsp;отсутствии
                красивого сайта. Твоя проблема в&nbsp;том, что сайт написан
                человеком, который не&nbsp;знает правил. Покажи этот текст тому,
                кто делал твой текущий маркетинг, и&nbsp;спроси: на&nbsp;каком
                уровне осознанности Шварца была аудитория, когда писали hero?
                Какой приём Огилви использован в&nbsp;заголовке? Сравнима
                ли&nbsp;цифра в&nbsp;буллетах с&nbsp;бенчмарком, или&nbsp;она
                абстрактна?
              </p>
            </Reveal>

            <Reveal delay={600}>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(17px, 1.4vw, 20px)",
                  lineHeight: 1.8,
                  color: "var(--navy)",
                  marginTop: 28,
                }}
              >
                Если ответа нет&nbsp;— ты&nbsp;понимаешь, почему конверсия 0,4%.
              </p>
            </Reveal>

            <Reveal delay={660}>
              <div
                style={{
                  marginTop: 64,
                  paddingTop: 32,
                  borderTop: "1px solid var(--line)",
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "url('/assets/portrait.png') center 12%/cover, var(--cream-2)",
                    border: "1.5px solid var(--gold)",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontSize: 20,
                      color: "var(--navy)",
                      fontWeight: 500,
                    }}
                  >
                    — Наталья Бровкина
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--steel)",
                      marginTop: 4,
                      letterSpacing: "0.08em",
                    }}
                  >
                    AI Marketing Studio · Москва
                  </div>
                </div>
                <Link
                  href="/method"
                  style={{
                    marginLeft: "auto",
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: 18,
                    color: "var(--navy)",
                    textDecoration: "none",
                    borderBottom: "1px solid var(--navy)",
                    paddingBottom: 3,
                  }}
                >
                  Методология подробнее →
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ CASES — featured ============ */}
        <section
          style={{
            borderTop: "1px solid var(--line)",
            padding: "160px 48px",
            background: "var(--cream-2)",
          }}
        >
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <Reveal>
              <Kicker>Кейсы</Kicker>
            </Reveal>
            <Reveal delay={80}>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(36px, 5vw, 64px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  fontWeight: 500,
                  marginTop: 28,
                  maxWidth: 900,
                }}
              >
                Что AI-команда уже сделала{" "}
                <span style={{ fontStyle: "italic", color: "var(--steel)" }}>
                  для реальных бизнесов
                </span>
              </h2>
            </Reveal>

            <div
              className="cases-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 48,
                marginTop: 80,
              }}
            >
              {galleryFeatured.map((item, i) => (
                <Reveal key={item.slug} delay={120 + i * 80}>
                  <Link
                    href={`/gallery/${item.slug}`}
                    className="case-card"
                    style={{
                      display: "block",
                      textDecoration: "none",
                      color: "inherit",
                      background: "var(--cream)",
                      borderRadius: 2,
                      height: "100%",
                      overflow: "hidden",
                      transition: "transform .4s ease, box-shadow .4s ease",
                      boxShadow: "0 2px 8px rgba(13,27,42,0.04)",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        aspectRatio: "16 / 10",
                        overflow: "hidden",
                        background: "var(--navy)",
                      }}
                    >
                      <img
                        src={item.beforeScreenshot}
                        alt={item.title}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "top",
                          filter: "saturate(0.85)",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(180deg, transparent 60%, rgba(13,27,42,0.7) 100%)",
                        }}
                      />
                      {item.metric && (
                        <div
                          style={{
                            position: "absolute",
                            left: 28,
                            bottom: 24,
                            color: "var(--cream)",
                          }}
                        >
                          <div
                            style={{
                              fontFamily: "var(--font-serif)",
                              fontSize: "clamp(40px, 5vw, 64px)",
                              fontWeight: 500,
                              lineHeight: 0.95,
                              letterSpacing: "-0.025em",
                              color: "var(--gold)",
                            }}
                          >
                            {item.metric.value}
                          </div>
                          <div
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: 11,
                              letterSpacing: "0.14em",
                              textTransform: "uppercase",
                              color: "rgba(245,243,239,0.85)",
                              marginTop: 6,
                              maxWidth: 320,
                            }}
                          >
                            {item.metric.label} · {item.metric.period}
                          </div>
                        </div>
                      )}
                    </div>
                    <div style={{ padding: "36px 40px 40px" }}>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 11,
                          color: "var(--steel)",
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                        }}
                      >
                        {`${String(i + 1).padStart(2, "0")} — ${item.nicheLabel} · ${item.city}`}
                      </div>
                      <h3
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "clamp(26px, 2.6vw, 34px)",
                          lineHeight: 1.15,
                          letterSpacing: "-0.015em",
                          fontWeight: 500,
                          marginTop: 20,
                        }}
                      >
                        {item.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: 16,
                          lineHeight: 1.65,
                          color: "var(--steel)",
                          marginTop: 16,
                          fontStyle: "italic",
                          maxWidth: 480,
                        }}
                      >
                        {item.description}
                      </p>
                      <div
                        style={{
                          marginTop: 32,
                          paddingTop: 24,
                          borderTop: "1px solid var(--line)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: 16,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            color: "var(--navy)",
                            borderBottom: "1.5px solid var(--navy)",
                            paddingBottom: 3,
                          }}
                        >
                          Полный разбор кейса →
                        </span>
                        {item.rating && (
                          <span
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: 11,
                              color: "var(--steel)",
                              letterSpacing: "0.06em",
                            }}
                          >
                            ★ {item.rating.toFixed(1)} · {item.reviewCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>

            <Reveal delay={240}>
              <div style={{ marginTop: 80, textAlign: "center" }}>
                <Link
                  href="/gallery"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: 22,
                    color: "var(--navy)",
                    textDecoration: "none",
                    borderBottom: "1px solid var(--navy)",
                    paddingBottom: 4,
                  }}
                >
                  все кейсы →
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ 16 AGENTS — editorial index, not grid ============ */}
        <section
          style={{
            borderTop: "1px solid var(--line)",
            padding: "160px 48px",
          }}
        >
          <div style={{ maxWidth: 1120, margin: "0 auto" }}>
            <Reveal>
              <Kicker>Команда</Kicker>
            </Reveal>
            <Reveal delay={80}>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(36px, 5vw, 68px)",
                  lineHeight: 1.06,
                  letterSpacing: "-0.02em",
                  fontWeight: 500,
                  marginTop: 28,
                  maxWidth: 880,
                }}
              >
                Шестнадцать специалистов.{" "}
                <span style={{ fontStyle: "italic", color: "var(--steel)" }}>
                  Один инструмент.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 19,
                  lineHeight: 1.7,
                  color: "var(--steel)",
                  fontStyle: "italic",
                  maxWidth: 680,
                  marginTop: 32,
                }}
              >
                Вместо того чтобы нанимать по&nbsp;очереди&nbsp;— бренд-стратега,
                копирайтера, дизайнера, SEO-специалиста. Они работают вместе,
                знают твой бизнес, не&nbsp;уходят в&nbsp;отпуск.
              </p>
            </Reveal>

            <div
              className="agents-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 0,
                marginTop: 80,
                borderTop: "1px solid var(--line)",
                borderLeft: "1px solid var(--line)",
              }}
            >
              {dict.home.agentsSection.list.map((a, i) => (
                <Reveal key={i} delay={60 + (i % 8) * 40}>
                  <div
                    className="agent-card"
                    style={{
                      padding: "32px 28px 28px",
                      borderRight: "1px solid var(--line)",
                      borderBottom: "1px solid var(--line)",
                      background: "var(--cream)",
                      transition: "background .35s ease, transform .35s ease",
                      height: "100%",
                      cursor: "default",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
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
                          fontWeight: 500,
                        }}
                      >
                        {a.method}
                      </span>
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: 19,
                        fontWeight: 500,
                        color: "var(--navy)",
                        letterSpacing: "-0.01em",
                        marginTop: 20,
                        lineHeight: 1.2,
                      }}
                    >
                      {a.role}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        lineHeight: 1.55,
                        color: "var(--steel)",
                        marginTop: 8,
                      }}
                    >
                      {a.note}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={420}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "var(--steel)",
                  marginTop: 40,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  gap: 24,
                  flexWrap: "wrap",
                }}
              >
                <span>
                  <span style={{ color: "var(--gold)" }}>●</span>&nbsp; Ogilvy —
                  заголовки, позиция, 80/20
                </span>
                <span>
                  <span style={{ color: "var(--mint)" }}>●</span>&nbsp; Schwartz —
                  уровни осознанности ЦА
                </span>
                <span>
                  <span style={{ color: "var(--steel)" }}>●</span>&nbsp; Hopkins —
                  цифры вместо прилагательных
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ TWO WAYS — two editorial columns ============ */}
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
              <div
                style={{
                  fontSize: 11,
                  color: "var(--mint)",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                Два способа
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(36px, 5vw, 68px)",
                  lineHeight: 1.06,
                  letterSpacing: "-0.02em",
                  fontWeight: 500,
                  marginTop: 28,
                  maxWidth: 900,
                  color: "var(--cream)",
                }}
              >
                Запусти сама{" "}
                <span style={{ fontStyle: "italic", color: "var(--gold)" }}>
                  или передай мне
                </span>
              </h2>
            </Reveal>

            <div
              className="two-ways-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 80,
                marginTop: 96,
              }}
            >
              <Reveal delay={140}>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "rgba(245,243,239,0.5)",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      marginBottom: 20,
                    }}
                  >
                    Self-Serve · Инструмент
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(56px, 7vw, 92px)",
                      fontWeight: 500,
                      lineHeight: 1,
                      letterSpacing: "-0.025em",
                      color: "var(--cream)",
                    }}
                  >
                    2&nbsp;990&nbsp;<span style={{ fontSize: "0.45em", color: "rgba(245,243,239,0.55)", fontWeight: 400 }}>₽/мес</span>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: 18,
                      lineHeight: 1.7,
                      color: "rgba(245,243,239,0.78)",
                      marginTop: 28,
                      maxWidth: 440,
                    }}
                  >
                    Работаешь сама. AI-команда из&nbsp;16 специалистов берёт
                    рутину. Генерация лендинга за&nbsp;60&nbsp;секунд по&nbsp;URL.
                    Brand Memory помнит твой бренд.
                  </p>
                  <Link
                    href="/tool"
                    style={{
                      display: "inline-block",
                      marginTop: 36,
                      fontSize: 16,
                      fontWeight: 500,
                      color: "var(--gold)",
                      textDecoration: "none",
                      borderBottom: "1.5px solid var(--gold)",
                      paddingBottom: 4,
                    }}
                  >
                    Попробовать 7 дней бесплатно →
                  </Link>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "rgba(245,243,239,0.4)",
                      marginTop: 16,
                      letterSpacing: "0.06em",
                    }}
                  >
                    без карты при регистрации
                  </div>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      marginBottom: 20,
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        background: "url('/assets/portrait.png') center 15%/cover, var(--navy-2)",
                        border: "1.5px solid var(--gold)",
                        flexShrink: 0,
                      }}
                    />
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        color: "rgba(245,243,239,0.5)",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                      }}
                    >
                      Personal · Со мной
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(56px, 7vw, 92px)",
                      fontWeight: 500,
                      lineHeight: 1,
                      letterSpacing: "-0.025em",
                      color: "var(--gold)",
                    }}
                  >
                    49&nbsp;000&nbsp;<span style={{ fontSize: "0.45em", color: "rgba(245,243,239,0.55)", fontWeight: 400 }}>₽ разово</span>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: 18,
                      lineHeight: 1.7,
                      color: "rgba(245,243,239,0.78)",
                      marginTop: 28,
                      maxWidth: 440,
                    }}
                  >
                    Я&nbsp;лично делаю твой маркетинг за&nbsp;30&nbsp;дней. Аудит,
                    лендинг, реклама, Telegram-канал. Три места в&nbsp;месяц&nbsp;—
                    веду каждый проект сама.
                  </p>
                  <a
                    href="https://t.me/NATASHABROVKINA"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      marginTop: 36,
                      fontSize: 16,
                      fontWeight: 500,
                      color: "var(--gold)",
                      textDecoration: "none",
                      borderBottom: "1.5px solid var(--gold)",
                      paddingBottom: 4,
                    }}
                  >
                    Записаться в Telegram →
                  </a>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "rgba(245,243,239,0.4)",
                      marginTop: 16,
                      letterSpacing: "0.06em",
                    }}
                  >
                    @NATASHABROVKINA · 3 места в этом месяце
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={280}>
              <div style={{ textAlign: "center", marginTop: 96 }}>
                <Link
                  href="/pricing"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: 20,
                    color: "var(--cream)",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(245,243,239,0.35)",
                    paddingBottom: 4,
                  }}
                >
                  подробное сравнение →
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ LEAD MAGNET — editorial note ============ */}
        <section
          style={{
            padding: "140px 48px",
            background: "var(--cream)",
            borderTop: "1px solid var(--line)",
          }}
        >
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
            <Reveal>
              <Kicker align="center">Бесплатно</Kicker>
            </Reveal>
            <Reveal delay={80}>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(32px, 4vw, 52px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  fontWeight: 500,
                  marginTop: 28,
                }}
              >
                16&nbsp;промптов на&nbsp;методологии{" "}
                <span style={{ fontStyle: "italic", color: "var(--steel)" }}>
                  Ogilvy, Schwartz, Hopkins
                </span>
              </h3>
            </Reveal>
            <Reveal delay={140}>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 18,
                  lineHeight: 1.7,
                  color: "var(--steel)",
                  marginTop: 28,
                  maxWidth: 600,
                  margin: "28px auto 0",
                  fontStyle: "italic",
                }}
              >
                Все 16 промптов для ChatGPT или&nbsp;Claude с&nbsp;объяснением
                «почему так». Плюс Brand Memory template в&nbsp;JSON. Открытый
                MIT-репозиторий на&nbsp;GitHub.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <a
                href="https://github.com/nibrovkina-cyber/natalia-marketing-department"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: 44,
                  fontSize: 17,
                  fontWeight: 500,
                  color: "var(--navy)",
                  textDecoration: "none",
                  borderBottom: "1.5px solid var(--navy)",
                  paddingBottom: 4,
                }}
              >
                Открыть на GitHub →
              </a>
            </Reveal>
          </div>
        </section>

        {/* ============ FAQ — single editorial column ============ */}
        <section
          style={{
            padding: "140px 48px 160px",
            borderTop: "1px solid var(--line)",
            background: "var(--cream-2)",
          }}
        >
          <div style={{ maxWidth: 820, margin: "0 auto" }}>
            <Reveal>
              <Kicker>Вопросы</Kicker>
            </Reveal>
            <Reveal delay={80}>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(32px, 4vw, 52px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  fontWeight: 500,
                  marginTop: 28,
                }}
              >
                Короткие <span style={{ fontStyle: "italic", color: "var(--steel)" }}>ответы</span>
              </h2>
            </Reveal>
            <div style={{ marginTop: 72 }}>
              {dict.home.faq.items.map((item, i) => (
                <Reveal key={i} delay={100 + i * 50}>
                  <div
                    style={{
                      padding: "36px 0",
                      borderBottom: "1px solid var(--line)",
                    }}
                  >
                    <h4
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        fontSize: 22,
                        lineHeight: 1.35,
                        fontWeight: 500,
                        color: "var(--navy)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {item.q}
                    </h4>
                    <p
                      style={{
                        fontSize: 15,
                        lineHeight: 1.7,
                        color: "var(--steel)",
                        marginTop: 14,
                        maxWidth: 720,
                      }}
                    >
                      {item.a}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section
          style={{
            padding: "160px 48px 180px",
            borderTop: "1px solid var(--line)",
            textAlign: "center",
          }}
        >
          <Reveal>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(44px, 6.5vw, 96px)",
                lineHeight: 1.02,
                letterSpacing: "-0.025em",
                fontWeight: 500,
                maxWidth: 880,
                margin: "0 auto",
              }}
            >
              Попробуй{" "}
              <span style={{ fontStyle: "italic", color: "var(--steel)" }}>
                прямо сейчас
              </span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 19,
                lineHeight: 1.6,
                color: "var(--steel)",
                marginTop: 36,
                maxWidth: 560,
                margin: "36px auto 0",
                fontStyle: "italic",
              }}
            >
              Вставь URL своего сайта&nbsp;— получи новую версию через
              60&nbsp;секунд.
            </p>
          </Reveal>
          <Reveal delay={180}>
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
              Открыть инструмент →
            </Link>
          </Reveal>
          <Reveal delay={240}>
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
        </section>
      </main>

      <SiteFooter />

      {/* Responsive tweaks */}
      <style>{`
        @media (max-width: 1100px) {
          .hero-split {
            grid-template-columns: 1fr !important;
            gap: 56px !important;
          }
        }
        @media (max-width: 900px) {
          .manifesto-cols,
          .cases-grid,
          .agents-grid,
          .two-ways-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .agents-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .hero-cta {
            gap: 16px !important;
          }
        }
        @media (max-width: 640px) {
          main section {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          .agents-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
