import Image from "next/image";
import { Container } from "@/components/shared/Container";
import type { CustomersContent } from "@/lib/customers";
import { getAllCustomers } from "@/lib/customers";

type CustomersHeroProps = {
  hero: CustomersContent["hero"];
};

const HERO_CONSTELLATION_COUNT = 8;

export function CustomersHero({ hero }: CustomersHeroProps) {
  const constellation = getAllCustomers().slice(0, HERO_CONSTELLATION_COUNT);

  return (
    <section className="customers-hero" aria-label={hero.title}>
      <div className="customers-hero-visual" aria-hidden="true">
        <span className="customers-hero-orb customers-hero-orb-purple" />
        <span className="customers-hero-orb customers-hero-orb-cyan" />
        <span className="customers-hero-grid" />
        <span className="customers-hero-noise" />
        <span className="customers-hero-scan" />
        <span className="customers-hero-ring customers-hero-ring-outer" />
        <span className="customers-hero-ring customers-hero-ring-inner" />

        <ul className="customers-hero-constellation">
          {constellation.map((client, index) => (
            <li
              key={client.id}
              className="customers-hero-constellation-item"
              data-index={index}
            >
              <Image
                src={client.logoSrc}
                alt=""
                width={client.logoWidth}
                height={client.logoHeight}
                className="customers-hero-constellation-logo"
                sizes="96px"
              />
            </li>
          ))}
        </ul>
      </div>

      <Container className="customers-hero-inner">
        <div className="customers-hero-content">
          <span className="customers-hero-accent-line" />
          <p className="customers-hero-kicker">{hero.kicker}</p>
          <div className="customers-hero-title-wrap">
            <span className="customers-hero-title-glow" aria-hidden="true" />
            <h1 className="customers-hero-title">{hero.title}</h1>
          </div>
          <p className="customers-hero-subtitle">{hero.subtitle}</p>
        </div>
      </Container>
    </section>
  );
}
