"use client";
import Link from "next/link";
import { useEffect, useState, use } from "react";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import Kicker from "../../components/Kicker";
import Reveal from "../../components/Reveal";
import galleryData from "../../../content/gallery.json";

type GalleryItem = {
  slug: string;
  title: string;
  niche: string;
  nicheLabel: string;
  city: string;
  originalUrl: string;
  beforeScreenshot: string;
  afterFile: string;
  description: string;
  rating: number | null;
  reviewCount: number | null;
  date: string;
  featured: boolean;
  metric?: { value: string; label: string; period: string };
  fixes: string[];
  methodology: string[];
};

const gallery = galleryData as GalleryItem[];

const METHODOLOGY_QUOTES = [
  {
    author: "David Ogilvy",
    text: "Заголовок — это 80% бюджета вашей рекламы.",
    role: "OGILVY",
  },
  {
    author: "Eugene Schwartz",
    text: "Прежде чем писать, надо знать — к кому мы пишем.",
    role: "SCHWARTZ",
  },
  {
    author: "Claude Hopkins",
    text: "Реклама — это продажа в печати. Больше ничего.",
    role: "HOPKINS",
  },
];

export default function GalleryDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const item = gallery.find(g => g.slug === slug);
  const [afterHtml, setAfterHtml] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!item) return;
    fetch(item.afterFile)
      .then(r => r.ok ? r.text() : Promise.reject())
      .then(setAfterHtml)
      .catch(() => setAfterHtml(""));
  }, [item]);

  const breadcrumbSchema = item ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://natashabrovkina.com/" },
      { "@type": "ListItem", position: 2, name: "Кейсы", item: "https://natashabrovkina.com/gallery" },
      { "@type": "ListItem", position: 3, name: item.title, item: `https://natashabrovkina.com/gallery/${item.slug}` },
    ],
  } : null;

  const articleSchema = item ? {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    description: item.description,
    datePublished: item.date,
    dateModified: item.date,
    image: `https://natashabrovkina.com${item.beforeScreenshot}`,
    author: {
      "@type": "Person",
      name: "Наталья Бровкина",
      url: "https://natashabrovkina.com",
    },
    publisher: {
      "@type": "Organization",
      name: "natashabrovkina.com",
      logo: {
        "@type": "ImageObject",
        url: "https://natashabrovkina.com/assets/portrait.png",
      },
    },
    about: {
      "@type": "Thing",
      name: item.nicheLabel,
    },
  } : null;

  if (!item) {
    return (
      <div style={{ background: "var(--cream)", color: "var(--navy)", minHeight: "100vh" }}>
        <SiteNav variant="light" />
        <div style={{ padding: "200px 48px", textAlign: "center" }}>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 48, marginBottom: 24 }}>Кейс не найден</h1>
          <Link
            href="/gallery"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: 20,
              color: "var(--navy)",
              textDecoration: "none",
              borderBottom: "1px solid var(--navy)",
              paddingBottom: 4,
            }}
          >
            ← к галерее
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const issueNum = String(gallery.findIndex(g => g.slug === slug) + 1).padStart(2, "0");

  return (
    <div style={{ background: "var(--cream)", color: "var(--navy)", minHeight: "100vh" }}>
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
      <SiteNav variant="light" />

      <main>
        {/* ============ HEADER — editorial dateline ============ */}
        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 48px 24px" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--steel)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              display: "flex",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/gallery"
              style={{
                color: "var(--steel)",
                textDecoration: "none",
                borderBottom: "1px solid var(--line-2)",
                paddingBottom: 2,
              }}
            >
              ← Галерея
            </Link>
            <span>Выпуск №{issueNum}</span>
            <span>{item.date}</span>
          </div>
        </section>

        {/* ============ HERO — editorial headline + signature metric ============ */}
        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 48px 96px" }}>
          <Reveal>
            <Kicker>{item.nicheLabel} · {item.city}</Kicker>
          </Reveal>

          {item.metric && (
            <Reveal delay={80}>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(120px, 20vw, 280px)",
                  lineHeight: 0.88,
                  letterSpacing: "-0.045em",
                  fontWeight: 500,
                  color: "var(--navy)",
                  marginTop: 24,
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "0.04em",
                }}
              >
                {(() => {
                  const m = item.metric.value.match(/^([\d,.\-+]+)(.*)$/);
                  if (!m) return item.metric.value;
                  const [, num, suffix] = m;
                  return (
                    <>
                      <span>{num}</span>
                      {suffix && (
                        <span
                          style={{
                            fontSize: "0.58em",
                            color: "var(--gold)",
                            fontStyle: "italic",
                            fontWeight: 400,
                            letterSpacing: "-0.02em",
                            alignSelf: "center",
                            marginBottom: "0.18em",
                          }}
                        >
                          {suffix.trim()}
                        </span>
                      )}
                    </>
                  );
                })()}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(17px, 1.5vw, 22px)",
                  fontStyle: "italic",
                  color: "var(--steel)",
                  marginTop: 24,
                  maxWidth: 480,
                  lineHeight: 1.5,
                }}
              >
                {item.metric.label}
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontStyle: "normal",
                    fontSize: 11,
                    color: "var(--steel)",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginLeft: 16,
                    display: "inline-block",
                    transform: "translateY(-3px)",
                  }}
                >
                  · за {item.metric.period}
                </span>
              </div>
            </Reveal>
          )}

          <Reveal delay={160}>
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(32px, 4vw, 56px)",
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                fontWeight: 500,
                marginTop: item.metric ? 80 : 28,
                maxWidth: 760,
                color: "var(--navy)",
              }}
            >
              {item.title}.
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(17px, 1.4vw, 20px)",
                lineHeight: 1.65,
                color: "var(--steel)",
                maxWidth: 720,
                marginTop: 24,
                fontStyle: "italic",
              }}
            >
              {item.description}
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div
              style={{
                display: "flex",
                gap: 48,
                marginTop: 48,
                alignItems: "baseline",
                flexWrap: "wrap",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--steel)",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }}
                >
                  Оригинал
                </div>
                <a
                  href={item.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 14,
                    color: "var(--navy)",
                    textDecoration: "none",
                    borderBottom: "1px solid var(--navy)",
                    paddingBottom: 2,
                    marginTop: 6,
                    display: "inline-block",
                  }}
                >
                  {item.originalUrl.replace(/^https?:\/\//, "")}
                </a>
              </div>
              {item.rating && (
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: "var(--steel)",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                    }}
                  >
                    Рейтинг
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: 22,
                      color: "var(--gold)",
                      fontWeight: 500,
                      marginTop: 4,
                    }}
                  >
                    ★ {item.rating.toFixed(1)}{" "}
                    <span style={{ color: "var(--steel)", fontSize: 14, fontStyle: "italic" }}>
                      · {item.reviewCount}&nbsp;отзывов
                    </span>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </section>

        {/* ============ DRAG-SLIDER — signature moment, 85vh ============ */}
        <section
          style={{
            padding: "0 24px 48px",
            background: "var(--cream)",
          }}
        >
          <Reveal>
            <div
              style={{
                maxWidth: 1680,
                margin: "0 auto",
                position: "relative",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--steel)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                  padding: "0 12px",
                }}
              >
                ← Перетащи полоску · до / после AI →
              </div>
              <div
                style={{
                  height: "85vh",
                  minHeight: 560,
                  overflow: "hidden",
                  background: "var(--navy)",
                  borderRadius: 2,
                  boxShadow: "0 60px 120px -40px rgba(13,27,42,0.35)",
                }}
              >
                {mounted ? (
                  <ReactCompareSlider
                    itemOne={
                      <ReactCompareSliderImage
                        src={item.beforeScreenshot}
                        alt={`${item.title} — оригинальный сайт до переделки AI-командой natashabrovkina.com`}
                        style={{ objectPosition: "top", objectFit: "cover" }}
                      />
                    }
                    itemTwo={
                      afterHtml ? (
                        <iframe
                          srcDoc={afterHtml}
                          title={`${item.title} — переписанный лендинг AI-командой по методологии Ogilvy/Schwartz/Hopkins`}
                          sandbox="allow-scripts allow-same-origin"
                          style={{ width: "100%", height: "100%", border: 0, pointerEvents: "none", background: "var(--cream)" }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            background: "var(--navy)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--gold)",
                            fontFamily: "var(--font-serif)",
                            fontStyle: "italic",
                            fontSize: 18,
                          }}
                        >
                          Загружаем после...
                        </div>
                      )
                    }
                    style={{ height: "100%" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "var(--navy)",
                    }}
                  />
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 20,
                  padding: "0 12px",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--steel)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                <span>До · {item.originalUrl.replace(/^https?:\/\//, "").split("/")[0]}</span>
                <span>После · natashabrovkina.com</span>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ============ FIXES — editorial index ============ */}
        <section
          style={{
            padding: "160px 48px",
            borderTop: "1px solid var(--line)",
          }}
        >
          <div style={{ maxWidth: 1120, margin: "0 auto" }}>
            <Reveal>
              <Kicker>Правки</Kicker>
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
                Что AI-команда{" "}
                <span style={{ fontStyle: "italic", color: "var(--steel)" }}>
                  исправила
                </span>
              </h2>
            </Reveal>
            <div
              style={{
                marginTop: 80,
                borderTop: "1px solid var(--line)",
              }}
            >
              {item.fixes.map((fix, i) => (
                <Reveal key={i} delay={120 + i * 60}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "72px 1fr",
                      gap: 40,
                      alignItems: "baseline",
                      padding: "40px 0",
                      borderBottom: "1px solid var(--line)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        fontSize: 28,
                        color: "var(--gold)",
                        fontWeight: 500,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {["I", "II", "III", "IV", "V", "VI", "VII", "VIII"][i]}
                    </span>
                    <p
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(18px, 1.8vw, 24px)",
                        lineHeight: 1.5,
                        color: "var(--navy)",
                        letterSpacing: "-0.01em",
                        fontWeight: 400,
                        margin: 0,
                      }}
                    >
                      {fix}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ METHODOLOGY — three pillars with quotes ============ */}
        <section
          style={{
            padding: "160px 48px",
            borderTop: "1px solid var(--line)",
            background: "var(--navy)",
            color: "var(--cream)",
          }}
        >
          <div style={{ maxWidth: 1120, margin: "0 auto" }}>
            <div
              style={{
                fontSize: 11,
                color: "var(--mint)",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              Методология
            </div>
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
                Три классика.{" "}
                <span style={{ fontStyle: "italic", color: "var(--gold)" }}>
                  Одна студия.
                </span>
              </h2>
            </Reveal>
            <div
              className="methodology-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 64,
                marginTop: 96,
              }}
            >
              {METHODOLOGY_QUOTES.map((q, i) => (
                <Reveal key={i} delay={140 + i * 80}>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        color: "var(--gold)",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        marginBottom: 28,
                      }}
                    >
                      {q.role}
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: 22,
                        lineHeight: 1.4,
                        fontStyle: "italic",
                        color: "var(--cream)",
                        fontWeight: 400,
                        margin: 0,
                      }}
                    >
                      «{q.text}»
                    </p>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                        color: "rgba(245,243,239,0.5)",
                        marginTop: 20,
                        letterSpacing: "0.08em",
                      }}
                    >
                      — {q.author}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div
              style={{
                marginTop: 120,
                paddingTop: 64,
                borderTop: "1px solid rgba(245,243,239,0.1)",
              }}
            >
              <Reveal>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--mint)",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    marginBottom: 32,
                  }}
                >
                  Применение в кейсе
                </div>
              </Reveal>
              {item.methodology.map((m, i) => (
                <Reveal key={i} delay={100 + i * 60}>
                  <p
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(17px, 1.5vw, 20px)",
                      lineHeight: 1.6,
                      color: "rgba(245,243,239,0.88)",
                      padding: "20px 0",
                      borderBottom: i < item.methodology.length - 1 ? "1px solid rgba(245,243,239,0.08)" : "none",
                      margin: 0,
                    }}
                  >
                    {m}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ AUTHOR SIGNATURE ============ */}
        <section
          style={{
            padding: "160px 48px 120px",
            borderTop: "1px solid var(--line)",
            background: "var(--cream)",
          }}
        >
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <Reveal>
              <div
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: "50%",
                  background: "url('/assets/portrait.png') center 15%/cover, var(--cream-2)",
                  border: "1.5px solid var(--gold)",
                  margin: "0 auto 32px",
                }}
              />
            </Reveal>
            <Reveal delay={80}>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: "clamp(22px, 2.4vw, 32px)",
                  lineHeight: 1.4,
                  color: "var(--navy)",
                  letterSpacing: "-0.01em",
                  fontWeight: 500,
                }}
              >
                — Наталья Бровкина
              </p>
            </Reveal>
            <Reveal delay={140}>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 17,
                  lineHeight: 1.7,
                  color: "var(--steel)",
                  marginTop: 28,
                  maxWidth: 560,
                  margin: "28px auto 0",
                }}
              >
                Если хочешь обсудить свой кейс&nbsp;— напиши в&nbsp;Telegram.
                Отвечаю лично, обычно в&nbsp;течение дня.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <a
                href="https://t.me/NATASHABROVKINA"
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
                @NATASHABROVKINA →
              </a>
            </Reveal>
            <Reveal delay={280}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "var(--steel)",
                  marginTop: 32,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                или{" "}
                <Link
                  href="/tool"
                  style={{
                    color: "var(--gold)",
                    textDecoration: "none",
                    borderBottom: "1px solid var(--gold)",
                    paddingBottom: 1,
                  }}
                >
                  попробуй инструмент сама →
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />

      <style>{`
        @media (max-width: 900px) {
          .methodology-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
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
