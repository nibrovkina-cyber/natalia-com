"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { i18n, type Locale } from "@/app/i18n/config";

// Renders a small RU/EN toggle. Resolves "current path without locale prefix"
// and reuses it for the alternate locale, so /en/method ↔ /ru/method works.
export default function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname() || "/";
  const segments = pathname.split("/").filter(Boolean);
  const tail = segments.slice(1).join("/");
  const alt: Locale = current === "ru" ? "en" : "ru";
  const altHref = tail ? `/${alt}/${tail}` : `/${alt}`;
  const label = i18n.locales.find((l) => l !== current)?.toUpperCase();

  return (
    <Link
      href={altHref}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: "var(--ink-3, var(--steel))",
        textDecoration: "none",
        padding: "6px 10px",
        border: "1px solid var(--hairline, rgba(0,0,0,0.1))",
        borderRadius: 2,
        transition: "all 200ms",
      }}
      aria-label={`Switch to ${label}`}
    >
      {label}
    </Link>
  );
}
