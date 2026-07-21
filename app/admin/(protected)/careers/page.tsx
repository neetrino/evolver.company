import Link from "next/link";
import { deleteCareerJob, toggleCareerJobPublished } from "@/app/admin/careers/actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Badge } from "@/components/shared/Badge";
import { requireAdmin } from "@/lib/auth";
import { getAllCareerJobs, getCareerTranslation } from "@/lib/careers";

export const dynamic = "force-dynamic";

export default async function AdminCareersPage() {
  await requireAdmin();
  const jobs = await getAllCareerJobs();

  return (
    <>
      <AdminPageHeader
        title="Careers"
        subtitle="Manage open positions, salary, hours, and cover images."
        actions={
          <Link href="/admin/careers/new" className="btn btn-admin-primary">
            New job
          </Link>
        }
      />

      <div className="admin-card overflow-x-auto">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title (EN)</th>
              <th>Salary</th>
              <th>Hours</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => {
              const translation = getCareerTranslation(job, "en");

              return (
                <tr key={job.id}>
                  <td>{translation.title || "—"}</td>
                  <td>{job.salary}</td>
                  <td>{job.workHours}</td>
                  <td>
                    {job.isPublished ? (
                      <Badge variant="success">Published</Badge>
                    ) : (
                      <Badge variant="muted">Draft</Badge>
                    )}
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/admin/careers/${job.id}/edit`}
                        className="btn btn-admin-secondary"
                      >
                        Edit
                      </Link>
                      <form action={toggleCareerJobPublished.bind(null, job.id)}>
                        <button type="submit" className="btn btn-admin-secondary">
                          {job.isPublished ? "Unpublish" : "Publish"}
                        </button>
                      </form>
                      <form action={deleteCareerJob.bind(null, job.id)}>
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
        {jobs.length === 0 ? (
          <p className="mt-4 text-sm text-zinc-500">No jobs yet.</p>
        ) : null}
      </div>
    </>
  );
}
