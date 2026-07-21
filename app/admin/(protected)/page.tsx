import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  await requireAdmin();

  return <AdminDashboardClient />;
}
