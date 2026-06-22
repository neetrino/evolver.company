import { Container } from "@/components/shared/Container";
import { FooterAddressBlock } from "@/components/public/footer/FooterAddressBlock";
import { FooterBottomBar } from "@/components/public/footer/FooterBottomBar";
import { FooterBrandBlock } from "@/components/public/footer/FooterBrandBlock";
import { FooterInquiriesBlock } from "@/components/public/footer/FooterInquiriesBlock";
import { FooterNavBlock } from "@/components/public/footer/FooterNavBlock";
import { FooterScrollTop } from "@/components/public/footer/FooterScrollTop";
import { getFooterContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

type PublicFooterProps = {
  locale: Locale;
};

export function PublicFooter({ locale }: PublicFooterProps) {
  const content = getFooterContent(locale);

  return (
    <footer className="public-footer">
      <div className="public-footer-panel">
        <div className="public-footer-backdrop" aria-hidden="true">
          <span className="public-footer-glow public-footer-glow-purple" />
          <span className="public-footer-glow public-footer-glow-cyan" />
          <span className="public-footer-mesh" />
          <span className="public-footer-grid-lines" />
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
