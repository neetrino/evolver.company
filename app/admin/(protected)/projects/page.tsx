import Link from "next/link";
import { deleteProject, toggleProjectPublished } from "@/app/admin/projects/actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Badge } from "@/components/shared/Badge";
import { requireAdmin } from "@/lib/auth";
import { getAllProjects, getProjectTranslation } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  await requireAdmin();
  const projects = await getAllProjects();

  return (
    <>
      <AdminPageHeader
        title="Projects"
        subtitle="Manage published and draft projects."
        actions={
          <Link href="/admin/projects/new" className="btn btn-admin-primary">
            New project
          </Link>
        }
      />

      <div className="admin-card overflow-x-auto">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title (EN)</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              const translation = getProjectTranslation(project, "en");

              return (
                <tr key={project.id}>
                  <td>{translation?.title ?? "—"}</td>
                  <td>{project.slug}</td>
                  <td>
                    {project.isPublished ? (
                      <Badge variant="success">Published</Badge>
                    ) : (
                      <Badge variant="muted">Draft</Badge>
                    )}
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="btn btn-admin-secondary"
                      >
                        Edit
                      </Link>
                      <form action={toggleProjectPublished.bind(null, project.id)}>
                        <button type="submit" className="btn btn-admin-secondary">
                          {project.isPublished ? "Unpublish" : "Publish"}
                        </button>
                      </form>
                      <form action={deleteProject.bind(null, project.id)}>
                        <button type="submit" className="btn btn-admin-danger">
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {projects.length === 0 ? (
          <p className="mt-4 text-sm text-zinc-500">No projects yet.</p>
        ) : null}
      </div>
    </>
  );
}
