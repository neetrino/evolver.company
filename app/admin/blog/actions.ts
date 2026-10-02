"use server";

import { redirect } from "next/navigation";
import { FEATURED_ORDER_DEFAULT } from "@/lib/blog/constants";
import { parseBlogCategoryForm } from "@/lib/blog/parse-category-form";
import { parseBlogPostForm } from "@/lib/blog/parse-post-form";
import {
  isBlogCategorySlugTaken,
  isBlogPostSlugTaken,
} from "@/lib/blog/queries";
import { revalidateBlog } from "@/lib/blog/revalidate";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { deleteFileFromR2 } from "@/lib/storage";

export type BlogActionState = {
  error?: string;
  success?: string;
  fieldErrors?: Record<string, string>;
};

function isUniqueError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: unknown }).code === "P2002"
  );
}

async function assertCategory(categoryId: string | null): Promise<string | null> {
  if (!categoryId) {
    return null;
  }

  const category = await prisma.blogCategory.findUnique({
    where: { id: categoryId },
    select: { id: true },
  });

  return category ? null : "Category not found";
}

async function removeReplacedImage(previousKey: string | null, nextKey: string | null): Promise<void> {
  if (previousKey && previousKey !== nextKey) {
    await deleteFileFromR2(previousKey);
  }
}

export async function createBlogPost(
  _prevState: BlogActionState,
  formData: FormData,
): Promise<BlogActionState> {
  await requireAdmin();
  const parsed = parseBlogPostForm(formData);
  if (!parsed.ok) {
    return { fieldErrors: parsed.fieldErrors };
  }

  const categoryError = await assertCategory(parsed.data.categoryId);
  if (categoryError) {
    return { fieldErrors: { categoryId: categoryError } };
  }

  if (await isBlogPostSlugTaken(parsed.data.slug)) {
    return { fieldErrors: { slug: "Slug already exists" } };
  }

  try {
    const post = await prisma.blogPost.create({ data: parsed.data });
    revalidateBlog([post.slug]);
    redirect(`/admin/blog/${post.id}`);
  } catch (error) {
    if (isUniqueError(error)) {
      return { fieldErrors: { slug: "Slug already exists" } };
    }
    throw error;
  }
}

export async function updateBlogPost(
  postId: string,
  _prevState: BlogActionState,
  formData: FormData,
): Promise<BlogActionState> {
  await requireAdmin();
  const existing = await prisma.blogPost.findUnique({ where: { id: postId } });
  if (!existing) {
    return { error: "Post not found." };
  }

  const parsed = parseBlogPostForm(formData);
  if (!parsed.ok) {
    return { fieldErrors: parsed.fieldErrors };
  }

  const categoryError = await assertCategory(parsed.data.categoryId);
  if (categoryError) {
    return { fieldErrors: { categoryId: categoryError } };
  }

  if (parsed.data.slug !== existing.slug && (await isBlogPostSlugTaken(parsed.data.slug, postId))) {
    return { fieldErrors: { slug: "Slug already exists" } };
  }

  await removeReplacedImage(existing.imageKey, parsed.data.imageKey);
  await removeReplacedImage(existing.headerImageKey, parsed.data.headerImageKey);

  try {
    await prisma.blogPost.update({ where: { id: postId }, data: parsed.data });
  } catch (error) {
    if (isUniqueError(error)) {
      return { fieldErrors: { slug: "Slug already exists" } };
    }
    throw error;
  }

  const slugs = parsed.data.slug === existing.slug ? [existing.slug] : [existing.slug, parsed.data.slug];
  revalidateBlog(slugs);
  return { success: "Post saved." };
}

export async function deleteBlogPost(postId: string): Promise<void> {
  await requireAdmin();
  const post = await prisma.blogPost.findUnique({ where: { id: postId } });
  if (!post) {
    return;
  }

  if (post.imageKey) {
    await deleteFileFromR2(post.imageKey);
  }
  if (post.headerImageKey) {
    await deleteFileFromR2(post.headerImageKey);
  }

  await prisma.blogPost.delete({ where: { id: postId } });
  revalidateBlog([post.slug]);
  redirect("/admin/blog");
}

export async function toggleBlogFeatured(postId: string): Promise<void> {
  await requireAdmin();
  const post = await prisma.blogPost.findUnique({ where: { id: postId } });
  if (!post) {
    return;
  }

  const turningOn = !post.featuredOnHome;
  await prisma.blogPost.update({
    where: { id: postId },
    data: {
      featuredOnHome: turningOn,
      featuredOrder: turningOn ? (post.featuredOrder ?? FEATURED_ORDER_DEFAULT) : null,
    },
  });

  revalidateBlog([post.slug]);
}

export async function createBlogCategory(
  _prevState: BlogActionState,
  formData: FormData,
): Promise<BlogActionState> {
  await requireAdmin();
  const parsed = parseBlogCategoryForm(formData);
  if (!parsed.ok) {
    return { fieldErrors: parsed.fieldErrors };
  }

  if (await isBlogCategorySlugTaken(parsed.data.slug)) {
    return { fieldErrors: { slug: "Slug already exists" } };
  }

  const aggregate = await prisma.blogCategory.aggregate({ _max: { order: true } });
  const order = (aggregate._max.order ?? -1) + 1;

  try {
    const category = await prisma.blogCategory.create({
      data: { ...parsed.data, order },
    });
    revalidateBlog();
    redirect(`/admin/blog/categories/${category.id}`);
  } catch (error) {
    if (isUniqueError(error)) {
      return { fieldErrors: { slug: "Slug already exists" } };
    }
    throw error;
  }
}

export async function updateBlogCategory(
  categoryId: string,
  _prevState: BlogActionState,
  formData: FormData,
): Promise<BlogActionState> {
  await requireAdmin();
  const existing = await prisma.blogCategory.findUnique({ where: { id: categoryId } });
  if (!existing) {
    return { error: "Category not found." };
  }

  const parsed = parseBlogCategoryForm(formData);
  if (!parsed.ok) {
    return { fieldErrors: parsed.fieldErrors };
  }

  if (parsed.data.slug !== existing.slug && (await isBlogCategorySlugTaken(parsed.data.slug, categoryId))) {
    return { fieldErrors: { slug: "Slug already exists" } };
  }

  try {
    await prisma.blogCategory.update({
      where: { id: categoryId },
      data: parsed.data,
    });
  } catch (error) {
    if (isUniqueError(error)) {
      return { fieldErrors: { slug: "Slug already exists" } };
    }
    throw error;
  }

  revalidateBlog();
  return { success: "Category saved." };
}

export async function deleteBlogCategory(categoryId: string): Promise<void> {
  await requireAdmin();
  await prisma.blogCategory.delete({ where: { id: categoryId } });
  revalidateBlog();
  redirect("/admin/blog/categories");
}

export async function reorderBlogCategories(ids: string[]): Promise<BlogActionState> {
  await requireAdmin();
  const existing = await prisma.blogCategory.findMany({ select: { id: true } });
  const current = new Set(existing.map((category) => category.id));
  const sameSet = ids.length === current.size && new Set(ids).size === ids.length && ids.every((id) => current.has(id));

  if (!sameSet) {
    return { error: "Category order is out of date. Refresh and try again." };
  }

  await prisma.$transaction(
    ids.map((id, index) => prisma.blogCategory.update({ where: { id }, data: { order: index } })),
  );
  revalidateBlog();
  return { success: "Order saved." };
}
