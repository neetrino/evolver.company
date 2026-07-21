import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import type { BlogPageContent } from "@/lib/blog-content";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import type { PostWithDetails } from "@/lib/post-types";
import { getPostTranslation } from "@/lib/post-types";

type BlogPostArticleProps = {
  locale: Locale;
  post: PostWithDetails;
  content: BlogPageContent;
};

type ArticleHeroProps = {
  title: string;
  coverImage: string | null;
  dateIso: string;
  dateLabel: string;
  blogHref: string;
  backLabel: string;
  kicker: string;
  sectionLabel: string;
};

function formatPostDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "hy" ? "hy-AM" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function splitDescriptionParagraphs(description: string): string[] {
  return description
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0);
}

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

function ArticleHero({
  title,
  coverImage,
  dateIso,
  dateLabel,
  blogHref,
  backLabel,
  kicker,
  sectionLabel,
}: ArticleHeroProps) {
  return (
    <section className="blog-article-hero" aria-label={title}>
      <div className="blog-article-hero-visual" aria-hidden="true">
        {coverImage ? (
          <Image
            src={coverImage}
            alt=""
            fill
            priority
            className="blog-article-hero-image"
            sizes="100vw"
          />
        ) : (
          <span className="blog-article-hero-fallback" />
        )}
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
          <span>{backLabel}</span>
        </Link>

        <div className="blog-article-hero-copy">
          <span className="blog-article-accent-line" aria-hidden="true" />
          <p className="blog-article-kicker">{kicker}</p>
          <div className="blog-article-title-wrap">
            <span className="blog-article-title-glow" aria-hidden="true" />
            <h1 className="blog-article-title">{title}</h1>
          </div>
          <div className="blog-article-meta">
            <time className="blog-article-date" dateTime={dateIso}>
              {dateLabel}
            </time>
            <span className="blog-article-meta-dot" aria-hidden="true" />
            <span className="blog-article-meta-label">{sectionLabel}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function BlogPostArticle({ locale, post, content }: BlogPostArticleProps) {
  const translation = getPostTranslation(post, locale);
  const paragraphs = splitDescriptionParagraphs(translation.description);
  const blogHref = localePath(locale, "/blog");

  return (
    <article className="blog-article">
      <div className="blog-article-atmosphere" aria-hidden="true">
        <span className="blog-article-aurora blog-article-aurora-purple" />
        <span className="blog-article-aurora blog-article-aurora-cyan" />
        <span className="blog-article-grid" />
        <span className="blog-article-noise" />
      </div>

      <ArticleHero
        title={translation.title}
        coverImage={post.coverImage}
        dateIso={post.createdAt.toISOString()}
        dateLabel={formatPostDate(post.createdAt, locale)}
        blogHref={blogHref}
        backLabel={content.backToBlog}
        kicker={content.hero.kicker}
        sectionLabel={content.hero.title}
      />

      <Container className="blog-article-content">
        <div className="blog-article-body">
          <span className="blog-article-body-accent" aria-hidden="true" />
          {paragraphs.map((paragraph, index) => (
            <p
              key={`${post.id}-p-${index}`}
              className={`blog-article-paragraph ${index === 0 ? "blog-article-paragraph--lead" : ""}`}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <aside className="blog-article-footer">
          <span className="blog-article-footer-line" aria-hidden="true" />
          <p className="blog-article-footer-label">{content.hero.kicker}</p>
          <Link href={blogHref} prefetch className="blog-article-footer-link">
            <span>{content.backToBlog}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true" className="blog-article-footer-icon">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </aside>
      </Container>
    </article>
  );
}
