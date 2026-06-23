"use client";

import Image from "next/image";
import { Container } from "@/components/shared/Container";
import {
  aboutUsDelayStyle,
  ABOUT_US_ENTER_BASE_DELAY_S,
  ABOUT_US_ENTER_STEP_DELAY_S,
  ABOUT_US_REVEAL_ROOT_MARGIN,
  ABOUT_US_VIEW_THRESHOLD,
} from "@/lib/about-us-motion";
import { useSectionReveal } from "@/lib/hooks/use-section-reveal";
import type { AboutUsProjectsContent } from "@/lib/about-us-projects";

type AboutUsProjectsProps = {
  content: AboutUsProjectsContent;
};

export function AboutUsProjects({ content }: AboutUsProjectsProps) {
  const { isVisible, sectionRef } = useSectionReveal({
    threshold: ABOUT_US_VIEW_THRESHOLD,
    rootMargin: ABOUT_US_REVEAL_ROOT_MARGIN,
  });

  return (
    <section
      ref={sectionRef}
      className={`about-us-projects about-us-section ${isVisible ? "about-us-section--visible" : ""}`}
      aria-labelledby="about-us-projects-heading"
    >
      <span className="about-us-section-glow about-us-section-glow-purple" aria-hidden="true" />

      <Container className="about-us-projects-grid">
        <div className="about-us-projects-intro">
          <p
            className="about-us-projects-eyebrow about-us-animate about-us-animate-left"
            style={aboutUsDelayStyle(ABOUT_US_ENTER_BASE_DELAY_S)}
          >
            {content.eyebrow}
          </p>
          <span className="about-us-eyebrow-line about-us-animate" aria-hidden="true" />
          <h2
            id="about-us-projects-heading"
            className="about-us-projects-headline about-us-animate"
            style={aboutUsDelayStyle(ABOUT_US_ENTER_BASE_DELAY_S + ABOUT_US_ENTER_STEP_DELAY_S)}
          >
            {content.headline}
          </h2>
        </div>

        <ul className="about-us-projects-logos">
          {content.items.map((project, index) => (
            <li
              key={project.id}
              className="about-us-projects-logo-item about-us-animate"
              style={aboutUsDelayStyle(
                ABOUT_US_ENTER_BASE_DELAY_S + 2 * ABOUT_US_ENTER_STEP_DELAY_S + index * ABOUT_US_ENTER_STEP_DELAY_S,
              )}
            >
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="about-us-project-link"
                data-accent={project.accent}
                aria-label={project.title}
              >
                <span className="about-us-project-logo-wrap">
                  <span className="about-us-project-glow" aria-hidden="true" />
                  <Image
                    src={project.logoSrc}
                    alt=""
                    width={project.logoWidth}
                    height={project.logoHeight}
                    className="about-us-project-logo"
                    sizes="(max-width: 768px) 96px, 140px"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
