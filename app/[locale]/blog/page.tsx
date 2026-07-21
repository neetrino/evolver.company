import "@/app/blog-page.css";
import { BlogHero } from "@/components/public/blog/BlogHero";
import { BlogPostGrid } from "@/components/public/blog/BlogPostGrid";
import { getBlogPageContent } from "@/lib/blog-content";
import type { Locale } from "@/lib/i18n";
import { getPublishedPosts } from "@/lib/posts";

export const revalidate = 60;

type BlogPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const content = getBlogPageContent(locale);
  const posts = await getPublishedPosts();

  return (
    <div className="blog-page">
      <div className="blog-page-backdrop" aria-hidden="true">
        <span className="blog-page-aurora blog-page-aurora-purple" />
        <span className="blog-page-aurora blog-page-aurora-cyan" />
        <span className="blog-page-grid" />
      </div>

      <BlogHero hero={content.hero} />
      <BlogPostGrid locale={locale} posts={posts} content={content} />
    </div>
  );
}
