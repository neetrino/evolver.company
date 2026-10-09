import type { PageCopyMediaItem, PageCopyMediaKind } from "@/lib/page-copy/model-types";

const MAX_MEDIA_ITEMS = 48;
const MAX_LABEL_LENGTH = 120;
const MAX_SRC_LENGTH = 2000;
const MEDIA_ID = /^[A-Za-z0-9][A-Za-z0-9._-]{0,120}$/;
const IMAGE_SRC = /\.(png|jpe?g|webp|gif|svg|avif)(\?.*)?$/i;
const VIDEO_SRC = /\.(mp4|webm)(\?.*)?$/i;

function isKind(value: unknown): value is PageCopyMediaKind {
  return value === "image" || value === "video";
}

function isSafeSrc(src: string, kind: PageCopyMediaKind): boolean {
  if (!src.startsWith("/cdn/") && !src.startsWith("https://")) {
    return false;
  }

  return kind === "video" ? VIDEO_SRC.test(src) : IMAGE_SRC.test(src);
}

function parseItem(value: unknown): PageCopyMediaItem | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const record = value as Record<string, unknown>;
  const id = record.id;
  const label = record.label;
  const src = record.src;
  const kind = record.kind;

  if (typeof id !== "string" || !MEDIA_ID.test(id)) {
    return null;
  }
  if (typeof label !== "string" || label.trim().length === 0 || label.length > MAX_LABEL_LENGTH) {
    return null;
  }
  if (typeof src !== "string" || src.length > MAX_SRC_LENGTH || !isKind(kind) || !isSafeSrc(src, kind)) {
    return null;
  }

  return { id, label: label.trim(), src, kind };
}

/** Returns an error message, or the cleaned list. */
export function parsePageMedia(value: unknown): PageCopyMediaItem[] | string {
  if (!Array.isArray(value)) {
    return "Media list is invalid.";
  }

  if (value.length > MAX_MEDIA_ITEMS) {
    return "Too many images and videos.";
  }

  const items: PageCopyMediaItem[] = [];
  const seen = new Set<string>();

  for (const entry of value) {
    const item = parseItem(entry);
    if (!item || seen.has(item.id)) {
      return "A media item is invalid.";
    }
    seen.add(item.id);
    items.push(item);
  }

  return items;
}
