"use client";

import Image from "next/image";
import { useDetailMediaTilt } from "@/lib/hooks/use-detail-media-tilt";
import type { ProductShowcaseAccent } from "@/lib/product-showcase";

const DETAIL_PARTICLE_KEYS = ["one", "two", "three", "four", "five", "six"] as const;
const DETAIL_ORBIT_DOT_KEYS = ["a", "b", "c"] as const;
const DETAIL_RIPPLE_KEYS = ["one", "two"] as const;
const DETAIL_CORNER_KEYS = ["tl", "tr", "bl", "br"] as const;

type ServiceDetailMediaProps = {
  accent: ProductShowcaseAccent;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
  brandName: string;
  isVisible: boolean;
};

export function ServiceDetailMedia({
  accent,
  logoSrc,
  logoWidth,
  logoHeight,
  brandName,
  isVisible,
}: ServiceDetailMediaProps) {
  const { ref, handlePointerMove, handlePointerLeave } = useDetailMediaTilt();
  const visibleClass = isVisible ? "service-detail-media--visible" : "";

  return (
    <div
      ref={ref}
      className={`service-detail-media ${visibleClass}`}
      data-accent={accent}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="service-detail-media-scene" aria-hidden="true">
        <span className="service-detail-media-aurora service-detail-media-aurora--one" />
        <span className="service-detail-media-aurora service-detail-media-aurora--two" />
        <span className="service-detail-media-grid-floor" />
        <span className="service-detail-media-ring service-detail-media-ring--outer" />
        <span className="service-detail-media-ring service-detail-media-ring--inner" />
        <span className="service-detail-media-orbit" />
        {DETAIL_ORBIT_DOT_KEYS.map((key) => (
          <span key={key} className={`service-detail-media-orbit-dot service-detail-media-orbit-dot-${key}`} />
        ))}
        {DETAIL_RIPPLE_KEYS.map((key) => (
          <span key={key} className={`service-detail-media-ripple service-detail-media-ripple-${key}`} />
        ))}
        <span className="service-detail-media-beam" />
        <span className="service-detail-media-scanline" />
        <span className="service-detail-media-particles">
          {DETAIL_PARTICLE_KEYS.map((key) => (
            <span key={key} className={`service-detail-media-particle service-detail-media-particle-${key}`} />
          ))}
        </span>
      </div>

      <div className={`service-detail-media-stage ${isVisible ? "service-detail-media-stage--visible" : ""}`}>
        <span className="service-detail-media-spotlight" aria-hidden="true" />
        <span className="service-detail-media-glass" aria-hidden="true" />
        <span className="service-detail-media-shine" aria-hidden="true" />
        <span className="service-detail-media-frame" aria-hidden="true" />
        {DETAIL_CORNER_KEYS.map((key) => (
          <span key={key} className={`service-detail-media-corner service-detail-media-corner-${key}`} />
        ))}
        <span className="service-detail-media-logo-wrap">
          <span className="service-detail-media-logo-aura" aria-hidden="true" />
          <span className="service-detail-media-logo-shimmer" aria-hidden="true" />
          <Image
            src={logoSrc}
            alt={brandName}
            width={logoWidth}
            height={logoHeight}
            className="service-detail-media-logo"
            sizes="(max-width: 1023px) 200px, 280px"
          />
        </span>
        <span className="service-detail-media-pedestal" aria-hidden="true" />
      </div>

      <span className="service-detail-media-fade" aria-hidden="true" />
      <span className="service-detail-media-label">{brandName}</span>
    </div>
  );
}
