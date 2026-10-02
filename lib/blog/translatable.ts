import { ADMIN_CONTENT_LOCALES, type AdminContentLocale } from "@/lib/admin-locales";

export const BLOG_LOCALES = ADMIN_CONTENT_LOCALES;

export type BlogLocaleCode = AdminContentLocale;

export type LocaleTextMap = Partial<Record<BlogLocaleCode, string>>;

const I18N_MARKER = "__at_i18n_v1";
const ARMENIAN_SCRIPT = /[\u0531-\u0587]/;
const CYRILLIC_SCRIPT = /[\u0400-\u04FF]/;

type I18nPayload = {
  __at_i18n_v1: true;
  values: Record<string, unknown>;
};

function isI18nPayload(value: unknown): value is I18nPayload {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;
  return record[I18N_MARKER] === true && typeof record.values === "object" && record.values !== null;
}

function inferLegacyLocale(value: string): BlogLocaleCode {
  if (ARMENIAN_SCRIPT.test(value)) {
    return "hy";
  }

  if (CYRILLIC_SCRIPT.test(value)) {
    return "ru";
  }

  return "en";
}

function readLocaleValues(values: Record<string, unknown>): LocaleTextMap {
  const map: LocaleTextMap = {};

  for (const locale of BLOG_LOCALES) {
    const entry = values[locale];
    if (typeof entry === "string" && entry.trim()) {
      map[locale] = entry;
    }
  }

  return map;
}

export function decodeTranslatableText(raw: string | null | undefined): LocaleTextMap {
  if (!raw?.trim()) {
    return {};
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (isI18nPayload(parsed)) {
      return readLocaleValues(parsed.values);
    }
  } catch {
    return { [inferLegacyLocale(raw)]: raw };
  }

  return { [inferLegacyLocale(raw)]: raw };
}

export function encodeTranslatableText(map: LocaleTextMap): string {
  const values: Record<string, string> = {};

  for (const locale of BLOG_LOCALES) {
    const value = map[locale];
    if (value?.trim()) {
      values[locale] = value;
    }
  }

  if (Object.keys(values).length === 0) {
    return "";
  }

  return JSON.stringify({ [I18N_MARKER]: true, values });
}

export function resolveLocalizedText(
  raw: string | null | undefined,
  locale: BlogLocaleCode,
): string {
  const map = decodeTranslatableText(raw);
  return map[locale]?.trim() ?? "";
}

export function getAdminLocaleValue(
  raw: string | null | undefined,
  preferred: BlogLocaleCode,
): string {
  const map = decodeTranslatableText(raw);
  const preferredValue = map[preferred]?.trim();

  if (preferredValue) {
    return preferredValue;
  }

  for (const locale of BLOG_LOCALES) {
    const value = map[locale]?.trim();
    if (value) {
      return value;
    }
  }

  return "";
}

export function pickDefaultLocaleText(map: LocaleTextMap): string {
  const english = map.en?.trim();
  if (english) {
    return english;
  }

  for (const locale of BLOG_LOCALES) {
    const value = map[locale]?.trim();
    if (value) {
      return value;
    }
  }

  return "";
}

export function readLocaleMap(value: unknown): LocaleTextMap {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  const record = value as Record<string, unknown>;
  const map: LocaleTextMap = {};

  for (const locale of BLOG_LOCALES) {
    const entry = record[locale];
    if (typeof entry === "string") {
      map[locale] = entry;
    }
  }

  return map;
}

export function localeMapFromForm(formData: FormData, field: string): LocaleTextMap {
  const map: LocaleTextMap = {};

  for (const locale of BLOG_LOCALES) {
    const value = formData.get(`${field}.${locale}`);
    if (typeof value === "string") {
      map[locale] = value;
    }
  }

  return map;
}
