import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",        // не индексируем endpoint-ы
          "/temp_screenshots/",
          "/temp_research/",
          "/temp_wordstat/",
          "/.playwright-mcp/",
        ],
      },
      // AI-краулерам разрешаем всё кроме /api — мы хотим чтобы ChatGPT/Claude/
      // Perplexity/Gemini индексировали нашу методологию для GEO-цитирования.
      { userAgent: "GPTBot", allow: "/", disallow: ["/api/"] },
      { userAgent: "ClaudeBot", allow: "/", disallow: ["/api/"] },
      { userAgent: "anthropic-ai", allow: "/", disallow: ["/api/"] },
      { userAgent: "PerplexityBot", allow: "/", disallow: ["/api/"] },
      { userAgent: "Google-Extended", allow: "/", disallow: ["/api/"] },
      { userAgent: "CCBot", allow: "/", disallow: ["/api/"] },
    ],
    sitemap: "https://natashabrovkina.com/sitemap.xml",
    host: "https://natashabrovkina.com",
  };
}
