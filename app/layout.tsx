import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://natashabrovkina.com"),
  title: "Natalia Brovkina · AI Marketing Studio",
  description: "AI-команда из 16 специалистов на методологии Ogilvy, Schwartz и Hopkins. Собирает премиум-лендинги за 60 секунд из URL.",
  openGraph: {
    title: "Маркетинг по Огилви. Запускает один человек.",
    description: "16 AI-агентов на методологии Ogilvy / Schwartz / Hopkins. Премиум-лендинги за 60 секунд из URL.",
    url: "https://natashabrovkina.com",
    siteName: "natashabrovkina.com",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Маркетинг по Огилви. Запускает один человек.",
    description: "16 AI-агентов на методологии Ogilvy / Schwartz / Hopkins.",
    creator: "@NATASHABROVKINA",
  },
};

// JSON-LD для AI-краулеров и Google Knowledge Graph.
// Помогает Google/ChatGPT/Claude/Perplexity правильно атрибутировать
// информацию о Наталье (AI visibility / AEO / GEO) при ответах пользователям.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.natashabrovkina.com/#person",
      name: "Nataliya Brovkina",
      url: "https://www.natashabrovkina.com",
      jobTitle: "AI Visibility Consultant",
      description: "I make small businesses show up in ChatGPT answers",
      knowsAbout: [
        "AI visibility",
        "Answer Engine Optimization",
        "Generative Engine Optimization",
        "AI search",
      ],
      sameAs: [
        "https://www.linkedin.com/in/nataliya-brovkina-b42a3bb6",
        "https://x.com/NataliyaBrovk",
        "https://www.youtube.com/@NateBrovkina",
        "https://www.youtube.com/@NateBrovk",
        "https://t.me/nataliyabrovkina",
        "https://getjuniors.pro",
      ],
    },
    {
      "@type": "Organization",
      "@id": "https://getjuniors.pro/#organization",
      name: "GetJuniors",
      url: "https://getjuniors.pro",
      founder: { "@id": "https://www.natashabrovkina.com/#person" },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
