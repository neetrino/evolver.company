import "server-only";

import { Prisma } from "@/prisma/generated/prisma/client";
import { getDefaultHomeHeroConfig } from "@/lib/home-hero-defaults";
import {
  HOME_HERO_SETTING_KEY,
  type HomeHeroConfig,
  type HomeHeroSlide,
} from "@/lib/home-hero-types";
import { validateHomeHeroConfig } from "@/lib/home-hero-validation";
import { normalizeHomeHeroConfig } from "@/lib/home-hero-utils";
import { prisma } from "@/lib/db";
import type { Locale } from "@/lib/i18n";

export { normalizeHomeHeroConfig } from "@/lib/home-hero-utils";

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
