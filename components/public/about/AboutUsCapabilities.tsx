"use client";

import { useState } from "react";
import { Container } from "@/components/shared/Container";
import {
  aboutUsDelayStyle,
  ABOUT_US_ENTER_BASE_DELAY_S,
  ABOUT_US_ENTER_STEP_DELAY_S,
  ABOUT_US_REVEAL_ROOT_MARGIN,
  ABOUT_US_VIEW_THRESHOLD,
} from "@/lib/about-us-motion";
import { useSectionReveal } from "@/lib/hooks/use-section-reveal";
import type { AboutUsCapability } from "@/lib/content";

type AboutUsCapabilitiesProps = {
  eyebrow: string;
  headline: string;
  items: AboutUsCapability[];
};

type AboutUsCapabilityItemProps = {
  item: AboutUsCapability;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
};

function AboutUsCapabilityItem({ item, index, isOpen, onToggle }: AboutUsCapabilityItemProps) {
  const panelId = `about-us-capability-${item.id}`;
  const itemDelay =
    ABOUT_US_ENTER_BASE_DELAY_S + 2 * ABOUT_US_ENTER_STEP_DELAY_S + index * ABOUT_US_ENTER_STEP_DELAY_S;

  function handleDescriptionClick() {
    if (isOpen) {
      onToggle();
    }
  }

  return (
    <article
      className={`about-us-capability about-us-animate ${isOpen ? "about-us-capability--open" : ""}`}
      style={aboutUsDelayStyle(itemDelay)}
    >
      <span className="about-us-capability-glow" aria-hidden="true" />
      <span className="about-us-capability-shimmer" aria-hidden="true" />

      <button
        type="button"
        className="about-us-capability-toggle"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className="about-us-capability-marker" aria-hidden="true">
          <span className="about-us-capability-marker-ring" />
          <span className="about-us-capability-marker-icon">
            <span className="about-us-capability-marker-line about-us-capability-marker-line-h" />
            <span className="about-us-capability-marker-line about-us-capability-marker-line-v" />
          </span>
        </span>

        <span className="about-us-capability-copy">
          <span className="about-us-capability-index">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="about-us-capability-title">{item.title}</span>
        </span>
      </button>

      <div
        id={panelId}
        className={`about-us-capability-panel ${isOpen ? "about-us-capability-panel--open" : ""}`}
        hidden={!isOpen}
      >
        <div className="about-us-capability-panel-inner">
          <p
            className="about-us-capability-description"
            onClick={handleDescriptionClick}
            onKeyDown={(event) => {
              if (isOpen && (event.key === "Enter" || event.key === " ")) {
                event.preventDefault();
                onToggle();
              }
            }}
            role={isOpen ? "button" : undefined}
            tabIndex={isOpen ? 0 : undefined}
          >
            {item.description}
          </p>
        </div>
      </div>
    </article>
  );
}

export function AboutUsCapabilities({ eyebrow, headline, items }: AboutUsCapabilitiesProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { isVisible, sectionRef } = useSectionReveal({
    threshold: ABOUT_US_VIEW_THRESHOLD,
    rootMargin: ABOUT_US_REVEAL_ROOT_MARGIN,
  });

  return (
    <section
      ref={sectionRef}
      className={`about-us-capabilities about-us-section ${isVisible ? "about-us-section--visible" : ""}`}
      aria-labelledby="about-us-capabilities-heading"
    >
      <Container className="about-us-capabilities-grid">
        <div className="about-us-capabilities-intro">
          <p
            className="about-us-capabilities-eyebrow about-us-animate about-us-animate-left"
            style={aboutUsDelayStyle(ABOUT_US_ENTER_BASE_DELAY_S)}
          >
            {eyebrow}
          </p>
          <span className="about-us-eyebrow-line about-us-animate" aria-hidden="true" />
          <h2
            id="about-us-capabilities-heading"
            className="about-us-capabilities-headline about-us-animate"
            style={aboutUsDelayStyle(ABOUT_US_ENTER_BASE_DELAY_S + ABOUT_US_ENTER_STEP_DELAY_S)}
          >
            {headline}
          </h2>
        </div>

        <div className="about-us-capabilities-list">
          {items.map((item, index) => (
            <AboutUsCapabilityItem
              key={item.id}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => {
                setOpenIndex((current) => (current === index ? null : index));
              }}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
