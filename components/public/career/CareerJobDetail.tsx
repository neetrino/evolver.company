import Image from "next/image";
import Link from "next/link";
import { CareerApplyForm } from "@/components/public/career/CareerApplyForm";
import { Container } from "@/components/shared/Container";
import type { CareerPageContent } from "@/lib/career-content";
import type { CareerJobWithDetails } from "@/lib/career-types";
import { getCareerTranslation } from "@/lib/career-types";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";

type CareerJobDetailProps = {
  locale: Locale;
  job: CareerJobWithDetails;
  content: CareerPageContent;
};

function BackArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="blog-article-back-icon">
      <path
        d="M19 12H5M11 6l-6 6 6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function splitDescriptionParagraphs(description: string): string[] {
  return description
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0);
}

export function CareerJobDetail({ locale, job, content }: CareerJobDetailProps) {
  const translation = getCareerTranslation(job, locale);
  const paragraphs = splitDescriptionParagraphs(translation.description);
  const careersHref = localePath(locale, "/career");

  return (
    <article className="blog-article">
      <div className="blog-article-atmosphere" aria-hidden="true">
        <span className="blog-article-aurora blog-article-aurora-purple" />
        <span className="blog-article-aurora blog-article-aurora-cyan" />
        <span className="blog-article-grid" />
        <span className="blog-article-noise" />
      </div>

      <section className="blog-article-hero" aria-label={translation.title}>
        <div className="blog-article-hero-visual" aria-hidden="true">
          {job.coverImage ? (
            <Image
              src={job.coverImage}
              alt=""
              fill
              priority
              className="blog-article-hero-image"
              sizes="100vw"
            />
          ) : (
            <span className="blog-article-hero-fallback" />
          )}
          <div className="blog-article-hero-overlay blog-article-hero-overlay-top" />
          <div className="blog-article-hero-overlay blog-article-hero-overlay-base" />
          <div className="blog-article-hero-overlay blog-article-hero-overlay-bottom" />
          <span className="blog-article-hero-glow blog-article-hero-glow-purple" />
          <span className="blog-article-hero-glow blog-article-hero-glow-cyan" />
          <span className="blog-article-hero-scan" />
          <span className="blog-article-hero-frame" />
        </div>

        <Container className="blog-article-hero-inner">
          <Link href={careersHref} prefetch className="blog-article-back">
            <BackArrowIcon />
            <span>{content.backToCareers}</span>
          </Link>

          <div className="blog-article-hero-copy">
            <span className="blog-article-accent-line" aria-hidden="true" />
            <p className="blog-article-kicker">{content.hero.kicker}</p>
            <div className="blog-article-title-wrap">
              <span className="blog-article-title-glow" aria-hidden="true" />
              <h1 className="blog-article-title">{translation.title}</h1>
            </div>
            <dl className="career-detail-meta">
              <div>
                <dt>{content.salaryLabel}</dt>
                <dd>{job.salary}</dd>
              </div>
              <div>
                <dt>{content.hoursLabel}</dt>
                <dd>{job.workHours}</dd>
              </div>
            </dl>
          </div>
        </Container>
      </section>

      <Container className="blog-article-content">
        <div className="blog-article-body">
          <span className="blog-article-body-accent" aria-hidden="true" />
          {paragraphs.map((paragraph, index) => (
            <p
              key={`${job.id}-p-${index}`}
              className={`blog-article-paragraph ${index === 0 ? "blog-article-paragraph--lead" : ""}`}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <section className="career-apply contact-form-card" aria-labelledby="career-apply-title">
          <span className="contact-form-card-glow" aria-hidden="true" />
          <div className="contact-form-header">
            <h2 id="career-apply-title" className="contact-form-title">
              {content.apply.title}
            </h2>
            <p className="contact-form-subtitle">{content.apply.subtitle}</p>
          </div>
          <CareerApplyForm jobId={job.id} labels={content.apply} />
        </section>

        <aside className="blog-article-footer">
          <span className="blog-article-footer-line" aria-hidden="true" />
          <p className="blog-article-footer-label">{content.hero.kicker}</p>
          <Link href={careersHref} prefetch className="blog-article-footer-link">
            <span>{content.backToCareers}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true" className="blog-article-footer-icon">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </aside>
      </Container>
    </article>
  );
}
