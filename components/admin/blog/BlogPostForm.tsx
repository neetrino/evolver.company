"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { BlogActionState } from "@/app/admin/blog/actions";
import { createBlogPost, updateBlogPost } from "@/app/admin/blog/actions";
import { BlogBlockEditor } from "@/components/admin/blog/BlogBlockEditor";
import { BlogLocaleField } from "@/components/admin/blog/BlogLocaleField";
import { useAdminContentLocale } from "@/components/admin/AdminContentLocaleProvider";
import { CoverImageUploader } from "@/components/admin/CoverImageUploader";
import { ProjectLanguageTabs } from "@/components/admin/ProjectLanguageTabs";
import { getBlogAdminCopy } from "@/lib/blog/admin-copy";
import { todayDateInputValue } from "@/lib/blog/dates";
import { blogSlugify } from "@/lib/blog/slug";
import type { BlogCategoryOption, BlogPostFormValues } from "@/lib/blog/types";
import { BLOG_LOCALES, getAdminLocaleValue, pickDefaultLocaleText, type BlogLocaleCode } from "@/lib/blog/translatable";

type BlogPostFormProps = {
  mode: "create" | "edit";
  postId?: string;
  initialData?: BlogPostFormValues;
  categories: BlogCategoryOption[];
};

const EMPTY_FORM: BlogPostFormValues = {
  titles: {},
  shortDescriptions: {},
  slug: "",
  categoryId: "",
  publishedAt: todayDateInputValue(),
  blocks: [],
  image: null,
  headerImage: null,
  isPublished: true,
  featuredOnHome: false,
  featuredOrder: "",
};

function localesWithErrors(fieldErrors: Record<string, string> | undefined): BlogLocaleCode[] {
  if (!fieldErrors) {
    return [];
  }

  return BLOG_LOCALES.filter((locale) => Object.keys(fieldErrors).some((key) => key.endsWith(`.${locale}`)));
}

export function BlogPostForm({ mode, postId, initialData, categories }: BlogPostFormProps) {
  const router = useRouter();
  const { locale: adminLocale } = useAdminContentLocale();
  const copy = getBlogAdminCopy(adminLocale);
  const [activeLocale, setActiveLocale] = useState<BlogLocaleCode>("hy");
  const [formData, setFormData] = useState<BlogPostFormValues>(initialData ?? EMPTY_FORM);
  const [slugTouched, setSlugTouched] = useState(Boolean(initialData?.slug));
  const action = mode === "edit" && postId ? updateBlogPost.bind(null, postId) : createBlogPost;
  const [state, formAction, isPending] = useActionState<BlogActionState, FormData>(action, {});

  useEffect(() => {
    if (state.success) {
      router.refresh();
    }
  }, [router, state.success]);

  function updateTitle(locale: BlogLocaleCode, value: string): void {
    setFormData((current) => {
      const titles = { ...current.titles, [locale]: value };
      const slug = slugTouched ? current.slug : blogSlugify(pickDefaultLocaleText(titles));
      return { ...current, titles, slug };
    });
  }

  const completeLocales = BLOG_LOCALES.filter(
    (locale) => formData.titles[locale]?.trim() || formData.shortDescriptions[locale]?.trim(),
  );
  const titleError = state.fieldErrors?.[`title.${activeLocale}`] ?? state.fieldErrors?.title;
  const shortError = state.fieldErrors?.[`shortDescription.${activeLocale}`];

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
          <Link href="/admin/blog" className="btn btn-admin-secondary">
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
        values={formData.titles}
        activeLocale={activeLocale}
        onChange={updateTitle}
        error={titleError}
      />
      <BlogLocaleField
        name="shortDescription"
        label={copy.shortDescription}
        hint={copy.shortDescriptionHint}
        values={formData.shortDescriptions}
        activeLocale={activeLocale}
        onChange={(locale, value) =>
          setFormData((current) => ({
            ...current,
            shortDescriptions: { ...current.shortDescriptions, [locale]: value },
          }))
        }
        multiline
        error={shortError}
      />

      <div className="admin-form-field">
        <label htmlFor="slug">{copy.slug}</label>
        <input
          id="slug"
          name="slug"
          value={formData.slug}
          onChange={(event) => {
            setSlugTouched(true);
            setFormData((current) => ({ ...current, slug: event.target.value }));
          }}
        />
        {state.fieldErrors?.slug ? <p className="form-error">{state.fieldErrors.slug}</p> : null}
      </div>

      <div className="admin-form-field">
        <label htmlFor="categoryId">{copy.category}</label>
        <select
          id="categoryId"
          name="categoryId"
          value={formData.categoryId}
          onChange={(event) => setFormData((current) => ({ ...current, categoryId: event.target.value }))}
        >
          <option value="">{copy.noCategory}</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {getAdminLocaleValue(category.title, activeLocale)}
            </option>
          ))}
        </select>
        {state.fieldErrors?.categoryId ? <p className="form-error">{state.fieldErrors.categoryId}</p> : null}
      </div>

      <div className="admin-form-field">
        <label htmlFor="publishedAt">{copy.publishedAt}</label>
        <input
          id="publishedAt"
          name="publishedAt"
          type="date"
          required
          value={formData.publishedAt}
          onChange={(event) => setFormData((current) => ({ ...current, publishedAt: event.target.value }))}
        />
      </div>

      <BlogBlockEditor
        blocks={formData.blocks}
        activeLocale={activeLocale}
        postId={postId}
        copy={copy}
        onChange={(blocks) => setFormData((current) => ({ ...current, blocks }))}
      />
      {state.fieldErrors?.contentBlocks ? <p className="form-error">{state.fieldErrors.contentBlocks}</p> : null}
      {state.fieldErrors?.content ? <p className="form-error">{state.fieldErrors.content}</p> : null}

      <CoverImageUploader
        label={copy.cardImage}
        uploadContext="blog"
        projectId={postId}
        value={formData.image}
        onChange={(image) => setFormData((current) => ({ ...current, image }))}
      />
      <CoverImageUploader
        label={copy.headerImage}
        uploadContext="blog"
        projectId={postId}
        value={formData.headerImage}
        onChange={(headerImage) => setFormData((current) => ({ ...current, headerImage }))}
      />
      <input type="hidden" name="image" value={formData.image?.url ?? ""} />
      <input type="hidden" name="imageKey" value={formData.image?.key ?? ""} />
      <input type="hidden" name="headerImage" value={formData.headerImage?.url ?? ""} />
      <input type="hidden" name="headerImageKey" value={formData.headerImage?.key ?? ""} />

      <label className="admin-checkbox">
        <input
          type="checkbox"
          name="isPublished"
          checked={formData.isPublished}
          onChange={(event) => setFormData((current) => ({ ...current, isPublished: event.target.checked }))}
        />
        {copy.published}
      </label>
      <label className="admin-checkbox">
        <input
          type="checkbox"
          name="featuredOnHome"
          checked={formData.featuredOnHome}
          onChange={(event) => setFormData((current) => ({ ...current, featuredOnHome: event.target.checked }))}
        />
        {copy.featured}
      </label>
      <div className="admin-form-field">
        <label htmlFor="featuredOrder">{copy.featuredOrder}</label>
        <input
          id="featuredOrder"
          name="featuredOrder"
          inputMode="numeric"
          value={formData.featuredOrder}
          onChange={(event) => setFormData((current) => ({ ...current, featuredOrder: event.target.value }))}
        />
      </div>
    </form>
  );
}
