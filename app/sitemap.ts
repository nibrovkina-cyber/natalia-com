import type { MetadataRoute } from "next";
import gallery from "../content/gallery.json";

const BASE = "https://natashabrovkina.com";
const LOCALES = ["ru", "en"] as const;

type GalleryItem = { slug: string; date?: string };

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Static pages — emit one entry per (path, locale) with hreflang alternates
  const staticPaths: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/pricing", priority: 0.9, changeFrequency: "weekly" },
    { path: "/method", priority: 0.8, changeFrequency: "monthly" },
    { path: "/gallery", priority: 0.85, changeFrequency: "weekly" },
    { path: "/tool", priority: 0.7, changeFrequency: "weekly" },
    { path: "/waitlist", priority: 0.6, changeFrequency: "monthly" },
  ];

  const staticEntries = LOCALES.flatMap((locale) =>
    staticPaths.map(({ path, priority, changeFrequency }) => {
      const url = path === "/" ? `${BASE}/${locale}` : `${BASE}/${locale}${path}`;
      const altRu = path === "/" ? `${BASE}/ru` : `${BASE}/ru${path}`;
      const altEn = path === "/" ? `${BASE}/en` : `${BASE}/en${path}`;
      return {
        url,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: {
          languages: { ru: altRu, en: altEn, "x-default": altRu },
        },
      };
    })
  );

  // Gallery items — same per-locale mirroring
  const galleryEntries = LOCALES.flatMap((locale) =>
    (gallery as GalleryItem[]).map((g) => ({
      url: `${BASE}/${locale}/gallery/${g.slug}`,
      lastModified: g.date || now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          ru: `${BASE}/ru/gallery/${g.slug}`,
          en: `${BASE}/en/gallery/${g.slug}`,
          "x-default": `${BASE}/ru/gallery/${g.slug}`,
        },
      },
    }))
  );

  return [...staticEntries, ...galleryEntries];
}
