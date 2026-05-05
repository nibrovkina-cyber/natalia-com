import type { Metadata } from "next";
import { i18n, type Locale } from "@/app/i18n/config";
import { getDictionary } from "@/app/i18n/get-dictionary";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "ru" && locale !== "en") return {};

  const dict = await getDictionary(locale as Locale);
  const t = dict.meta;

  return {
    metadataBase: new URL("https://natashabrovkina.com"),
    title: t.title,
    description: t.description,
    manifest: "/manifest.webmanifest",
    icons: {
      icon: [
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
    },
    alternates: {
      canonical: `https://natashabrovkina.com/${locale}`,
      languages: {
        ru: "https://natashabrovkina.com/ru",
        en: "https://natashabrovkina.com/en",
        "x-default": "https://natashabrovkina.com/ru",
      },
    },
    openGraph: {
      title: t.ogTitle,
      description: t.ogDescription,
      url: `https://natashabrovkina.com/${locale}`,
      siteName: "natashabrovkina.com",
      locale: locale === "ru" ? "ru_RU" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.ogTitle,
      description: t.ogDescription,
      creator: "@NATASHABROVKINA",
    },
  };
}

// JSON-LD per locale — Google and AI engines pick the localised values.
function buildJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        // WebSite + SearchAction — enables Google Sitelinks Search Box on
        // brand SERP, lets AI engines route queries to /search?q= (future-ready).
        "@type": "WebSite",
        "@id": "https://natashabrovkina.com/#website",
        url: "https://natashabrovkina.com",
        name: locale === "ru" ? "natashabrovkina.com — AI Marketing Studio" : "natashabrovkina.com — AI Marketing Studio",
        inLanguage: locale === "ru" ? "ru-RU" : "en-US",
        publisher: { "@id": "https://natashabrovkina.com/#org" },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `https://natashabrovkina.com/${locale}/gallery?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Person",
        "@id": "https://natashabrovkina.com/#person",
        name: locale === "ru" ? "Наталья Бровкина" : "Natalia Brovkina",
        alternateName: locale === "ru" ? "Natalia Brovkina" : "Наталья Бровкина",
        url: "https://natashabrovkina.com",
        jobTitle: locale === "ru" ? "Основатель, AI Marketing Studio" : "Founder, AI Marketing Studio",
        sameAs: [
          "https://t.me/NATASHABROVKINA",
          "https://github.com/nibrovkina-cyber",
        ],
        knowsAbout:
          locale === "ru"
            ? [
                "AI-маркетинг",
                "Direct response copywriting",
                "Конверсия лендингов",
                "Методология David Ogilvy",
                "Eugene Schwartz Breakthrough Advertising",
                "Claude Hopkins Scientific Advertising",
              ]
            : [
                "AI marketing",
                "Direct response copywriting",
                "Landing page conversion",
                "David Ogilvy methodology",
                "Eugene Schwartz Breakthrough Advertising",
                "Claude Hopkins Scientific Advertising",
              ],
      },
      {
        "@type": "Organization",
        "@id": "https://natashabrovkina.com/#org",
        name: "natashabrovkina.com",
        legalName: locale === "ru" ? "ИП Бровкина Н." : "Natalia Brovkina (Sole Proprietor)",
        url: "https://natashabrovkina.com",
        founder: { "@id": "https://natashabrovkina.com/#person" },
        areaServed: ["RU", "US"],
        logo: "https://natashabrovkina.com/assets/portrait.png",
        sameAs: [
          "https://github.com/nibrovkina-cyber/natalia-marketing-department",
          "https://github.com/nibrovkina-cyber/natalia-com",
        ],
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://natashabrovkina.com/#tool",
        name: locale === "ru" ? "AI Marketing Studio · 21 агент" : "AI Marketing Studio · 21 agents",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: `https://natashabrovkina.com/${locale}/tool`,
        offers: [
          { "@type": "Offer", name: "Free", price: "0", priceCurrency: locale === "ru" ? "RUB" : "USD" },
          {
            "@type": "Offer",
            name: "Self-Serve",
            price: locale === "ru" ? "2990" : "29",
            priceCurrency: locale === "ru" ? "RUB" : "USD",
            priceSpecification: { "@type": "UnitPriceSpecification", unitCode: "MON" },
          },
          { "@type": "Offer", name: "Personal", price: locale === "ru" ? "49000" : "540", priceCurrency: locale === "ru" ? "RUB" : "USD" },
        ],
        author: { "@id": "https://natashabrovkina.com/#person" },
      },
    ],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "ru" && locale !== "en") notFound();

  const jsonLd = buildJsonLd(locale as Locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
