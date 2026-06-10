import type { NextConfig } from "next";
import { getR2PublicHostname } from "@/lib/storage";

const r2Hostname = getR2PublicHostname();

const nextConfig: NextConfig = {
  images: {
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
