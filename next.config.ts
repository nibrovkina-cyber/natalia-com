import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Root → personal site (static HTML served from public/)
      { source: "/", destination: "/personal.html" },
    ];
  },
  async redirects() {
    return [
      // /studio is the friendly alias for the marketing section
      { source: "/studio", destination: "/ru", permanent: false },
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
