"use client";

import { type RefObject } from "react";
import { CustomerCtaBanner } from "@/components/public/CustomerCtaBanner";
import { Container } from "@/components/shared/Container";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import type { PartnershipContent } from "@/lib/partnership";
import {
  partnershipDelayStyle,
  PARTNERSHIP_ENTER_BASE_DELAY_S,
  PARTNERSHIP_REVEAL_ROOT_MARGIN,
  PARTNERSHIP_VIEW_THRESHOLD,
} from "@/lib/partnership-motion";
import { useSectionReveal } from "@/lib/hooks/use-section-reveal";

type PartnershipCtaProps = {
  locale: Locale;
  cta: PartnershipContent["cta"];
};

export function PartnershipCta({ locale, cta }: PartnershipCtaProps) {
  const { isVisible, sectionRef } = useSectionReveal({
    threshold: PARTNERSHIP_VIEW_THRESHOLD,
    rootMargin: PARTNERSHIP_REVEAL_ROOT_MARGIN,
  });

  return (
    <section
      ref={sectionRef as RefObject<HTMLElement>}
      className={`partnership-cta-section partnership-section ${isVisible ? "partnership-section--visible" : ""}`}
      aria-label={cta.ctaTitle}
    >
      <Container>
        <CustomerCtaBanner
          content={cta}
          href={localePath(locale, "/contact-us")}
          titleId="partnership-cta-title"
          className="partnership-animate"
          style={partnershipDelayStyle(PARTNERSHIP_ENTER_BASE_DELAY_S)}
        />
      </Container>
    </section>
  );
}
