import "server-only";

import type { Locale } from "@/lib/i18n";
import { getPageCopyCatalog, getPageCopyDefinition } from "@/lib/page-copy/catalog";
import { type PageCopyId, isPageCopyId } from "@/lib/page-copy/constants";
import { fieldGroup, fieldLabel, isMultilineField, type PageCopyField } from "@/lib/page-copy/fields";
import type { PageCopyEditorModel, PageCopyIndexItem } from "@/lib/page-copy/model-types";
import { hasPageCopyOverrides, readAllPageCopy, readPageCopy } from "@/lib/page-copy/store";
import { applyCopyOverrides, collectCopyPaths, readStringPath } from "@/lib/page-copy/tree";

function defaultsFor(pageId: PageCopyId, locale: Locale): unknown {
  return getPageCopyDefinition(pageId).load(locale);
}

function buildFields(pageId: PageCopyId, stored: Awaited<ReturnType<typeof readPageCopy>>): PageCopyField[] {
  const english = defaultsFor(pageId, "en");
  const armenian = defaultsFor(pageId, "hy");
  const resolved = {
    en: applyCopyOverrides(english, stored.en),
    hy: applyCopyOverrides(armenian, stored.hy),
  };
  const paths = collectCopyPaths(english);

  return paths.flatMap((path) => {
    const defaults = {
      en: readStringPath(english, path) ?? "",
      hy: readStringPath(armenian, path) ?? "",
    };
    const values = {
      en: readStringPath(resolved.en, path) ?? defaults.en,
      hy: readStringPath(resolved.hy, path) ?? defaults.hy,
    };

    return [
      {
        path,
        group: fieldGroup(path),
        label: fieldLabel(path),
        multiline: isMultilineField(path, `${defaults.en}${defaults.hy}`),
        values,
        defaults,
      },
    ];
  });
}

export async function getPageCopyIndex(): Promise<PageCopyIndexItem[]> {
  const stored = await readAllPageCopy();

  return getPageCopyCatalog().map((page) => ({
    id: page.id,
    publicPath: page.publicPath,
    fieldCount: collectCopyPaths(page.load("en")).length,
    customized: hasPageCopyOverrides(stored.get(page.id) ?? { en: {}, hy: {} }),
    title: page.title,
    description: page.description,
  }));
}

export async function getPageCopyEditorModel(pageId: string): Promise<PageCopyEditorModel | null> {
  if (!isPageCopyId(pageId)) {
    return null;
  }

  const definition = getPageCopyDefinition(pageId);
  const stored = await readPageCopy(pageId);

  return {
    id: pageId,
    publicPath: definition.publicPath,
    title: definition.title,
    description: definition.description,
    fields: buildFields(pageId, stored),
  };
}
