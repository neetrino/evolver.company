"use client";

import { type RefObject } from "react";
import { CustomerCtaBanner } from "@/components/public/CustomerCtaBanner";
import { Container } from "@/components/shared/Container";
import type { CustomersContent } from "@/lib/customers";
import {
  CUSTOMERS_ENTER_BASE_DELAY_S,
  CUSTOMERS_REVEAL_ROOT_MARGIN,
  CUSTOMERS_VIEW_THRESHOLD,
  customersDelayStyle,
} from "@/lib/customers-motion";
import { useSectionReveal } from "@/lib/hooks/use-section-reveal";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";

type CustomersCtaProps = {
  locale: Locale;
  cta: CustomersContent["cta"];
};

export function CustomersCta({ locale, cta }: CustomersCtaProps) {
  const { isVisible, sectionRef } = useSectionReveal({
    threshold: CUSTOMERS_VIEW_THRESHOLD,
    rootMargin: CUSTOMERS_REVEAL_ROOT_MARGIN,
  });

  return (
    <section
      ref={sectionRef as RefObject<HTMLElement>}
      className={`customers-cta-section customers-section ${isVisible ? "customers-section--visible" : ""}`}
      aria-label={cta.ctaTitle}
    >
      <Container>
        <CustomerCtaBanner
          content={cta}
          href={localePath(locale, "/contact-us")}
          titleId="customers-cta-title"
          className="customers-animate"
          style={customersDelayStyle(CUSTOMERS_ENTER_BASE_DELAY_S)}
        />
      </Container>
    </section>
  );
}
