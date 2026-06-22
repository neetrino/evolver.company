"use client";

import { useId, useState, type CSSProperties } from "react";
import { Container } from "@/components/shared/Container";
import {
  getAboutSectionContent,
  type AboutRichPart,
  type AboutSectionContent,
} from "@/lib/about-section";
import { useSectionReveal } from "@/lib/hooks/use-section-reveal";
import type { Locale } from "@/lib/i18n";

const ABOUT_ENTER_BASE_DELAY_S = 0.08;
const ABOUT_ENTER_STEP_DELAY_S = 0.1;
const ABOUT_VIEW_THRESHOLD = 0.14;

type AboutSectionProps = {
  locale: Locale;
};

function aboutDelayStyle(delaySeconds: number): CSSProperties {
  return { "--about-section-delay": `${delaySeconds}s` } as CSSProperties;
}

function AboutRichParagraph({ parts }: { parts: AboutRichPart[] }) {
  return (
    <p className="about-section-company-text">
      {parts.map((part, index) =>
        part.emphasis ? (
          <strong key={`${part.text}-${index}`}>{part.text}</strong>
        ) : (
          <span key={`${part.text}-${index}`}>{part.text}</span>
        ),
      )}
    </p>
  );
}

function AboutCompanyIcon() {
  return (
    <svg className="about-section-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 20V9.5L12 4l8 5.5V20H4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9.5 20v-6h5v6" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function AboutTechnologyIcon() {
  return (
    <svg className="about-section-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M12 12 4 7.5M12 12l8-4.5M12 12v9" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function AboutStatIcon() {
  return (
    <svg className="about-section-stat-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
      {Array.from({ length: 9 }, (_, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        return (
          <circle
            key={index}
            cx={5 + col * 7}
            cy={5 + row * 7}
            r="1.35"
            fill="currentColor"
          />
        );
      })}
    </svg>
  );
}

function AboutPlusIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      className={`about-section-tech-toggle-icon ${expanded ? "about-section-tech-toggle-icon--open" : ""}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function AboutHeadline({ content }: { content: AboutSectionContent }) {
  return (
    <h2 id="about-section-heading" className="about-section-headline">
      {content.headline.map((line) => (
        <span
          key={line.text}
          className={`about-section-headline-line ${line.gradient ? "about-section-headline-line--gradient" : ""}`}
        >
          {line.text}
        </span>
      ))}
    </h2>
  );
}

export function AboutSection({ locale }: AboutSectionProps) {
  const { isVisible, sectionRef } = useSectionReveal({ threshold: ABOUT_VIEW_THRESHOLD });
  const [isTechnologyOpen, setIsTechnologyOpen] = useState(false);
  const technologyPanelId = useId();
  const content = getAboutSectionContent(locale);

  return (
    <section
      ref={sectionRef}
      className={`about-section ${isVisible ? "about-section--visible" : ""}`}
      aria-labelledby="about-section-heading"
    >
      <Container className="about-section-container">
        <article className={`about-section-panel ${isVisible ? "about-section-panel--active" : ""}`}>
          <div className="about-section-layout">
            <div className="about-section-intro">
              <p
                className="about-section-eyebrow about-section-animate"
                style={aboutDelayStyle(ABOUT_ENTER_BASE_DELAY_S)}
              >
                {content.eyebrow}
                <span className="about-section-eyebrow-line" aria-hidden="true" />
              </p>

              <div
                className="about-section-animate about-section-animate-left"
                style={aboutDelayStyle(ABOUT_ENTER_BASE_DELAY_S + ABOUT_ENTER_STEP_DELAY_S)}
              >
                <AboutHeadline content={content} />
              </div>

              <p
                className="about-section-supporting about-section-animate"
                style={aboutDelayStyle(ABOUT_ENTER_BASE_DELAY_S + ABOUT_ENTER_STEP_DELAY_S * 2)}
              >
                {content.supporting}
              </p>

              <div className="about-section-stats">
                {content.stats.map((stat, index) => (
                  <article
                    key={stat.label}
                    className={`about-section-stat-card about-section-stat-card--${stat.accent} about-section-animate`}
                    style={aboutDelayStyle(
                      ABOUT_ENTER_BASE_DELAY_S + ABOUT_ENTER_STEP_DELAY_S * (3 + index),
                    )}
                  >
                    <div className="about-section-stat-icon-wrap">
                      <AboutStatIcon />
                    </div>
                    <p className="about-section-stat-value">{stat.value}</p>
                    <p className="about-section-stat-label">{stat.label}</p>
                    <span className="about-section-stat-accent" aria-hidden="true" />
                  </article>
                ))}
              </div>
            </div>

            <div className="about-section-side">
              <article
                className="about-section-company-card about-section-animate"
                style={aboutDelayStyle(ABOUT_ENTER_BASE_DELAY_S + ABOUT_ENTER_STEP_DELAY_S * 2)}
              >
                <div className="about-section-company-header">
                  <div className="about-section-icon about-section-icon--company">
                    <AboutCompanyIcon />
                  </div>
                  <span className="about-section-dot-grid" aria-hidden="true" />
                </div>
                <h3 className="about-section-company-title">{content.companyTitle}</h3>
                <div className="about-section-company-body">
                  {content.companyParagraphs.map((paragraph, index) => (
                    <AboutRichParagraph key={`company-paragraph-${index}`} parts={paragraph} />
                  ))}
                </div>
              </article>

              <div
                className="about-section-tech about-section-animate"
                style={aboutDelayStyle(ABOUT_ENTER_BASE_DELAY_S + ABOUT_ENTER_STEP_DELAY_S * 4)}
              >
                <button
                  type="button"
                  className="about-section-tech-toggle"
                  aria-expanded={isTechnologyOpen}
                  aria-controls={technologyPanelId}
                  onClick={() => setIsTechnologyOpen((open) => !open)}
                >
                  <div className="about-section-icon about-section-icon--technology">
                    <AboutTechnologyIcon />
                  </div>
                  <span className="about-section-tech-title">{content.technologyTitle}</span>
                  <AboutPlusIcon expanded={isTechnologyOpen} />
                </button>

                <div
                  id={technologyPanelId}
                  className={`about-section-tech-panel ${isTechnologyOpen ? "about-section-tech-panel--open" : ""}`}
                  hidden={!isTechnologyOpen}
                >
                  <ul className="about-section-tech-list">
                    {content.technologyItems.map((item) => (
                      <li key={item.title} className="about-section-tech-item">
                        <p className="about-section-tech-item-title">{item.title}</p>
                        <p className="about-section-tech-item-description">{item.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
      </Container>
    </section>
  );
}
