import type { NextConfig } from "next";

function getR2PublicHostname(): string | null {
  const publicUrl = process.env.R2_PUBLIC_URL;

  if (!publicUrl) {
    return null;
  }

  try {
    return new URL(publicUrl).hostname;
  } catch {
    return null;
  }
}

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
