import Link from "next/link";
import { notFound } from "next/navigation";
import { CareerJobForm } from "@/components/admin/CareerJobForm";
import { requireAdmin } from "@/lib/auth";
import { getAdminUi } from "@/lib/admin-ui-i18n";
import { careerJobToFormData, getCareerJobById } from "@/lib/careers";

export const dynamic = "force-dynamic";

type EditCareerPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditCareerPage({ params }: EditCareerPageProps) {
  await requireAdmin();
  const { id } = await params;
  const job = await getCareerJobById(id);

  if (!job) {
    notFound();
  }

  const ui = getAdminUi("en");

  return (
    <div>
      <Link href="/admin/careers" className="admin-back-link">
        {ui.careersTitle}
      </Link>
      <h1 className="admin-page-title">{ui.sheetEditJob}</h1>
      <CareerJobForm mode="edit" jobId={job.id} initialData={careerJobToFormData(job)} />
    </div>
  );
}
