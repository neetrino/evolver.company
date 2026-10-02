import { BLOG_CONTENT_VERSION, type BlogBlockType } from "@/lib/blog/constants";
import {
  BLOG_LOCALES,
  decodeTranslatableText,
  readLocaleMap,
  type LocaleTextMap,
} from "@/lib/blog/translatable";

export type BlogGalleryItem = {
  id?: string;
  url: string;
  key?: string;
  alt?: string;
  caption?: string;
  beforeAfter?: boolean;
};

export type BlogContentBlock =
  | { id: string; type: "heading"; text: LocaleTextMap }
  | { id: string; type: "description"; html: LocaleTextMap }
  | { id: string; type: "photo"; url: string; key?: string; caption: LocaleTextMap }
  | { id: string; type: "youtube"; url: string }
  | { id: string; type: "gallery"; items: BlogGalleryItem[] }
  | { id: string; type: "link"; url: string; label: LocaleTextMap };

export type PublicBlogBlock =
  | { id: string; type: "heading"; text: string }
  | { id: string; type: "description"; html: string }
  | { id: string; type: "photo"; url: string; caption: string }
  | { id: string; type: "youtube"; url: string }
  | { id: string; type: "gallery"; items: BlogGalleryItem[] }
  | { id: string; type: "link"; url: string; label: string };

const BLOCK_TYPES = new Set<BlogBlockType>([
  "heading",
  "description",
  "photo",
  "youtube",
  "gallery",
  "link",
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function readId(record: Record<string, unknown>): string {
  return typeof record.id === "string" && record.id.trim() ? record.id : crypto.randomUUID();
}

export function isBeforeAfterItem(record: Record<string, unknown>): boolean {
  return record.beforeAfter === true || isRecord(record.beforeAfter);
}

export function readGalleryItem(value: unknown): BlogGalleryItem | null {
  if (!isRecord(value)) {
    return null;
  }

  const url = typeof value.url === "string" ? value.url.trim() : "";
  if (!url || isBeforeAfterItem(value)) {
    return null;
  }

  return {
    id: typeof value.id === "string" ? value.id : undefined,
    url,
    key: typeof value.key === "string" ? value.key : undefined,
    alt: typeof value.alt === "string" ? value.alt : undefined,
    caption: typeof value.caption === "string" ? value.caption : undefined,
  };
}

export function readGalleryItems(value: unknown): BlogGalleryItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    const galleryItem = readGalleryItem(item);
    return galleryItem ? [galleryItem] : [];
  });
}

function parseGalleryBlockItems(value: unknown): BlogGalleryItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (!isRecord(item)) {
      return [];
    }

    const url = typeof item.url === "string" ? item.url : "";
    return [
      {
        id: typeof item.id === "string" ? item.id : undefined,
        url,
        key: typeof item.key === "string" ? item.key : undefined,
        alt: typeof item.alt === "string" ? item.alt : undefined,
        caption: typeof item.caption === "string" ? item.caption : undefined,
        beforeAfter: isBeforeAfterItem(item),
      },
    ];
  });
}

export function parseBlock(value: unknown): BlogContentBlock | null {
  if (!isRecord(value) || typeof value.type !== "string" || !BLOCK_TYPES.has(value.type as BlogBlockType)) {
    return null;
  }

  const id = readId(value);
  const type = value.type as BlogBlockType;

  if (type === "heading") {
    return { id, type, text: readLocaleMap(value.text) };
  }

  if (type === "description") {
    return { id, type, html: readLocaleMap(value.html) };
  }

  if (type === "photo") {
    return {
      id,
      type,
      url: typeof value.url === "string" ? value.url : "",
      key: typeof value.key === "string" ? value.key : undefined,
      caption: readLocaleMap(value.caption),
    };
  }

  if (type === "youtube") {
    return { id, type, url: typeof value.url === "string" ? value.url : "" };
  }

  if (type === "link") {
    return {
      id,
      type,
      url: typeof value.url === "string" ? value.url : "",
      label: readLocaleMap(value.label),
    };
  }

  return { id, type: "gallery", items: parseGalleryBlockItems(value.items) };
}

export function parseStoredBlocks(value: unknown): BlogContentBlock[] | null {
  if (!isRecord(value) || value.v !== BLOG_CONTENT_VERSION || !Array.isArray(value.blocks)) {
    return null;
  }

  const blocks = value.blocks.flatMap((block) => {
    const parsed = parseBlock(block);
    return parsed ? [parsed] : [];
  });

  return blocks.length > 0 ? blocks : null;
}

export function createBlockId(): string {
  return crypto.randomUUID();
}

export function hydrateBlocks(
  contentBlocks: unknown,
  content: string,
  galleryContent: unknown,
): BlogContentBlock[] {
  const stored = parseStoredBlocks(contentBlocks);
  if (stored) {
    return stored;
  }

  return buildLegacyBlocks(content, galleryContent);
}

function buildLegacyBlocks(content: string, galleryContent: unknown): BlogContentBlock[] {
  const blocks: BlogContentBlock[] = [];
  const html = decodeTranslatableText(content);

  if (BLOG_LOCALES.some((locale) => html[locale]?.trim())) {
    blocks.push({ id: createBlockId(), type: "description", html });
  }

  const items = readGalleryItems(galleryContent);
  if (items.length > 0) {
    blocks.push({ id: createBlockId(), type: "gallery", items });
  }

  return blocks;
}

export function createEmptyBlock(type: BlogBlockType): BlogContentBlock {
  const id = createBlockId();

  if (type === "heading") {
    return { id, type, text: {} };
  }

  if (type === "description") {
    return { id, type, html: {} };
  }

  if (type === "photo") {
    return { id, type, url: "", caption: {} };
  }

  if (type === "youtube") {
    return { id, type, url: "" };
  }

  if (type === "link") {
    return { id, type, url: "", label: {} };
  }

  return { id, type: "gallery", items: [] };
}
