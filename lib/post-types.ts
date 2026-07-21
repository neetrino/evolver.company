import type { Locale } from "@/lib/i18n";

export type PostFormTranslation = {
  title: string;
  description: string;
};

export type PostCoverImageData = {
  url: string;
  key: string;
};

export type PostFormData = {
  slug: string;
  isPublished: boolean;
  coverImage: PostCoverImageData | null;
  translations: Record<Locale, PostFormTranslation>;
};

export type PostTranslationRecord = {
  locale: string;
  title: string;
  description: string;
};

export type PostWithDetails = {
  id: string;
  slug: string;
  coverImage: string | null;
  coverImageKey: string | null;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  translations: PostTranslationRecord[];
};

export function getPostTranslation<T extends { translations: PostTranslationRecord[] }>(
  post: T,
  locale: Locale,
): PostTranslationRecord {
  return (
    post.translations.find((translation) => translation.locale === locale) ??
    post.translations.find((translation) => translation.locale === "en") ??
    post.translations[0] ?? {
      locale,
      title: "",
      description: "",
    }
  );
}
