import { notFound } from "next/navigation";
import { PageCopyEditor } from "@/components/admin/pages/PageCopyEditor";
import { requireAdmin } from "@/lib/auth";
import { getPageCopyEditorModel } from "@/lib/page-copy/model";

export const dynamic = "force-dynamic";

type AdminPageCopyPageProps = {
  params: Promise<{ page: string }>;
};

export default async function AdminPageCopyPage({ params }: AdminPageCopyPageProps) {
  await requireAdmin();
  const { page } = await params;
  const model = await getPageCopyEditorModel(page);

  if (!model) {
    notFound();
  }

  return <PageCopyEditor model={model} />;
}
