"use client";

import { type RefObject } from "react";
import { BlogCard } from "@/components/public/blog/BlogCard";
import { Container } from "@/components/shared/Container";
import type { BlogPageContent } from "@/lib/blog-content";
import { BLOG_POSTS_ANCHOR_ID } from "@/lib/blog/constants";
import { formatBlogDate } from "@/lib/blog/dates";
import { blogCardImage } from "@/lib/blog/images";
import type { BlogListItem } from "@/lib/blog/types";
import { BLOG_REVEAL_ROOT_MARGIN, BLOG_VIEW_THRESHOLD } from "@/lib/blog-motion";
import { useSectionReveal } from "@/lib/hooks/use-section-reveal";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";

type BlogPostGridProps = {
  locale: Locale;
  posts: BlogListItem[];
  content: BlogPageContent;
  emptyMessage: string;
};

export function BlogPostGrid({ locale, posts, content, emptyMessage }: BlogPostGridProps) {
  const { isVisible, sectionRef } = useSectionReveal({
    threshold: BLOG_VIEW_THRESHOLD,
    rootMargin: BLOG_REVEAL_ROOT_MARGIN,
  });

  if (posts.length === 0) {
    return (
      <section id={BLOG_POSTS_ANCHOR_ID} className="blog-grid-section" aria-label={content.hero.title}>
        <Container>
          <p className="blog-empty">{emptyMessage}</p>
        </Container>
      </section>
    );
  }

  return (
    <section
      id={BLOG_POSTS_ANCHOR_ID}
      ref={sectionRef as RefObject<HTMLElement>}
      className={`blog-grid-section ${isVisible ? "blog-grid-section--visible" : ""}`}
      aria-label={content.hero.title}
    >
      <Container>
        <ul className="blog-grid">
          {posts.map((post, index) => (
            <BlogCard
              key={post.id}
              href={localePath(locale, `/blog/${post.slug}`)}
              image={blogCardImage(post.image)}
              imageAlt={post.title}
              dateIso={post.publishedAt}
              dateLabel={formatBlogDate(post.publishedAt, locale)}
              title={post.title}
              excerpt={post.shortDescription}
              readMore={content.readMore}
              index={index}
            />
          ))}
        </ul>
      </Container>
    </section>
  );
}
