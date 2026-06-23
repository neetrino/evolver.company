"use client";

import { type ReactNode } from "react";
import { useSectionReveal } from "@/lib/hooks/use-section-reveal";

const PORTFOLIO_VIEW_THRESHOLD = 0.06;

type ProjectsPortfolioRevealProps = {
  children: ReactNode;
};

export function ProjectsPortfolioReveal({ children }: ProjectsPortfolioRevealProps) {
  const { isVisible, sectionRef } = useSectionReveal({
    threshold: PORTFOLIO_VIEW_THRESHOLD,
    rootMargin: "0px 0px -2% 0px",
  });

  return (
    <section
      ref={sectionRef}
      className={`projects-portfolio-page ${isVisible ? "projects-portfolio-page--visible" : ""}`}
      aria-labelledby="projects-portfolio-heading"
    >
      {children}
    </section>
  );
}
