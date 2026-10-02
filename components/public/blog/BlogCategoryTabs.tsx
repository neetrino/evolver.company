import Link from "next/link";
import type { BlogCategoryTab } from "@/lib/blog/types";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";

type BlogCategoryTabsProps = {
  locale: Locale;
  categories: BlogCategoryTab[];
  activeSlug: string | null;
  allLabel: string;
};

export function BlogCategoryTabs({ locale, categories, activeSlug, allLabel }: BlogCategoryTabsProps) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <nav className="blog-category-tabs" aria-label={allLabel}>
      <Link href={localePath(locale, "/blog")} className={activeSlug ? "blog-category-tab" : "blog-category-tab is-active"}>
        {allLabel}
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={localePath(locale, `/blog?category=${encodeURIComponent(category.slug)}`)}
          className={activeSlug === category.slug ? "blog-category-tab is-active" : "blog-category-tab"}
        >
          {category.title}
        </Link>
      ))}
    </nav>
  );
}
