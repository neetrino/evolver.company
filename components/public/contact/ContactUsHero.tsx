import { Container } from "@/components/shared/Container";
import type { ContactContent } from "@/lib/content";

type ContactUsHeroProps = {
  hero: ContactContent["hero"];
};

export function ContactUsHero({ hero }: ContactUsHeroProps) {
  return (
    <section className="contact-hero" aria-label={hero.title}>
      <div className="contact-hero-visual" aria-hidden="true">
        <span className="contact-hero-orb contact-hero-orb-purple" />
        <span className="contact-hero-orb contact-hero-orb-cyan" />
        <span className="contact-hero-grid" />
        <span className="contact-hero-noise" />
        <span className="contact-hero-scan" />
        <span className="contact-hero-ring contact-hero-ring-outer" />
        <span className="contact-hero-ring contact-hero-ring-inner" />
      </div>

      <Container className="contact-hero-inner">
        <div className="contact-hero-content">
          <span className="contact-hero-accent-line" />
          <p className="contact-hero-kicker">{hero.kicker}</p>
          <div className="contact-hero-title-wrap">
            <span className="contact-hero-title-glow" aria-hidden="true" />
            <h1 className="contact-hero-title">{hero.title}</h1>
          </div>
          <p className="contact-hero-subtitle">{hero.subtitle}</p>
        </div>
      </Container>
    </section>
  );
}
