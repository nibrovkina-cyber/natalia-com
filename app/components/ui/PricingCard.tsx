import Link from "next/link";
import { ReactNode } from "react";

type Feature = { n: string; title: string; sub?: string };

type PricingCardProps = {
  roman: string;
  name: string;
  nameAccent?: string | null;
  who: string;
  priceValue: string;
  priceUnit: string;
  billing: ReactNode;
  features: Feature[];
  ctaLabel: string;
  ctaHref: string;
  ctaVariant?: "primary" | "accent" | "ghost";
  ctaExternal?: boolean;
  fineprint: string;
  featured?: boolean;
  borderRight?: boolean;
};

/**
 * Pricing tier card — Claude Design v2 .pcard pattern.
 * featured=true adds 2px ink-inset shadow.
 */
export function PricingCard({
  roman,
  name,
  nameAccent,
  who,
  priceValue,
  priceUnit,
  billing,
  features,
  ctaLabel,
  ctaHref,
  ctaVariant = "ghost",
  ctaExternal = false,
  fineprint,
  featured = false,
  borderRight = true,
}: PricingCardProps) {
  return (
    <article
      style={{
        padding: "36px 32px",
        background: featured ? "var(--bg)" : "var(--bg-card)",
        borderRight: borderRight ? "1px solid var(--hairline)" : "none",
        display: "flex",
        flexDirection: "column",
        minHeight: 600,
        position: "relative",
      }}
    >
      {featured && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            boxShadow: "0 0 0 2px var(--ink) inset",
            pointerEvents: "none",
          }}
        />
      )}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--ink-3)",
            letterSpacing: "0.14em",
            marginBottom: 8,
          }}
        >
          {roman}
        </div>
        <h3
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: "-0.015em",
            marginBottom: 6,
          }}
        >
          {name}
          {nameAccent && (
            <>
              {" "}
              <span className="italic-display">{nameAccent}</span>
            </>
          )}
        </h3>
        <p style={{ fontSize: 14, lineHeight: 1.5, color: "var(--ink-3)", margin: "0 0 28px" }}>{who}</p>

        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 56,
              fontWeight: 600,
              letterSpacing: "-0.035em",
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {priceValue}
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--ink-3)" }}>{priceUnit}</span>
        </div>
        <div style={{ fontSize: 12, color: "var(--ink-3)", marginBottom: 28 }}>{billing}</div>

        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px" }}>
          {features.map((f, i) => (
            <li
              key={i}
              style={{
                fontSize: 14,
                lineHeight: 1.5,
                color: "var(--ink-2)",
                padding: "12px 0",
                borderTop: "1px solid var(--hairline-2)",
                display: "flex",
                gap: 14,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--ink-3)",
                  minWidth: 22,
                  paddingTop: 1,
                }}
              >
                {f.n}
              </span>
              <span>
                <span style={{ display: "block", color: "var(--ink)", fontWeight: 500 }}>{f.title}</span>
                {f.sub && <small style={{ display: "block", color: "var(--ink-3)", marginTop: 2, fontSize: 12 }}>{f.sub}</small>}
              </span>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: "auto" }}>
          {ctaExternal ? (
            <a href={ctaHref} target="_blank" rel="noopener noreferrer" style={ctaCss(ctaVariant)}>
              {ctaLabel}
            </a>
          ) : (
            <Link href={ctaHref} style={ctaCss(ctaVariant)}>
              {ctaLabel}
            </Link>
          )}
          <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 14, lineHeight: 1.5 }}>{fineprint}</div>
        </div>
      </div>
    </article>
  );
}

function ctaCss(variant: "primary" | "accent" | "ghost"): React.CSSProperties {
  const base: React.CSSProperties = {
    display: "block",
    width: "100%",
    textAlign: "center",
    padding: "16px 22px",
    fontFamily: "var(--font-sans)",
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: "-0.005em",
    textDecoration: "none",
    transition: "background .2s ease, color .2s ease",
  };
  if (variant === "primary") return { ...base, background: "var(--ink)", color: "var(--bg)" };
  if (variant === "accent") return { ...base, background: "var(--accent)", color: "var(--accent-ink)" };
  return { ...base, background: "transparent", color: "var(--ink)", border: "1px solid var(--hairline)" };
}
