"use client";

import Image from "next/image";
import Link from "next/link";
import { type RefObject } from "react";
import { Container } from "@/components/shared/Container";
import type { CareerPageContent } from "@/lib/career-content";
import type { CareerJobWithDetails } from "@/lib/career-types";
import { getCareerTranslation } from "@/lib/career-types";
import {
  BLOG_ENTER_BASE_DELAY_S,
  BLOG_ENTER_STEP_DELAY_S,
  BLOG_GRID_STAGGER_CAP,
  BLOG_REVEAL_ROOT_MARGIN,
  BLOG_VIEW_THRESHOLD,
  blogDelayStyle,
} from "@/lib/blog-motion";
import { useSectionReveal } from "@/lib/hooks/use-section-reveal";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";

type CareerJobGridProps = {
  locale: Locale;
  jobs: CareerJobWithDetails[];
  content: CareerPageContent;
};

type CareerCardProps = {
  locale: Locale;
  job: CareerJobWithDetails;
  content: CareerPageContent;
  index: number;
};

function CtaArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="blog-card-cta-icon">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CareerCard({ locale, job, content, index }: CareerCardProps) {
  const translation = getCareerTranslation(job, locale);
  const href = localePath(locale, `/career/${job.slug}`);
  const delayIndex = Math.min(index, BLOG_GRID_STAGGER_CAP - 1);
  const delay = BLOG_ENTER_BASE_DELAY_S + (delayIndex + 1) * BLOG_ENTER_STEP_DELAY_S;
  const accent = index % 2 === 0 ? "purple" : "cyan";

  return (
    <li
      className="blog-card-item blog-animate"
      data-accent={accent}
      style={blogDelayStyle(delay)}
    >
      <Link href={href} prefetch className="blog-card">
        <span className="blog-card-glow" aria-hidden="true" />
        <span className="blog-card-shimmer" aria-hidden="true" />
        <span className="blog-card-edge blog-card-edge-top" aria-hidden="true" />
        <span className="blog-card-edge blog-card-edge-bottom" aria-hidden="true" />

        <div className="blog-card-media">
          {job.coverImage ? (
            <Image
              src={job.coverImage}
              alt=""
              fill
              className="blog-card-image"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <span className="blog-card-placeholder" aria-hidden="true">
              {translation.title.charAt(0).toUpperCase() || "C"}
            </span>
          )}
          <span className="blog-card-media-glow" aria-hidden="true" />
          <span className="blog-card-media-frame" aria-hidden="true" />
        </div>

        <div className="blog-card-body">
          <h2 className="blog-card-title">{translation.title}</h2>
          <p className="blog-card-description">{translation.description}</p>
          <dl className="career-card-meta">
            <div>
              <dt>{content.salaryLabel}</dt>
              <dd>{job.salary}</dd>
            </div>
            <div>
              <dt>{content.hoursLabel}</dt>
              <dd>{job.workHours}</dd>
            </div>
          </dl>
          <span className="blog-card-cta">
            <span>{content.viewRole}</span>
            <CtaArrowIcon />
          </span>
        </div>
      </Link>
    </li>
  );
}

export function CareerJobGrid({ locale, jobs, content }: CareerJobGridProps) {
  const { isVisible, sectionRef } = useSectionReveal({
    threshold: BLOG_VIEW_THRESHOLD,
    rootMargin: BLOG_REVEAL_ROOT_MARGIN,
  });

  if (jobs.length === 0) {
    return (
      <section className="blog-grid-section" aria-label={content.hero.title}>
        <Container>
          <p className="blog-empty">{content.emptyMessage}</p>
        </Container>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef as RefObject<HTMLElement>}
      className={`blog-grid-section ${isVisible ? "blog-grid-section--visible" : ""}`}
      aria-label={content.hero.title}
    >
      <Container>
        <ul className="blog-grid">
          {jobs.map((job, index) => (
            <CareerCard
              key={job.id}
              locale={locale}
              job={job}
              content={content}
              index={index}
            />
          ))}
        </ul>
      </Container>
    </section>
  );
}
