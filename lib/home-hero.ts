import { Prisma } from "@prisma/client";
import { getDefaultHomeHeroConfig } from "@/lib/home-hero-defaults";
import {
  HOME_HERO_SETTING_KEY,
  HOME_HERO_UI_LOCALES,
  type HomeHeroConfig,
  type HomeHeroSlide,
  type HomeHeroUiLocale,
} from "@/lib/home-hero-types";
import { validateHomeHeroConfig } from "@/lib/home-hero-validation";
import { prisma } from "@/lib/db";
import type { Locale } from "@/lib/i18n";

export function normalizeHomeHeroConfig(value: unknown): HomeHeroConfig | null {
  const validated = validateHomeHeroConfig(value);
  return validated.success ? validated.data : null;
}

export async function getHomeHeroConfigForAdmin(): Promise<HomeHeroConfig> {
  const setting = await prisma.siteSetting.findUnique({
    where: { key: HOME_HERO_SETTING_KEY },
  });

  if (!setting) {
    return getDefaultHomeHeroConfig();
  }

  const normalized = normalizeHomeHeroConfig(setting.value);
  return normalized ?? getDefaultHomeHeroConfig();
}

export async function getHomeHeroSlidesForStorefront(_locale: Locale): Promise<HomeHeroSlide[]> {
  const config = await getHomeHeroConfigForAdmin();
  return config.slides;
}

export async function saveHomeHeroConfig(config: HomeHeroConfig): Promise<void> {
  const validated = validateHomeHeroConfig(config);

  if (!validated.success) {
    throw new Error(validated.error);
  }

  const jsonValue = JSON.parse(JSON.stringify(validated.data)) as Prisma.InputJsonValue;

  await prisma.siteSetting.upsert({
    where: { key: HOME_HERO_SETTING_KEY },
    create: {
      key: HOME_HERO_SETTING_KEY,
      value: jsonValue,
      description: "Homepage hero carousel slides",
    },
    update: {
      value: jsonValue,
    },
  });
}

export async function resetHomeHeroConfig(): Promise<void> {
  const defaults = getDefaultHomeHeroConfig();
  await saveHomeHeroConfig(defaults);
}

function resolveStorefrontUiLocale(locale: Locale): HomeHeroUiLocale {
  if (locale === "hy") {
    return "hy";
  }

  return "en";
}

function pickCopyField(
  slide: HomeHeroSlide,
  locale: HomeHeroUiLocale,
  field: keyof HomeHeroSlide["copy"]["en"],
): string {
  const fallbackOrder: HomeHeroUiLocale[] = [
    locale,
    "en",
    "hy",
    "ru",
  ];

  for (const candidate of fallbackOrder) {
    const value = slide.copy[candidate][field];
    if (value.trim().length > 0) {
      return value;
    }
  }

  return "";
}

export function getHomeHeroSlideLines(
  slide: HomeHeroSlide,
  locale: Locale,
): { title: string; description: string; ctaLabel: string } {
  const uiLocale = resolveStorefrontUiLocale(locale);

  return {
    title: pickCopyField(slide, uiLocale, "title"),
    description: pickCopyField(slide, uiLocale, "description"),
    ctaLabel: pickCopyField(slide, uiLocale, "ctaLabel"),
  };
}

export function getHomeHeroSlideImageSrc(
  slide: HomeHeroSlide,
  variant: "desktop" | "mobile",
): string {
  if (variant === "mobile" && slide.mobileImageUrl) {
    return slide.mobileImageUrl;
  }

  return slide.imageUrl;
}

export function getHomeHeroSlidePreviewTitle(slide: HomeHeroSlide): string {
  for (const locale of HOME_HERO_UI_LOCALES) {
    const title = slide.copy[locale].title.trim();
    if (title.length > 0) {
      return title;
    }
  }

  return "";
}

export function createEmptyHomeHeroSlide(): HomeHeroSlide {
  const emptyCopy = {
    title: "",
    description: "",
    ctaLabel: "",
  };

  return {
    imageUrl: "",
    ctaHref: "/projects",
    copy: {
      hy: { ...emptyCopy },
      en: { ...emptyCopy },
      ru: { ...emptyCopy },
    },
  };
}
