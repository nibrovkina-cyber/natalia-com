"use client";
import Link from "next/link";
import { useState } from "react";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import Kicker from "../components/Kicker";
import Reveal from "../components/Reveal";
import galleryData from "../../content/gallery.json";

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

export default function GalleryIndex() {
  const niches = Array.from(new Set(gallery.map(g => g.niche)));
  const [filter, setFilter] = useState<string>("all");
  const filtered = filter === "all" ? gallery : gallery.filter(g => g.niche === filter);

  return (
    <div style={{ background: "var(--cream)", color: "var(--navy)", minHeight: "100vh" }}>
      <SiteNav variant="light" />

      <main>
        {/* ============ HERO ============ */}
        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "120px 48px 80px" }}>
          <Reveal>
            <Kicker>Галерея · {gallery.length}&nbsp;{gallery.length === 1 ? "кейс" : "кейса"}</Kicker>
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
                maxWidth: 1080,
              }}
            >
              Разборы{" "}
              <span style={{ fontStyle: "italic", color: "var(--steel)" }}>
                реальных бизнесов
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
                maxWidth: 720,
                marginTop: 36,
                fontStyle: "italic",
              }}
            >
              Каждый кейс&nbsp;— реальная компания из&nbsp;Яндекс.Карт. Методология
              Ogilvy, Schwartz и&nbsp;Hopkins применена к&nbsp;живому сайту. Drag-slider
              показывает «до» и&nbsp;«после».
            </p>
          </Reveal>

          {niches.length > 1 && (
            <Reveal delay={240}>
              <div
                style={{
                  display: "flex",
                  gap: 28,
                  marginTop: 56,
                  flexWrap: "wrap",
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                <button
                  onClick={() => setFilter("all")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    color: filter === "all" ? "var(--navy)" : "var(--steel)",
                    borderBottom: filter === "all" ? "1.5px solid var(--navy)" : "1.5px solid transparent",
                    paddingBottom: 4,
                    fontFamily: "inherit",
                    fontSize: "inherit",
                    letterSpacing: "inherit",
                    textTransform: "inherit",
                  }}
                >
                  все · {gallery.length}
                </button>
                {niches.map(n => {
                  const items = gallery.filter(g => g.niche === n);
                  if (items.length === 0) return null;
                  const label = items[0].nicheLabel;
                  return (
                    <button
                      key={n}
                      onClick={() => setFilter(n)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        color: filter === n ? "var(--navy)" : "var(--steel)",
                        borderBottom: filter === n ? "1.5px solid var(--navy)" : "1.5px solid transparent",
                        paddingBottom: 4,
                        fontFamily: "inherit",
                        fontSize: "inherit",
                        letterSpacing: "inherit",
                        textTransform: "inherit",
                      }}
                    >
                      {label.toLowerCase()} · {items.length}
                    </button>
                  );
                })}
              </div>
            </Reveal>
          )}
        </section>

        {/* ============ GRID ============ */}
        <section
          style={{
            padding: "80px 48px 160px",
            borderTop: "1px solid var(--line)",
          }}
        >
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            {filtered.length === 0 ? (
              <div
                style={{
                  padding: "80px 0",
                  textAlign: "center",
                  color: "var(--steel)",
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: 20,
                }}
              >
                В&nbsp;этой категории пока нет кейсов.
              </div>
            ) : (
              <div
                className="gallery-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 48,
                }}
              >
                {filtered.map((item, i) => (
                  <Reveal key={item.slug} delay={60 + i * 80}>
                    <Link
                      href={`/gallery/${item.slug}`}
                      style={{
                        display: "block",
                        textDecoration: "none",
                        color: "inherit",
                        background: "var(--cream-2)",
                        borderRadius: 14,
                        overflow: "hidden",
                        boxShadow: "0 2px 8px rgba(13,27,42,0.04)",
                        transition: "transform .4s ease, box-shadow .4s ease",
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
                            background: "linear-gradient(180deg, transparent 55%, rgba(13,27,42,0.75) 100%)",
                          }}
                        />
                        {item.metric && (
                          <div
                            style={{
                              position: "absolute",
                              left: 32,
                              bottom: 28,
                              color: "var(--cream)",
                            }}
                          >
                            <div
                              style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(48px, 5.5vw, 72px)",
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
                                marginTop: 8,
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
                        <h2
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
                        </h2>
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
                            Полный разбор →
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
            )}
          </div>
        </section>
      </main>

      <SiteFooter />

      <style>{`
        @media (max-width: 900px) {
          .gallery-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
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
