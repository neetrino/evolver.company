import { SLUG_MAX_LENGTH } from "@/lib/blog/constants";

const SLUG_PATTERN = /^[a-z0-9-]+$/;

export function blogSlugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, SLUG_MAX_LENGTH);
}

export function isBlogSlug(value: string): boolean {
  return value.length > 0 && value.length <= SLUG_MAX_LENGTH && SLUG_PATTERN.test(value);
}
