import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { requireAdmin } from "@/lib/auth";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default async function NewProjectPage() {
  await requireAdmin();

  return (
    <>
      <AdminPageHeader title="New project" subtitle="Create a bilingual project with R2 media." />
      <ProjectForm mode="create" />
    </>
  );
}
