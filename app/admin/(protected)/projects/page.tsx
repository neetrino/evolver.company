import { ProjectsAdminClient } from "@/components/admin/ProjectsAdminClient";
import { requireAdmin } from "@/lib/auth";
import {
  getAllProjects,
  getProjectTranslation,
  projectToFormData,
} from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  await requireAdmin();
  const projects = await getAllProjects();

  return (
    <ProjectsAdminClient
      projects={projects.map((project) => ({
        id: project.id,
        titleEn: getProjectTranslation(project, "en")?.title ?? "",
        slug: project.slug,
        isPublished: project.isPublished,
        formData: projectToFormData(project),
      }))}
    />
  );
}
