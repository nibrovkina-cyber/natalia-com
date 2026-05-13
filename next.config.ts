import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Locale-prefix redirects. Replaces proxy.ts (Next 16 proxy can't run on Edge,
  // and OpenNext Cloudflare doesn't support Node middleware).
  // Default locale is /ru — Accept-Language detection is sacrificed for
  // a working CF Workers deploy. Users on EN UI can flip via /en switcher.
  async redirects() {
    return [
      { source: "/", destination: "/ru", permanent: false },
      { source: "/method", destination: "/ru/method", permanent: false },
      { source: "/tool", destination: "/ru/tool", permanent: false },
      { source: "/pricing", destination: "/ru/pricing", permanent: false },
      { source: "/gallery", destination: "/ru/gallery", permanent: false },
      { source: "/gallery/:slug", destination: "/ru/gallery/:slug", permanent: false },
      { source: "/waitlist", destination: "/ru/waitlist", permanent: false },
    ];
  },
};

export default nextConfig;
