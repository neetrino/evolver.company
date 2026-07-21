"use client";

import Image from "next/image";
import { type RefObject } from "react";
import { Container } from "@/components/shared/Container";
import type { ClientLogo } from "@/lib/clients-section";
import type { CustomersContent } from "@/lib/customers";
import { getCustomerIndustry } from "@/lib/customers";
import {
  CUSTOMERS_ENTER_BASE_DELAY_S,
  CUSTOMERS_ENTER_STEP_DELAY_S,
  CUSTOMERS_GRID_STAGGER_CAP,
  CUSTOMERS_REVEAL_ROOT_MARGIN,
  CUSTOMERS_VIEW_THRESHOLD,
  customersDelayStyle,
} from "@/lib/customers-motion";
import { useSectionReveal } from "@/lib/hooks/use-section-reveal";
import type { Locale } from "@/lib/i18n";

type CustomersGalleryProps = {
  locale: Locale;
  content: CustomersContent["gallery"];
  clients: ClientLogo[];
};

type GalleryTileProps = {
  locale: Locale;
  client: ClientLogo;
  index: number;
};

function GalleryTile({ locale, client, index }: GalleryTileProps) {
  const delayIndex = Math.min(index, CUSTOMERS_GRID_STAGGER_CAP - 1);
  const delay =
    CUSTOMERS_ENTER_BASE_DELAY_S + (delayIndex + 1) * CUSTOMERS_ENTER_STEP_DELAY_S;
  const industry = getCustomerIndustry(client.id, locale);

  return (
    <li
      className="customers-gallery-item customers-animate"
      data-accent={client.accent}
      style={customersDelayStyle(delay)}
    >
      <article className="customers-gallery-tile">
        <span className="customers-gallery-glow" aria-hidden="true" />
        <span className="customers-gallery-frame" aria-hidden="true" />

        <div className="customers-gallery-logo-wrap">
          <Image
            src={client.logoSrc}
            alt=""
            width={client.logoWidth}
            height={client.logoHeight}
            className="customers-gallery-logo"
            sizes="(max-width: 640px) 100px, 128px"
          />
        </div>

        <div className="customers-gallery-caption">
          <p className="customers-gallery-name">{client.name}</p>
          <p className="customers-gallery-industry">{industry}</p>
        </div>
      </article>
    </li>
  );
}

export function CustomersGallery({ locale, content, clients }: CustomersGalleryProps) {
  const { isVisible, sectionRef } = useSectionReveal({
    threshold: CUSTOMERS_VIEW_THRESHOLD,
    rootMargin: CUSTOMERS_REVEAL_ROOT_MARGIN,
  });

  return (
    <section
      ref={sectionRef as RefObject<HTMLElement>}
      className={`customers-gallery customers-section ${isVisible ? "customers-section--visible" : ""}`}
      aria-labelledby="customers-gallery-heading"
    >
      <Container>
        <header
          className="customers-section-header customers-animate"
          style={customersDelayStyle(CUSTOMERS_ENTER_BASE_DELAY_S)}
        >
          <span className="customers-section-accent-line" aria-hidden="true" />
          <p className="customers-section-eyebrow">{content.eyebrow}</p>
          <h2 id="customers-gallery-heading" className="customers-section-headline">
            {content.headline}
          </h2>
        </header>

        <ul className="customers-gallery-grid">
          {clients.map((client, index) => (
            <GalleryTile key={client.id} locale={locale} client={client} index={index} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
