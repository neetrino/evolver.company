"use client";

import { type CSSProperties, type RefObject } from "react";
import { useSectionReveal } from "@/lib/hooks/use-section-reveal";

const ABOUT_US_SEAM_VIEW_THRESHOLD = 0.65;

type AboutUsSectionSeamProps = {
  index?: number;
};

export function AboutUsSectionSeam({ index = 0 }: AboutUsSectionSeamProps) {
  const { isVisible, sectionRef } = useSectionReveal({
    threshold: ABOUT_US_SEAM_VIEW_THRESHOLD,
    rootMargin: "0px 0px -8% 0px",
  });
  const beamDelay = 0.85 + index * 0.18;

  return (
    <div
      ref={sectionRef as RefObject<HTMLDivElement>}
      className={`about-us-section-seam ${isVisible ? "about-us-section-seam--visible" : ""}`}
      style={{ "--about-seam-beam-delay": `${beamDelay}s` } as CSSProperties}
      aria-hidden="true"
    >
      <span className="about-us-section-seam-wash" />

      <span className="about-us-section-seam-line about-us-section-seam-line-left">
        <span className="about-us-section-seam-track" />
        <span className="about-us-section-seam-beam" />
      </span>

      <span className="about-us-section-seam-node">
        <span className="about-us-section-seam-node-core" />
        <span className="about-us-section-seam-node-ring" />
      </span>

      <span className="about-us-section-seam-line about-us-section-seam-line-right">
        <span className="about-us-section-seam-track" />
        <span className="about-us-section-seam-beam" />
      </span>
    </div>
  );
}
