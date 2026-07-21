import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CareerJobForm } from "@/components/admin/CareerJobForm";
import { requireAdmin } from "@/lib/auth";
import { careerJobToFormData, getCareerJobById } from "@/lib/careers";

export const dynamic = "force-dynamic";

type EditCareerJobPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditCareerJobPage({ params }: EditCareerJobPageProps) {
  await requireAdmin();
  const { id } = await params;
  const job = await getCareerJobById(id);

  if (!job) {
    notFound();
  }

  return (
    <>
      <AdminPageHeader title="Edit job" subtitle={`Editing ${job.slug}`} />
      <CareerJobForm mode="edit" jobId={job.id} initialData={careerJobToFormData(job)} />
    </>
  );
}
