"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProject, toggleProjectPublished } from "@/app/admin/projects/actions";
import { useAdminContentLocale } from "@/components/admin/AdminContentLocaleProvider";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminSheet } from "@/components/admin/AdminSheet";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { ProjectLanguageTabs } from "@/components/admin/ProjectLanguageTabs";
import { useAdminUi } from "@/components/admin/useAdminUi";
import { Badge } from "@/components/shared/Badge";
import type { AdminContentLocale } from "@/lib/admin-locales";
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

type SheetState =
  | { mode: "closed" }
  | { mode: "create" }
  | { mode: "edit"; projectId: string; formData: ProjectFormData };

export function ProjectsAdminClient({ projects }: ProjectsAdminClientProps) {
  const router = useRouter();
  const ui = useAdminUi();
  const { locale: listLocale } = useAdminContentLocale();
  const [sheet, setSheet] = useState<SheetState>({ mode: "closed" });
  const [activeLocale, setActiveLocale] = useState<AdminContentLocale>("hy");

  const closeSheet = useCallback(() => {
    setSheet({ mode: "closed" });
    router.refresh();
  }, [router]);

  function openCreate(): void {
    setActiveLocale(listLocale);
    setSheet({ mode: "create" });
  }

  function openEdit(projectId: string, formData: ProjectFormData): void {
    setActiveLocale(listLocale);
    setSheet({ mode: "edit", projectId, formData });
  }

  return (
    <>
      <AdminPageHeader
        title={ui.projectsTitle}
        subtitle={ui.projectsSubtitle}
        actions={
          <button type="button" className="btn btn-admin-primary" onClick={openCreate}>
            {ui.newProject}
          </button>
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
                    <button
                      type="button"
                      className="btn btn-admin-secondary"
                      onClick={() => openEdit(project.id, project.formData)}
                    >
                      {ui.actionEdit}
                    </button>
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
        {projects.length === 0 ? (
          <p className="admin-table-empty">{ui.emptyProjects}</p>
        ) : null}
      </div>

      <AdminSheet
        open={sheet.mode !== "closed"}
        title={sheet.mode === "edit" ? ui.sheetEditProject : ui.sheetNewProject}
        subtitle={
          sheet.mode === "edit" ? ui.sheetEditProjectSubtitle : ui.sheetNewProjectSubtitle
        }
        toolbar={
          <ProjectLanguageTabs activeTab={activeLocale} onTabChange={setActiveLocale} />
        }
        onClose={() => setSheet({ mode: "closed" })}
        size="lg"
      >
        {sheet.mode === "create" ? (
          <ProjectForm
            key="create"
            mode="create"
            embedded
            hideLanguageToggle
            activeLocale={activeLocale}
            onLocaleChange={setActiveLocale}
            onSuccess={closeSheet}
          />
        ) : null}
        {sheet.mode === "edit" ? (
          <ProjectForm
            key={sheet.projectId}
            mode="edit"
            projectId={sheet.projectId}
            initialData={sheet.formData}
            embedded
            hideLanguageToggle
            activeLocale={activeLocale}
            onLocaleChange={setActiveLocale}
            onSuccess={closeSheet}
          />
        ) : null}
      </AdminSheet>
    </>
  );
}
