"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Variant = "light" | "dark";

type Props = {
  variant?: Variant;
  showStickyPrice?: boolean;
  ctaHref?: string;
  ctaLabel?: string;
};

// Inline language switcher — kept as a tiny private component so SiteNav
// retains its own footprint and we don't add yet another import boundary.
function NavLanguageSwitcher({ textColor }: { textColor: string }) {
  const pathname = usePathname() || "/";
  const segments = pathname.split("/").filter(Boolean);
  const current = segments[0] === "en" ? "en" : "ru";
  const next = current === "ru" ? "en" : "ru";
  const tail = segments.slice(1).join("/");
  const href = tail ? `/${next}/${tail}` : `/${next}`;

  return (
    <Link
      href={href}
      aria-label={`Switch to ${next.toUpperCase()}`}
      style={{
        fontFamily: "var(--font-mono, monospace)",
        fontSize: 11,
        letterSpacing: "0.18em",
        color: textColor,
        textDecoration: "none",
        padding: "6px 10px",
        borderRadius: 2,
        opacity: 0.7,
        transition: "opacity 200ms",
      }}
    >
      {next.toUpperCase()}
    </Link>
  );
}

export default function SiteNav({
  variant = "light",
  showStickyPrice = false,
  ctaHref = "/tool",
  ctaLabel = "Открыть инструмент →",
}: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (showStickyPrice) setShowSticky(y > 520);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showStickyPrice]);

  const bg =
    variant === "dark"
      ? scrolled
        ? "rgba(13,27,42,0.92)"
        : "rgba(13,27,42,0.75)"
      : scrolled
        ? "rgba(245,243,239,0.92)"
        : "rgba(245,243,239,0.85)";

  const textColor = variant === "dark" ? "#F5F3EF" : "#0D1B2A";
  const borderColor = scrolled ? (variant === "dark" ? "rgba(245,243,239,0.08)" : "rgba(13,27,42,0.08)") : "transparent";

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: bg,
        backdropFilter: "blur(18px) saturate(140%)",
        WebkitBackdropFilter: "blur(18px) saturate(140%)",
        borderBottom: `1px solid ${borderColor}`,
        transition: "border-color .3s ease, background .3s ease",
      }}
    >
      <div
        className="nav-row"
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "14px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          color: textColor,
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none", color: "inherit", flexShrink: 0 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: `url('/assets/portrait.png') center 15%/cover, ${variant === "dark" ? "#142638" : "#EFEBE2"}`,
              border: "2px solid var(--gold)",
              flexShrink: 0,
            }}
          />
          <div style={{ fontFamily: "var(--font-serif)", fontSize: 21, fontWeight: 600, lineHeight: 1.1 }}>
            natalia
            <small
              className="nav-subtitle"
              style={{
                display: "block",
                fontFamily: "var(--font-sans)",
                fontSize: 11,
                color: variant === "dark" ? "rgba(245,243,239,0.55)" : "var(--steel)",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginTop: -2,
              }}
            >
              AI · marketing studio
            </small>
          </div>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <NavLanguageSwitcher textColor={textColor} />
          {showStickyPrice && (
            <Link
              href="/pricing"
              style={{
                display: showSticky ? "inline-flex" : "none",
                alignItems: "center",
                gap: 12,
                fontSize: 13,
                fontWeight: 500,
                padding: "8px 6px 8px 16px",
                background: "var(--navy)",
                color: "var(--cream)",
                borderRadius: 999,
                textDecoration: "none",
                opacity: showSticky ? 1 : 0,
                transform: showSticky ? "translateX(0)" : "translateX(6px)",
                transition: "opacity .35s ease, transform .35s ease",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <b style={{ fontWeight: 600 }}>2 990 ₽</b>
                <span style={{ width: 1, height: 14, background: "rgba(245,243,239,0.2)" }} />
                <span style={{ color: "var(--gold)", fontWeight: 600 }}>49 000 ₽</span>
              </span>
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "var(--gold)",
                  color: "var(--navy)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                →
              </span>
            </Link>
          )}

          <Link
            href={ctaHref}
            className="nav-cta"
            style={{
              display: showSticky && showStickyPrice ? "none" : "inline-flex",
              background: variant === "dark" ? "var(--gold)" : "var(--navy)",
              color: variant === "dark" ? "var(--navy)" : "var(--cream)",
              padding: "10px 20px",
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 500,
              textDecoration: "none",
              transition: "transform .2s ease",
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
          >
            <span className="nav-cta-full">{ctaLabel}</span>
            <span className="nav-cta-short" aria-hidden="true">Студия →</span>
          </Link>
        </div>
      </div>
      <style>{`
        .nav-cta-short { display: none; }
        @media (max-width: 640px) {
          .nav-row {
            padding: 12px 18px !important;
            gap: 12px !important;
          }
          .nav-subtitle { display: none !important; }
          .nav-cta { padding: 9px 16px !important; font-size: 13px !important; }
          .nav-cta-full { display: none; }
          .nav-cta-short { display: inline; }
        }
      `}</style>
    </header>
  );
}
