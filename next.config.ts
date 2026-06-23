import type { NextConfig } from "next";
import { getR2PublicHostname } from "@/lib/storage";

const r2Hostname = getR2PublicHostname();

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
};

export default nextConfig;
