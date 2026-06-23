import type { NextConfig } from "next";
import { getR2PublicHostname } from "@/lib/storage";

const r2Hostname = getR2PublicHostname();
const r2PublicUrl = process.env.R2_PUBLIC_URL?.trim().replace(/\/$/, "");

const nextConfig: NextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 300,
    },
  },
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    formats: ["image/avif", "image/webp"],
    remotePatterns: r2Hostname
      ? [
          {
            protocol: "https",
            hostname: r2Hostname,
            pathname: "/**",
          },
        ]
      : [],
  },
  async rewrites() {
    if (!r2PublicUrl) {
      return [];
    }

    return [
      {
        source: "/cdn/:path*",
        destination: `${r2PublicUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
