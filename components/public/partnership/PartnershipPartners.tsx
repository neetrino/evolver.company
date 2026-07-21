"use client";

import Image from "next/image";
import { type RefObject } from "react";
import { Container } from "@/components/shared/Container";
import { getClientLogos, type ClientLogo } from "@/lib/clients-section";
import type { PartnershipContent } from "@/lib/partnership";
import {
  partnershipDelayStyle,
  PARTNERSHIP_ENTER_BASE_DELAY_S,
  PARTNERSHIP_ENTER_STEP_DELAY_S,
  PARTNERSHIP_REVEAL_ROOT_MARGIN,
  PARTNERSHIP_VIEW_THRESHOLD,
} from "@/lib/partnership-motion";
import { useSectionReveal } from "@/lib/hooks/use-section-reveal";

const PARTNERSHIP_GRID_STAGGER_CAP = 12;

type PartnershipPartnersProps = {
  content: PartnershipContent["partners"];
};

type PartnerCellProps = {
  client: ClientLogo;
  index: number;
};

function PartnerCell({ client, index }: PartnerCellProps) {
  const delayIndex = Math.min(index, PARTNERSHIP_GRID_STAGGER_CAP - 1);
  const delay =
    PARTNERSHIP_ENTER_BASE_DELAY_S + (delayIndex + 1) * PARTNERSHIP_ENTER_STEP_DELAY_S;

  return (
    <li
      className="partnership-partner partnership-animate"
      data-accent={client.accent}
      style={partnershipDelayStyle(delay)}
    >
      <article className="partnership-partner-tile">
        <span className="partnership-partner-glow" aria-hidden="true" />
        <span className="partnership-partner-shimmer" aria-hidden="true" />
        <span className="partnership-partner-scan" aria-hidden="true" />
        <span className="partnership-partner-edge partnership-partner-edge-top" aria-hidden="true" />
        <span className="partnership-partner-edge partnership-partner-edge-bottom" aria-hidden="true" />
        <span className="partnership-partner-frame" aria-hidden="true" />

        <div className="partnership-partner-logo-wrap">
          <Image
            src={client.logoSrc}
            alt=""
            width={client.logoWidth}
            height={client.logoHeight}
            className="partnership-partner-logo"
            sizes="(max-width: 640px) 112px, (max-width: 1024px) 128px, 148px"
          />
        </div>

        <div className="partnership-partner-meta">
          <span className="partnership-partner-name-line" aria-hidden="true" />
          <p className="partnership-partner-name">{client.name}</p>
        </div>
      </article>
    </li>
  );
}

export function PartnershipPartners({ content }: PartnershipPartnersProps) {
  const partners = getClientLogos();
  const { isVisible, sectionRef } = useSectionReveal({
    threshold: PARTNERSHIP_VIEW_THRESHOLD,
    rootMargin: PARTNERSHIP_REVEAL_ROOT_MARGIN,
  });

  return (
    <section
      ref={sectionRef as RefObject<HTMLElement>}
      className={`partnership-partners partnership-section ${isVisible ? "partnership-section--visible" : ""}`}
      aria-labelledby="partnership-partners-heading"
    >
      <Container>
        <header
          className="partnership-section-header partnership-animate"
          style={partnershipDelayStyle(PARTNERSHIP_ENTER_BASE_DELAY_S)}
        >
          <span className="partnership-section-accent-line" aria-hidden="true" />
          <p className="partnership-section-eyebrow">{content.eyebrow}</p>
          <h2 id="partnership-partners-heading" className="partnership-section-headline">
            {content.headline}
          </h2>
        </header>

        <ul className="partnership-partners-grid">
          {partners.map((client, index) => (
            <PartnerCell key={client.id} client={client} index={index} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
