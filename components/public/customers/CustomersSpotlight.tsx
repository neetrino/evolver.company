"use client";

import Image from "next/image";
import { type RefObject } from "react";
import { Container } from "@/components/shared/Container";
import type { CustomersContent, CustomerSpotlightItem } from "@/lib/customers";
import {
  CUSTOMERS_ENTER_BASE_DELAY_S,
  CUSTOMERS_ENTER_STEP_DELAY_S,
  CUSTOMERS_GRID_STAGGER_CAP,
  CUSTOMERS_REVEAL_ROOT_MARGIN,
  CUSTOMERS_VIEW_THRESHOLD,
  customersDelayStyle,
} from "@/lib/customers-motion";
import { useSectionReveal } from "@/lib/hooks/use-section-reveal";

type CustomersSpotlightProps = {
  content: CustomersContent["spotlight"];
  items: CustomerSpotlightItem[];
};

type SpotlightCardProps = {
  item: CustomerSpotlightItem;
  index: number;
};

function SpotlightCard({ item, index }: SpotlightCardProps) {
  const delayIndex = Math.min(index, CUSTOMERS_GRID_STAGGER_CAP - 1);
  const delay =
    CUSTOMERS_ENTER_BASE_DELAY_S + (delayIndex + 1) * CUSTOMERS_ENTER_STEP_DELAY_S;
  const isFeatured = index === 0 || index === 1;

  return (
    <li
      className={`customers-spotlight-item customers-animate ${isFeatured ? "customers-spotlight-item--featured" : ""}`}
      data-accent={item.client.accent}
      style={customersDelayStyle(delay)}
    >
      <article className="customers-spotlight-card">
        <span className="customers-spotlight-glow" aria-hidden="true" />
        <span className="customers-spotlight-shimmer" aria-hidden="true" />
        <span className="customers-spotlight-edge" aria-hidden="true" />

        <p className="customers-spotlight-industry">{item.industry}</p>

        <div className="customers-spotlight-logo-wrap">
          <Image
            src={item.client.logoSrc}
            alt=""
            width={item.client.logoWidth}
            height={item.client.logoHeight}
            className="customers-spotlight-logo"
            sizes="(max-width: 768px) 160px, 200px"
          />
        </div>

        <div className="customers-spotlight-meta">
          <span className="customers-spotlight-name-line" aria-hidden="true" />
          <h3 className="customers-spotlight-name">{item.client.name}</h3>
        </div>
      </article>
    </li>
  );
}

export function CustomersSpotlight({ content, items }: CustomersSpotlightProps) {
  const { isVisible, sectionRef } = useSectionReveal({
    threshold: CUSTOMERS_VIEW_THRESHOLD,
    rootMargin: CUSTOMERS_REVEAL_ROOT_MARGIN,
  });

  return (
    <section
      ref={sectionRef as RefObject<HTMLElement>}
      className={`customers-spotlight customers-section ${isVisible ? "customers-section--visible" : ""}`}
      aria-labelledby="customers-spotlight-heading"
    >
      <Container>
        <header
          className="customers-section-header customers-animate"
          style={customersDelayStyle(CUSTOMERS_ENTER_BASE_DELAY_S)}
        >
          <span className="customers-section-accent-line" aria-hidden="true" />
          <p className="customers-section-eyebrow">{content.eyebrow}</p>
          <h2 id="customers-spotlight-heading" className="customers-section-headline">
            {content.headline}
          </h2>
          <p className="customers-section-subtitle">{content.subtitle}</p>
        </header>

        <ul className="customers-spotlight-grid">
          {items.map((item, index) => (
            <SpotlightCard key={item.client.id} item={item} index={index} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
