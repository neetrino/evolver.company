"use client";

import { type CSSProperties } from "react";
import { Container } from "@/components/shared/Container";
import { ProductShowcaseCard } from "@/components/public/ProductShowcaseCard";
import { useSectionReveal } from "@/lib/hooks/use-section-reveal";
import { getProductShowcaseContent } from "@/lib/product-showcase";
import type { Locale } from "@/lib/i18n";

const WHAT_WE_DO_ENTER_BASE_DELAY_S = 0.1;
const WHAT_WE_DO_ENTER_STEP_DELAY_S = 0.1;
const WHAT_WE_DO_VIEW_THRESHOLD = 0.16;

type WhatWeDoSectionProps = {
  locale: Locale;
};

function whatWeDoDelayStyle(delaySeconds: number): CSSProperties {
  return { "--what-we-do-delay": `${delaySeconds}s` } as CSSProperties;
}

export function WhatWeDoSection({ locale }: WhatWeDoSectionProps) {
  const { isVisible, sectionRef } = useSectionReveal({
    threshold: WHAT_WE_DO_VIEW_THRESHOLD,
    rootMargin: "0px 0px -6% 0px",
  });
  const content = getProductShowcaseContent(locale);

  return (
    <section
      ref={sectionRef}
      className={`what-we-do-section ${isVisible ? "what-we-do-section--visible" : ""}`}
      aria-labelledby="what-we-do-heading"
    >
      <div className="what-we-do-backdrop" aria-hidden="true">
        <span className="what-we-do-glow what-we-do-glow-purple" />
        <span className="what-we-do-glow what-we-do-glow-cyan" />
        <span className="what-we-do-bg-grid" />
      </div>

      <Container className="what-we-do-container">
        <div className="what-we-do-layout">
          <div className="what-we-do-content">
            <span className="what-we-do-frame" aria-hidden="true">
              <span className="what-we-do-frame-line what-we-do-frame-line-vertical" />
              <span className="what-we-do-frame-line what-we-do-frame-line-horizontal" />
              <span className="what-we-do-frame-node what-we-do-frame-node-top" />
              <span className="what-we-do-frame-node what-we-do-frame-node-bottom" />
            </span>

            <p
              className="what-we-do-eyebrow what-we-do-animate what-we-do-animate-left"
              style={whatWeDoDelayStyle(WHAT_WE_DO_ENTER_BASE_DELAY_S)}
            >
              {content.eyebrow}
            </p>
            <span className="what-we-do-eyebrow-line" aria-hidden="true" />

            <h2 id="what-we-do-heading" className="what-we-do-headline">
              {content.headline.map((line, index) => (
                <span
                  key={line.text}
                  className={`what-we-do-headline-line what-we-do-animate ${
                    line.gradient
                      ? "what-we-do-headline-gradient what-we-do-headline-gradient-animated"
                      : ""
                  }`}
                  style={whatWeDoDelayStyle(
                    WHAT_WE_DO_ENTER_BASE_DELAY_S + (index + 1) * WHAT_WE_DO_ENTER_STEP_DELAY_S,
                  )}
                >
                  {line.text}
                </span>
              ))}
            </h2>

            <p
              className="what-we-do-supporting what-we-do-animate"
              style={whatWeDoDelayStyle(
                WHAT_WE_DO_ENTER_BASE_DELAY_S + (content.headline.length + 2) * WHAT_WE_DO_ENTER_STEP_DELAY_S,
              )}
            >
              {content.supporting}
            </p>
          </div>

          <div className="what-we-do-grid-cards">
            {content.products.map((product) => (
              <ProductShowcaseCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
