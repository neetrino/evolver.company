import { staticAssetUrl } from "@/lib/static-assets";

export const BRAND_LOGO = {
  src: staticAssetUrl("/images/evolver-logo.png"),
  width: 1000,
  height: 562,
  alt: "evolver",
} as const;
