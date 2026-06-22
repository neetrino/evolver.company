import { getHomeContent } from "@/lib/content";
import type { HomeHeroConfig } from "@/lib/home-hero-types";

const DEFAULT_HERO_IMAGE = "/images/hero-banner.png";

export function getDefaultHomeHeroConfig(): HomeHeroConfig {
  const enContent = getHomeContent("en");
  const hyContent = getHomeContent("hy");

  return {
    slides: [
      {
        imageUrl: DEFAULT_HERO_IMAGE,
        ctaHref: "/projects",
        copy: {
          hy: {
            title: hyContent.hero.title,
            description: hyContent.hero.subtitle,
            ctaLabel: hyContent.hero.primaryCta,
          },
          en: {
            title: enContent.hero.title,
            description: enContent.hero.subtitle,
            ctaLabel: enContent.hero.primaryCta,
          },
          ru: {
            title: "",
            description: "",
            ctaLabel: "",
          },
        },
      },
    ],
  };
}
