import Link from "next/link";
import { CareerJobForm } from "@/components/admin/CareerJobForm";
import { requireAdmin } from "@/lib/auth";
import { getAdminUi } from "@/lib/admin-ui-i18n";

export const dynamic = "force-dynamic";

export default async function NewCareerPage() {
  await requireAdmin();
  const ui = getAdminUi("en");

  return (
    <div>
      <Link href="/admin/careers" className="admin-back-link">
        {ui.careersTitle}
      </Link>
      <h1 className="admin-page-title">{ui.newJob}</h1>
      <CareerJobForm mode="create" />
    </div>
  );
}
