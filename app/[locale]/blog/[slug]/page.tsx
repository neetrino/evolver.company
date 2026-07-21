import { notFound } from "next/navigation";
import "@/app/blog-page.css";
import { BlogPostArticle } from "@/components/public/blog/BlogPostArticle";
import { getBlogPageContent } from "@/lib/blog-content";
import type { Locale } from "@/lib/i18n";
import { getPostTranslation, getPublishedPostBySlug } from "@/lib/posts";

export const revalidate = 60;

type BlogPostPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const translation = getPostTranslation(post, locale);

  if (!translation.title) {
    notFound();
  }

  const content = getBlogPageContent(locale);

  return (
    <div className="blog-page">
      <BlogPostArticle locale={locale} post={post} content={content} />
    </div>
  );
}
