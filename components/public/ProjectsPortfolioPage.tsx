import Link from "next/link";
import { type CSSProperties } from "react";
import { ProjectsPortfolioCard } from "@/components/public/ProjectsPortfolioCard";
import { ProjectsPortfolioCta } from "@/components/public/ProjectsPortfolioCta";
import { ProjectsPortfolioReveal } from "@/components/public/ProjectsPortfolioReveal";
import type { ProjectsPageContent } from "@/lib/content";
import { localePath, UI_LABELS, type Locale } from "@/lib/i18n";
import type { ProjectWithDetails } from "@/lib/project-types";

const PORTFOLIO_ENTER_BASE_DELAY_S = 0.06;
const PORTFOLIO_PARTICLE_KEYS = ["one", "two", "three", "four", "five", "six"] as const;

type ProjectsPortfolioPageProps = {
  locale: Locale;
  content: ProjectsPageContent;
  projects: ProjectWithDetails[];
  emptyMessage: string;
};

function portfolioDelayStyle(delaySeconds: number): CSSProperties {
  return { "--portfolio-delay": `${delaySeconds}s` } as CSSProperties;
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="projects-portfolio-search-icon">
      <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M16 16L20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ProjectsPortfolioPage({
  locale,
  content,
  projects,
  emptyMessage,
}: ProjectsPortfolioPageProps) {
  const viewLabel = UI_LABELS[locale].viewProject;
  const hasProjects = projects.length > 0;

  return (
    <ProjectsPortfolioReveal>
      <div className="projects-portfolio-backdrop" aria-hidden="true">
        <span className="projects-portfolio-aurora projects-portfolio-aurora-one" />
        <span className="projects-portfolio-aurora projects-portfolio-aurora-two" />
        <span className="projects-portfolio-aurora projects-portfolio-aurora-three" />
        <span className="projects-portfolio-glow projects-portfolio-glow-purple" />
        <span className="projects-portfolio-glow projects-portfolio-glow-cyan" />
        <span className="projects-portfolio-grid" />
        <span className="projects-portfolio-vignette" />
        <span className="projects-portfolio-noise" />
        <span className="projects-portfolio-particles">
          {PORTFOLIO_PARTICLE_KEYS.map((key) => (
            <span key={key} className={`projects-portfolio-particle projects-portfolio-particle-${key}`} />
          ))}
        </span>
      </div>

      <Link
        href={localePath(locale, "/contact-us")}
        prefetch
        className="projects-portfolio-search projects-portfolio-animate"
        style={portfolioDelayStyle(0.14)}
        aria-label={content.searchLabel}
      >
        <SearchIcon />
      </Link>

      <div className="projects-portfolio-shell">
        <h1 id="projects-portfolio-heading" className="projects-portfolio-sr-title">
          {content.title}
        </h1>

        {hasProjects ? (
          <div className="projects-portfolio-grid-cards" role="list">
            {projects.map((project, index) => (
              <div key={project.id} className="projects-portfolio-grid-cell" role="listitem">
                <ProjectsPortfolioCard
                  project={project}
                  locale={locale}
                  index={index}
                  viewLabel={viewLabel}
                />
              </div>
            ))}
          </div>
        ) : (
          <p
            className="projects-portfolio-empty projects-portfolio-animate"
            style={portfolioDelayStyle(PORTFOLIO_ENTER_BASE_DELAY_S + 0.24)}
          >
            {emptyMessage}
          </p>
        )}

        <ProjectsPortfolioCta
          locale={locale}
          content={content}
          delayStyle={portfolioDelayStyle(PORTFOLIO_ENTER_BASE_DELAY_S + 0.32)}
        />
      </div>
    </ProjectsPortfolioReveal>
  );
}
