import "server-only";

import { prisma } from "@/lib/db";
import type { Locale } from "@/lib/i18n";
import type { PostFormData, PostWithDetails } from "@/lib/post-types";
import { getPostTranslation } from "@/lib/post-types";

export type { PostFormData, PostWithDetails } from "@/lib/post-types";
export { getPostTranslation } from "@/lib/post-types";
export { slugify } from "@/lib/project-types";

const postInclude = {
  translations: true,
};

function postHasContent(post: PostWithDetails): boolean {
  return post.translations.some((translation) => translation.title.trim().length > 0);
}

export async function getPublishedPosts(): Promise<PostWithDetails[]> {
  const posts = await prisma.post.findMany({
    where: { isPublished: true },
    include: postInclude,
    orderBy: { createdAt: "desc" },
  });

  return posts.filter(postHasContent);
}

export async function getPublishedPostBySlug(slug: string): Promise<PostWithDetails | null> {
  const post = await prisma.post.findFirst({
    where: { slug, isPublished: true },
    include: postInclude,
  });

  if (!post || !postHasContent(post)) {
    return null;
  }

  return post;
}

export async function getAllPosts(): Promise<PostWithDetails[]> {
  return prisma.post.findMany({
    include: postInclude,
    orderBy: { createdAt: "desc" },
  });
}

export async function getPostById(id: string): Promise<PostWithDetails | null> {
  return prisma.post.findUnique({
    where: { id },
    include: postInclude,
  });
}

export async function isPostSlugTaken(slug: string, excludeId?: string): Promise<boolean> {
  const existing = await prisma.post.findFirst({
    where: {
      slug,
      ...(excludeId ? { NOT: { id: excludeId } } : {}),
    },
    select: { id: true },
  });

  return Boolean(existing);
}

export function postToFormData(post: PostWithDetails): PostFormData {
  const byLocale = Object.fromEntries(
    post.translations.map((translation) => [
      translation.locale,
      {
        title: translation.title,
        description: translation.description,
      },
    ]),
  ) as Partial<PostFormData["translations"]>;

  return {
    slug: post.slug,
    isPublished: post.isPublished,
    coverImage:
      post.coverImage && post.coverImageKey
        ? { url: post.coverImage, key: post.coverImageKey }
        : post.coverImage
          ? { url: post.coverImage, key: "" }
          : null,
    translations: {
      en: byLocale.en ?? { title: "", description: "" },
      ru: byLocale.ru ?? { title: "", description: "" },
      hy: byLocale.hy ?? { title: "", description: "" },
    },
  };
}

export function getPostTitle(post: PostWithDetails, locale: Locale): string {
  return getPostTranslation(post, locale).title;
}
