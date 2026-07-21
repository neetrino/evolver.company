import "server-only";

import { prisma } from "@/lib/db";
import type { Locale } from "@/lib/i18n";
import type { CareerFormData, CareerJobWithDetails } from "@/lib/career-types";
import { getCareerTranslation } from "@/lib/career-types";

export type { CareerFormData, CareerJobWithDetails } from "@/lib/career-types";
export { getCareerTranslation } from "@/lib/career-types";
export { slugify } from "@/lib/project-types";

const careerInclude = {
  translations: true,
} as const;

function jobHasContent(job: CareerJobWithDetails): boolean {
  return job.translations.some((translation) => translation.title.trim().length > 0);
}

export async function getPublishedCareerJobs(): Promise<CareerJobWithDetails[]> {
  const jobs = await prisma.careerJob.findMany({
    where: { isPublished: true },
    include: careerInclude,
    orderBy: { createdAt: "desc" },
  });

  return jobs.filter(jobHasContent);
}

export async function getPublishedCareerJobBySlug(
  slug: string,
): Promise<CareerJobWithDetails | null> {
  const job = await prisma.careerJob.findFirst({
    where: { slug, isPublished: true },
    include: careerInclude,
  });

  if (!job || !jobHasContent(job)) {
    return null;
  }

  return job;
}

export async function getAllCareerJobs(): Promise<CareerJobWithDetails[]> {
  return prisma.careerJob.findMany({
    include: careerInclude,
    orderBy: { createdAt: "desc" },
  });
}

export async function getCareerJobById(id: string): Promise<CareerJobWithDetails | null> {
  return prisma.careerJob.findUnique({
    where: { id },
    include: careerInclude,
  });
}

export async function isCareerSlugTaken(slug: string, excludeId?: string): Promise<boolean> {
  const existing = await prisma.careerJob.findFirst({
    where: {
      slug,
      ...(excludeId ? { NOT: { id: excludeId } } : {}),
    },
    select: { id: true },
  });

  return Boolean(existing);
}

export function careerJobToFormData(job: CareerJobWithDetails): CareerFormData {
  const byLocale = Object.fromEntries(
    job.translations.map((translation) => [
      translation.locale,
      {
        title: translation.title,
        description: translation.description,
      },
    ]),
  ) as Partial<CareerFormData["translations"]>;

  return {
    slug: job.slug,
    salary: job.salary,
    workHours: job.workHours,
    isPublished: job.isPublished,
    coverImage:
      job.coverImage && job.coverImageKey
        ? { url: job.coverImage, key: job.coverImageKey }
        : job.coverImage
          ? { url: job.coverImage, key: "" }
          : null,
    translations: {
      en: byLocale.en ?? { title: "", description: "" },
      ru: byLocale.ru ?? { title: "", description: "" },
      hy: byLocale.hy ?? { title: "", description: "" },
    },
  };
}

export function getCareerJobTitle(job: CareerJobWithDetails, locale: Locale): string {
  return getCareerTranslation(job, locale).title;
}

export async function getCareerApplications() {
  return prisma.careerApplication.findMany({
    include: {
      job: {
        include: {
          translations: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getUnreadCareerApplicationCount(): Promise<number> {
  return prisma.careerApplication.count({ where: { isRead: false } });
}

export async function markCareerApplicationRead(id: string): Promise<void> {
  await prisma.careerApplication.update({
    where: { id },
    data: { isRead: true },
  });
}

export async function deleteCareerApplication(id: string): Promise<void> {
  await prisma.careerApplication.delete({ where: { id } });
}
