import { type CSSProperties } from "react";
import { CustomerCtaBanner } from "@/components/public/CustomerCtaBanner";
import type { ProjectsPageContent } from "@/lib/content";
import { getContactContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

type ProjectsPortfolioCtaProps = {
  locale: Locale;
  content: Pick<ProjectsPageContent, "ctaEyebrow" | "ctaTitle" | "ctaBody" | "ctaLabel">;
  contactEmail?: string;
  delayStyle?: CSSProperties;
};

export function ProjectsPortfolioCta({
  locale,
  content,
  contactEmail,
  delayStyle,
}: ProjectsPortfolioCtaProps) {
  const email = contactEmail ?? getContactContent(locale).info.email;
  const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(content.ctaTitle)}`;

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
