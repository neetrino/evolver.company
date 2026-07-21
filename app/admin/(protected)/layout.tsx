import { logoutAction } from "@/app/admin/projects/actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { getUnreadCareerApplicationCount } from "@/lib/careers";
import { getUnreadContactCount } from "@/lib/contact";

export const dynamic = "force-dynamic";

type AdminProtectedLayoutProps = {
  children: React.ReactNode;
};

async function safeUnreadContactCount(): Promise<number> {
  try {
    return await getUnreadContactCount();
  } catch {
    return 0;
  }
}

async function safeUnreadApplicationCount(): Promise<number> {
  try {
    return await getUnreadCareerApplicationCount();
  } catch {
    return 0;
  }
}

export default async function AdminProtectedLayout({ children }: AdminProtectedLayoutProps) {
  const [unreadCount, applicationUnreadCount] = await Promise.all([
    safeUnreadContactCount(),
    safeUnreadApplicationCount(),
  ]);

  return (
    <AdminShell
      unreadCount={unreadCount}
      applicationUnreadCount={applicationUnreadCount}
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
