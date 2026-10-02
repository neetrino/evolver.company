import type { Locale } from "@/lib/i18n";

const DATE_INPUT_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const NOON_UTC_SUFFIX = "T12:00:00.000Z";

export function toDateInputValue(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function todayDateInputValue(): string {
  return toDateInputValue(new Date());
}

export function parsePublishedAt(value: string): Date {
  const trimmed = value.trim();
  if (!DATE_INPUT_PATTERN.test(trimmed)) {
    return new Date(`${todayDateInputValue()}${NOON_UTC_SUFFIX}`);
  }

  return new Date(`${trimmed}${NOON_UTC_SUFFIX}`);
}

export function formatBlogDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "hy" ? "hy-AM" : "en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}
