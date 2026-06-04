import { z } from "zod";
import {
  HOME_HERO_UI_LOCALES,
  type HomeHeroConfig,
  type HomeHeroSlide,
} from "@/lib/home-hero-types";

export const MAX_HOME_HERO_SLIDES = 12;

const localeCopySchema = z.object({
  title: z.string().trim().max(400),
  description: z.string().trim().max(4000),
  ctaLabel: z.string().trim().max(120),
});

const slideSchema = z.object({
  imageUrl: z.string().trim().min(1, "Desktop image is required").max(2048),
  mobileImageUrl: z
    .string()
    .trim()
    .max(2048)
    .optional()
    .transform((value) => (value && value.length > 0 ? value : undefined)),
  ctaHref: z.string().trim().max(512),
  copy: z.object({
    hy: localeCopySchema,
    en: localeCopySchema,
    ru: localeCopySchema,
  }),
});

const configSchema = z.object({
  slides: z
    .array(slideSchema)
    .min(1, "At least one slide is required")
    .max(MAX_HOME_HERO_SLIDES, `Maximum ${MAX_HOME_HERO_SLIDES} slides allowed`),
});

export type HomeHeroValidationResult =
  | { success: true; data: HomeHeroConfig }
  | { success: false; error: string };

function normalizeSlide(raw: z.infer<typeof slideSchema>): HomeHeroSlide {
  const copy = {} as HomeHeroSlide["copy"];

  for (const locale of HOME_HERO_UI_LOCALES) {
    copy[locale] = {
      title: raw.copy[locale].title.trim(),
      description: raw.copy[locale].description.trim(),
      ctaLabel: raw.copy[locale].ctaLabel.trim(),
    };
  }

  return {
    imageUrl: raw.imageUrl.trim(),
    mobileImageUrl: raw.mobileImageUrl,
    ctaHref: raw.ctaHref.trim(),
    copy,
  };
}

export function validateHomeHeroConfig(value: unknown): HomeHeroValidationResult {
  const parsed = configSchema.safeParse(value);

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return {
      success: false,
      error: firstIssue?.message ?? "Invalid home hero configuration.",
    };
  }

  return {
    success: true,
    data: {
      slides: parsed.data.slides.map(normalizeSlide),
    },
  };
}
