import { BlogPostsAdmin } from "@/components/admin/blog/BlogPostsAdmin";
import { requireAdmin } from "@/lib/auth";
import { getAdminBlogPosts } from "@/lib/blog/queries";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  await requireAdmin();
  const posts = await getAdminBlogPosts();
  return <BlogPostsAdmin posts={posts} />;
}
