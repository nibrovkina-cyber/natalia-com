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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
