"use client";

import { useActionState, useEffect, useState } from "react";
import type { ProjectActionState } from "@/app/admin/projects/actions";
import { createProject, updateProject } from "@/app/admin/projects/actions";
import { CoverImageUploader } from "@/components/admin/CoverImageUploader";
import { GalleryImageUploader } from "@/components/admin/GalleryImageUploader";
import { ProjectLanguageTabs } from "@/components/admin/ProjectLanguageTabs";
import type { Locale } from "@/lib/i18n";
import type { ProjectFormData } from "@/lib/projects";
import { slugify } from "@/lib/projects";

type ProjectFormProps = {
  mode: "create" | "edit";
  projectId?: string;
  initialData?: ProjectFormData;
};

const EMPTY_FORM: ProjectFormData = {
  slug: "",
  projectUrl: "",
  isPublished: true,
  coverImage: null,
  translations: {
    en: { title: "", shortDescription: "", longDescription: "" },
    hy: { title: "", shortDescription: "", longDescription: "" },
  },
  galleryImages: [],
};

export function ProjectForm({ mode, projectId, initialData }: ProjectFormProps) {
  const [activeTab, setActiveTab] = useState<Locale>("hy");
  const [formData, setFormData] = useState<ProjectFormData>(initialData ?? EMPTY_FORM);
  const [slugTouched, setSlugTouched] = useState(Boolean(initialData?.slug));

  const boundUpdate =
    mode === "edit" && projectId
      ? updateProject.bind(null, projectId)
      : createProject;

  const [state, formAction, isPending] = useActionState<ProjectActionState, FormData>(
    boundUpdate,
    {},
  );

  useEffect(() => {
    if (mode === "create" && !slugTouched && formData.translations.en.title) {
      setFormData((current) => ({
        ...current,
        slug: slugify(current.translations.en.title),
      }));
    }
  }, [formData.translations.en.title, mode, slugTouched]);

  function updateTranslation(
    locale: Locale,
    field: keyof ProjectFormData["translations"]["en"],
    value: string,
  ): void {
    setFormData((current) => ({
      ...current,
      translations: {
        ...current.translations,
        [locale]: {
          ...current.translations[locale],
          [field]: value,
        },
      },
    }));
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

      <div className="admin-form-field">
        <label htmlFor="projectUrl">Project URL</label>
        <input
          id="projectUrl"
          name="projectUrl"
          type="url"
          value={formData.projectUrl}
          onChange={(event) =>
            setFormData((current) => ({ ...current, projectUrl: event.target.value }))
          }
        />
      </div>

      <CoverImageUploader
        value={formData.coverImage}
        onChange={(coverImage) => setFormData((current) => ({ ...current, coverImage }))}
        projectId={projectId}
      />

      <GalleryImageUploader
        images={formData.galleryImages}
        onChange={(galleryImages) => setFormData((current) => ({ ...current, galleryImages }))}
        projectId={projectId}
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
          <label htmlFor="hy_shortDescription">Short description (HY)</label>
          <textarea
            id="hy_shortDescription"
            name="hy_shortDescription"
            value={formData.translations.hy.shortDescription}
            onChange={(event) => updateTranslation("hy", "shortDescription", event.target.value)}
            required
          />
        </div>
        <div className="admin-form-field">
          <label htmlFor="hy_longDescription">Long description (HY)</label>
          <textarea
            id="hy_longDescription"
            name="hy_longDescription"
            value={formData.translations.hy.longDescription}
            onChange={(event) => updateTranslation("hy", "longDescription", event.target.value)}
            required
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
          <label htmlFor="en_shortDescription">Short description (EN)</label>
          <textarea
            id="en_shortDescription"
            name="en_shortDescription"
            value={formData.translations.en.shortDescription}
            onChange={(event) => updateTranslation("en", "shortDescription", event.target.value)}
            required
          />
        </div>
        <div className="admin-form-field">
          <label htmlFor="en_longDescription">Long description (EN)</label>
          <textarea
            id="en_longDescription"
            name="en_longDescription"
            value={formData.translations.en.longDescription}
            onChange={(event) => updateTranslation("en", "longDescription", event.target.value)}
            required
          />
        </div>
      </div>

      <input type="hidden" name="coverImage" value={formData.coverImage?.url ?? ""} />
      <input type="hidden" name="coverImageKey" value={formData.coverImage?.key ?? ""} />
      <input type="hidden" name="galleryImages" value={JSON.stringify(formData.galleryImages)} />
      <input type="hidden" name="isPublished" value={String(formData.isPublished)} />

      <button type="submit" className="btn btn-admin-primary" disabled={isPending}>
        {isPending ? "Saving..." : mode === "create" ? "Create project" : "Save changes"}
      </button>
    </form>
  );
}
