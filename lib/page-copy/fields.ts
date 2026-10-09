import { PAGE_COPY_LOCALES, type PageCopyDraft, type PageCopyLocale } from "@/lib/page-copy/constants";

const MULTILINE_PATH = /(body|description|subtitle|message|supporting|copyright|brandDescription)/i;

const MULTILINE_MIN_LENGTH = 80;

export type PageCopyField = {
  path: string;
  group: string;
  label: string;
  multiline: boolean;
  values: Record<PageCopyLocale, string>;
  defaults: Record<PageCopyLocale, string>;
};

function humanize(segment: string): string {
  if (/^\d+$/.test(segment)) {
    return String(Number(segment) + 1);
  }

  const words = segment
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .trim();

  return words.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function isMultilineField(path: string, value: string): boolean {
  return value.length > MULTILINE_MIN_LENGTH || MULTILINE_PATH.test(path);
}

export function fieldGroup(path: string): string {
  const [first] = path.split(".");
  if (!first || path.split(".").length === 1) {
    return "Copy";
  }

  return humanize(first);
}

export function draftFromFields(
  fields: PageCopyField[],
  pick: (field: PageCopyField, locale: PageCopyLocale) => string,
): PageCopyDraft {
  const draft = {} as PageCopyDraft;

  for (const locale of PAGE_COPY_LOCALES) {
    draft[locale] = Object.fromEntries(fields.map((field) => [field.path, pick(field, locale)]));
  }

  return draft;
}

export function fieldLabel(path: string): string {
  const segments = path.split(".");
  const visible = segments.length === 1 ? segments : segments.slice(1);
  return visible.map(humanize).join(" / ");
}
