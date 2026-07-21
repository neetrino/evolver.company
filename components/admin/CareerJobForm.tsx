"use client";

import { useActionState, useState } from "react";
import type { CareerActionState } from "@/app/admin/careers/actions";
import { createCareerJob, updateCareerJob } from "@/app/admin/careers/actions";
import { CoverImageUploader } from "@/components/admin/CoverImageUploader";
import { ProjectLanguageTabs } from "@/components/admin/ProjectLanguageTabs";
import type { CareerFormData } from "@/lib/career-types";
import type { Locale } from "@/lib/i18n";
import { slugify } from "@/lib/project-types";

type CareerJobFormProps = {
  mode: "create" | "edit";
  jobId?: string;
  initialData?: CareerFormData;
};

const EMPTY_FORM: CareerFormData = {
  slug: "",
  salary: "",
  workHours: "",
  isPublished: true,
  coverImage: null,
  translations: {
    en: { title: "", description: "" },
    hy: { title: "", description: "" },
  },
};

export function CareerJobForm({ mode, jobId, initialData }: CareerJobFormProps) {
  const [activeTab, setActiveTab] = useState<Locale>("hy");
  const [formData, setFormData] = useState<CareerFormData>(initialData ?? EMPTY_FORM);
  const [slugTouched, setSlugTouched] = useState(Boolean(initialData?.slug));

  const boundUpdate =
    mode === "edit" && jobId ? updateCareerJob.bind(null, jobId) : createCareerJob;

  const [state, formAction, isPending] = useActionState<CareerActionState, FormData>(
    boundUpdate,
    {},
  );

  function updateTranslation(
    locale: Locale,
    field: keyof CareerFormData["translations"]["en"],
    value: string,
  ): void {
    setFormData((current) => {
      const next: CareerFormData = {
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

      <div className="grid gap-4 md:grid-cols-2">
        <div className="admin-form-field">
          <label htmlFor="salary">Salary</label>
          <input
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={(event) =>
              setFormData((current) => ({ ...current, salary: event.target.value }))
            }
            placeholder="e.g. 400,000 – 600,000 AMD"
            required
          />
          {state.fieldErrors?.salary ? (
            <p className="form-error">{state.fieldErrors.salary}</p>
          ) : null}
        </div>

        <div className="admin-form-field">
          <label htmlFor="workHours">Work hours</label>
          <input
            id="workHours"
            name="workHours"
            value={formData.workHours}
            onChange={(event) =>
              setFormData((current) => ({ ...current, workHours: event.target.value }))
            }
            placeholder="e.g. Full-time · 09:00–18:00"
            required
          />
          {state.fieldErrors?.workHours ? (
            <p className="form-error">{state.fieldErrors.workHours}</p>
          ) : null}
        </div>
      </div>

      <CoverImageUploader
        value={formData.coverImage}
        onChange={(coverImage) => setFormData((current) => ({ ...current, coverImage }))}
        projectId={jobId}
        uploadContext="career"
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
        {isPending ? "Saving..." : mode === "create" ? "Create job" : "Save changes"}
      </button>
    </form>
  );
}
