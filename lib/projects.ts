import "server-only";

import { prisma } from "@/lib/db";
import {
  PROJECT_CATALOG_ORDER,
  getCatalogProjectBySlug,
  getCatalogProjects,
  isCatalogSlug,
  mergePortfolioProjects,
} from "@/lib/project-catalog";
import type {
  ProjectFormData,
  ProjectWithDetails,
  PublishedProjectLookupResult,
} from "@/lib/project-types";

export type {
  CoverImageData,
  GalleryImageItem,
  ProjectFormData,
  ProjectWithDetails,
  PublishedProjectLookupResult,
} from "@/lib/project-types";
export { getProjectTranslation, getProjectPlaceholderLetter, slugify } from "@/lib/project-types";

const projectInclude = {
  translations: true,
  images: { orderBy: { sortOrder: "asc" as const } },
};

function dbProjectHasContent(project: ProjectWithDetails): boolean {
  return project.translations.some((translation) => translation.title.trim().length > 0);
}

export async function resolvePublishedProjectBySlug(
  slug: string,
): Promise<PublishedProjectLookupResult | null> {
  const projectBySlug = await prisma.project.findFirst({
    where: { slug },
    include: projectInclude,
  });

  if (projectBySlug) {
    if (!projectBySlug.isPublished || !dbProjectHasContent(projectBySlug)) {
      return null;
    }

    return { kind: "project", project: projectBySlug };
  }

  const projectByCatalogSlug = await prisma.project.findFirst({
    where: { catalogSlug: slug },
    include: projectInclude,
  });

  if (projectByCatalogSlug) {
    if (!projectByCatalogSlug.isPublished || !dbProjectHasContent(projectByCatalogSlug)) {
      return null;
    }

    if (projectByCatalogSlug.slug !== slug) {
      return { kind: "redirect", targetSlug: projectByCatalogSlug.slug };
    }

    return { kind: "project", project: projectByCatalogSlug };
  }

  const catalogProject = getCatalogProjectBySlug(slug);
  if (catalogProject) {
    return { kind: "project", project: catalogProject };
  }

  return null;
}

async function fetchPublishedProjects(): Promise<ProjectWithDetails[]> {
  return prisma.project.findMany({
    where: { isPublished: true },
    include: projectInclude,
    orderBy: { createdAt: "desc" },
  });
}

/** DB rows that claim catalog slots (published or draft) so merge can suppress static fallback. */
async function fetchCatalogSlugDbProjects(): Promise<ProjectWithDetails[]> {
  return prisma.project.findMany({
    where: {
      OR: [
        { slug: { in: [...PROJECT_CATALOG_ORDER] } },
        { catalogSlug: { in: [...PROJECT_CATALOG_ORDER] } },
      ],
    },
    include: projectInclude,
  });
}

/** Portfolio page projects: catalog defaults merged with published DB rows. */
export async function getPortfolioProjects(): Promise<ProjectWithDetails[]> {
  const [publishedProjects, catalogSlugDbProjects] = await Promise.all([
    fetchPublishedProjects(),
    fetchCatalogSlugDbProjects(),
  ]);
  return mergePortfolioProjects(publishedProjects, catalogSlugDbProjects);
}

export async function getPublishedProjects(): Promise<ProjectWithDetails[]> {
  return getPortfolioProjects();
}

export async function getFeaturedProjects(limit = 3): Promise<ProjectWithDetails[]> {
  const catalogFallback = getCatalogProjects().slice(0, limit);

  try {
    const [publishedProjects, catalogSlugDbProjects] = await Promise.all([
      fetchPublishedProjects(),
      fetchCatalogSlugDbProjects(),
    ]);

    return mergePortfolioProjects(publishedProjects, catalogSlugDbProjects).slice(0, limit);
  } catch {
    return catalogFallback;
  }
}

/** @deprecated Use resolvePublishedProjectBySlug for redirect-aware lookups. */
export async function getPublishedProjectBySlug(slug: string): Promise<ProjectWithDetails | null> {
  const result = await resolvePublishedProjectBySlug(slug);
  return result?.kind === "project" ? result.project : null;
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
    accentColor: project.accentColor ?? "",
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

export function getPublicRevalidationSlugs(input: {
  slug: string;
  previousSlug?: string;
  catalogSlug?: string | null;
}): string[] {
  const slugs = new Set<string>([input.slug]);

  if (input.previousSlug) {
    slugs.add(input.previousSlug);
  }

  if (input.catalogSlug) {
    slugs.add(input.catalogSlug);
  }

  return [...slugs];
}

export function getCatalogSlugForCreate(normalizedSlug: string): string | null {
  return isCatalogSlug(normalizedSlug) ? normalizedSlug : null;
}

export type ProjectDetailImage = {
  url: string;
  type: "cover" | "gallery";
  sortOrder: number;
};

/** Detail page images from DB/admin only; no static visual fallbacks. */
export function buildProjectDetailImages(project: ProjectWithDetails): ProjectDetailImage[] {
  if (project.id.startsWith("catalog-")) {
    return [];
  }

  const detailImages: ProjectDetailImage[] = [];
  const seenUrls = new Set<string>();

  const coverUrl = project.coverImage?.trim();
  if (coverUrl) {
    seenUrls.add(coverUrl);
    detailImages.push({ url: coverUrl, type: "cover", sortOrder: -1 });
  }

  const galleryImages = [...project.images].sort((a, b) => a.sortOrder - b.sortOrder);

  for (const image of galleryImages) {
    const url = image.url.trim();
    if (!url || seenUrls.has(url)) {
      continue;
    }

    seenUrls.add(url);
    detailImages.push({ url, type: "gallery", sortOrder: image.sortOrder });
  }

  return detailImages;
}
