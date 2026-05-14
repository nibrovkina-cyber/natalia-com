import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/", destination: "/ru", permanent: false },
      { source: "/about", destination: "/personal.html", permanent: false },
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
