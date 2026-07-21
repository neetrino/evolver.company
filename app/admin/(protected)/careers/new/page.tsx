import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CareerJobForm } from "@/components/admin/CareerJobForm";
import { requireAdmin } from "@/lib/auth";

export default async function NewCareerJobPage() {
  await requireAdmin();

  return (
    <>
      <AdminPageHeader
        title="New job"
        subtitle="Create a bilingual career listing with salary, hours, and image."
      />
      <CareerJobForm mode="create" />
    </>
  );
}
