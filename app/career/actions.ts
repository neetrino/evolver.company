"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/db";

const applicationSchema = z.object({
  jobId: z.string().trim().min(1, "Job is required"),
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Valid email is required"),
  phone: z.string().trim().optional(),
  message: z.string().trim().min(1, "Message is required"),
});

export type CareerApplicationFormState = {
  success?: boolean;
  error?: string;
};

export async function submitCareerApplication(
  _prevState: CareerApplicationFormState,
  formData: FormData,
): Promise<CareerApplicationFormState> {
  const parsed = applicationSchema.safeParse({
    jobId: formData.get("jobId"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid form data" };
  }

  try {
    const job = await prisma.careerJob.findFirst({
      where: {
        id: parsed.data.jobId,
        isPublished: true,
      },
      select: { id: true },
    });

    if (!job) {
      return { error: "This position is no longer available." };
    }

    await prisma.careerApplication.create({
      data: {
        jobId: parsed.data.jobId,
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        message: parsed.data.message,
      },
    });

    revalidatePath("/admin/career-applications");

    return { success: true };
  } catch {
    return { error: "Failed to submit application" };
  }
}
