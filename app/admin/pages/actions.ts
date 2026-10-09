"use server";

import { requireAdmin } from "@/lib/auth";
import { emptyPageCopy, isPageCopyId, type PageCopyDraft, type PageCopyId } from "@/lib/page-copy/constants";
import { revalidatePageCopy, writePageCopy } from "@/lib/page-copy/store";
import { diffPageCopy } from "@/lib/page-copy/validate";

export type PageCopyActionState = {
  error?: string;
  success?: "saved" | "reset";
};

function readDraft(value: PageCopyDraft | null): PageCopyDraft {
  return {
    en: value?.en ?? {},
    ru: value?.ru ?? {},
    hy: value?.hy ?? {},
  };
}

async function persist(pageId: PageCopyId, draft: PageCopyDraft): Promise<PageCopyActionState> {
  const diff = diffPageCopy(pageId, draft);
  if (typeof diff === "string") {
    return { error: diff };
  }

  await writePageCopy(pageId, diff);
  revalidatePageCopy(pageId);
  return { success: "saved" };
}

export async function savePageCopyAction(
  pageId: string,
  draft: PageCopyDraft,
): Promise<PageCopyActionState> {
  await requireAdmin();

  if (!isPageCopyId(pageId)) {
    return { error: "Unknown page." };
  }

  return persist(pageId, readDraft(draft));
}

export async function resetPageCopyAction(pageId: string): Promise<PageCopyActionState> {
  await requireAdmin();

  if (!isPageCopyId(pageId)) {
    return { error: "Unknown page." };
  }

  await writePageCopy(pageId, emptyPageCopy());
  revalidatePageCopy(pageId);
  return { success: "reset" };
}
