import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { PostForm } from "@/components/admin/PostForm";
import { requireAdmin } from "@/lib/auth";

export default async function NewPostPage() {
  await requireAdmin();

  return (
    <>
      <AdminPageHeader title="New post" subtitle="Create a bilingual blog post with cover image." />
      <PostForm mode="create" />
    </>
  );
}
