import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { ABOUT_US_HERO_IMAGE } from "@/lib/about-us-hero";

type AboutUsHeroProps = {
  title: string;
};

export function AboutUsHero({ title }: AboutUsHeroProps) {
  return (
    <section className="about-us-hero" aria-label={title}>
      <div className="about-us-hero-visual" aria-hidden="true">
        <div className="about-us-hero-media">
          <Image
            src={ABOUT_US_HERO_IMAGE.src}
            alt=""
            fill
            priority
            className="about-us-hero-image"
            sizes="100vw"
          />
        </div>

        <div className="about-us-hero-overlay about-us-hero-overlay-top" />
        <div className="about-us-hero-overlay about-us-hero-overlay-base" />
        <div className="about-us-hero-overlay about-us-hero-overlay-vignette" />
        <div className="about-us-hero-overlay about-us-hero-overlay-bottom" />
        <div className="about-us-hero-overlay about-us-hero-overlay-accent" />

        <span className="about-us-hero-glow about-us-hero-glow-purple" />
        <span className="about-us-hero-glow about-us-hero-glow-cyan" />
        <span className="about-us-hero-scan" />
        <span className="about-us-hero-noise" />
        <span className="about-us-hero-frame" />
      </div>

      <Container className="about-us-hero-inner">
        <div className="about-us-hero-content">
          <span className="about-us-hero-accent-line" />
          <p className="about-us-hero-kicker">Evolver</p>
          <div className="about-us-hero-title-wrap">
            <span className="about-us-hero-title-glow" />
            <h1 className="about-us-hero-title">{title}</h1>
          </div>
        </div>
      </Container>
    </section>
  );
}
