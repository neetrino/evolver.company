import { BLOG_CONTENT_VERSION } from "@/lib/blog/constants";
import {
  type BlogContentBlock,
  type BlogGalleryItem,
  type PublicBlogBlock,
  readGalleryItem,
} from "@/lib/blog/blocks";
import {
  BLOG_LOCALES,
  encodeTranslatableText,
  pickDefaultLocaleText,
  resolveLocalizedText,
  type BlogLocaleCode,
  type LocaleTextMap,
} from "@/lib/blog/translatable";

export function deriveContent(blocks: BlogContentBlock[]): string {
  const merged: LocaleTextMap = {};

  for (const block of blocks) {
    if (block.type !== "description") {
      continue;
    }

    appendDescription(merged, block.html);
  }

  if (!BLOG_LOCALES.some((locale) => merged[locale]?.trim())) {
    return "";
  }

  return encodeTranslatableText(merged);
}

function appendDescription(merged: LocaleTextMap, html: LocaleTextMap): void {
  for (const locale of BLOG_LOCALES) {
    const part = html[locale]?.trim();
    if (!part) {
      continue;
    }

    const current = merged[locale];
    merged[locale] = current ? `${current}\n${part}` : part;
  }
}

export function deriveGalleryContent(blocks: BlogContentBlock[]): BlogGalleryItem[] {
  return blocks.flatMap((block) => galleryItemsFromBlock(block));
}

function galleryItemsFromBlock(block: BlogContentBlock): BlogGalleryItem[] {
  if (block.type === "gallery") {
    return block.items.flatMap((item) => {
      const parsed = readGalleryItem(item);
      return parsed ? [parsed] : [];
    });
  }

  if (block.type === "photo" && block.url.trim()) {
    return [
      {
        url: block.url.trim(),
        caption: encodeTranslatableText(block.caption),
        alt: pickDefaultLocaleText(block.caption),
      },
    ];
  }

  return [];
}

export function toStoredBlocks(blocks: BlogContentBlock[]): { v: number; blocks: BlogContentBlock[] } {
  return { v: BLOG_CONTENT_VERSION, blocks };
}

function localeText(map: LocaleTextMap, locale: BlogLocaleCode): string {
  return map[locale]?.trim() ?? "";
}

export function resolvePublicBlocks(
  blocks: BlogContentBlock[],
  locale: BlogLocaleCode,
): PublicBlogBlock[] {
  return blocks.flatMap((block) => {
    const resolved = resolveBlock(block, locale);
    return resolved ? [resolved] : [];
  });
}

function resolveBlock(block: BlogContentBlock, locale: BlogLocaleCode): PublicBlogBlock | null {
  if (block.type === "heading") {
    const text = localeText(block.text, locale);
    return text ? { id: block.id, type: "heading", text } : null;
  }

  if (block.type === "description") {
    const html = localeText(block.html, locale);
    return html ? { id: block.id, type: "description", html } : null;
  }

  if (block.type === "photo") {
    return block.url.trim()
      ? { id: block.id, type: "photo", url: block.url.trim(), caption: localeText(block.caption, locale) }
      : null;
  }

  if (block.type === "youtube") {
    return block.url.trim() ? { id: block.id, type: "youtube", url: block.url.trim() } : null;
  }

  if (block.type === "link") {
    const url = block.url.trim();
    if (!url) {
      return null;
    }

    const label = localeText(block.label, locale) || url;
    return { id: block.id, type: "link", url, label };
  }

  const items = block.items.flatMap((item) => {
    const parsed = readGalleryItem(item);
    if (!parsed) {
      return [];
    }

    return [
      {
        ...parsed,
        caption: resolveLocalizedText(parsed.caption, locale),
      },
    ];
  });

  return items.length > 0 ? { id: block.id, type: "gallery", items } : null;
}
