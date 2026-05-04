import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Галерея кейсов · до/после переделки сайтов AI | natashabrovkina.com",
  description: "Реальные кейсы переделки сайтов малого бизнеса в РФ через AI-команду из 16 агентов. MEDEA Dent: ×3.4 заявок за 90 дней. Simbios Marketing: +58% конверсии. До/после с drag-слайдером.",
  keywords: ["кейсы редизайн сайтов", "до после AI", "AI маркетинг кейсы", "переделка лендинга", "редизайн сайта стоматологии", "MEDEA Dent", "Simbios"],
  alternates: { canonical: "https://natashabrovkina.com/gallery" },
  openGraph: {
    title: "Галерея кейсов · до/после переделки сайтов AI",
    description: "MEDEA Dent ×3.4 заявок. Simbios Marketing +58% конверсии. Все кейсы с drag-слайдером до/после.",
    url: "https://natashabrovkina.com/gallery",
    type: "website",
    locale: "ru_RU",
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
