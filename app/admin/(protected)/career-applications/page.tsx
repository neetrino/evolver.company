import {
  deleteApplicationAction,
  markApplicationReadAction,
} from "@/app/admin/career-applications/actions";
import { AdminLocalizedHeader } from "@/components/admin/AdminLocalizedHeader";
import { Badge } from "@/components/shared/Badge";
import { requireAdmin } from "@/lib/auth";
import { getCareerApplications, getCareerTranslation } from "@/lib/careers";

export const dynamic = "force-dynamic";

export default async function CareerApplicationsPage() {
  await requireAdmin();
  const applications = await getCareerApplications();

  return (
    <>
      <AdminLocalizedHeader titleKey="applicationsTitle" subtitleKey="applicationsSubtitle" />

      <div className="admin-card overflow-x-auto">
        {applications.length === 0 ? (
          <p className="text-sm text-zinc-500">No applications yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Position</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => {
                const jobTitle = getCareerTranslation(application.job, "en").title;

                return (
                  <tr key={application.id}>
                    <td>
                      {application.isRead ? (
                        <Badge variant="muted">Read</Badge>
                      ) : (
                        <Badge variant="new">New</Badge>
                      )}
                    </td>
                    <td>{jobTitle || application.job.slug}</td>
                    <td>{application.name}</td>
                    <td>{application.email}</td>
                    <td>{application.phone ?? "—"}</td>
                    <td className="max-w-xs whitespace-pre-wrap">{application.message}</td>
                    <td>{application.createdAt.toLocaleDateString()}</td>
                    <td>
                      <div className="flex flex-wrap gap-2">
                        {!application.isRead ? (
                          <form action={markApplicationReadAction.bind(null, application.id)}>
                            <button type="submit" className="btn btn-admin-secondary">
                              Mark read
                            </button>
                          </form>
                        ) : null}
                        <form action={deleteApplicationAction.bind(null, application.id)}>
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
        )}
      </div>
    </>
  );
}
