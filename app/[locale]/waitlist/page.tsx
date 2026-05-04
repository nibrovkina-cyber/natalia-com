import type { Metadata } from "next";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import WaitlistForm from "./WaitlistForm";
import { getDictionary } from "../../i18n/get-dictionary";
import { type Locale, isLocale } from "../../i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safe: Locale = isLocale(locale) ? locale : "ru";
  const dict = await getDictionary(safe);
  return {
    title: dict.waitlist.metaTitle,
    description: dict.waitlist.metaDescription,
    alternates: { canonical: `https://natashabrovkina.com/${safe}/waitlist` },
  };
}

type SearchParams = { tier?: string };

export default async function WaitlistPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "ru";
  const dict = await getDictionary(locale);
  const t = dict.waitlist;
  const { tier = "self-serve" } = await searchParams;

  return (
    <div style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>
      <SiteNav variant="light" />

      <main style={{ maxWidth: 820, margin: "0 auto", padding: "100px 48px 160px" }}>
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
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--accent)",
            }}
          />
          <span>{t.kicker}</span>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(48px, 7vw, 88px)",
            fontWeight: 600,
            letterSpacing: "-0.035em",
            lineHeight: 0.98,
            maxWidth: 760,
          }}
        >
          {t.h1Main}{" "}
          <span className="italic-display">{t.h1Italic}</span>{" "}
          {t.h1Tail}
        </h1>

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
          {t.subhead}
        </p>

        <div
          style={{
            marginTop: 36,
            padding: "24px 28px",
            background: "var(--bg-card)",
            border: "1px solid var(--hairline)",
            maxWidth: 640,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--accent)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            {t.benefitsHeading}
          </div>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 10,
              fontSize: 14,
              lineHeight: 1.5,
              color: "var(--ink-2)",
            }}
          >
            {t.benefits.map((b: string, i: number) => (
              <li key={i}>— {b}</li>
            ))}
          </ul>
        </div>

        <WaitlistForm
          tier={tier}
          dict={t.form}
          homeHref={`/${locale}`}
          methodHref={`/${locale}/method`}
        />

        <div
          style={{
            marginTop: 80,
            paddingTop: 40,
            borderTop: "1px solid var(--hairline-2)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--ink-3)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            {t.whileWaitingHeading}
          </div>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.65,
              color: "var(--ink-2)",
              marginBottom: 16,
            }}
          >
            {t.openSourceLine}{" "}
            <a
              href="https://github.com/nibrovkina-cyber/natalia-marketing-department"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--ink)",
                textDecoration: "none",
                borderBottom: "1.5px solid var(--ink)",
                paddingBottom: 2,
              }}
            >
              {t.openSourceLink}
            </a>
            .
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--ink-2)" }}>
            {t.personalLine}{" "}
            <a
              href="https://t.me/NATASHABROVKINA"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--ink)",
                textDecoration: "none",
                borderBottom: "1.5px solid var(--ink)",
                paddingBottom: 2,
              }}
            >
              {t.personalLink}
            </a>
            .
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
