import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogPostForm } from "@/components/admin/blog/BlogPostForm";
import { requireAdmin } from "@/lib/auth";
import { getBlogAdminCopy } from "@/lib/blog/admin-copy";
import { toBlogPostFormValues } from "@/lib/blog/map-post";
import { getBlogCategoryOptions, getBlogPostForEdit } from "@/lib/blog/queries";

export const dynamic = "force-dynamic";

type EditBlogPostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  await requireAdmin();
  const { id } = await params;
  const [post, categories] = await Promise.all([getBlogPostForEdit(id), getBlogCategoryOptions()]);

  if (!post) {
    notFound();
  }

  const copy = getBlogAdminCopy("en");

  return (
    <div className="admin-blog-page">
      <Link href="/admin/blog" className="admin-back-link">
        {copy.backToPosts}
      </Link>
      <h1 className="admin-page-title">{copy.editPost}</h1>
      <BlogPostForm mode="edit" postId={post.id} initialData={toBlogPostFormValues(post)} categories={categories} />
    </div>
  );
}
