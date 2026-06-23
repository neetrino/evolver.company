"use client";

import { type CSSProperties, type Ref } from "react";
import { useSectionReveal } from "@/lib/hooks/use-section-reveal";
import { SERVICE_DETAIL_ACCENT_GLOW } from "@/lib/services-detail";
import type { ProductShowcaseAccent } from "@/lib/product-showcase";

const BRIDGE_REVEAL_THRESHOLD = 0.35;

type ServiceDetailBridgeProps = {
  fromAccent: ProductShowcaseAccent;
  toAccent: ProductShowcaseAccent;
  stepLabel: string;
};

function bridgeStyle(fromAccent: ProductShowcaseAccent, toAccent: ProductShowcaseAccent): CSSProperties {
  return {
    "--bridge-from": SERVICE_DETAIL_ACCENT_GLOW[fromAccent],
    "--bridge-to": SERVICE_DETAIL_ACCENT_GLOW[toAccent],
  } as CSSProperties;
}

export function ServiceDetailBridge({ fromAccent, toAccent, stepLabel }: ServiceDetailBridgeProps) {
  const { isVisible, sectionRef } = useSectionReveal({
    threshold: BRIDGE_REVEAL_THRESHOLD,
    rootMargin: "0px 0px -12% 0px",
  });

  return (
    <div
      ref={sectionRef as Ref<HTMLDivElement>}
      className={`service-detail-bridge ${isVisible ? "service-detail-bridge--visible" : ""}`}
      style={bridgeStyle(fromAccent, toAccent)}
      aria-hidden="true"
    >
      <span className="service-detail-bridge-glow" />
      <span className="service-detail-bridge-line" />
      <span className="service-detail-bridge-beam" />
      <span className="service-detail-bridge-node service-detail-bridge-node-left" />
      <span className="service-detail-bridge-node service-detail-bridge-node-right" />
      <span className="service-detail-bridge-label">{stepLabel}</span>
    </div>
  );
}
