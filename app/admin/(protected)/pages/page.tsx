import { PagesAdminIndex } from "@/components/admin/pages/PagesAdminIndex";
import { requireAdmin } from "@/lib/auth";
import { getPageCopyIndex } from "@/lib/page-copy/model";

export const dynamic = "force-dynamic";

export default async function AdminPagesPage() {
  await requireAdmin();
  const pages = await getPageCopyIndex();

  return <PagesAdminIndex pages={pages} />;
}
