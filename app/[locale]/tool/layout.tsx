import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Студия · 16 AI-агентов для маркетинга | natashabrovkina.com",
  description: "Открой инструмент: вставь URL сайта → AI-команда из 16 агентов сделает анализ и переписку лендинга за 60 секунд. Методология Ogilvy/Schwartz/Hopkins. Бесплатно: 3 лендинга без регистрации.",
  keywords: ["AI студия маркетинг", "сделать лендинг AI", "переписать сайт AI", "Claude маркетинг бесплатно", "AI агенты маркетинг"],
  alternates: { canonical: "https://natashabrovkina.com/tool" },
  openGraph: {
    title: "AI Marketing Studio · 16 агентов готовы к работе",
    description: "Вставь URL — получи переписанный лендинг за 60 секунд. Методология Ogilvy/Schwartz/Hopkins.",
    url: "https://natashabrovkina.com/tool",
    type: "website",
    locale: "ru_RU",
  },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
  return children;
}
