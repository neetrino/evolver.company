import type { NextConfig } from "next";
import { getR2PublicHostname } from "@/lib/storage";

const r2Hostname = getR2PublicHostname();
const r2PublicUrl = process.env.R2_PUBLIC_URL?.trim().replace(/\/$/, "");

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840, 7680],
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
