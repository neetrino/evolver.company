"use client";

import Image from "next/image";
import { type CSSProperties } from "react";
import { ServiceDetailMedia } from "@/components/public/ServiceDetailMedia";
import { useSectionReveal } from "@/lib/hooks/use-section-reveal";
import { getServiceDetailSectionId, type ServiceDetailBlock } from "@/lib/services-detail";

const DETAIL_REVEAL_THRESHOLD = 0.12;
const DETAIL_FEATURE_BASE_DELAY_S = 0.08;

type ServiceDetailSectionProps = {
  block: ServiceDetailBlock;
  index: number;
};

function detailDelayStyle(delaySeconds: number): CSSProperties {
  return { "--detail-delay": `${delaySeconds}s` } as CSSProperties;
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="service-detail-feature-icon">
      <path
        d="M5 12.5L9.5 17L19 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ServiceDetailSection({ block, index }: ServiceDetailSectionProps) {
  const { isVisible, sectionRef } = useSectionReveal({
    threshold: DETAIL_REVEAL_THRESHOLD,
    rootMargin: "0px 0px -8% 0px",
  });

  return (
    <section
      ref={sectionRef}
      id={getServiceDetailSectionId(block.id)}
      className={`service-detail-section ${block.reversed ? "service-detail-section--reversed" : ""} ${
        index === 0 ? "service-detail-section--lead" : ""
      } ${isVisible ? "service-detail-section--visible" : ""}`}
      data-accent={block.accent}
      aria-labelledby={`service-detail-title-${block.id}`}
    >
      <div className="service-detail-backdrop" aria-hidden="true">
        <span className="service-detail-glow" />
        <span className="service-detail-grid" />
      </div>

      <span className="service-detail-edge service-detail-edge-top" aria-hidden="true" />
      <span className="service-detail-edge service-detail-edge-bottom" aria-hidden="true" />

      <div className="service-detail-layout">
        <ServiceDetailMedia
          accent={block.accent}
          logoSrc={block.logoSrc}
          logoWidth={block.logoWidth}
          logoHeight={block.logoHeight}
          brandName={block.brandName}
          isVisible={isVisible}
        />

        <div className="service-detail-content">
          <div className="service-detail-content-inner">
            <div className="service-detail-brand service-detail-animate" style={detailDelayStyle(0.06)}>
              <Image
                src={block.logoSrc}
                alt=""
                width={block.logoWidth}
                height={block.logoHeight}
                className="service-detail-brand-logo"
                sizes="72px"
              />
              <span className="service-detail-brand-name">{block.brandName}</span>
            </div>

            <h2
              id={`service-detail-title-${block.id}`}
              className="service-detail-title service-detail-animate"
              style={detailDelayStyle(0.14)}
            >
              {block.title}
            </h2>

            <p
              className="service-detail-body service-detail-animate"
              style={detailDelayStyle(0.22)}
            >
              {block.body}
            </p>

            <ul className="service-detail-features">
              {block.features.map((feature, featureIndex) => (
                <li
                  key={feature.text}
                  className="service-detail-feature service-detail-animate"
                  style={detailDelayStyle(0.3 + featureIndex * DETAIL_FEATURE_BASE_DELAY_S)}
                >
                  <span className="service-detail-feature-mark" aria-hidden="true">
                    <CheckIcon />
                  </span>
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>

            <a
              href={block.href}
              className="service-detail-cta service-detail-animate"
              style={detailDelayStyle(0.72)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {block.ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
