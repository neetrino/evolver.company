import Link from "next/link";
import { BlogCategoryForm } from "@/components/admin/blog/BlogCategoryForm";
import { requireAdmin } from "@/lib/auth";
import { getBlogAdminCopy } from "@/lib/blog/admin-copy";

export const dynamic = "force-dynamic";

export default async function NewBlogCategoryPage() {
  await requireAdmin();
  const copy = getBlogAdminCopy("en");

  return (
    <div className="admin-blog-page">
      <Link href="/admin/blog/categories" className="admin-back-link">
        {copy.backToCategories}
      </Link>
      <h1 className="admin-page-title">{copy.newCategory}</h1>
      <BlogCategoryForm mode="create" />
    </div>
  );
}
