import { deleteMessageAction, markMessageReadAction } from "@/app/admin/contact/actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Badge } from "@/components/shared/Badge";
import { requireAdmin } from "@/lib/auth";
import { getContactMessages } from "@/lib/contact";

export const dynamic = "force-dynamic";

export default async function ContactMessagesPage() {
  await requireAdmin();
  const messages = await getContactMessages();

  return (
    <>
      <AdminPageHeader
        title="Contact Messages"
        subtitle="Messages submitted from the public contact form."
      />

      <div className="admin-card overflow-x-auto">
        {messages.length === 0 ? (
          <p className="text-sm text-zinc-500">No messages yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr key={message.id}>
                  <td>
                    {message.isRead ? (
                      <Badge variant="muted">Read</Badge>
                    ) : (
                      <Badge variant="new">New</Badge>
                    )}
                  </td>
                  <td>{message.name}</td>
                  <td>{message.email}</td>
                  <td>{message.phone ?? "—"}</td>
                  <td className="max-w-xs whitespace-pre-wrap">{message.message}</td>
                  <td>{message.createdAt.toLocaleDateString()}</td>
                  <td>
                    <div className="flex flex-wrap gap-2">
                      {!message.isRead ? (
                        <form action={markMessageReadAction.bind(null, message.id)}>
                          <button type="submit" className="btn btn-admin-secondary">
                            Mark read
                          </button>
                        </form>
                      ) : null}
                      <form action={deleteMessageAction.bind(null, message.id)}>
                        <button type="submit" className="btn btn-admin-danger">
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
