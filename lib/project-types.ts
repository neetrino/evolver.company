import type { Locale } from "@/lib/i18n";

export type ProjectFormTranslation = {
  title: string;
  shortDescription: string;
  longDescription: string;
};

export type CoverImageData = {
  url: string;
  key: string;
};

export type GalleryImageItem = {
  url: string;
  key: string;
};

export type ProjectFormData = {
  slug: string;
  projectUrl: string;
  accentColor: string;
  isPublished: boolean;
  coverImage: CoverImageData | null;
  translations: Record<Locale, ProjectFormTranslation>;
  galleryImages: GalleryImageItem[];
};

export type ProjectTranslationRecord = {
  locale: string;
  title: string;
  shortDescription: string;
  longDescription: string;
};

export type ProjectImageRecord = {
  url: string;
  key: string | null;
  sortOrder: number;
};

export type ProjectWithDetails = {
  id: string;
  slug: string;
  catalogSlug: string | null;
  projectUrl: string | null;
  coverImage: string | null;
  coverImageKey: string | null;
  accentColor: string | null;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  translations: ProjectTranslationRecord[];
  images: ProjectImageRecord[];
};

export type PublishedProjectLookupResult =
  | { kind: "project"; project: ProjectWithDetails }
  | { kind: "redirect"; targetSlug: string };

export function getProjectTranslation<
  T extends { translations: ProjectTranslationRecord[] },
>(project: T, locale: Locale): ProjectTranslationRecord {
  return (
    project.translations.find((t) => t.locale === locale) ??
    project.translations.find((t) => t.locale === "en") ??
    project.translations[0] ?? {
      locale,
      title: "",
      shortDescription: "",
      longDescription: "",
    }
  );
}

export function getProjectPlaceholderLetter(title: string, slug: string): string {
  const source = title.trim() || slug.trim();
  if (!source) {
    return "?";
  }

  return source.charAt(0).toUpperCase();
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
