import { resolvePublicBlocks } from "@/lib/blog/block-derive";
import { hydrateBlocks, readGalleryItems } from "@/lib/blog/blocks";
import { toDateInputValue } from "@/lib/blog/dates";
import type { BlogDetail, BlogListItem, BlogPostFormValues } from "@/lib/blog/types";
import { decodeTranslatableText, resolveLocalizedText, type BlogLocaleCode } from "@/lib/blog/translatable";

export type BlogPostSource = {
  id: string;
  title: string;
  slug: string;
  content: string;
  shortDescription: string;
  image: string | null;
  imageKey: string | null;
  headerImage: string | null;
  headerImageKey: string | null;
  galleryContent: unknown;
  contentBlocks: unknown;
  publishedAt: Date;
  order: number;
  isPublished: boolean;
  featuredOnHome: boolean;
  featuredOrder: number | null;
  categoryId: string | null;
};

export type BlogCategorySource = {
  id: string;
  slug: string;
  title: string;
};

function resolveCategory(
  category: BlogCategorySource | null,
  locale: BlogLocaleCode,
): BlogListItem["category"] {
  if (!category) {
    return null;
  }

  const title = resolveLocalizedText(category.title, locale);
  if (!title) {
    return null;
  }

  return { id: category.id, slug: category.slug, title };
}

export function toBlogListItem(
  post: BlogPostSource,
  locale: BlogLocaleCode,
  category: BlogCategorySource | null,
): BlogListItem {
  return {
    id: post.id,
    title: resolveLocalizedText(post.title, locale),
    slug: post.slug,
    content: resolveLocalizedText(post.content, locale),
    shortDescription: resolveLocalizedText(post.shortDescription, locale),
    image: post.image,
    headerImage: post.headerImage,
    gallery: readGalleryItems(post.galleryContent).map((item) => ({
      ...item,
      caption: resolveLocalizedText(item.caption, locale),
    })),
    publishedAt: post.publishedAt.toISOString(),
    order: post.order,
    category: resolveCategory(category, locale),
  };
}

export function toBlogDetail(
  post: BlogPostSource,
  locale: BlogLocaleCode,
  category: BlogCategorySource | null,
): BlogDetail {
  const blocks = hydrateBlocks(post.contentBlocks, post.content, post.galleryContent);

  return {
    ...toBlogListItem(post, locale, category),
    blocks: resolvePublicBlocks(blocks, locale),
  };
}

export function toBlogPostFormValues(post: BlogPostSource): BlogPostFormValues {
  return {
    titles: decodeTranslatableText(post.title),
    shortDescriptions: decodeTranslatableText(post.shortDescription),
    slug: post.slug,
    categoryId: post.categoryId ?? "",
    publishedAt: toDateInputValue(post.publishedAt),
    blocks: hydrateBlocks(post.contentBlocks, post.content, post.galleryContent),
    image: post.image ? { url: post.image, key: post.imageKey ?? "" } : null,
    headerImage: post.headerImage ? { url: post.headerImage, key: post.headerImageKey ?? "" } : null,
    isPublished: post.isPublished,
    featuredOnHome: post.featuredOnHome,
    featuredOrder: post.featuredOrder === null ? "" : String(post.featuredOrder),
  };
}
