import "server-only";

import { unstable_cache } from "next/cache";
import { BLOG_CACHE_TAG, BLOG_REVALIDATE_SECONDS, FEATURED_HOME_LIMIT } from "@/lib/blog/constants";
import { logBlogError } from "@/lib/blog/log";
import {
  toBlogDetail,
  toBlogListItem,
  type BlogCategorySource,
  type BlogPostSource,
} from "@/lib/blog/map-post";
import type {
  AdminBlogCategoryRow,
  AdminBlogPostRow,
  BlogCategoryOption,
  BlogCategoryTab,
  BlogDetail,
  BlogListItem,
} from "@/lib/blog/types";
import { resolveLocalizedText, type BlogLocaleCode } from "@/lib/blog/translatable";
import { prisma } from "@/lib/db";
import type { Locale } from "@/lib/i18n";

const featuredOrder = [
  { featuredOrder: { sort: "asc" as const, nulls: "last" as const } },
  { publishedAt: "desc" as const },
  { createdAt: "desc" as const },
];

async function loadCategories(ids: string[]): Promise<Map<string, BlogCategorySource> | null> {
  if (ids.length === 0) {
    return new Map();
  }

  try {
    const categories = await prisma.blogCategory.findMany({
      where: { id: { in: ids } },
      select: { id: true, slug: true, title: true },
    });
    return new Map(categories.map((category) => [category.id, category]));
  } catch (error) {
    logBlogError("load post categories", error);
    return null;
  }
}

function categoryFor(
  post: BlogPostSource,
  categories: Map<string, BlogCategorySource> | null,
): BlogCategorySource | null {
  if (!categories || !post.categoryId) {
    return null;
  }

  return categories.get(post.categoryId) ?? null;
}

async function mapPosts(rows: BlogPostSource[], locale: BlogLocaleCode): Promise<BlogListItem[]> {
  const ids = [...new Set(rows.flatMap((row) => (row.categoryId ? [row.categoryId] : [])))];
  const categories = await loadCategories(ids);
  return rows.map((row) => toBlogListItem(row, locale, categoryFor(row, categories)));
}

async function loadPublishedPosts(locale: Locale): Promise<BlogListItem[]> {
  try {
    const rows = await prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
    });
    return mapPosts(rows, locale);
  } catch (error) {
    logBlogError("published posts", error);
    return [];
  }
}

async function loadLatestPosts(locale: Locale): Promise<BlogListItem[]> {
  try {
    const rows = await prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
      take: FEATURED_HOME_LIMIT,
    });
    return mapPosts(rows, locale);
  } catch (error) {
    logBlogError("latest posts", error);
    return [];
  }
}

async function loadHomeStories(locale: Locale): Promise<BlogListItem[]> {
  try {
    const featured = await prisma.blogPost.findMany({
      where: { isPublished: true, featuredOnHome: true },
      orderBy: featuredOrder,
      take: FEATURED_HOME_LIMIT,
    });

    if (featured.length === 0) {
      return loadLatestPosts(locale);
    }

    return mapPosts(featured, locale);
  } catch (error) {
    logBlogError("featured posts", error);
    return loadLatestPosts(locale);
  }
}

function cached<T>(key: string, locale: Locale, loader: (locale: Locale) => Promise<T>): Promise<T> {
  return unstable_cache(() => loader(locale), [key, locale], {
    revalidate: BLOG_REVALIDATE_SECONDS,
    tags: [BLOG_CACHE_TAG],
  })();
}

export function getPublishedBlogPosts(locale: Locale): Promise<BlogListItem[]> {
  return cached("blog-published-posts", locale, loadPublishedPosts);
}

export function getHomeBlogStories(locale: Locale): Promise<BlogListItem[]> {
  return cached("blog-home-stories", locale, loadHomeStories);
}

export function getPublicBlogCategories(locale: Locale): Promise<BlogCategoryTab[]> {
  return cached("blog-public-categories", locale, loadPublicCategories);
}

export function getPublishedBlogPost(slug: string, locale: Locale): Promise<BlogDetail | null> {
  return unstable_cache(() => loadPublishedPost(slug, locale), ["blog-post", slug, locale], {
    revalidate: BLOG_REVALIDATE_SECONDS,
    tags: [BLOG_CACHE_TAG],
  })();
}

async function loadPublicCategories(locale: Locale): Promise<BlogCategoryTab[]> {
  try {
    const rows = await prisma.blogCategory.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });

    return rows.flatMap((row) => {
      const title = resolveLocalizedText(row.title, locale);
      return title ? [{ id: row.id, slug: row.slug, title }] : [];
    });
  } catch (error) {
    logBlogError("public categories", error);
    return [];
  }
}

async function loadPublishedPost(slug: string, locale: Locale): Promise<BlogDetail | null> {
  try {
    const row = await prisma.blogPost.findFirst({
      where: { slug, isPublished: true },
    });

    if (!row) {
      return null;
    }

    const categories = await loadCategories(row.categoryId ? [row.categoryId] : []);
    return toBlogDetail(row, locale, categoryFor(row, categories));
  } catch (error) {
    logBlogError("published post", error);
    return null;
  }
}

export async function getAdminBlogPosts(): Promise<AdminBlogPostRow[]> {
  const rows = await prisma.blogPost.findMany({
    orderBy: { publishedAt: "desc" },
    include: { category: true },
  });

  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    image: row.image,
    publishedAt: row.publishedAt.toISOString(),
    isPublished: row.isPublished,
    featuredOnHome: row.featuredOnHome,
    featuredOrder: row.featuredOrder,
    categoryTitle: row.category?.title ?? "",
  }));
}

export async function getBlogPostForEdit(id: string) {
  return prisma.blogPost.findUnique({ where: { id } });
}

export async function getAdminBlogCategories(): Promise<AdminBlogCategoryRow[]> {
  const rows = await prisma.blogCategory.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    order: row.order,
  }));
}

export async function getBlogCategoryOptions(): Promise<BlogCategoryOption[]> {
  const rows = await getAdminBlogCategories();
  return rows.map((row) => ({ id: row.id, title: row.title }));
}

export async function getBlogCategoryForEdit(id: string) {
  return prisma.blogCategory.findUnique({ where: { id } });
}

export async function isBlogPostSlugTaken(slug: string, excludeId?: string): Promise<boolean> {
  const existing = await prisma.blogPost.findFirst({
    where: { slug, ...(excludeId ? { NOT: { id: excludeId } } : {}) },
    select: { id: true },
  });
  return Boolean(existing);
}

export async function isBlogCategorySlugTaken(slug: string, excludeId?: string): Promise<boolean> {
  const existing = await prisma.blogCategory.findFirst({
    where: { slug, ...(excludeId ? { NOT: { id: excludeId } } : {}) },
    select: { id: true },
  });
  return Boolean(existing);
}
