"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteCareerJob, toggleCareerJobPublished } from "@/app/admin/careers/actions";
import { useAdminContentLocale } from "@/components/admin/AdminContentLocaleProvider";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminSheet } from "@/components/admin/AdminSheet";
import { CareerJobForm } from "@/components/admin/CareerJobForm";
import { ProjectLanguageTabs } from "@/components/admin/ProjectLanguageTabs";
import { useAdminUi } from "@/components/admin/useAdminUi";
import { Badge } from "@/components/shared/Badge";
import type { AdminContentLocale } from "@/lib/admin-locales";
import { getAdminRowTitle } from "@/lib/admin-table";
import { getAdminTitleColumnLabel } from "@/lib/admin-ui-i18n";
import type { CareerFormData } from "@/lib/career-types";

export type CareerAdminRow = {
  id: string;
  titleEn: string;
  salary: string;
  workHours: string;
  isPublished: boolean;
  formData: CareerFormData;
};

type CareersAdminClientProps = {
  jobs: CareerAdminRow[];
};

type SheetState =
  | { mode: "closed" }
  | { mode: "create" }
  | { mode: "edit"; jobId: string; formData: CareerFormData };

export function CareersAdminClient({ jobs }: CareersAdminClientProps) {
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

  function openEdit(jobId: string, formData: CareerFormData): void {
    setActiveLocale(listLocale);
    setSheet({ mode: "edit", jobId, formData });
  }

  return (
    <>
      <AdminPageHeader
        title={ui.careersTitle}
        subtitle={ui.careersSubtitle}
        actions={
          <button type="button" className="btn btn-admin-primary" onClick={openCreate}>
            {ui.newJob}
          </button>
        }
      />

      <div className="admin-card admin-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>{getAdminTitleColumnLabel(listLocale, ui.colTitle)}</th>
              <th>{ui.colSalary}</th>
              <th>{ui.colHours}</th>
              <th>{ui.colStatus}</th>
              <th>{ui.colActions}</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{getAdminRowTitle(job.formData.translations, listLocale)}</td>
                <td>{job.salary}</td>
                <td>{job.workHours}</td>
                <td>
                  {job.isPublished ? (
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
                      onClick={() => openEdit(job.id, job.formData)}
                    >
                      {ui.actionEdit}
                    </button>
                    <form action={toggleCareerJobPublished.bind(null, job.id)}>
                      <button type="submit" className="btn btn-admin-secondary">
                        {job.isPublished ? ui.actionUnpublish : ui.actionPublish}
                      </button>
                    </form>
                    <form action={deleteCareerJob.bind(null, job.id)}>
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
        {jobs.length === 0 ? <p className="admin-table-empty">{ui.emptyJobs}</p> : null}
      </div>

      <AdminSheet
        open={sheet.mode !== "closed"}
        title={sheet.mode === "edit" ? ui.sheetEditJob : ui.sheetNewJob}
        subtitle={sheet.mode === "edit" ? ui.sheetEditJobSubtitle : ui.sheetNewJobSubtitle}
        toolbar={
          <ProjectLanguageTabs activeTab={activeLocale} onTabChange={setActiveLocale} />
        }
        onClose={() => setSheet({ mode: "closed" })}
        size="lg"
      >
        {sheet.mode === "create" ? (
          <CareerJobForm
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
          <CareerJobForm
            key={sheet.jobId}
            mode="edit"
            jobId={sheet.jobId}
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
