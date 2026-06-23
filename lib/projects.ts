import "server-only";

import { prisma } from "@/lib/db";
import {
  getCatalogProjectBySlug,
  mergePortfolioProjects,
} from "@/lib/project-catalog";
import type {
  ProjectFormData,
  ProjectWithDetails,
} from "@/lib/project-types";

export type { CoverImageData, GalleryImageItem, ProjectFormData, ProjectWithDetails } from "@/lib/project-types";
export { getProjectTranslation, slugify } from "@/lib/project-types";

const projectInclude = {
  translations: true,
  images: { orderBy: { sortOrder: "asc" as const } },
};

async function fetchPublishedProjects(): Promise<ProjectWithDetails[]> {
  return prisma.project.findMany({
    where: { isPublished: true },
    include: projectInclude,
    orderBy: { createdAt: "desc" },
  });
}

/** Portfolio page projects: catalog defaults merged with published DB rows. */
export async function getPortfolioProjects(): Promise<ProjectWithDetails[]> {
  const dbProjects = await fetchPublishedProjects();
  return mergePortfolioProjects(dbProjects);
}

export async function getPublishedProjects(): Promise<ProjectWithDetails[]> {
  return getPortfolioProjects();
}

export async function getFeaturedProjects(limit = 3): Promise<ProjectWithDetails[]> {
  const projects = await getPortfolioProjects();
  return projects.slice(0, limit);
}

export async function getPublishedProjectBySlug(slug: string) {
  const project = await prisma.project.findFirst({
    where: { slug, isPublished: true },
    include: projectInclude,
  });

  if (project?.translations.some((translation) => translation.title.trim().length > 0)) {
    return project;
  }

  return getCatalogProjectBySlug(slug);
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
