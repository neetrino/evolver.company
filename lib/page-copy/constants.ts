import type { AdminContentLocale } from "@/lib/admin-locales";
import type { Locale } from "@/lib/i18n";

export const PAGE_COPY_KEY_PREFIX = "page-copy:";

export const PAGE_COPY_MAX_LENGTH = 8000;

export const PAGE_COPY_LOCALES = ["en", "hy"] as const satisfies readonly Locale[];

export const PAGE_COPY_IDS = [
  "home",
  "home-videos",
  "what-we-do",
  "home-about",
  "trusted-by",
  "services",
  "services-detail",
  "about",
  "about-team",
  "about-projects",
  "customers",
  "clients",
  "partnership",
  "contact",
  "footer",
  "projects",
  "career",
  "blog",
  "navigation",
  "interface",
] as const;

export type PageCopyId = (typeof PAGE_COPY_IDS)[number];

export type PageCopyLocale = (typeof PAGE_COPY_LOCALES)[number];

export type PageCopyText = Record<AdminContentLocale, string>;

export type StoredPageCopy = Record<PageCopyLocale, Record<string, string>>;

export type PageCopyDraft = StoredPageCopy;

export function isPageCopyId(value: string): value is PageCopyId {
  return (PAGE_COPY_IDS as readonly string[]).includes(value);
}

export function pageCopySettingKey(pageId: PageCopyId): string {
  return `${PAGE_COPY_KEY_PREFIX}${pageId}`;
}
