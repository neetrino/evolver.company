import { Container } from "@/components/shared/Container";
import type { PartnershipContent } from "@/lib/partnership";

type PartnershipHeroProps = {
  hero: PartnershipContent["hero"];
};

export function PartnershipHero({ hero }: PartnershipHeroProps) {
  return (
    <section className="partnership-hero" aria-label={hero.title}>
      <div className="partnership-hero-visual" aria-hidden="true">
        <span className="partnership-hero-orb partnership-hero-orb-purple" />
        <span className="partnership-hero-orb partnership-hero-orb-cyan" />
        <span className="partnership-hero-grid" />
        <span className="partnership-hero-noise" />
        <span className="partnership-hero-scan" />
        <span className="partnership-hero-ring partnership-hero-ring-outer" />
        <span className="partnership-hero-ring partnership-hero-ring-inner" />
      </div>

      <Container className="partnership-hero-inner">
        <div className="partnership-hero-content">
          <span className="partnership-hero-accent-line" />
          <p className="partnership-hero-kicker">{hero.kicker}</p>
          <div className="partnership-hero-title-wrap">
            <span className="partnership-hero-title-glow" aria-hidden="true" />
            <h1 className="partnership-hero-title">{hero.title}</h1>
          </div>
          <p className="partnership-hero-subtitle">{hero.subtitle}</p>
        </div>
      </Container>
    </section>
  );
}
