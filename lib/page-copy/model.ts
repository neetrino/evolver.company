import "server-only";

import { getPageCopyCatalog, getPageCopyDefinition } from "@/lib/page-copy/catalog";
import {
  builtinSourceLocale,
  emptyPageCopy,
  isPageCopyId,
  type PageCopyId,
  type PageCopyLocale,
} from "@/lib/page-copy/constants";
import { fieldGroup, fieldLabel, isMultilineField, type PageCopyField } from "@/lib/page-copy/fields";
import type { PageCopyEditorModel, PageCopyIndexItem } from "@/lib/page-copy/model-types";
import { hasPageCopyOverrides, readAllPageCopy, readPageCopy } from "@/lib/page-copy/store";
import { applyCopyOverrides, collectCopyPaths, readStringPath } from "@/lib/page-copy/tree";

function defaultsFor(pageId: PageCopyId, locale: PageCopyLocale): unknown {
  return getPageCopyDefinition(pageId).load(builtinSourceLocale(locale));
}

function localeText(source: unknown, path: string): string {
  return readStringPath(source, path) ?? "";
}

function buildFields(pageId: PageCopyId, stored: Awaited<ReturnType<typeof readPageCopy>>): PageCopyField[] {
  const sources = {
    en: defaultsFor(pageId, "en"),
    ru: defaultsFor(pageId, "ru"),
    hy: defaultsFor(pageId, "hy"),
  };
  const resolved = {
    en: applyCopyOverrides(sources.en, stored.en),
    ru: applyCopyOverrides(sources.ru, stored.ru),
    hy: applyCopyOverrides(sources.hy, stored.hy),
  };

  return collectCopyPaths(sources.en).map((path) => {
    const defaults = {
      en: localeText(sources.en, path),
      ru: localeText(sources.ru, path),
      hy: localeText(sources.hy, path),
    };
    const values = {
      en: localeText(resolved.en, path),
      ru: localeText(resolved.ru, path),
      hy: localeText(resolved.hy, path),
    };

    return {
      path,
      group: fieldGroup(path),
      label: fieldLabel(path),
      multiline: isMultilineField(path, `${defaults.en}${defaults.ru}${defaults.hy}`),
      values,
      defaults,
    };
  });
}

export async function getPageCopyIndex(): Promise<PageCopyIndexItem[]> {
  const stored = await readAllPageCopy();

  return getPageCopyCatalog().map((page) => ({
    id: page.id,
    publicPath: page.publicPath,
    fieldCount: collectCopyPaths(page.load("en")).length,
    customized: hasPageCopyOverrides(stored.get(page.id) ?? emptyPageCopy()),
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
