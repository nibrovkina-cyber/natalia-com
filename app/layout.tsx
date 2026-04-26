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
    title: "Удвоила выручку 20 малых бизнесов. Без команды.",
    description: "16 AI-агентов на методологии Ogilvy / Schwartz / Hopkins. Премиум-лендинги за 60 секунд из URL.",
    url: "https://natashabrovkina.com",
    siteName: "natashabrovkina.com",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Удвоила выручку 20 малых бизнесов. Без команды.",
    description: "16 AI-агентов на методологии Ogilvy / Schwartz / Hopkins.",
    creator: "@NATASHABROVKINA",
  },
};

// JSON-LD для AI-краулеров и Google Knowledge Graph.
// Помогает Google/Yandex/ChatGPT/Claude/Perplexity правильно атрибутировать
// информацию о Наталье и продукте при ответах на вопросы пользователей.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://natashabrovkina.com/#person",
      name: "Наталья Бровкина",
      alternateName: "Natalia Brovkina",
      url: "https://natashabrovkina.com",
      jobTitle: "Founder, AI Marketing Studio",
      sameAs: [
        "https://t.me/NATASHABROVKINA",
        "https://github.com/nibrovkina-cyber",
      ],
      knowsAbout: [
        "AI-маркетинг",
        "Direct response copywriting",
        "Конверсия лендингов",
        "Методология David Ogilvy",
        "Eugene Schwartz Breakthrough Advertising",
        "Claude Hopkins Scientific Advertising",
      ],
    },
    {
      "@type": "Organization",
      "@id": "https://natashabrovkina.com/#org",
      name: "natashabrovkina.com",
      legalName: "ИП Бровкина Н.",
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
      name: "AI Marketing Studio · 16 агентов",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: "https://natashabrovkina.com/tool",
      offers: [
        { "@type": "Offer", name: "Free", price: "0", priceCurrency: "RUB" },
        { "@type": "Offer", name: "Self-Serve", price: "2990", priceCurrency: "RUB", priceSpecification: { "@type": "UnitPriceSpecification", unitCode: "MON" } },
        { "@type": "Offer", name: "Personal", price: "49000", priceCurrency: "RUB" },
      ],
      author: { "@id": "https://natashabrovkina.com/#person" },
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
