import Link from "next/link";
import { deletePost, togglePostPublished } from "@/app/admin/posts/actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Badge } from "@/components/shared/Badge";
import { requireAdmin } from "@/lib/auth";
import { getAllPosts, getPostTranslation } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  await requireAdmin();
  const posts = await getAllPosts();

  return (
    <>
      <AdminPageHeader
        title="Blog posts"
        subtitle="Manage published and draft blog posts."
        actions={
          <Link href="/admin/posts/new" className="btn btn-admin-primary">
            New post
          </Link>
        }
      />

      <div className="admin-card overflow-x-auto">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title (EN)</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => {
              const translation = getPostTranslation(post, "en");

              return (
                <tr key={post.id}>
                  <td>{translation.title || "—"}</td>
                  <td>{post.slug}</td>
                  <td>
                    {post.isPublished ? (
                      <Badge variant="success">Published</Badge>
                    ) : (
                      <Badge variant="muted">Draft</Badge>
                    )}
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="btn btn-admin-secondary"
                      >
                        Edit
                      </Link>
                      <form action={togglePostPublished.bind(null, post.id)}>
                        <button type="submit" className="btn btn-admin-secondary">
                          {post.isPublished ? "Unpublish" : "Publish"}
                        </button>
                      </form>
                      <form action={deletePost.bind(null, post.id)}>
                        <button type="submit" className="btn btn-admin-danger">
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {posts.length === 0 ? (
          <p className="mt-4 text-sm text-zinc-500">No posts yet.</p>
        ) : null}
      </div>
    </>
  );
}
