import { type CSSProperties } from "react";
import type { ProjectsPageCtaContent } from "@/lib/content";

type CustomerCtaBannerProps = {
  content: ProjectsPageCtaContent;
  href: string;
  titleId: string;
  className?: string;
  style?: CSSProperties;
};

function CtaArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="customer-cta-button-icon">
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

export function CustomerCtaBanner({
  content,
  href,
  titleId,
  className = "",
  style,
}: CustomerCtaBannerProps) {
  return (
    <aside
      className={`customer-cta ${className}`.trim()}
      style={style}
      aria-labelledby={titleId}
    >
      <span className="customer-cta-glow" aria-hidden="true" />
      <span className="customer-cta-glow-right" aria-hidden="true" />
      <span className="customer-cta-frame" aria-hidden="true" />

      <div className="customer-cta-content">
        <p className="customer-cta-eyebrow">{content.ctaEyebrow}</p>
        <h2 id={titleId} className="customer-cta-title">
          {content.ctaTitle}
        </h2>
        <span className="customer-cta-divider" aria-hidden="true" />
        <p className="customer-cta-text">{content.ctaBody}</p>
      </div>

      <a href={href} className="customer-cta-button">
        <span>{content.ctaLabel}</span>
        <CtaArrowIcon />
      </a>
    </aside>
  );
}
