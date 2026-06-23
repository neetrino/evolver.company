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
import type { AboutUsTeamContent, AboutUsTeamMember } from "@/lib/about-us-team";

type AboutUsTeamProps = {
  content: AboutUsTeamContent;
};

type AboutUsTeamPhotoProps = {
  member: AboutUsTeamMember;
  delaySeconds: number;
};

function AboutUsTeamPhoto({ member, delaySeconds }: AboutUsTeamPhotoProps) {
  return (
    <figure
      className="about-us-team-photo about-us-animate"
      style={aboutUsDelayStyle(delaySeconds)}
      tabIndex={0}
    >
      <Image
        src={member.imageSrc}
        alt={member.imageAlt}
        fill
        className="about-us-team-photo-image"
        sizes="(max-width: 768px) 30vw, 22vw"
      />

      <span className="about-us-team-photo-shade" aria-hidden="true" />

      <figcaption className="about-us-team-photo-overlay">
        <div className="about-us-team-photo-panel">
          <span className="about-us-team-photo-accent" aria-hidden="true" />
          <div className="about-us-team-photo-copy">
            <span className="about-us-team-photo-name">{member.name}</span>
            <span className="about-us-team-photo-role">{member.role}</span>
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

function getPhotoDelaySeconds(photoIndex: number): number {
  return (
    ABOUT_US_ENTER_BASE_DELAY_S +
    2 * ABOUT_US_ENTER_STEP_DELAY_S +
    photoIndex * ABOUT_US_ENTER_STEP_DELAY_S * 0.65
  );
}

function getRowPhotoOffset(
  rows: AboutUsTeamContent["rows"],
  rowIndex: number,
): number {
  return rows.slice(0, rowIndex).reduce((total, row) => total + row.members.length, 0);
}

export function AboutUsTeam({ content }: AboutUsTeamProps) {
  const { isVisible, sectionRef } = useSectionReveal({
    threshold: ABOUT_US_VIEW_THRESHOLD,
    rootMargin: ABOUT_US_REVEAL_ROOT_MARGIN,
  });

  return (
    <section
      ref={sectionRef}
      className={`about-us-team about-us-section ${isVisible ? "about-us-section--visible" : ""}`}
      aria-labelledby="about-us-team-heading"
    >
      <span className="about-us-section-glow about-us-section-glow-cyan" aria-hidden="true" />

      <Container className="about-us-team-container">
        <header className="about-us-team-header">
          <p
            className="about-us-team-eyebrow about-us-animate about-us-animate-left"
            style={aboutUsDelayStyle(ABOUT_US_ENTER_BASE_DELAY_S)}
          >
            {content.eyebrow}
          </p>
          <span className="about-us-eyebrow-line about-us-animate" aria-hidden="true" />
          <h2
            id="about-us-team-heading"
            className="about-us-team-headline about-us-animate"
            style={aboutUsDelayStyle(ABOUT_US_ENTER_BASE_DELAY_S + ABOUT_US_ENTER_STEP_DELAY_S)}
          >
            {content.headline}
          </h2>
        </header>

        <div className="about-us-team-rows">
          {content.rows.map((row, rowIndex) => (
            <article key={row.id} className="about-us-team-row">
              <div className="about-us-team-photo-grid">
                {row.members.map((member, memberIndex) => (
                  <AboutUsTeamPhoto
                    key={member.id}
                    member={member}
                    delaySeconds={getPhotoDelaySeconds(
                      getRowPhotoOffset(content.rows, rowIndex) + memberIndex,
                    )}
                  />
                ))}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
