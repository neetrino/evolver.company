import { type CSSProperties } from "react";
import type { ProjectsPageContent } from "@/lib/content";
import { getContactContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
type ProjectsPortfolioCtaProps = {
  locale: Locale;
  content: Pick<
    ProjectsPageContent,
    "ctaEyebrow" | "ctaTitle" | "ctaBody" | "ctaLabel"
  >;
  delayStyle?: CSSProperties;
};

function CtaArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="projects-portfolio-cta-button-icon">
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

export function ProjectsPortfolioCta({ locale, content, delayStyle }: ProjectsPortfolioCtaProps) {
  const contactEmail = getContactContent(locale).info.email;
  const mailtoHref = `mailto:${contactEmail}?subject=${encodeURIComponent(content.ctaTitle)}`;

  return (    <aside
      className="projects-portfolio-cta projects-portfolio-animate"
      style={delayStyle}
      aria-labelledby="projects-portfolio-cta-title"
    >
      <span className="projects-portfolio-cta-glow" aria-hidden="true" />
      <span className="projects-portfolio-cta-frame" aria-hidden="true" />

      <div className="projects-portfolio-cta-content">
        <p className="projects-portfolio-cta-eyebrow">{content.ctaEyebrow}</p>
        <h2 id="projects-portfolio-cta-title" className="projects-portfolio-cta-title">
          {content.ctaTitle}
        </h2>
        <span className="projects-portfolio-cta-divider" aria-hidden="true" />
        <p className="projects-portfolio-cta-text">{content.ctaBody}</p>
      </div>

      <a
        href={mailtoHref}
        className="projects-portfolio-cta-button"
      >        <span>{content.ctaLabel}</span>
        <CtaArrowIcon />
      </a>    </aside>
  );
}
