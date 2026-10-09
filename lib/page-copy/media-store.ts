import "server-only";

import { cache } from "react";
import { Prisma } from "@/prisma/generated/prisma/client";
import { prisma } from "@/lib/db";
import type { PageCopyId } from "@/lib/page-copy/constants";
import { isPageCopyId } from "@/lib/page-copy/constants";
import { mediaForPage } from "@/lib/page-copy/media";
import { getPageCopyDefinition } from "@/lib/page-copy/catalog";
import type { PageCopyMediaItem } from "@/lib/page-copy/model-types";
import { parsePageMedia } from "@/lib/page-copy/media-validate";

const PAGE_MEDIA_KEY_PREFIX = "page-media:";

const SHARED_MEDIA_OWNER: Partial<Record<PageCopyId, PageCopyId>> = {
  "trusted-by": "clients",
  customers: "clients",
  partnership: "clients",
};

export function mediaOwnerId(pageId: PageCopyId): PageCopyId {
  return SHARED_MEDIA_OWNER[pageId] ?? pageId;
}

function settingKey(pageId: PageCopyId): string {
  return `${PAGE_MEDIA_KEY_PREFIX}${mediaOwnerId(pageId)}`;
}

function sameMedia(left: PageCopyMediaItem[], right: PageCopyMediaItem[]): boolean {
  return JSON.stringify(left) === JSON.stringify(right);
}

export const readAllPageMedia = cache(async (): Promise<Map<PageCopyId, PageCopyMediaItem[]>> => {
  const rows = await prisma.siteSetting.findMany({
    where: { key: { startsWith: PAGE_MEDIA_KEY_PREFIX } },
    select: { key: true, value: true },
  });
  const stored = new Map<PageCopyId, PageCopyMediaItem[]>();

  for (const row of rows) {
    const pageId = row.key.slice(PAGE_MEDIA_KEY_PREFIX.length);
    const parsed = parsePageMedia(row.value);
    if (isPageCopyId(pageId) && Array.isArray(parsed)) {
      stored.set(pageId, parsed);
    }
  }

  return stored;
});

/** Saved list, or null when the page still uses built-in files. */
export async function readPageMedia(pageId: PageCopyId): Promise<PageCopyMediaItem[] | null> {
  const all = await readAllPageMedia();
  return all.get(mediaOwnerId(pageId)) ?? null;
}

export async function writePageMedia(pageId: PageCopyId, items: PageCopyMediaItem[]): Promise<void> {
  const owner = mediaOwnerId(pageId);
  const builtin = mediaForPage(owner, getPageCopyDefinition(owner).load("en"));
  const key = settingKey(owner);

  if (sameMedia(items, builtin)) {
    await prisma.siteSetting.deleteMany({ where: { key } });
    return;
  }

  const value = JSON.parse(JSON.stringify(items)) as Prisma.InputJsonValue;
  const description = `Public media for ${owner}`;

  await prisma.siteSetting.upsert({
    where: { key },
    create: { key, value, description },
    update: { value, description },
  });
}
