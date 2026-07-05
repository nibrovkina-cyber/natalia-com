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

// JSON-LD per locale — WebSite only. Person + Organization живут в root
// layout (app/layout.tsx) и рендерятся на всех страницах; здесь их не
// дублируем, чтобы не плодить конфликтующие @id для AI-краулеров.
function buildJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        // WebSite + SearchAction — enables Google Sitelinks Search Box on
        // brand SERP, lets AI engines route queries to /search?q= (future-ready).
        "@type": "WebSite",
        "@id": "https://www.natashabrovkina.com/#website",
        url: "https://www.natashabrovkina.com",
        name: "natashabrovkina.com — Nataliya Brovkina, AI Visibility Consultant",
        inLanguage: locale === "ru" ? "ru-RU" : "en-US",
        publisher: { "@id": "https://www.natashabrovkina.com/#person" },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `https://www.natashabrovkina.com/${locale}/gallery?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
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
