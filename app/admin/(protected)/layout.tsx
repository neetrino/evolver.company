import Link from "next/link";
import { logoutAction } from "@/app/admin/projects/actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { getUnreadContactCount } from "@/lib/contact";

export const dynamic = "force-dynamic";

type AdminProtectedLayoutProps = {
  children: React.ReactNode;
};

async function safeUnreadCount(): Promise<number> {
  try {
    return await getUnreadContactCount();
  } catch {
    return 0;
  }
}

export default async function AdminProtectedLayout({ children }: AdminProtectedLayoutProps) {
  const unreadCount = await safeUnreadCount();

  return (
    <AdminShell
      unreadCount={unreadCount}
      topbarActions={
        <form action={logoutAction}>
          <button type="submit" className="btn btn-admin-secondary">
            Logout
          </button>
        </form>
      }
    >
      {children}
    </AdminShell>
  );
}
