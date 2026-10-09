"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ADMIN_CONTENT_LOCALES } from "@/lib/admin-locales";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { isCareerSlugTaken, slugify } from "@/lib/careers";
import { deleteFileFromR2 } from "@/lib/storage";

function revalidatePublicCareerCache(slugs: string[] = []): void {
  revalidateTag("career", "max");
  revalidatePath("/en/career");
  revalidatePath("/hy/career");

  for (const slug of slugs) {
    revalidatePath(`/en/career/${slug}`);
    revalidatePath(`/hy/career/${slug}`);
  }
}

const translationSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().min(1, "Description is required"),
});

const careerJobSchema = z.object({
  slug: z.string().trim().min(1, "Slug is required"),
  salary: z.string().trim().min(1, "Salary is required"),
  workHours: z.string().trim().min(1, "Work hours are required"),
  isPublished: z.boolean(),
  coverImage: z.string().nullable(),
  coverImageKey: z.string().nullable(),
  translations: z.object({
    en: translationSchema,
    ru: translationSchema,
    hy: translationSchema,
  }),
});

export type CareerActionState = {
  error?: string;
  success?: string;
  fieldErrors?: Record<string, string>;
};

function parseCareerForm(formData: FormData) {
  return careerJobSchema.safeParse({
    slug: formData.get("slug"),
    salary: formData.get("salary"),
    workHours: formData.get("workHours"),
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

export async function createCareerJob(
  _prevState: CareerActionState,
  formData: FormData,
): Promise<CareerActionState> {
  await requireAdmin();

  const parsed = parseCareerForm(formData);

  if (!parsed.success) {
    return { fieldErrors: mapValidationErrors(parsed.error) };
  }

  const data = parsed.data;
  const normalizedSlug = slugify(data.slug);

  if (!normalizedSlug) {
    return { fieldErrors: { slug: "Slug is required" } };
  }

  if (await isCareerSlugTaken(normalizedSlug)) {
    return { fieldErrors: { slug: "Slug already exists" } };
  }

  const job = await prisma.careerJob.create({
    data: {
      slug: normalizedSlug,
      salary: data.salary,
      workHours: data.workHours,
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

  revalidatePublicCareerCache([normalizedSlug]);
  revalidatePath("/admin/careers");
  redirect(`/admin/careers/${job.id}/edit`);
}

export async function updateCareerJob(
  jobId: string,
  _prevState: CareerActionState,
  formData: FormData,
): Promise<CareerActionState> {
  await requireAdmin();

  const existing = await prisma.careerJob.findUnique({ where: { id: jobId } });

  if (!existing) {
    return { error: "Job not found." };
  }

  const parsed = parseCareerForm(formData);

  if (!parsed.success) {
    return { fieldErrors: mapValidationErrors(parsed.error) };
  }

  const data = parsed.data;
  const normalizedSlug = slugify(data.slug);

  if (!normalizedSlug) {
    return { fieldErrors: { slug: "Slug is required" } };
  }

  if (await isCareerSlugTaken(normalizedSlug, jobId)) {
    return { fieldErrors: { slug: "Slug already exists" } };
  }

  await deleteCoverImageIfReplaced(existing.coverImageKey, data.coverImageKey);

  await prisma.careerJob.update({
    where: { id: jobId },
    data: {
      slug: normalizedSlug,
      salary: data.salary,
      workHours: data.workHours,
      coverImage: data.coverImage,
      coverImageKey: data.coverImageKey,
      isPublished: data.isPublished,
    },
  });

  await Promise.all(
    ADMIN_CONTENT_LOCALES.map((locale) =>
      prisma.careerJobTranslation.upsert({
        where: {
          jobId_locale: {
            jobId,
            locale,
          },
        },
        create: {
          jobId,
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

  revalidatePublicCareerCache(slugs);
  revalidatePath("/admin/careers");

  return { success: "Job updated successfully." };
}

export async function deleteCareerJob(jobId: string): Promise<void> {
  await requireAdmin();

  const job = await prisma.careerJob.findUnique({ where: { id: jobId } });

  if (!job) {
    return;
  }

  if (job.coverImageKey) {
    await deleteFileFromR2(job.coverImageKey);
  }

  await prisma.careerJob.delete({ where: { id: jobId } });

  revalidatePublicCareerCache([job.slug]);
  redirect("/admin/careers");
}

export async function toggleCareerJobPublished(jobId: string): Promise<void> {
  await requireAdmin();

  const job = await prisma.careerJob.findUnique({ where: { id: jobId } });

  if (!job) {
    return;
  }

  await prisma.careerJob.update({
    where: { id: jobId },
    data: { isPublished: !job.isPublished },
  });

  revalidatePublicCareerCache([job.slug]);
  revalidatePath("/admin/careers");
}
