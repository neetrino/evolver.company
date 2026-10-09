import { getPageCopyDefinition } from "@/lib/page-copy/catalog";
import {
  PAGE_COPY_LOCALES,
  PAGE_COPY_MAX_LENGTH,
  type PageCopyDraft,
  type PageCopyId,
  type StoredPageCopy,
} from "@/lib/page-copy/constants";
import { collectCopyPaths, readStringPath } from "@/lib/page-copy/tree";

function allowedPaths(pageId: PageCopyId): Set<string> {
  const definition = getPageCopyDefinition(pageId);
  const paths = PAGE_COPY_LOCALES.flatMap((locale) => collectCopyPaths(definition.load(locale)));
  return new Set(paths);
}

function diffLocale(
  defaults: unknown,
  next: Record<string, string>,
  allowed: Set<string>,
): Record<string, string> | string {
  const diff: Record<string, string> = {};

  for (const [path, value] of Object.entries(next)) {
    if (!allowed.has(path)) {
      return `Unknown field: ${path}`;
    }

    if (value.length > PAGE_COPY_MAX_LENGTH) {
      return `${path} is too long.`;
    }

    const builtin = readStringPath(defaults, path) ?? "";
    if (value !== builtin) {
      diff[path] = value;
    }
  }

  return diff;
}

/** Keeps only values that differ from the built-in copy. */
export function diffPageCopy(pageId: PageCopyId, draft: PageCopyDraft): StoredPageCopy | string {
  const definition = getPageCopyDefinition(pageId);
  const allowed = allowedPaths(pageId);
  const stored: StoredPageCopy = { en: {}, hy: {} };

  for (const locale of PAGE_COPY_LOCALES) {
    const diff = diffLocale(definition.load(locale), draft[locale] ?? {}, allowed);
    if (typeof diff === "string") {
      return diff;
    }

    stored[locale] = diff;
  }

  return stored;
}
