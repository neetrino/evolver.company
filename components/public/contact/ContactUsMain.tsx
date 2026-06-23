"use client";

import { type RefObject } from "react";
import { ContactForm } from "@/components/public/ContactForm";
import { CONTACT_FORM_ANCHOR_ID } from "@/components/public/contact/ContactUsCta";
import { ContactInfoPanel } from "@/components/public/contact/ContactInfoPanel";
import { Container } from "@/components/shared/Container";
import {
  contactDelayStyle,
  CONTACT_ENTER_BASE_DELAY_S,
  CONTACT_REVEAL_ROOT_MARGIN,
  CONTACT_VIEW_THRESHOLD,
} from "@/lib/contact-motion";
import type { ContactContent } from "@/lib/content";
import { useSectionReveal } from "@/lib/hooks/use-section-reveal";

type ContactUsMainProps = {
  content: ContactContent;
};

export function ContactUsMain({ content }: ContactUsMainProps) {
  const { isVisible, sectionRef } = useSectionReveal({
    threshold: CONTACT_VIEW_THRESHOLD,
    rootMargin: CONTACT_REVEAL_ROOT_MARGIN,
  });

  return (
    <section
      id={CONTACT_FORM_ANCHOR_ID}
      ref={sectionRef as RefObject<HTMLElement>}
      className={`contact-main-section contact-section ${isVisible ? "contact-section--visible" : ""}`}
      aria-labelledby="contact-form-title"
    >
      <Container>
        <div className="contact-main-grid">
          <div
            className="contact-form-card contact-animate"
            style={contactDelayStyle(CONTACT_ENTER_BASE_DELAY_S)}
          >
            <span className="contact-form-card-glow" aria-hidden="true" />
            <header className="contact-form-header">
              <h2 id="contact-form-title" className="contact-form-title">
                {content.form.title}
              </h2>
              <p className="contact-form-subtitle">{content.form.subtitle}</p>
            </header>
            <ContactForm labels={content.form} />
          </div>

          <ContactInfoPanel info={content.info} />
        </div>
      </Container>
    </section>
  );
}
