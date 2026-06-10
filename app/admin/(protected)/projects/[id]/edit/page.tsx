import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { requireAdmin } from "@/lib/auth";
import { getProjectById, projectToFormData } from "@/lib/projects";

export const dynamic = "force-dynamic";

type EditProjectPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  await requireAdmin();
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <>
      <AdminPageHeader title="Edit project" subtitle={`Editing ${project.slug}`} />
      <ProjectForm mode="edit" projectId={project.id} initialData={projectToFormData(project)} />
    </>
  );
}
