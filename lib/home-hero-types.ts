export const HOME_HERO_UI_LOCALES = ["hy", "en", "ru"] as const;

export const HOME_HERO_ADMIN_LOCALES = ["hy", "en"] as const;

export type HomeHeroUiLocale = (typeof HOME_HERO_UI_LOCALES)[number];

export type HomeHeroAdminLocale = (typeof HOME_HERO_ADMIN_LOCALES)[number];

export interface HomeHeroSlideLocaleCopy {
  title: string;
  description: string;
  ctaLabel: string;
}

export interface HomeHeroSlide {
  imageUrl: string;
  mobileImageUrl?: string;
  ctaHref: string;
  copy: Record<HomeHeroUiLocale, HomeHeroSlideLocaleCopy>;
}

export interface HomeHeroConfig {
  slides: HomeHeroSlide[];
}

export const HOME_HERO_SETTING_KEY = "homeHero";
