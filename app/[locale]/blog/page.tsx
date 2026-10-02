import "@/app/blog-page.css";
import { BlogCategoryTabs } from "@/components/public/blog/BlogCategoryTabs";
import { BlogHero } from "@/components/public/blog/BlogHero";
import { BlogPostGrid } from "@/components/public/blog/BlogPostGrid";
import { Container } from "@/components/shared/Container";
import { getBlogPageContent } from "@/lib/blog-content";
import { getPublicBlogCategories, getPublishedBlogPosts } from "@/lib/blog/queries";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";

export const revalidate = 60;

type BlogPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string | string[] }>;
};

function readCategoryParam(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  const query = await searchParams;
  const content = getBlogPageContent(locale);
  const [posts, categories] = await Promise.all([
    getPublishedBlogPosts(locale),
    getPublicBlogCategories(locale),
  ]);
  const requested = readCategoryParam(query.category);
  const activeSlug = categories.some((category) => category.slug === requested) ? requested : null;
  const visible = activeSlug ? posts.filter((post) => post.category?.slug === activeSlug) : posts;
  const emptyMessage = activeSlug ? content.emptyCategory : content.emptyMessage;

  return (
    <div className="blog-page">
      <div className="blog-page-backdrop" aria-hidden="true">
        <span className="blog-page-aurora blog-page-aurora-purple" />
        <span className="blog-page-aurora blog-page-aurora-cyan" />
        <span className="blog-page-grid" />
      </div>
      <BlogHero hero={content.hero} />
      <div className="blog-section-divider" aria-hidden="true" />
      <Container>
        <BlogCategoryTabs
          locale={locale}
          categories={categories}
          activeSlug={activeSlug}
          allLabel={content.allCategories}
        />
      </Container>
      <BlogPostGrid locale={locale} posts={visible} content={content} emptyMessage={emptyMessage} />
    </div>
  );
}
