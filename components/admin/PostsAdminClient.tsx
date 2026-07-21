"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { deletePost, togglePostPublished } from "@/app/admin/posts/actions";
import { useAdminContentLocale } from "@/components/admin/AdminContentLocaleProvider";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminSheet } from "@/components/admin/AdminSheet";
import { PostForm } from "@/components/admin/PostForm";
import { ProjectLanguageTabs } from "@/components/admin/ProjectLanguageTabs";
import { useAdminUi } from "@/components/admin/useAdminUi";
import { Badge } from "@/components/shared/Badge";
import type { AdminContentLocale } from "@/lib/admin-locales";
import { getAdminRowTitle } from "@/lib/admin-table";
import { getAdminTitleColumnLabel } from "@/lib/admin-ui-i18n";
import type { PostFormData } from "@/lib/post-types";

export type PostAdminRow = {
  id: string;
  titleEn: string;
  slug: string;
  isPublished: boolean;
  formData: PostFormData;
};

type PostsAdminClientProps = {
  posts: PostAdminRow[];
};

type SheetState =
  | { mode: "closed" }
  | { mode: "create" }
  | { mode: "edit"; postId: string; formData: PostFormData };

export function PostsAdminClient({ posts }: PostsAdminClientProps) {
  const router = useRouter();
  const ui = useAdminUi();
  const { locale: listLocale } = useAdminContentLocale();
  const [sheet, setSheet] = useState<SheetState>({ mode: "closed" });
  const [activeLocale, setActiveLocale] = useState<AdminContentLocale>("hy");

  const closeSheet = useCallback(() => {
    setSheet({ mode: "closed" });
    router.refresh();
  }, [router]);

  function openCreate(): void {
    setActiveLocale(listLocale);
    setSheet({ mode: "create" });
  }

  function openEdit(postId: string, formData: PostFormData): void {
    setActiveLocale(listLocale);
    setSheet({ mode: "edit", postId, formData });
  }

  return (
    <>
      <AdminPageHeader
        title={ui.postsTitle}
        subtitle={ui.postsSubtitle}
        actions={
          <button type="button" className="btn btn-admin-primary" onClick={openCreate}>
            {ui.newPost}
          </button>
        }
      />

      <div className="admin-card admin-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>{getAdminTitleColumnLabel(listLocale, ui.colTitle)}</th>
              <th>{ui.colSlug}</th>
              <th>{ui.colStatus}</th>
              <th>{ui.colActions}</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{getAdminRowTitle(post.formData.translations, listLocale)}</td>
                <td>{post.slug}</td>
                <td>
                  {post.isPublished ? (
                    <Badge variant="success">{ui.statusPublished}</Badge>
                  ) : (
                    <Badge variant="muted">{ui.statusDraft}</Badge>
                  )}
                </td>
                <td>
                  <div className="admin-table-actions">
                    <button
                      type="button"
                      className="btn btn-admin-secondary"
                      onClick={() => openEdit(post.id, post.formData)}
                    >
                      {ui.actionEdit}
                    </button>
                    <form action={togglePostPublished.bind(null, post.id)}>
                      <button type="submit" className="btn btn-admin-secondary">
                        {post.isPublished ? ui.actionUnpublish : ui.actionPublish}
                      </button>
                    </form>
                    <form action={deletePost.bind(null, post.id)}>
                      <button type="submit" className="btn btn-admin-danger">
                        {ui.actionDelete}
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 ? <p className="admin-table-empty">{ui.emptyPosts}</p> : null}
      </div>

      <AdminSheet
        open={sheet.mode !== "closed"}
        title={sheet.mode === "edit" ? ui.sheetEditPost : ui.sheetNewPost}
        subtitle={sheet.mode === "edit" ? ui.sheetEditPostSubtitle : ui.sheetNewPostSubtitle}
        toolbar={
          <ProjectLanguageTabs activeTab={activeLocale} onTabChange={setActiveLocale} />
        }
        onClose={() => setSheet({ mode: "closed" })}
        size="lg"
      >
        {sheet.mode === "create" ? (
          <PostForm
            key="create"
            mode="create"
            embedded
            hideLanguageToggle
            activeLocale={activeLocale}
            onLocaleChange={setActiveLocale}
            onSuccess={closeSheet}
          />
        ) : null}
        {sheet.mode === "edit" ? (
          <PostForm
            key={sheet.postId}
            mode="edit"
            postId={sheet.postId}
            initialData={sheet.formData}
            embedded
            hideLanguageToggle
            activeLocale={activeLocale}
            onLocaleChange={setActiveLocale}
            onSuccess={closeSheet}
          />
        ) : null}
      </AdminSheet>
    </>
  );
}
