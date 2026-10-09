"use client";

import Link from "next/link";
import { deleteCareerJob, toggleCareerJobPublished } from "@/app/admin/careers/actions";
import { useAdminContentLocale } from "@/components/admin/AdminContentLocaleProvider";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { useAdminUi } from "@/components/admin/useAdminUi";
import { Badge } from "@/components/shared/Badge";
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

export function CareersAdminClient({ jobs }: CareersAdminClientProps) {
  const ui = useAdminUi();
  const { locale: listLocale } = useAdminContentLocale();

  return (
    <>
      <AdminPageHeader
        title={ui.careersTitle}
        subtitle={ui.careersSubtitle}
        actions={
          <Link href="/admin/careers/new" className="btn btn-admin-primary">
            {ui.newJob}
          </Link>
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
                    <Link href={`/admin/careers/${job.id}/edit`} className="btn btn-admin-secondary">
                      {ui.actionEdit}
                    </Link>
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
    </>
  );
}
