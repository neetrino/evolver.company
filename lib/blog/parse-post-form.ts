import { deriveContent, deriveGalleryContent, toStoredBlocks } from "@/lib/blog/block-derive";
import { parseBlock, type BlogContentBlock } from "@/lib/blog/blocks";
import {
  CONTENT_MAX_LENGTH,
  SHORT_DESCRIPTION_MAX_LENGTH,
  TITLE_MAX_LENGTH,
  TITLE_MIN_LENGTH,
} from "@/lib/blog/constants";
import { parsePublishedAt } from "@/lib/blog/dates";
import { blogSlugify, isBlogSlug } from "@/lib/blog/slug";
import {
  BLOG_LOCALES,
  encodeTranslatableText,
  localeMapFromForm,
  type LocaleTextMap,
} from "@/lib/blog/translatable";

export type ParsedBlogPost = {
  title: string;
  slug: string;
  categoryId: string | null;
  publishedAt: Date;
  contentBlocks: ReturnType<typeof toStoredBlocks>;
  content: string;
  shortDescription: string;
  galleryContent: ReturnType<typeof deriveGalleryContent>;
  image: string | null;
  imageKey: string | null;
  headerImage: string | null;
  headerImageKey: string | null;
  isPublished: boolean;
  featuredOnHome: boolean;
  featuredOrder: number | null;
};

export type ParseBlogPostResult =
  | { ok: true; data: ParsedBlogPost }
  | { ok: false; fieldErrors: Record<string, string> };

function readOptionalString(formData: FormData, key: string): string | null {
  const value = formData.get(key);
  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  return value;
}

function readBlocks(raw: string, fieldErrors: Record<string, string>): BlogContentBlock[] | null {
  if (!raw.trim()) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    const list = readBlockList(parsed);
    if (!list) {
      fieldErrors.contentBlocks = "Content blocks are invalid";
      return null;
    }

    return list.flatMap((block) => {
      const parsedBlock = parseBlock(block);
      return parsedBlock ? [parsedBlock] : [];
    });
  } catch {
    fieldErrors.contentBlocks = "Content blocks are invalid";
    return null;
  }
}

function readBlockList(parsed: unknown): unknown[] | null {
  if (Array.isArray(parsed)) {
    return parsed;
  }

  if (parsed && typeof parsed === "object" && Array.isArray((parsed as { blocks?: unknown }).blocks)) {
    return (parsed as { blocks: unknown[] }).blocks;
  }

  return null;
}

function validateTitles(titles: LocaleTextMap, fieldErrors: Record<string, string>): void {
  let hasValidTitle = false;

  for (const locale of BLOG_LOCALES) {
    const length = titles[locale]?.trim().length ?? 0;
    if (length > TITLE_MAX_LENGTH) {
      fieldErrors[`title.${locale}`] = `Title must be at most ${TITLE_MAX_LENGTH} characters`;
    }
    if (length >= TITLE_MIN_LENGTH && length <= TITLE_MAX_LENGTH) {
      hasValidTitle = true;
    }
  }

  if (!hasValidTitle) {
    fieldErrors.title = `Enter a title of at least ${TITLE_MIN_LENGTH} characters in one language`;
  }
}

function validateShortDescriptions(
  shortDescriptions: LocaleTextMap,
  fieldErrors: Record<string, string>,
): void {
  for (const locale of BLOG_LOCALES) {
    const length = shortDescriptions[locale]?.trim().length ?? 0;
    if (length > SHORT_DESCRIPTION_MAX_LENGTH) {
      fieldErrors[`shortDescription.${locale}`] =
        `Short description must be at most ${SHORT_DESCRIPTION_MAX_LENGTH} characters`;
    }
  }
}

function readFeaturedOrder(formData: FormData, featuredOnHome: boolean): number | null {
  if (!featuredOnHome) {
    return null;
  }

  const raw = formData.get("featuredOrder");
  if (typeof raw !== "string" || !raw.trim()) {
    return null;
  }

  const value = Number(raw);
  return Number.isInteger(value) ? value : null;
}

function collectFieldErrors(formData: FormData): {
  fieldErrors: Record<string, string>;
  blocks: BlogContentBlock[] | null;
  titles: LocaleTextMap;
  shortDescriptions: LocaleTextMap;
  slug: string;
} {
  const fieldErrors: Record<string, string> = {};
  const titles = localeMapFromForm(formData, "title");
  const shortDescriptions = localeMapFromForm(formData, "shortDescription");
  validateTitles(titles, fieldErrors);
  validateShortDescriptions(shortDescriptions, fieldErrors);

  const slug = blogSlugify(String(formData.get("slug") ?? ""));
  if (!isBlogSlug(slug)) {
    fieldErrors.slug = "Use a lowercase slug with letters, numbers, and hyphens";
  }

  const blocks = readBlocks(String(formData.get("contentBlocks") ?? ""), fieldErrors);
  const content = blocks ? deriveContent(blocks) : "";
  if (content.length > CONTENT_MAX_LENGTH) {
    fieldErrors.content = `Content must be at most ${CONTENT_MAX_LENGTH} characters`;
  }

  return { fieldErrors, blocks, titles, shortDescriptions, slug };
}

export function parseBlogPostForm(formData: FormData): ParseBlogPostResult {
  const collected = collectFieldErrors(formData);
  if (Object.keys(collected.fieldErrors).length > 0 || !collected.blocks) {
    return { ok: false, fieldErrors: collected.fieldErrors };
  }

  const featuredOnHome = formData.get("featuredOnHome") === "on";

  return {
    ok: true,
    data: {
      title: encodeTranslatableText(collected.titles),
      slug: collected.slug,
      categoryId: readOptionalString(formData, "categoryId"),
      publishedAt: parsePublishedAt(String(formData.get("publishedAt") ?? "")),
      contentBlocks: toStoredBlocks(collected.blocks),
      content: deriveContent(collected.blocks),
      shortDescription: encodeTranslatableText(collected.shortDescriptions),
      galleryContent: deriveGalleryContent(collected.blocks),
      image: readOptionalString(formData, "image"),
      imageKey: readOptionalString(formData, "imageKey"),
      headerImage: readOptionalString(formData, "headerImage"),
      headerImageKey: readOptionalString(formData, "headerImageKey"),
      isPublished: formData.get("isPublished") === "on",
      featuredOnHome,
      featuredOrder: readFeaturedOrder(formData, featuredOnHome),
    },
  };
}
