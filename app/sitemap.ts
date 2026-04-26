import type { MetadataRoute } from "next";
import gallery from "../content/gallery.json";

const BASE = "https://natashabrovkina.com";

type GalleryItem = { slug: string; date?: string };

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const galleryItems = (gallery as GalleryItem[]).map((g) => ({
    url: `${BASE}/gallery/${g.slug}`,
    lastModified: g.date || now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: `${BASE}/`,         lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/pricing`,  lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/method`,   lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/gallery`,  lastModified: now, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${BASE}/tool`,     lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/waitlist`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    ...galleryItems,
  ];
}
