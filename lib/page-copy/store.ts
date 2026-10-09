import "server-only";

import { cache } from "react";
import { revalidatePath } from "next/cache";
import { Prisma } from "@/prisma/generated/prisma/client";
import { prisma } from "@/lib/db";
import { LOCALES } from "@/lib/i18n";
import { getPageCopyDefinition } from "@/lib/page-copy/catalog";
import {
  PAGE_COPY_LOCALES,
  type PageCopyId,
  type PageCopyLocale,
  type StoredPageCopy,
  isPageCopyId,
  pageCopySettingKey,
  PAGE_COPY_KEY_PREFIX,
} from "@/lib/page-copy/constants";

function emptyStored(): StoredPageCopy {
  return { en: {}, hy: {} };
}

function isStringRecord(value: unknown): value is Record<string, string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  return Object.values(value).every((entry) => typeof entry === "string");
}

function parseStored(value: unknown): StoredPageCopy {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return emptyStored();
  }

  const record = value as Record<string, unknown>;
  const stored = emptyStored();

  for (const locale of PAGE_COPY_LOCALES) {
    if (isStringRecord(record[locale])) {
      stored[locale] = record[locale];
    }
  }

  return stored;
}

export const readAllPageCopy = cache(async (): Promise<Map<PageCopyId, StoredPageCopy>> => {
  const rows = await prisma.siteSetting.findMany({
    where: { key: { startsWith: PAGE_COPY_KEY_PREFIX } },
    select: { key: true, value: true },
  });
  const stored = new Map<PageCopyId, StoredPageCopy>();

  for (const row of rows) {
    const pageId = row.key.slice(PAGE_COPY_KEY_PREFIX.length);
    if (isPageCopyId(pageId)) {
      stored.set(pageId, parseStored(row.value));
    }
  }

  return stored;
});

export async function readPageCopy(pageId: PageCopyId): Promise<StoredPageCopy> {
  const all = await readAllPageCopy();
  return all.get(pageId) ?? emptyStored();
}

export async function writePageCopy(pageId: PageCopyId, stored: StoredPageCopy): Promise<void> {
  const key = pageCopySettingKey(pageId);
  const hasOverrides = PAGE_COPY_LOCALES.some((locale) => Object.keys(stored[locale]).length > 0);

  if (!hasOverrides) {
    await prisma.siteSetting.deleteMany({ where: { key } });
    return;
  }

  const value = JSON.parse(JSON.stringify(stored)) as Prisma.InputJsonValue;
  const description = `Public copy overrides for ${pageId}`;

  await prisma.siteSetting.upsert({
    where: { key },
    create: { key, value, description },
    update: { value, description },
  });
}

export function revalidatePageCopy(pageId: PageCopyId): void {
  const { publicPath } = getPageCopyDefinition(pageId);
  const suffix = publicPath === "/" ? "" : publicPath;

  revalidatePath("/admin/pages");
  revalidatePath(`/admin/pages/${pageId}`);

  for (const locale of LOCALES) {
    revalidatePath(`/${locale}`, "layout");
    revalidatePath(`/${locale}${suffix}`);
  }
}

export function hasPageCopyOverrides(stored: StoredPageCopy): boolean {
  return PAGE_COPY_LOCALES.some((locale: PageCopyLocale) => Object.keys(stored[locale]).length > 0);
}
