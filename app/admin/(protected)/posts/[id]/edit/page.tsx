import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { PostForm } from "@/components/admin/PostForm";
import { requireAdmin } from "@/lib/auth";
import { getPostById, postToFormData } from "@/lib/posts";

export const dynamic = "force-dynamic";

type EditPostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: EditPostPageProps) {
  await requireAdmin();
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <>
      <AdminPageHeader title="Edit post" subtitle={`Editing ${post.slug}`} />
      <PostForm mode="edit" postId={post.id} initialData={postToFormData(post)} />
    </>
  );
}
