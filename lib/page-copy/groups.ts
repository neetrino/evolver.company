import { PAGE_COPY_LOCALES, type PageCopyDraft, type PageCopyLocale } from "@/lib/page-copy/constants";
import type { PageCopyField } from "@/lib/page-copy/fields";

export type PageCopyGroup = {
  name: string;
  fields: PageCopyField[];
};

type GroupOptions = {
  query: string;
  draft: PageCopyDraft;
  editedOnly: boolean;
  isEdited: (field: PageCopyField) => boolean;
};

function matchesQuery(field: PageCopyField, needle: string, draft: PageCopyDraft): boolean {
  if (!needle) {
    return true;
  }

  const haystack = [
    field.label,
    field.path,
    ...PAGE_COPY_LOCALES.map((locale) => draft[locale][field.path] ?? ""),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(needle);
}

export function groupPageCopyFields(fields: PageCopyField[], options: GroupOptions): PageCopyGroup[] {
  const needle = options.query.trim().toLowerCase();
  const groups: PageCopyGroup[] = [];

  for (const field of fields) {
    if (options.editedOnly && !options.isEdited(field)) {
      continue;
    }

    if (!matchesQuery(field, needle, options.draft)) {
      continue;
    }

    const current = groups.find((group) => group.name === field.group);
    if (current) {
      current.fields.push(field);
    } else {
      groups.push({ name: field.group, fields: [field] });
    }
  }

  return groups;
}

export function localesWithEdits(
  fields: PageCopyField[],
  isEdited: (field: PageCopyField, locale: PageCopyLocale) => boolean,
): PageCopyLocale[] {
  return PAGE_COPY_LOCALES.filter((locale) => fields.some((field) => isEdited(field, locale)));
}

export function isFieldEdited(field: PageCopyField, draft: PageCopyDraft): boolean {
  return PAGE_COPY_LOCALES.some((locale) => (draft[locale][field.path] ?? "") !== field.defaults[locale]);
}
