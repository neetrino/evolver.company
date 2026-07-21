"use client";

import { useActionState, useState } from "react";
import type { PostActionState } from "@/app/admin/posts/actions";
import { createPost, updatePost } from "@/app/admin/posts/actions";
import { CoverImageUploader } from "@/components/admin/CoverImageUploader";
import { ProjectLanguageTabs } from "@/components/admin/ProjectLanguageTabs";
import type { Locale } from "@/lib/i18n";
import type { PostFormData } from "@/lib/post-types";
import { slugify } from "@/lib/project-types";

type PostFormProps = {
  mode: "create" | "edit";
  postId?: string;
  initialData?: PostFormData;
};

const EMPTY_FORM: PostFormData = {
  slug: "",
  isPublished: true,
  coverImage: null,
  translations: {
    en: { title: "", description: "" },
    hy: { title: "", description: "" },
  },
};

export function PostForm({ mode, postId, initialData }: PostFormProps) {
  const [activeTab, setActiveTab] = useState<Locale>("hy");
  const [formData, setFormData] = useState<PostFormData>(initialData ?? EMPTY_FORM);
  const [slugTouched, setSlugTouched] = useState(Boolean(initialData?.slug));

  const boundUpdate =
    mode === "edit" && postId ? updatePost.bind(null, postId) : createPost;

  const [state, formAction, isPending] = useActionState<PostActionState, FormData>(
    boundUpdate,
    {},
  );

  function updateTranslation(
    locale: Locale,
    field: keyof PostFormData["translations"]["en"],
    value: string,
  ): void {
    setFormData((current) => {
      const next: PostFormData = {
        ...current,
        translations: {
          ...current.translations,
          [locale]: {
            ...current.translations[locale],
            [field]: value,
          },
        },
      };

      if (mode === "create" && !slugTouched && locale === "en" && field === "title") {
        next.slug = slugify(value);
      }

      return next;
    });
  }

  return (
    <form action={formAction} className="admin-card">
      {state.error ? <p className="form-error">{state.error}</p> : null}
      {state.success ? <p className="form-success">{state.success}</p> : null}
      {state.fieldErrors?.slug ? <p className="form-error">{state.fieldErrors.slug}</p> : null}

      <div className="admin-form-field">
        <label htmlFor="slug">Slug</label>
        <input
          id="slug"
          name="slug"
          value={formData.slug}
          onChange={(event) => {
            setSlugTouched(true);
            setFormData((current) => ({ ...current, slug: event.target.value }));
          }}
          required
        />
      </div>

      <CoverImageUploader
        value={formData.coverImage}
        onChange={(coverImage) => setFormData((current) => ({ ...current, coverImage }))}
        projectId={postId}
        uploadContext="blog"
      />

      <div className="admin-form-field">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.isPublished}
            onChange={(event) =>
              setFormData((current) => ({ ...current, isPublished: event.target.checked }))
            }
          />
          Published
        </label>
      </div>

      <ProjectLanguageTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className={activeTab === "hy" ? "block" : "hidden"}>
        <div className="admin-form-field">
          <label htmlFor="hy_title">Title (HY)</label>
          <input
            id="hy_title"
            name="hy_title"
            value={formData.translations.hy.title}
            onChange={(event) => updateTranslation("hy", "title", event.target.value)}
            required
          />
        </div>
        <div className="admin-form-field">
          <label htmlFor="hy_description">Description (HY)</label>
          <textarea
            id="hy_description"
            name="hy_description"
            value={formData.translations.hy.description}
            onChange={(event) => updateTranslation("hy", "description", event.target.value)}
            required
            rows={8}
          />
        </div>
      </div>

      <div className={activeTab === "en" ? "block" : "hidden"}>
        <div className="admin-form-field">
          <label htmlFor="en_title">Title (EN)</label>
          <input
            id="en_title"
            name="en_title"
            value={formData.translations.en.title}
            onChange={(event) => updateTranslation("en", "title", event.target.value)}
            required
          />
        </div>
        <div className="admin-form-field">
          <label htmlFor="en_description">Description (EN)</label>
          <textarea
            id="en_description"
            name="en_description"
            value={formData.translations.en.description}
            onChange={(event) => updateTranslation("en", "description", event.target.value)}
            required
            rows={8}
          />
        </div>
      </div>

      <input type="hidden" name="coverImage" value={formData.coverImage?.url ?? ""} />
      <input type="hidden" name="coverImageKey" value={formData.coverImage?.key ?? ""} />
      <input type="hidden" name="isPublished" value={String(formData.isPublished)} />

      <button type="submit" className="btn btn-admin-primary" disabled={isPending}>
        {isPending ? "Saving..." : mode === "create" ? "Create post" : "Save changes"}
      </button>
    </form>
  );
}
