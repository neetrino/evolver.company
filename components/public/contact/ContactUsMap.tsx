"use client";

import { type RefObject } from "react";
import { Container } from "@/components/shared/Container";
import {
  contactDelayStyle,
  CONTACT_ENTER_BASE_DELAY_S,
  CONTACT_ENTER_STEP_DELAY_S,
  CONTACT_REVEAL_ROOT_MARGIN,
  CONTACT_VIEW_THRESHOLD,
} from "@/lib/contact-motion";
import {
  EVOLVER_ARMENIA_DIRECTIONS_URL,
  EVOLVER_ARMENIA_MAP_EMBED_URL,
} from "@/lib/contact-location";
import type { ContactContent } from "@/lib/content";
import { useSectionReveal } from "@/lib/hooks/use-section-reveal";

type ContactUsMapProps = {
  map: ContactContent["map"];
};

export function ContactUsMap({ map }: ContactUsMapProps) {
  const { isVisible, sectionRef } = useSectionReveal({
    threshold: CONTACT_VIEW_THRESHOLD,
    rootMargin: CONTACT_REVEAL_ROOT_MARGIN,
  });

  return (
    <section
      ref={sectionRef as RefObject<HTMLElement>}
      className={`contact-map-section contact-section ${isVisible ? "contact-section--visible" : ""}`}
      aria-labelledby="contact-map-title"
    >
      <Container>
        <header
          className="contact-map-header contact-animate"
          style={contactDelayStyle(CONTACT_ENTER_BASE_DELAY_S)}
        >
          <span className="contact-section-eyebrow">{map.subtitle}</span>
          <h2 id="contact-map-title" className="contact-map-title">
            {map.title}
          </h2>
        </header>

        <div
          className="contact-map-frame contact-animate"
          style={contactDelayStyle(CONTACT_ENTER_BASE_DELAY_S + CONTACT_ENTER_STEP_DELAY_S)}
        >
          <span className="contact-map-frame-glow" aria-hidden="true" />
          <span className="contact-map-frame-border" aria-hidden="true" />

          <div className="contact-map-embed-wrap">
            <iframe
              title={map.title}
              src={EVOLVER_ARMENIA_MAP_EMBED_URL}
              className="contact-map-embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />

            <div className="contact-map-pin" aria-hidden="true">
              <span className="contact-map-pin-pulse" />
              <span className="contact-map-pin-dot" />
              <span className="contact-map-pin-shadow" />
            </div>

            <div className="contact-map-vignette" aria-hidden="true" />
          </div>

          <div className="contact-map-actions">
            <a
              href={EVOLVER_ARMENIA_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-map-directions-btn"
            >
              <span className="contact-map-directions-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path
                    d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle cx="12" cy="11" r="2.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>
              {map.directions}
            </a>
            <a
              href={EVOLVER_ARMENIA_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-map-open-link"
            >
              {map.openInMaps}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
