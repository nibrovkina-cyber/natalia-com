import { NextRequest, NextResponse } from "next/server";
import { i18n, isLocale } from "@/app/i18n/config";

// Heuristic Accept-Language → locale mapping. We don't ship `accept-language`
// parser dependency for one match — manual scan is enough for ru/en.
function detectLocale(request: NextRequest): "ru" | "en" {
  const accept = request.headers.get("accept-language") || "";
  const ranked = accept
    .split(",")
    .map((part) => part.trim().split(";")[0].toLowerCase())
    .filter(Boolean);

  for (const tag of ranked) {
    if (tag.startsWith("ru")) return "ru";
    if (tag.startsWith("en")) return "en";
  }
  return i18n.defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static assets, API, public files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/demo") ||
    pathname.startsWith("/screens") ||
    pathname.startsWith("/slides") ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    pathname === "/llms.txt" ||
    pathname === "/manifest.webmanifest" ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Already prefixed → continue
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] && isLocale(segments[0])) {
    return NextResponse.next();
  }

  // No locale prefix → redirect to detected locale
  const locale = detectLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  newUrl.search = request.nextUrl.search;
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    // Match everything except listed paths
    "/((?!api|_next/static|_next/image|favicon|assets|demo|screens|slides|sitemap.xml|robots.txt|llms.txt|manifest.webmanifest).*)",
  ],
};
