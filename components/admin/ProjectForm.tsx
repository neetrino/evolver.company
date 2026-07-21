"use client";

import { useActionState, useEffect, useState } from "react";
import type { ProjectActionState } from "@/app/admin/projects/actions";
import { createProject, updateProject } from "@/app/admin/projects/actions";
import { CoverImageUploader } from "@/components/admin/CoverImageUploader";
import { GalleryImageUploader } from "@/components/admin/GalleryImageUploader";
import { ProjectLanguageTabs } from "@/components/admin/ProjectLanguageTabs";
import type { AdminContentLocale } from "@/lib/admin-locales";
import { ADMIN_CONTENT_LOCALE_LABELS } from "@/lib/admin-locales";
import type { ProjectFormData } from "@/lib/project-types";
import { slugify } from "@/lib/project-types";

type ProjectFormProps = {
  mode: "create" | "edit";
  projectId?: string;
  initialData?: ProjectFormData;
  embedded?: boolean;
  hideLanguageToggle?: boolean;
  activeLocale?: AdminContentLocale;
  onLocaleChange?: (locale: AdminContentLocale) => void;
  onSuccess?: () => void;
};

const EMPTY_TRANSLATION = {
  title: "",
  shortDescription: "",
  longDescription: "",
};

const EMPTY_FORM: ProjectFormData = {
  slug: "",
  projectUrl: "",
  accentColor: "",
  isPublished: true,
  coverImage: null,
  translations: {
    en: EMPTY_TRANSLATION,
    ru: EMPTY_TRANSLATION,
    hy: EMPTY_TRANSLATION,
  },
  galleryImages: [],
};

export function ProjectForm({
  mode,
  projectId,
  initialData,
  embedded = false,
  hideLanguageToggle = false,
  activeLocale,
  onLocaleChange,
  onSuccess,
}: ProjectFormProps) {
  const [internalTab, setInternalTab] = useState<AdminContentLocale>("hy");
  const activeTab = activeLocale ?? internalTab;
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
    field: keyof ProjectFormData["translations"]["en"],
    value: string,
  ): void {
    setFormData((current) => {
      const next: ProjectFormData = {
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
      {state.fieldErrors?.accentColor ? (
        <p className="form-error">{state.fieldErrors.accentColor}</p>
      ) : null}

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

      <div className="admin-form-field">
        <label htmlFor="accentColor">Accent color</label>
        <div className="flex items-center gap-3">
          <input
            id="accentColorPicker"
            type="color"
            value={formData.accentColor || "#7b5cff"}
            onChange={(event) =>
              setFormData((current) => ({ ...current, accentColor: event.target.value }))
            }
            aria-label="Accent color picker"
          />
          <input
            id="accentColor"
            name="accentColor"
            type="text"
            value={formData.accentColor}
            onChange={(event) =>
              setFormData((current) => ({ ...current, accentColor: event.target.value }))
            }
            placeholder="#00d1b4"
            spellCheck={false}
          />
          <span
            className="inline-block h-9 w-9 shrink-0 rounded-md border border-[var(--public-border)]"
            style={{
              backgroundColor: formData.accentColor || "transparent",
            }}
            aria-hidden="true"
          />
        </div>
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
            <label htmlFor={`${locale}_shortDescription`}>
              Short description ({ADMIN_CONTENT_LOCALE_LABELS[locale]})
            </label>
            <textarea
              id={`${locale}_shortDescription`}
              name={`${locale}_shortDescription`}
              value={formData.translations[locale].shortDescription}
              onChange={(event) =>
                updateTranslation(locale, "shortDescription", event.target.value)
              }
              required
            />
          </div>
          <div className="admin-form-field">
            <label htmlFor={`${locale}_longDescription`}>
              Long description ({ADMIN_CONTENT_LOCALE_LABELS[locale]})
            </label>
            <textarea
              id={`${locale}_longDescription`}
              name={`${locale}_longDescription`}
              value={formData.translations[locale].longDescription}
              onChange={(event) =>
                updateTranslation(locale, "longDescription", event.target.value)
              }
              required
            />
          </div>
        </div>
      ))}

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
