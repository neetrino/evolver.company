import Link from "next/link";
import { BlogPostForm } from "@/components/admin/blog/BlogPostForm";
import { requireAdmin } from "@/lib/auth";
import { getBlogAdminCopy } from "@/lib/blog/admin-copy";
import { getBlogCategoryOptions } from "@/lib/blog/queries";

export const dynamic = "force-dynamic";

export default async function NewBlogPostPage() {
  await requireAdmin();
  const categories = await getBlogCategoryOptions();
  const copy = getBlogAdminCopy("en");

  return (
    <div className="admin-blog-page">
      <Link href="/admin/blog" className="admin-back-link">
        {copy.backToPosts}
      </Link>
      <h1 className="admin-page-title">{copy.newPost}</h1>
      <BlogPostForm mode="create" categories={categories} />
    </div>
  );
}
