import { CATEGORY_TITLE_MAX_LENGTH, TITLE_MIN_LENGTH } from "@/lib/blog/constants";
import { blogSlugify, isBlogSlug } from "@/lib/blog/slug";
import { BLOG_LOCALES, encodeTranslatableText, localeMapFromForm } from "@/lib/blog/translatable";

export type ParsedBlogCategory = {
  title: string;
  slug: string;
};

export type ParseBlogCategoryResult =
  | { ok: true; data: ParsedBlogCategory }
  | { ok: false; fieldErrors: Record<string, string> };

export function parseBlogCategoryForm(formData: FormData): ParseBlogCategoryResult {
  const fieldErrors: Record<string, string> = {};
  const titles = localeMapFromForm(formData, "title");
  let hasValidTitle = false;

  for (const locale of BLOG_LOCALES) {
    const length = titles[locale]?.trim().length ?? 0;
    if (length > CATEGORY_TITLE_MAX_LENGTH) {
      fieldErrors[`title.${locale}`] = `Title must be at most ${CATEGORY_TITLE_MAX_LENGTH} characters`;
    }
    if (length >= TITLE_MIN_LENGTH && length <= CATEGORY_TITLE_MAX_LENGTH) {
      hasValidTitle = true;
    }
  }

  if (!hasValidTitle) {
    fieldErrors.title = `Enter a title of at least ${TITLE_MIN_LENGTH} characters in one language`;
  }

  const slug = blogSlugify(String(formData.get("slug") ?? ""));
  if (!isBlogSlug(slug)) {
    fieldErrors.slug = "Use a lowercase slug with letters, numbers, and hyphens";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  return { ok: true, data: { title: encodeTranslatableText(titles), slug } };
}
