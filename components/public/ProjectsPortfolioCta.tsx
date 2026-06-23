import { type CSSProperties } from "react";
import { CustomerCtaBanner } from "@/components/public/CustomerCtaBanner";
import type { ProjectsPageContent } from "@/lib/content";
import { getContactContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

type ProjectsPortfolioCtaProps = {
  locale: Locale;
  content: Pick<ProjectsPageContent, "ctaEyebrow" | "ctaTitle" | "ctaBody" | "ctaLabel">;
  delayStyle?: CSSProperties;
};

export function ProjectsPortfolioCta({ locale, content, delayStyle }: ProjectsPortfolioCtaProps) {
  const contactEmail = getContactContent(locale).info.email;
  const mailtoHref = `mailto:${contactEmail}?subject=${encodeURIComponent(content.ctaTitle)}`;

  return (
    <CustomerCtaBanner
      content={content}
      href={mailtoHref}
      titleId="projects-portfolio-cta-title"
      className="projects-portfolio-animate"
      style={delayStyle}
    />
  );
}
