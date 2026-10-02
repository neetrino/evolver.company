"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteBlogPost, toggleBlogFeatured } from "@/app/admin/blog/actions";
import { useAdminContentLocale } from "@/components/admin/AdminContentLocaleProvider";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { useAdminUi } from "@/components/admin/useAdminUi";
import { Badge } from "@/components/shared/Badge";
import { getBlogAdminCopy } from "@/lib/blog/admin-copy";
import { formatBlogDate } from "@/lib/blog/dates";
import type { AdminBlogPostRow } from "@/lib/blog/types";
import { getAdminLocaleValue } from "@/lib/blog/translatable";
import { DEFAULT_LOCALE, localePath } from "@/lib/i18n";

type BlogPostsAdminProps = {
  posts: AdminBlogPostRow[];
};

export function BlogPostsAdmin({ posts }: BlogPostsAdminProps) {
  const router = useRouter();
  const ui = useAdminUi();
  const { locale } = useAdminContentLocale();
  const copy = getBlogAdminCopy(locale);
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (!needle) {
        return true;
      }

      const title = getAdminLocaleValue(post.title, locale).toLowerCase();
      const category = getAdminLocaleValue(post.categoryTitle, locale).toLowerCase();
      return title.includes(needle) || post.slug.toLowerCase().includes(needle) || category.includes(needle);
    });
  }, [locale, posts, query]);

  return (
    <>
      <AdminPageHeader
        title={ui.postsTitle}
        subtitle={ui.postsSubtitle}
        actions={
          <div className="admin-page-header-actions">
            <Link href="/admin/blog/categories" className="btn btn-admin-secondary">
              {copy.categories}
            </Link>
            <Link href="/admin/blog/new" className="btn btn-admin-primary">
              {copy.newPost}
            </Link>
          </div>
        }
      />

      <div className="admin-form-field">
        <label htmlFor="blog-search">{copy.search}</label>
        <input id="blog-search" value={query} onChange={(event) => setQuery(event.target.value)} />
      </div>

      <div className="admin-card admin-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>{copy.homepage}</th>
              <th>{copy.colPost}</th>
              <th>{copy.colCategory}</th>
              <th>{ui.colStatus}</th>
              <th>{ui.colActions}</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((post) => (
              <PostRow key={post.id} post={post} locale={locale} copy={copy} ui={ui} onOpen={() => router.push(`/admin/blog/${post.id}`)} />
            ))}
          </tbody>
        </table>
        {posts.length === 0 ? <p className="admin-table-empty">{copy.emptyPosts}</p> : null}
        {posts.length > 0 && visible.length === 0 ? <p className="admin-table-empty">{copy.emptySearch}</p> : null}
      </div>
    </>
  );
}

type PostRowProps = {
  post: AdminBlogPostRow;
  locale: ReturnType<typeof useAdminContentLocale>["locale"];
  copy: ReturnType<typeof getBlogAdminCopy>;
  ui: ReturnType<typeof useAdminUi>;
  onOpen: () => void;
};

function PostRow({ post, locale, copy, ui, onOpen }: PostRowProps) {
  const title = getAdminLocaleValue(post.title, locale);
  const category = getAdminLocaleValue(post.categoryTitle, locale);
  const dateLabel = formatBlogDate(post.publishedAt, locale === "hy" ? "hy" : "en");

  return (
    <tr className="admin-blog-row" onClick={onOpen}>
      <td>
        <form action={toggleBlogFeatured.bind(null, post.id)} onClick={(event) => event.stopPropagation()}>
          <button type="submit" className={`admin-blog-star ${post.featuredOnHome ? "admin-blog-star-on" : ""}`} aria-label={copy.homepage}>
            {post.featuredOnHome ? "★" : "☆"}
          </button>
        </form>
      </td>
      <td>
        <div className="admin-blog-post-cell">
          {post.image ? (
            <Image src={post.image} alt="" width={48} height={48} className="admin-blog-thumb" />
          ) : (
            <span className="admin-blog-thumb admin-blog-thumb-empty" aria-hidden="true" />
          )}
          <div>
            <p className="admin-blog-title">{title}</p>
            <p className="admin-blog-meta">
              {post.slug} · {dateLabel}
            </p>
          </div>
        </div>
      </td>
      <td>{category || "—"}</td>
      <td>
        {post.isPublished ? <Badge variant="success">{ui.statusPublished}</Badge> : <Badge variant="muted">{ui.statusDraft}</Badge>}
      </td>
      <td>
        <div className="admin-table-actions" onClick={(event) => event.stopPropagation()}>
          {post.isPublished ? (
            <Link href={localePath(DEFAULT_LOCALE, `/blog/${post.slug}`)} className="btn btn-admin-secondary">
              {copy.view}
            </Link>
          ) : null}
          <Link href={`/admin/blog/${post.id}`} className="btn btn-admin-secondary">
            {ui.actionEdit}
          </Link>
          <form action={deleteBlogPost.bind(null, post.id)}>
            <button type="submit" className="btn btn-admin-danger">
              {ui.actionDelete}
            </button>
          </form>
        </div>
      </td>
    </tr>
  );
}
