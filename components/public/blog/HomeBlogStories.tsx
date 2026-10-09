import "@/app/blog-page.css";
import { BlogCard } from "@/components/public/blog/BlogCard";
import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/public/SectionHeader";
import type { BlogPageContent } from "@/lib/blog-content";
import { resolvePageCopy } from "@/lib/page-copy/resolve";
import { formatBlogDate } from "@/lib/blog/dates";
import { HOME_EXCERPT_LIMIT } from "@/lib/blog/constants";
import { truncateExcerpt } from "@/lib/blog/html";
import { blogHomeImage } from "@/lib/blog/images";
import type { BlogListItem } from "@/lib/blog/types";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";

type HomeBlogStoriesProps = {
  locale: Locale;
  posts: BlogListItem[];
};

export async function HomeBlogStories({ locale, posts }: HomeBlogStoriesProps) {
  if (posts.length === 0) {
    return null;
  }

  const content = await resolvePageCopy<BlogPageContent>("blog", locale);

  return (
    <section className="blog-home-stories" aria-label={content.homeTitle}>
      <Container>
        <SectionHeader title={content.homeTitle} subtitle={content.homeSubtitle} />
        <div className="blog-grid-section blog-grid-section--visible">
        <ul className="blog-grid">
          {posts.map((post, index) => (
            <BlogCard
              key={post.id}
              href={localePath(locale, `/blog/${post.slug}`)}
              image={blogHomeImage(post.image, post.headerImage)}
              imageAlt={post.title}
              dateIso={post.publishedAt}
              dateLabel={formatBlogDate(post.publishedAt, locale)}
              title={post.title}
              excerpt={post.shortDescription ? truncateExcerpt(post.shortDescription, HOME_EXCERPT_LIMIT) : undefined}
              readMore={content.readMore}
              eyebrow={post.category?.title || content.hero.kicker}
              index={index}
            />
          ))}
        </ul>
        </div>
      </Container>
    </section>
  );
}
