"use client";

import { useActionState, useEffect, useState } from "react";
import type { PostActionState } from "@/app/admin/posts/actions";
import { createPost, updatePost } from "@/app/admin/posts/actions";
import { CoverImageUploader } from "@/components/admin/CoverImageUploader";
import { ProjectLanguageTabs } from "@/components/admin/ProjectLanguageTabs";
import type { AdminContentLocale } from "@/lib/admin-locales";
import { ADMIN_CONTENT_LOCALE_LABELS } from "@/lib/admin-locales";
import type { PostFormData } from "@/lib/post-types";
import { slugify } from "@/lib/project-types";

type PostFormProps = {
  mode: "create" | "edit";
  postId?: string;
  initialData?: PostFormData;
  embedded?: boolean;
  hideLanguageToggle?: boolean;
  activeLocale?: AdminContentLocale;
  onLocaleChange?: (locale: AdminContentLocale) => void;
  onSuccess?: () => void;
};

const EMPTY_TRANSLATION = { title: "", description: "" };

const EMPTY_FORM: PostFormData = {
  slug: "",
  isPublished: true,
  coverImage: null,
  translations: {
    en: EMPTY_TRANSLATION,
    ru: EMPTY_TRANSLATION,
    hy: EMPTY_TRANSLATION,
  },
};

export function PostForm({
  mode,
  postId,
  initialData,
  embedded = false,
  hideLanguageToggle = false,
  activeLocale,
  onLocaleChange,
  onSuccess,
}: PostFormProps) {
  const [internalTab, setInternalTab] = useState<AdminContentLocale>("hy");
  const activeTab = activeLocale ?? internalTab;
  const [formData, setFormData] = useState<PostFormData>(initialData ?? EMPTY_FORM);
  const [slugTouched, setSlugTouched] = useState(Boolean(initialData?.slug));

  const boundUpdate =
    mode === "edit" && postId ? updatePost.bind(null, postId) : createPost;

  const [state, formAction, isPending] = useActionState<PostActionState, FormData>(
    boundUpdate,
    {},
  );

  useEffect(() => {
    if (state.success) {
      onSuccess?.();
    }
  }, [state.success, onSuccess]);

  function handleTabChange(locale: AdminContentLocale): void {
    onLocaleChange?.(locale);
    if (activeLocale === undefined) {
      setInternalTab(locale);
    }
  }

  function updateTranslation(
    locale: AdminContentLocale,
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
    <form action={formAction} className={embedded ? "admin-sheet-form" : "admin-card"}>
      {state.error ? <p className="form-error">{state.error}</p> : null}
      {state.success && !embedded ? <p className="form-success">{state.success}</p> : null}
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

      <label className="admin-checkbox">
        <input
          type="checkbox"
          checked={formData.isPublished}
          onChange={(event) =>
            setFormData((current) => ({ ...current, isPublished: event.target.checked }))
          }
        />
        Published
      </label>

      {hideLanguageToggle ? null : (
        <ProjectLanguageTabs activeTab={activeTab} onTabChange={handleTabChange} />
      )}

      {(["hy", "en", "ru"] as const).map((locale) => (
        <div key={locale} className={activeTab === locale ? "block" : "hidden"}>
          <div className="admin-form-field">
            <label htmlFor={`${locale}_title`}>Title ({ADMIN_CONTENT_LOCALE_LABELS[locale]})</label>
            <input
              id={`${locale}_title`}
              name={`${locale}_title`}
              value={formData.translations[locale].title}
              onChange={(event) => updateTranslation(locale, "title", event.target.value)}
              required
            />
          </div>
          <div className="admin-form-field">
            <label htmlFor={`${locale}_description`}>
              Description ({ADMIN_CONTENT_LOCALE_LABELS[locale]})
            </label>
            <textarea
              id={`${locale}_description`}
              name={`${locale}_description`}
              value={formData.translations[locale].description}
              onChange={(event) => updateTranslation(locale, "description", event.target.value)}
              required
              rows={8}
            />
          </div>
        </div>
      ))}

      <input type="hidden" name="coverImage" value={formData.coverImage?.url ?? ""} />
      <input type="hidden" name="coverImageKey" value={formData.coverImage?.key ?? ""} />
      <input type="hidden" name="isPublished" value={String(formData.isPublished)} />

      <button type="submit" className="btn btn-admin-primary" disabled={isPending}>
        {isPending ? "Saving..." : mode === "create" ? "Create post" : "Save changes"}
      </button>
    </form>
  );
}
