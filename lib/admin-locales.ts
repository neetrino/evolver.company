export const ADMIN_CONTENT_LOCALES = ["en", "ru", "hy"] as const;

export type AdminContentLocale = (typeof ADMIN_CONTENT_LOCALES)[number];

export const ADMIN_CONTENT_LOCALE_LABELS: Record<AdminContentLocale, string> = {
  en: "EN",
  ru: "RU",
  hy: "AM",
};

export function isAdminContentLocale(value: string): value is AdminContentLocale {
  return ADMIN_CONTENT_LOCALES.includes(value as AdminContentLocale);
}
