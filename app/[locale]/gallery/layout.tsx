import type { Metadata } from "next";
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
    title: dict.gallery.metaTitle,
    description: dict.gallery.metaDescription,
    alternates: {
      canonical: `https://natashabrovkina.com/${safe}/gallery`,
      languages: {
        ru: "https://natashabrovkina.com/ru/gallery",
        en: "https://natashabrovkina.com/en/gallery",
      },
    },
    openGraph: {
      title: dict.gallery.metaTitle,
      description: dict.gallery.metaDescription,
      url: `https://natashabrovkina.com/${safe}/gallery`,
      type: "website",
      locale: safe === "ru" ? "ru_RU" : "en_US",
    },
  };
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
