import { prisma } from "@/lib/db";
import type { Locale } from "@/lib/i18n";

export type ProjectWithDetails = Awaited<ReturnType<typeof getPublishedProjects>>[number];

export type ProjectFormTranslation = {
  title: string;
  shortDescription: string;
  longDescription: string;
};

export type CoverImageData = {
  url: string;
  key: string;
};

export type GalleryImageItem = {
  url: string;
  key: string;
};

export type ProjectFormData = {
  slug: string;
  projectUrl: string;
  isPublished: boolean;
  coverImage: CoverImageData | null;
  translations: Record<Locale, ProjectFormTranslation>;
  galleryImages: GalleryImageItem[];
};

export async function getPublishedProjects() {
  return prisma.project.findMany({
    where: { isPublished: true },
    include: {
      translations: true,
      images: { orderBy: { sortOrder: "asc" } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getFeaturedProjects(limit = 3) {
  return prisma.project.findMany({
    where: { isPublished: true },
    include: {
      translations: true,
      images: { orderBy: { sortOrder: "asc" } },
    },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export async function getPublishedProjectBySlug(slug: string) {
  return prisma.project.findFirst({
    where: { slug, isPublished: true },
    include: {
      translations: true,
      images: { orderBy: { sortOrder: "asc" } },
    },
  });
}

export async function getAllProjects() {
  return prisma.project.findMany({
    include: {
      translations: true,
      images: { orderBy: { sortOrder: "asc" } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProjectById(id: string) {
  return prisma.project.findUnique({
    where: { id },
    include: {
      translations: true,
      images: { orderBy: { sortOrder: "asc" } },
    },
  });
}

export async function isSlugTaken(slug: string, excludeId?: string): Promise<boolean> {
  const existing = await prisma.project.findUnique({ where: { slug } });
  return Boolean(existing && existing.id !== excludeId);
}

export function getProjectTranslation<
  T extends { translations: { locale: string; title: string; shortDescription: string; longDescription: string }[] },
>(project: T, locale: Locale) {
  return (
    project.translations.find((t) => t.locale === locale) ??
    project.translations.find((t) => t.locale === "en") ??
    project.translations[0]
  );
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function projectToFormData(
  project: NonNullable<Awaited<ReturnType<typeof getProjectById>>>,
): ProjectFormData {
  const en = project.translations.find((t) => t.locale === "en");
  const hy = project.translations.find((t) => t.locale === "hy");

  return {
    slug: project.slug,
    projectUrl: project.projectUrl ?? "",
    isPublished: project.isPublished,
    coverImage:
      project.coverImage && project.coverImageKey
        ? { url: project.coverImage, key: project.coverImageKey }
        : project.coverImage
          ? { url: project.coverImage, key: "" }
          : null,
    translations: {
      en: {
        title: en?.title ?? "",
        shortDescription: en?.shortDescription ?? "",
        longDescription: en?.longDescription ?? "",
      },
      hy: {
        title: hy?.title ?? "",
        shortDescription: hy?.shortDescription ?? "",
        longDescription: hy?.longDescription ?? "",
      },
    },
    galleryImages: project.images.map((img) => ({
      url: img.url,
      key: img.key ?? "",
    })),
  };
}
