import Link from "next/link";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { requireAdmin } from "@/lib/auth";
import { getAdminUi } from "@/lib/admin-ui-i18n";

export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  await requireAdmin();
  const ui = getAdminUi("en");

  return (
    <div>
      <Link href="/admin/projects" className="admin-back-link">
        {ui.projectsTitle}
      </Link>
      <h1 className="admin-page-title">{ui.newProject}</h1>
      <ProjectForm mode="create" />
    </div>
  );
}
