"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { BlogActionState } from "@/app/admin/blog/actions";
import { createBlogCategory, updateBlogCategory } from "@/app/admin/blog/actions";
import { BlogLocaleField } from "@/components/admin/blog/BlogLocaleField";
import { useAdminContentLocale } from "@/components/admin/AdminContentLocaleProvider";
import { ProjectLanguageTabs } from "@/components/admin/ProjectLanguageTabs";
import { getBlogAdminCopy } from "@/lib/blog/admin-copy";
import { blogSlugify } from "@/lib/blog/slug";
import { BLOG_LOCALES, pickDefaultLocaleText, type BlogLocaleCode, type LocaleTextMap } from "@/lib/blog/translatable";

type BlogCategoryFormProps = {
  mode: "create" | "edit";
  categoryId?: string;
  initialTitle?: LocaleTextMap;
  initialSlug?: string;
};

function localesWithErrors(fieldErrors: Record<string, string> | undefined): BlogLocaleCode[] {
  if (!fieldErrors) {
    return [];
  }

  return BLOG_LOCALES.filter((locale) => Object.keys(fieldErrors).some((key) => key.endsWith(`.${locale}`)));
}

export function BlogCategoryForm({
  mode,
  categoryId,
  initialTitle = {},
  initialSlug = "",
}: BlogCategoryFormProps) {
  const router = useRouter();
  const { locale: adminLocale } = useAdminContentLocale();
  const copy = getBlogAdminCopy(adminLocale);
  const [activeLocale, setActiveLocale] = useState<BlogLocaleCode>("hy");
  const [titles, setTitles] = useState<LocaleTextMap>(initialTitle);
  const [slug, setSlug] = useState(initialSlug);
  const [slugTouched, setSlugTouched] = useState(Boolean(initialSlug));
  const action = mode === "edit" && categoryId ? updateBlogCategory.bind(null, categoryId) : createBlogCategory;
  const [state, formAction, isPending] = useActionState<BlogActionState, FormData>(action, {});

  useEffect(() => {
    if (state.success) {
      router.refresh();
    }
  }, [router, state.success]);

  function updateTitle(locale: BlogLocaleCode, value: string): void {
    const nextTitles = { ...titles, [locale]: value };
    setTitles(nextTitles);
    if (!slugTouched) {
      setSlug(blogSlugify(pickDefaultLocaleText(nextTitles)));
    }
  }

  const completeLocales = BLOG_LOCALES.filter((locale) => titles[locale]?.trim());

  return (
    <form action={formAction} className="admin-card admin-blog-form">
      <div className="admin-blog-sticky">
        <ProjectLanguageTabs
          activeTab={activeLocale}
          onTabChange={setActiveLocale}
          completeLocales={completeLocales}
          errorLocales={localesWithErrors(state.fieldErrors)}
        />
        <p className="admin-field-hint">{copy.localeHint}</p>
        <div className="admin-blog-sticky-actions">
          <Link href="/admin/blog/categories" className="btn btn-admin-secondary">
            {copy.cancel}
          </Link>
          <button type="submit" className="btn btn-admin-primary" disabled={isPending}>
            {copy.save}
          </button>
        </div>
      </div>
      {state.error ? <p className="form-error">{state.error}</p> : null}
      {state.success ? <p className="form-success">{state.success}</p> : null}
      <BlogLocaleField
        name="title"
        label={copy.title}
        values={titles}
        activeLocale={activeLocale}
        onChange={updateTitle}
        error={state.fieldErrors?.[`title.${activeLocale}`] ?? state.fieldErrors?.title}
      />
      <div className="admin-form-field">
        <label htmlFor="slug">{copy.slug}</label>
        <input
          id="slug"
          name="slug"
          value={slug}
          onChange={(event) => {
            setSlugTouched(true);
            setSlug(event.target.value);
          }}
        />
        {state.fieldErrors?.slug ? <p className="form-error">{state.fieldErrors.slug}</p> : null}
      </div>
    </form>
  );
}
