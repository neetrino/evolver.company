import { PostsAdminClient } from "@/components/admin/PostsAdminClient";
import { requireAdmin } from "@/lib/auth";
import { getAllPosts, getPostTranslation, postToFormData } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  await requireAdmin();
  const posts = await getAllPosts();

  return (
    <PostsAdminClient
      posts={posts.map((post) => ({
        id: post.id,
        titleEn: getPostTranslation(post, "en").title,
        slug: post.slug,
        isPublished: post.isPublished,
        formData: postToFormData(post),
      }))}
    />
  );
}
