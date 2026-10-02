import { BlogCategoriesAdmin } from "@/components/admin/blog/BlogCategoriesAdmin";
import { requireAdmin } from "@/lib/auth";
import { getAdminBlogCategories } from "@/lib/blog/queries";

export const dynamic = "force-dynamic";

export default async function AdminBlogCategoriesPage() {
  await requireAdmin();
  const categories = await getAdminBlogCategories();
  return <BlogCategoriesAdmin categories={categories} />;
}
