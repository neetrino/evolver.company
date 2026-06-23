"use client";

import { Container } from "@/components/shared/Container";
import { FooterAddressBlock } from "@/components/public/footer/FooterAddressBlock";
import { FooterBottomBar } from "@/components/public/footer/FooterBottomBar";
import { FooterBrandBlock } from "@/components/public/footer/FooterBrandBlock";
import { FooterInquiriesBlock } from "@/components/public/footer/FooterInquiriesBlock";
import { FooterNavBlock } from "@/components/public/footer/FooterNavBlock";
import { FooterScrollTop } from "@/components/public/footer/FooterScrollTop";
import { getFooterContent } from "@/lib/content";
import {
  FOOTER_REVEAL_ROOT_MARGIN,
  FOOTER_VIEW_THRESHOLD,
} from "@/lib/footer-motion";
import { useSectionReveal } from "@/lib/hooks/use-section-reveal";
import type { Locale } from "@/lib/i18n";

type PublicFooterProps = {
  locale: Locale;
};

export function PublicFooter({ locale }: PublicFooterProps) {
  const content = getFooterContent(locale);
  const { isVisible, sectionRef } = useSectionReveal({
    threshold: FOOTER_VIEW_THRESHOLD,
    rootMargin: FOOTER_REVEAL_ROOT_MARGIN,
  });

  return (
    <footer
      ref={sectionRef}
      className={`public-footer ${isVisible ? "public-footer--visible" : ""}`}
    >
      <div className="public-footer-panel">
        <div className="public-footer-backdrop" aria-hidden="true">
          <span className="public-footer-glow public-footer-glow-purple" />
          <span className="public-footer-glow public-footer-glow-cyan" />
          <span className="public-footer-mesh" />
          <span className="public-footer-grid-lines" />
          <span className="public-footer-noise" />
        </div>

        <Container className="public-footer-inner">
          <div className="public-footer-grid">
            <FooterBrandBlock locale={locale} content={content} />
            <FooterAddressBlock content={content} />
            <FooterInquiriesBlock locale={locale} content={content} />
            <FooterNavBlock locale={locale} content={content} />
            <FooterScrollTop label={content.scrollToTop} />
          </div>

          <FooterBottomBar content={content} />
        </Container>
      </div>
    </footer>
  );
}
