"use client";

import Link from "next/link";
import { type CSSProperties } from "react";
import { ServiceCard } from "@/components/public/ServiceCard";
import { useSectionReveal } from "@/lib/hooks/use-section-reveal";
import type { ServicesShowcaseContent } from "@/lib/services-showcase";
import type { Locale } from "@/lib/i18n";

const SERVICES_TITLE_DELAY_S = 0.08;
const SERVICES_VIEW_THRESHOLD = 0.08;
const SERVICES_PARTICLE_KEYS = ["one", "two", "three", "four", "five", "six", "seven", "eight"] as const;

type ServicesSectionProps = {
  locale: Locale;
  content: ServicesShowcaseContent;
};

function servicesDelayStyle(delaySeconds: number): CSSProperties {
  return { "--services-delay": `${delaySeconds}s` } as CSSProperties;
}

export function ServicesSection({ locale, content }: ServicesSectionProps) {
  const { isVisible, sectionRef } = useSectionReveal({
    threshold: SERVICES_VIEW_THRESHOLD,
    rootMargin: "0px 0px -4% 0px",
  });
  return (
    <section
      ref={sectionRef}
      className={`services-page ${isVisible ? "services-page--visible" : ""}`}
      aria-labelledby="services-page-heading"
    >
      <div className="services-page-backdrop" aria-hidden="true">
        <span className="services-page-aurora services-page-aurora-one" />
        <span className="services-page-aurora services-page-aurora-two" />
        <span className="services-page-aurora services-page-aurora-three" />
        <span className="services-page-glow services-page-glow-purple" />
        <span className="services-page-glow services-page-glow-magenta" />
        <span className="services-page-glow services-page-glow-cyan" />
        <span className="services-page-grid" />
        <span className="services-page-horizon" />
        <span className="services-page-vignette" />
        <span className="services-page-noise" />
        <span className="services-page-scanline" />
        <span className="services-page-particles">
          {SERVICES_PARTICLE_KEYS.map((key) => (
            <span key={key} className={`services-page-particle services-page-particle-${key}`} />
          ))}
        </span>
      </div>

      <div className="services-page-shell">
        <header className="services-page-header">
          <div className="services-page-header-content">
            <span className="services-page-header-aurora" aria-hidden="true" />
            <span className="services-page-header-frame" aria-hidden="true">
              <span className="services-page-header-frame-line services-page-header-frame-line-v" />
              <span className="services-page-header-frame-line services-page-header-frame-line-h-top" />
              <span className="services-page-header-frame-line services-page-header-frame-line-h-bottom" />
              <span className="services-page-header-frame-beam" />
              <span className="services-page-header-frame-node services-page-header-frame-node-top">
                <span className="services-page-header-frame-node-core" />
                <span className="services-page-header-frame-node-ring" />
              </span>
              <span className="services-page-header-frame-node services-page-header-frame-node-bottom">
                <span className="services-page-header-frame-node-core" />
                <span className="services-page-header-frame-node-ring" />
              </span>
            </span>

            <h1
              id="services-page-heading"
              className="services-page-title services-page-animate"
              style={servicesDelayStyle(SERVICES_TITLE_DELAY_S)}
            >
              <span className="services-page-title-text">{content.title}</span>
              <span className="services-page-title-glow services-page-title-glow-purple" aria-hidden="true" />
              <span className="services-page-title-glow services-page-title-glow-cyan" aria-hidden="true" />
              <span className="services-page-title-shimmer" aria-hidden="true" />
              <span className="services-page-title-underline" aria-hidden="true">
                <span className="services-page-title-underline-beam" />
              </span>
            </h1>
          </div>
        </header>

        <div className="services-page-grid-wrap">
          <span className="services-page-grid-bridge" aria-hidden="true">
            <span className="services-page-grid-bridge-glow" />
            <span className="services-page-grid-bridge-beam" />
          </span>
          <span className="services-page-category-rail" aria-hidden="true" />
          <div className="services-page-grid-cards" role="list">
            {content.items.map((service, index) => (
              <div key={service.id} className="services-page-grid-cell" role="listitem">
                <ServiceCard service={service} index={index} exploreCta={content.exploreCta} />
              </div>
            ))}
          </div>
        </div>

        <Link
          href={`/${locale}/projects`}
          className="services-page-search services-page-animate"
          style={servicesDelayStyle(0.16)}
          aria-label={locale === "en" ? "Browse projects" : "Դիտել նախագծերը"}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="services-page-search-icon">
            <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.75" />
            <path
              d="M16 16L20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
