import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "@/app/blog-page.css";
import { BlogPostArticle } from "@/components/public/blog/BlogPostArticle";
import { getBlogPageContent } from "@/lib/blog-content";
import { formatBlogDate } from "@/lib/blog/dates";
import { toMetaDescription } from "@/lib/blog/html";
import { getPublishedBlogPost } from "@/lib/blog/queries";
import type { Locale } from "@/lib/i18n";
import { isLocale, localePath } from "@/lib/i18n";

export const revalidate = 60;

type BlogPostPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  const post = await getPublishedBlogPost(slug, locale);

  if (!post) {
    return {};
  }

  const description = toMetaDescription(post.shortDescription, post.content);
  const path = localePath(locale, `/blog/${post.slug}`);

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      url: path,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam;
  const post = await getPublishedBlogPost(slug, locale);
  if (!post) {
    notFound();
  }

  return (
    <div className="blog-page">
      <BlogPostArticle
        locale={locale}
        post={post}
        content={getBlogPageContent(locale)}
        dateLabel={formatBlogDate(post.publishedAt, locale)}
      />
    </div>
  );
}
