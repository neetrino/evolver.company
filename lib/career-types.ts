import type { Locale } from "@/lib/i18n";

export type CareerFormTranslation = {
  title: string;
  description: string;
};

export type CareerCoverImageData = {
  url: string;
  key: string;
};

export type CareerFormData = {
  slug: string;
  salary: string;
  workHours: string;
  isPublished: boolean;
  coverImage: CareerCoverImageData | null;
  translations: Record<Locale, CareerFormTranslation>;
};

export type CareerTranslationRecord = {
  locale: string;
  title: string;
  description: string;
};

export type CareerJobWithDetails = {
  id: string;
  slug: string;
  coverImage: string | null;
  coverImageKey: string | null;
  salary: string;
  workHours: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  translations: CareerTranslationRecord[];
};

export function getCareerTranslation<T extends { translations: CareerTranslationRecord[] }>(
  job: T,
  locale: Locale,
): CareerTranslationRecord {
  return (
    job.translations.find((translation) => translation.locale === locale) ??
    job.translations.find((translation) => translation.locale === "en") ??
    job.translations[0] ?? {
      locale,
      title: "",
      description: "",
    }
  );
}
