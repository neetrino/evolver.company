"use client";

import Image from "next/image";
import { type CSSProperties, type MouseEvent, useCallback } from "react";
import { useCardTilt } from "@/lib/hooks/use-card-tilt";
import { getServiceDetailSectionId, scrollToServiceDetail } from "@/lib/services-detail";
import type { ServicesShowcaseItem } from "@/lib/services-showcase";

const CARD_PARTICLE_KEYS = ["one", "two", "three", "four", "five", "six"] as const;

type ServiceCardProps = {
  service: ServicesShowcaseItem;
  index: number;
  exploreCta: string;
};

function cardDelayStyle(delaySeconds: number): CSSProperties {
  return { "--card-float-delay": `${delaySeconds}s` } as CSSProperties;
}

function ScrollTargetIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="services-page-card-arrow-icon">
      <path
        d="M12 5V17M12 17L7 12M12 17L17 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ServiceCard({ service, index, exploreCta }: ServiceCardProps) {
  const { ref, handlePointerMove, handlePointerLeave } = useCardTilt();
  const cardNumber = String(index + 1).padStart(2, "0");
  const detailSectionId = getServiceDetailSectionId(service.id);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      scrollToServiceDetail(service.id);
    },
    [service.id],
  );

  return (
    <a
      ref={ref}
      href={`#${detailSectionId}`}
      className="services-page-card"
      data-accent={service.accent}
      data-index={index}
      style={cardDelayStyle(index * 0.35)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      aria-label={`${service.title} — ${service.category}`}
    >
      <span className="services-page-card-aura" aria-hidden="true" />
      <span className="services-page-card-spotlight" aria-hidden="true" />
      <span className="services-page-card-beam" aria-hidden="true" />

      <span className="services-page-card-inner">
        <span className="services-page-card-chrome" aria-hidden="true">
          <span className="services-page-card-chrome-line services-page-card-chrome-line-top" />
          <span className="services-page-card-chrome-line services-page-card-chrome-line-bottom" />
          <span className="services-page-card-chrome-node services-page-card-chrome-node-tl" />
          <span className="services-page-card-chrome-node services-page-card-chrome-node-br" />
        </span>

        <span className="services-page-card-glow" aria-hidden="true" />
        <span className="services-page-card-shimmer" aria-hidden="true" />
        <span className="services-page-card-index" aria-hidden="true">
          {cardNumber}
        </span>
        <span className="services-page-card-arrow" aria-hidden="true">
          <ScrollTargetIcon />
        </span>

        <span className="services-page-card-particles" aria-hidden="true">
          {CARD_PARTICLE_KEYS.map((key) => (
            <span key={key} className={`services-page-card-particle services-page-card-particle-${key}`} />
          ))}
        </span>

        <div className="services-page-card-head">
          <p className="services-page-card-category">
            <span className="services-page-card-category-live" aria-hidden="true" />
            <span className="services-page-card-category-text">{service.category}</span>
            <span className="services-page-card-category-line" aria-hidden="true" />
          </p>
          <h2 className="services-page-card-title">{service.title}</h2>
        </div>

        <div className="services-page-card-visual">
          <span className="services-page-card-visual-stage" aria-hidden="true" />
          <span className="services-page-card-visual-ring" aria-hidden="true" />
          <span className="services-page-card-visual-orbit" aria-hidden="true" />
          <span className="services-page-card-visual-shine" aria-hidden="true" />
          <span className="services-page-card-pedestal" aria-hidden="true" />
          <Image
            src={service.logoSrc}
            alt=""
            width={service.logoWidth}
            height={service.logoHeight}
            className="services-page-card-logo"
            sizes="(max-width: 768px) 220px, 280px"
          />
        </div>

        <p className="services-page-card-description">{service.description}</p>
        <span className="services-page-card-cta" aria-hidden="true">
          {exploreCta}
        </span>
      </span>
    </a>
  );
}
