import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  await requireAdmin();

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        subtitle="Manage projects, uploads, and incoming contact messages."
      />
      <div className="card-grid">
        <Link href="/admin/projects" className="admin-card block">
          <h2 className="mb-2 text-lg font-semibold">Projects</h2>
          <p className="text-sm text-zinc-500">Create, edit and publish bilingual projects.</p>
        </Link>
        <Link href="/admin/contact-messages" className="admin-card block">
          <h2 className="mb-2 text-lg font-semibold">Contact Messages</h2>
          <p className="text-sm text-zinc-500">Review messages submitted from the public site.</p>
        </Link>
      </div>
    </>
  );
}
