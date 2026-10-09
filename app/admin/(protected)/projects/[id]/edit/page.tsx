import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { requireAdmin } from "@/lib/auth";
import { getAdminUi } from "@/lib/admin-ui-i18n";
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

  const ui = getAdminUi("en");

  return (
    <div>
      <Link href="/admin/projects" className="admin-back-link">
        {ui.projectsTitle}
      </Link>
      <h1 className="admin-page-title">{ui.sheetEditProject}</h1>
      <ProjectForm mode="edit" projectId={project.id} initialData={projectToFormData(project)} />
    </div>
  );
}
