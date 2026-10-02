import Image from "next/image";
import Link from "next/link";
import { BlogBlocks } from "@/components/public/blog/BlogBlocks";
import { Container } from "@/components/shared/Container";
import type { BlogPageContent } from "@/lib/blog-content";
import { prepareBlogHtml } from "@/lib/blog/html";
import { blogHeroImage } from "@/lib/blog/images";
import type { BlogDetail } from "@/lib/blog/types";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";

type BlogPostArticleProps = {
  locale: Locale;
  post: BlogDetail;
  content: BlogPageContent;
  dateLabel: string;
};

function BackArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="blog-article-back-icon">
      <path
        d="M19 12H5M11 6l-6 6 6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BlogPostArticle({ locale, post, content, dateLabel }: BlogPostArticleProps) {
  const blogHref = localePath(locale, "/blog");
  const heroImage = blogHeroImage(post.headerImage, post.image);
  const eyebrow = post.category?.title || content.hero.kicker;
  const legacyHtml = post.blocks.length === 0 ? prepareBlogHtml(post.content) : "";

  return (
    <article className="blog-article">
      <div className="blog-article-atmosphere" aria-hidden="true">
        <span className="blog-article-aurora blog-article-aurora-purple" />
        <span className="blog-article-aurora blog-article-aurora-cyan" />
        <span className="blog-article-grid" />
        <span className="blog-article-noise" />
      </div>

      <section className="blog-article-hero" aria-label={post.title}>
        <div className="blog-article-hero-visual" aria-hidden="true">
          <Image src={heroImage} alt="" fill priority className="blog-article-hero-image" sizes="100vw" />
          <div className="blog-article-hero-overlay blog-article-hero-overlay-top" />
          <div className="blog-article-hero-overlay blog-article-hero-overlay-base" />
          <div className="blog-article-hero-overlay blog-article-hero-overlay-bottom" />
          <span className="blog-article-hero-glow blog-article-hero-glow-purple" />
          <span className="blog-article-hero-glow blog-article-hero-glow-cyan" />
          <span className="blog-article-hero-scan" />
          <span className="blog-article-hero-frame" />
        </div>
        <Container className="blog-article-hero-inner">
          <Link href={blogHref} prefetch className="blog-article-back">
            <BackArrowIcon />
            <span>{content.backToBlog}</span>
          </Link>
          <div className="blog-article-hero-copy">
            <span className="blog-article-accent-line" aria-hidden="true" />
            <p className="blog-article-kicker">{eyebrow}</p>
            <div className="blog-article-title-wrap">
              <span className="blog-article-title-glow" aria-hidden="true" />
              <h1 className="blog-article-title">{post.title}</h1>
            </div>
            <p className="blog-article-date">{dateLabel}</p>
          </div>
        </Container>
      </section>

      <Container className="blog-article-content">
        <div className="blog-article-body">
          <span className="blog-article-body-accent" aria-hidden="true" />
          {post.blocks.length > 0 ? <BlogBlocks blocks={post.blocks} title={post.title} /> : null}
          {legacyHtml ? <div className="blog-rich-text" dangerouslySetInnerHTML={{ __html: legacyHtml }} /> : null}
        </div>
      </Container>
    </article>
  );
}
