"use client";

import { type RefObject } from "react";
import { CustomerCtaBanner } from "@/components/public/CustomerCtaBanner";
import { Container } from "@/components/shared/Container";
import {
  contactDelayStyle,
  CONTACT_ENTER_BASE_DELAY_S,
  CONTACT_REVEAL_ROOT_MARGIN,
  CONTACT_VIEW_THRESHOLD,
} from "@/lib/contact-motion";
import type { ProjectsPageCtaContent } from "@/lib/content";
import { useSectionReveal } from "@/lib/hooks/use-section-reveal";

const CONTACT_FORM_ANCHOR_ID = "contact-form";

type ContactUsCtaProps = {
  cta: ProjectsPageCtaContent;
};

export function ContactUsCta({ cta }: ContactUsCtaProps) {
  const { isVisible, sectionRef } = useSectionReveal({
    threshold: CONTACT_VIEW_THRESHOLD,
    rootMargin: CONTACT_REVEAL_ROOT_MARGIN,
  });

  return (
    <section
      ref={sectionRef as RefObject<HTMLElement>}
      className={`contact-cta-section contact-section ${isVisible ? "contact-section--visible" : ""}`}
      aria-label={cta.ctaTitle}
    >
      <Container>
        <CustomerCtaBanner
          content={cta}
          href={`#${CONTACT_FORM_ANCHOR_ID}`}
          titleId="contact-customer-cta-title"
          className="contact-animate"
          style={contactDelayStyle(CONTACT_ENTER_BASE_DELAY_S)}
        />
      </Container>
    </section>
  );
}

export { CONTACT_FORM_ANCHOR_ID };
