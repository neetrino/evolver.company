"use client";

import Link from "next/link";
import { deleteProject, toggleProjectPublished } from "@/app/admin/projects/actions";
import { useAdminContentLocale } from "@/components/admin/AdminContentLocaleProvider";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { useAdminUi } from "@/components/admin/useAdminUi";
import { Badge } from "@/components/shared/Badge";
import { getAdminRowTitle } from "@/lib/admin-table";
import { getAdminTitleColumnLabel } from "@/lib/admin-ui-i18n";
import type { ProjectFormData } from "@/lib/project-types";

export type ProjectAdminRow = {
  id: string;
  titleEn: string;
  slug: string;
  isPublished: boolean;
  formData: ProjectFormData;
};

type ProjectsAdminClientProps = {
  projects: ProjectAdminRow[];
};

export function ProjectsAdminClient({ projects }: ProjectsAdminClientProps) {
  const ui = useAdminUi();
  const { locale: listLocale } = useAdminContentLocale();

  return (
    <>
      <AdminPageHeader
        title={ui.projectsTitle}
        subtitle={ui.projectsSubtitle}
        actions={
          <Link href="/admin/projects/new" className="btn btn-admin-primary">
            {ui.newProject}
          </Link>
        }
      />

      <div className="admin-card admin-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>{getAdminTitleColumnLabel(listLocale, ui.colTitle)}</th>
              <th>{ui.colSlug}</th>
              <th>{ui.colStatus}</th>
              <th>{ui.colActions}</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{getAdminRowTitle(project.formData.translations, listLocale)}</td>
                <td>{project.slug}</td>
                <td>
                  {project.isPublished ? (
                    <Badge variant="success">{ui.statusPublished}</Badge>
                  ) : (
                    <Badge variant="muted">{ui.statusDraft}</Badge>
                  )}
                </td>
                <td>
                  <div className="admin-table-actions">
                    <Link href={`/admin/projects/${project.id}/edit`} className="btn btn-admin-secondary">
                      {ui.actionEdit}
                    </Link>
                    <form action={toggleProjectPublished.bind(null, project.id)}>
                      <button type="submit" className="btn btn-admin-secondary">
                        {project.isPublished ? ui.actionUnpublish : ui.actionPublish}
                      </button>
                    </form>
                    <form action={deleteProject.bind(null, project.id)}>
                      <button type="submit" className="btn btn-admin-danger">
                        {ui.actionDelete}
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {projects.length === 0 ? <p className="admin-table-empty">{ui.emptyProjects}</p> : null}
      </div>
    </>
  );
}
