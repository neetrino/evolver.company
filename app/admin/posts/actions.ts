"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ADMIN_CONTENT_LOCALES } from "@/lib/admin-locales";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { isPostSlugTaken, slugify } from "@/lib/posts";
import { deleteFileFromR2 } from "@/lib/storage";

function revalidatePublicBlogCache(slugs: string[] = []): void {
  revalidateTag("blog", "max");
  revalidatePath("/en/blog");
  revalidatePath("/hy/blog");

  for (const slug of slugs) {
    revalidatePath(`/en/blog/${slug}`);
    revalidatePath(`/hy/blog/${slug}`);
  }
}

const translationSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().min(1, "Description is required"),
});

const postSchema = z.object({
  slug: z.string().trim().min(1, "Slug is required"),
  isPublished: z.boolean(),
  coverImage: z.string().nullable(),
  coverImageKey: z.string().nullable(),
  translations: z.object({
    en: translationSchema,
    ru: translationSchema,
    hy: translationSchema,
  }),
});

export type PostActionState = {
  error?: string;
  success?: string;
  fieldErrors?: Record<string, string>;
};

function parsePostForm(formData: FormData) {
  return postSchema.safeParse({
    slug: formData.get("slug"),
    isPublished: formData.get("isPublished") === "on" || formData.get("isPublished") === "true",
    coverImage: (formData.get("coverImage") as string | null) || null,
    coverImageKey: (formData.get("coverImageKey") as string | null) || null,
    translations: {
      en: {
        title: formData.get("en_title"),
        description: formData.get("en_description"),
      },
      ru: {
        title: formData.get("ru_title"),
        description: formData.get("ru_description"),
      },
      hy: {
        title: formData.get("hy_title"),
        description: formData.get("hy_description"),
      },
    },
  });
}

function mapValidationErrors(error: z.ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {};

  for (const issue of error.issues) {
    const key = issue.path.join(".");
    if (!fieldErrors[key]) {
      fieldErrors[key] = issue.message;
    }
  }

  return fieldErrors;
}

async function deleteCoverImageIfReplaced(
  previousKey: string | null,
  nextKey: string | null,
): Promise<void> {
  if (previousKey && previousKey !== nextKey) {
    await deleteFileFromR2(previousKey);
  }
}

export async function createPost(
  _prevState: PostActionState,
  formData: FormData,
): Promise<PostActionState> {
  await requireAdmin();

  const parsed = parsePostForm(formData);

  if (!parsed.success) {
    return { fieldErrors: mapValidationErrors(parsed.error) };
  }

  const data = parsed.data;
  const normalizedSlug = slugify(data.slug);

  if (!normalizedSlug) {
    return { fieldErrors: { slug: "Slug is required" } };
  }

  if (await isPostSlugTaken(normalizedSlug)) {
    return { fieldErrors: { slug: "Slug already exists" } };
  }

  await prisma.post.create({
    data: {
      slug: normalizedSlug,
      coverImage: data.coverImage,
      coverImageKey: data.coverImageKey,
      isPublished: data.isPublished,
      translations: {
        create: ADMIN_CONTENT_LOCALES.map((locale) => ({
          locale,
          title: data.translations[locale].title,
          description: data.translations[locale].description,
        })),
      },
    },
  });

  revalidatePublicBlogCache([normalizedSlug]);
  revalidatePath("/admin/posts");

  return { success: "Post created successfully." };
}

export async function updatePost(
  postId: string,
  _prevState: PostActionState,
  formData: FormData,
): Promise<PostActionState> {
  await requireAdmin();

  const existing = await prisma.post.findUnique({ where: { id: postId } });

  if (!existing) {
    return { error: "Post not found." };
  }

  const parsed = parsePostForm(formData);

  if (!parsed.success) {
    return { fieldErrors: mapValidationErrors(parsed.error) };
  }

  const data = parsed.data;
  const normalizedSlug = slugify(data.slug);

  if (!normalizedSlug) {
    return { fieldErrors: { slug: "Slug is required" } };
  }

  if (await isPostSlugTaken(normalizedSlug, postId)) {
    return { fieldErrors: { slug: "Slug already exists" } };
  }

  await deleteCoverImageIfReplaced(existing.coverImageKey, data.coverImageKey);

  await prisma.post.update({
    where: { id: postId },
    data: {
      slug: normalizedSlug,
      coverImage: data.coverImage,
      coverImageKey: data.coverImageKey,
      isPublished: data.isPublished,
    },
  });

  await Promise.all(
    ADMIN_CONTENT_LOCALES.map((locale) =>
      prisma.postTranslation.upsert({
        where: {
          postId_locale: {
            postId,
            locale,
          },
        },
        create: {
          postId,
          locale,
          title: data.translations[locale].title,
          description: data.translations[locale].description,
        },
        update: {
          title: data.translations[locale].title,
          description: data.translations[locale].description,
        },
      }),
    ),
  );

  const slugs = [normalizedSlug];
  if (existing.slug !== normalizedSlug) {
    slugs.push(existing.slug);
  }

  revalidatePublicBlogCache(slugs);
  revalidatePath("/admin/posts");

  return { success: "Post updated successfully." };
}

export async function deletePost(postId: string): Promise<void> {
  await requireAdmin();

  const post = await prisma.post.findUnique({ where: { id: postId } });

  if (!post) {
    return;
  }

  if (post.coverImageKey) {
    await deleteFileFromR2(post.coverImageKey);
  }

  await prisma.post.delete({ where: { id: postId } });

  revalidatePublicBlogCache([post.slug]);
  redirect("/admin/posts");
}

export async function togglePostPublished(postId: string): Promise<void> {
  await requireAdmin();

  const post = await prisma.post.findUnique({ where: { id: postId } });

  if (!post) {
    return;
  }

  await prisma.post.update({
    where: { id: postId },
    data: { isPublished: !post.isPublished },
  });

  revalidatePublicBlogCache([post.slug]);
  revalidatePath("/admin/posts");
}
