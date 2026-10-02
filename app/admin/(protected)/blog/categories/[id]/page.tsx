import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCategoryForm } from "@/components/admin/blog/BlogCategoryForm";
import { requireAdmin } from "@/lib/auth";
import { getBlogAdminCopy } from "@/lib/blog/admin-copy";
import { getBlogCategoryForEdit } from "@/lib/blog/queries";
import { decodeTranslatableText } from "@/lib/blog/translatable";

export const dynamic = "force-dynamic";

type EditBlogCategoryPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditBlogCategoryPage({ params }: EditBlogCategoryPageProps) {
  await requireAdmin();
  const { id } = await params;
  const category = await getBlogCategoryForEdit(id);

  if (!category) {
    notFound();
  }

  const copy = getBlogAdminCopy("en");

  return (
    <div className="admin-blog-page">
      <Link href="/admin/blog/categories" className="admin-back-link">
        {copy.backToCategories}
      </Link>
      <h1 className="admin-page-title">{copy.editCategory}</h1>
      <BlogCategoryForm
        mode="edit"
        categoryId={category.id}
        initialTitle={decodeTranslatableText(category.title)}
        initialSlug={category.slug}
      />
    </div>
  );
}
