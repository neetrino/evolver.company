"use server";

import { requireAdmin } from "@/lib/auth";
import { getPageCopyDefinition } from "@/lib/page-copy/catalog";
import { emptyPageCopy, isPageCopyId, type PageCopyDraft, type PageCopyId } from "@/lib/page-copy/constants";
import { mediaForPage } from "@/lib/page-copy/media";
import { writePageMedia } from "@/lib/page-copy/media-store";
import { parsePageMedia } from "@/lib/page-copy/media-validate";
import type { PageCopyMediaItem } from "@/lib/page-copy/model-types";
import { revalidatePageCopy, writePageCopy } from "@/lib/page-copy/store";
import { diffPageCopy } from "@/lib/page-copy/validate";

export type PageCopyActionState = {
  error?: string;
  success?: "saved" | "reset";
  media?: PageCopyMediaItem[];
};

function readDraft(value: PageCopyDraft | null): PageCopyDraft {
  return {
    en: value?.en ?? {},
    ru: value?.ru ?? {},
    hy: value?.hy ?? {},
  };
}

async function persist(
  pageId: PageCopyId,
  draft: PageCopyDraft,
  media: PageCopyMediaItem[],
): Promise<PageCopyActionState> {
  const diff = diffPageCopy(pageId, draft);
  if (typeof diff === "string") {
    return { error: diff };
  }

  await writePageCopy(pageId, diff);
  await writePageMedia(pageId, media);
  revalidatePageCopy(pageId);
  return { success: "saved" };
}

export async function savePageCopyAction(
  pageId: string,
  draft: PageCopyDraft,
  media: unknown,
): Promise<PageCopyActionState> {
  await requireAdmin();

  if (!isPageCopyId(pageId)) {
    return { error: "Unknown page." };
  }

  const parsed = parsePageMedia(media);
  if (typeof parsed === "string") {
    return { error: parsed };
  }

  return persist(pageId, readDraft(draft), parsed);
}

export async function resetPageCopyAction(pageId: string): Promise<PageCopyActionState> {
  await requireAdmin();

  if (!isPageCopyId(pageId)) {
    return { error: "Unknown page." };
  }

  const media = mediaForPage(pageId, getPageCopyDefinition(pageId).load("en"));
  await writePageCopy(pageId, emptyPageCopy());
  await writePageMedia(pageId, media);
  revalidatePageCopy(pageId);
  return { success: "reset", media };
}
