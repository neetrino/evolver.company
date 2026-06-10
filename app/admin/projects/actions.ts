"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin, verifyAdminCredentials, createSession, destroySession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { LOCALES } from "@/lib/i18n";
import type { GalleryImageItem } from "@/lib/project-types";
import { slugify } from "@/lib/project-types";
import { isSlugTaken } from "@/lib/projects";
import { deleteFileFromR2 } from "@/lib/storage";

const translationSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  shortDescription: z.string().trim().min(1, "Short description is required"),
  longDescription: z.string().trim().min(1, "Long description is required"),
});

const galleryImageSchema = z.object({
  url: z.string().url(),
  key: z.string().min(1),
});

const projectSchema = z.object({
  slug: z.string().trim().min(1, "Slug is required"),
  projectUrl: z.string().trim().optional(),
  isPublished: z.boolean(),
  coverImage: z.string().nullable(),
  coverImageKey: z.string().nullable(),
  galleryImages: z.array(galleryImageSchema),
  translations: z.object({
    en: translationSchema,
    hy: translationSchema,
  }),
});

export type ProjectActionState = {
  error?: string;
  success?: string;
  fieldErrors?: Record<string, string>;
};

function parseJsonField<T>(value: FormDataEntryValue | null, fallback: T): T {
  if (typeof value !== "string" || value.length === 0) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function parseProjectForm(formData: FormData) {
  const coverImage = (formData.get("coverImage") as string | null) || null;
  const coverImageKey = (formData.get("coverImageKey") as string | null) || null;
  const galleryImages = parseJsonField<GalleryImageItem[]>(formData.get("galleryImages"), []);

  return projectSchema.safeParse({
    slug: formData.get("slug"),
    projectUrl: formData.get("projectUrl") || undefined,
    isPublished: formData.get("isPublished") === "on" || formData.get("isPublished") === "true",
    coverImage,
    coverImageKey,
    galleryImages,
    translations: {
      en: {
        title: formData.get("en_title"),
        shortDescription: formData.get("en_shortDescription"),
        longDescription: formData.get("en_longDescription"),
      },
      hy: {
        title: formData.get("hy_title"),
        shortDescription: formData.get("hy_shortDescription"),
        longDescription: formData.get("hy_longDescription"),
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

function galleryItemMatches(
  item: GalleryImageItem,
  image: { url: string; key: string | null },
): boolean {
  if (item.key && image.key) {
    return item.key === image.key;
  }

  return item.url === image.url;
}

async function syncGalleryImages(
  projectId: string,
  items: GalleryImageItem[],
): Promise<void> {
  const existing = await prisma.projectImage.findMany({
    where: { projectId },
    orderBy: { sortOrder: "asc" },
  });

  const toRemove = existing.filter(
    (image) => !items.some((item) => galleryItemMatches(item, image)),
  );

  await Promise.all(
    toRemove.map(async (image) => {
      if (image.key) {
        await deleteFileFromR2(image.key);
      }

      await prisma.projectImage.delete({ where: { id: image.id } });
    }),
  );

  await Promise.all(
    items.map(async (item, index) => {
      const existingImage = existing.find((image) => galleryItemMatches(item, image));

      if (existingImage) {
        await prisma.projectImage.update({
          where: { id: existingImage.id },
          data: {
            url: item.url,
            key: item.key,
            sortOrder: index,
          },
        });
        return;
      }

      await prisma.projectImage.create({
        data: {
          projectId,
          url: item.url,
          key: item.key,
          sortOrder: index,
        },
      });
    }),
  );
}

async function deleteCoverImageIfReplaced(
  previousKey: string | null,
  nextKey: string | null,
): Promise<void> {
  if (previousKey && previousKey !== nextKey) {
    await deleteFileFromR2(previousKey);
  }
}

export async function loginAction(
  _prevState: ProjectActionState,
  formData: FormData,
): Promise<ProjectActionState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!verifyAdminCredentials(email, password)) {
    return { error: "Invalid email or password." };
  }

  await createSession(email);
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await requireAdmin();
  await destroySession();
  redirect("/admin/login");
}

export async function createProject(
  _prevState: ProjectActionState,
  formData: FormData,
): Promise<ProjectActionState> {
  await requireAdmin();

  const parsed = parseProjectForm(formData);

  if (!parsed.success) {
    return { fieldErrors: mapValidationErrors(parsed.error) };
  }

  const data = parsed.data;
  const normalizedSlug = slugify(data.slug);

  if (!normalizedSlug) {
    return { fieldErrors: { slug: "Slug is required" } };
  }

  if (await isSlugTaken(normalizedSlug)) {
    return { fieldErrors: { slug: "Slug already exists" } };
  }

  await prisma.project.create({
    data: {
      slug: normalizedSlug,
      projectUrl: data.projectUrl || null,
      coverImage: data.coverImage,
      coverImageKey: data.coverImageKey,
      isPublished: data.isPublished,
      translations: {
        create: LOCALES.map((locale) => ({
          locale,
          title: data.translations[locale].title,
          shortDescription: data.translations[locale].shortDescription,
          longDescription: data.translations[locale].longDescription,
        })),
      },
      images: {
        create: data.galleryImages.map((item, index) => ({
          url: item.url,
          key: item.key,
          sortOrder: index,
        })),
      },
    },
  });

  revalidatePath("/");
  redirect("/admin/projects");
}

export async function updateProject(
  projectId: string,
  _prevState: ProjectActionState,
  formData: FormData,
): Promise<ProjectActionState> {
  await requireAdmin();

  const existing = await prisma.project.findUnique({ where: { id: projectId } });

  if (!existing) {
    return { error: "Project not found." };
  }

  const parsed = parseProjectForm(formData);

  if (!parsed.success) {
    return { fieldErrors: mapValidationErrors(parsed.error) };
  }

  const data = parsed.data;
  const normalizedSlug = slugify(data.slug);

  if (!normalizedSlug) {
    return { fieldErrors: { slug: "Slug is required" } };
  }

  if (await isSlugTaken(normalizedSlug, projectId)) {
    return { fieldErrors: { slug: "Slug already exists" } };
  }

  await deleteCoverImageIfReplaced(existing.coverImageKey, data.coverImageKey);

  await prisma.project.update({
    where: { id: projectId },
    data: {
      slug: normalizedSlug,
      projectUrl: data.projectUrl || null,
      coverImage: data.coverImage,
      coverImageKey: data.coverImageKey,
      isPublished: data.isPublished,
    },
  });

  await Promise.all(
    LOCALES.map((locale) =>
      prisma.projectTranslation.upsert({
        where: {
          projectId_locale: {
            projectId,
            locale,
          },
        },
        create: {
          projectId,
          locale,
          title: data.translations[locale].title,
          shortDescription: data.translations[locale].shortDescription,
          longDescription: data.translations[locale].longDescription,
        },
        update: {
          title: data.translations[locale].title,
          shortDescription: data.translations[locale].shortDescription,
          longDescription: data.translations[locale].longDescription,
        },
      }),
    ),
  );

  await syncGalleryImages(projectId, data.galleryImages);

  revalidatePath("/");
  revalidatePath("/admin/projects");

  return { success: "Project updated successfully." };
}

export async function deleteProject(projectId: string): Promise<void> {
  await requireAdmin();

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: { images: true },
  });

  if (!project) {
    return;
  }

  if (project.coverImageKey) {
    await deleteFileFromR2(project.coverImageKey);
  }

  await Promise.all(
    project.images.map(async (image) => {
      if (image.key) {
        await deleteFileFromR2(image.key);
      }
    }),
  );

  await prisma.project.delete({ where: { id: projectId } });

  revalidatePath("/");
  redirect("/admin/projects");
}

export async function toggleProjectPublished(projectId: string): Promise<void> {
  await requireAdmin();

  const project = await prisma.project.findUnique({ where: { id: projectId } });

  if (!project) {
    return;
  }

  await prisma.project.update({
    where: { id: projectId },
    data: { isPublished: !project.isPublished },
  });

  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function removeProjectImage(imageId: string): Promise<void> {
  await requireAdmin();

  const image = await prisma.projectImage.findUnique({ where: { id: imageId } });

  if (!image) {
    return;
  }

  if (image.key) {
    await deleteFileFromR2(image.key);
  }

  await prisma.projectImage.delete({ where: { id: imageId } });

  revalidatePath("/admin/projects");
}
