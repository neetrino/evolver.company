import { CareersAdminClient } from "@/components/admin/CareersAdminClient";
import { requireAdmin } from "@/lib/auth";
import {
  careerJobToFormData,
  getAllCareerJobs,
  getCareerTranslation,
} from "@/lib/careers";

export const dynamic = "force-dynamic";

export default async function AdminCareersPage() {
  await requireAdmin();
  const jobs = await getAllCareerJobs();

  return (
    <CareersAdminClient
      jobs={jobs.map((job) => ({
        id: job.id,
        titleEn: getCareerTranslation(job, "en").title,
        salary: job.salary,
        workHours: job.workHours,
        isPublished: job.isPublished,
        formData: careerJobToFormData(job),
      }))}
    />
  );
}
