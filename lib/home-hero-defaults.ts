import { getHomeContent } from "@/lib/content";
import { HOME_HERO_IMAGE } from "@/lib/home-hero-image";
import type { HomeHeroConfig } from "@/lib/home-hero-types";

export function getDefaultHomeHeroConfig(): HomeHeroConfig {
  const enContent = getHomeContent("en");
  const hyContent = getHomeContent("hy");

  return {
    slides: [
      {
        imageUrl: HOME_HERO_IMAGE.src,
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
