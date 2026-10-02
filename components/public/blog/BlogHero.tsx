import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { BLOG_POSTS_ANCHOR_ID } from "@/lib/blog/constants";

type BlogHeroContent = {
  kicker: string;
  title: string;
  subtitle: string;
  accent?: string;
  browse?: string;
};

type BlogHeroProps = {
  hero: BlogHeroContent;
};

export function BlogHero({ hero }: BlogHeroProps) {
  return (
    <section className="blog-hero" aria-label={hero.title}>
      <div className="blog-hero-visual" aria-hidden="true">
        <span className="blog-hero-orb blog-hero-orb-purple" />
        <span className="blog-hero-orb blog-hero-orb-cyan" />
        <span className="blog-hero-grid" />
        <span className="blog-hero-noise" />
        <span className="blog-hero-scan" />
        <span className="blog-hero-ring blog-hero-ring-outer" />
        <span className="blog-hero-ring blog-hero-ring-inner" />
      </div>

      <Container className="blog-hero-inner">
        <div className="blog-hero-content">
          <span className="blog-hero-accent-line" />
          <p className="blog-hero-kicker">{hero.kicker}</p>
          <div className="blog-hero-title-wrap">
            <span className="blog-hero-title-glow" aria-hidden="true" />
            <h1 className="blog-hero-title">{hero.title}</h1>
          </div>
          {hero.accent ? <p className="blog-hero-accent">{hero.accent}</p> : null}
          <p className="blog-hero-subtitle">{hero.subtitle}</p>
          {hero.browse ? (
            <div className="blog-hero-actions">
              <Button href={`#${BLOG_POSTS_ANCHOR_ID}`}>{hero.browse}</Button>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
