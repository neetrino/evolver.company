import { Container } from "@/components/shared/Container";
import { FooterAddressBlock } from "@/components/public/footer/FooterAddressBlock";
import { FooterBottomBar } from "@/components/public/footer/FooterBottomBar";
import { FooterBrandBlock } from "@/components/public/footer/FooterBrandBlock";
import { FooterInquiriesBlock } from "@/components/public/footer/FooterInquiriesBlock";
import { FooterNavBlock } from "@/components/public/footer/FooterNavBlock";
import { FooterScrollTop } from "@/components/public/footer/FooterScrollTop";
import { PublicFooterReveal } from "@/components/public/PublicFooterReveal";
import type { ContactContent, FooterContent } from "@/lib/content";
import { getNavItems, type Locale } from "@/lib/i18n";
import { resolvePageCopy } from "@/lib/page-copy/resolve";

type PublicFooterProps = {
  locale: Locale;
};

export async function PublicFooter({ locale }: PublicFooterProps) {
  const [content, navLabels, contact] = await Promise.all([
    resolvePageCopy<FooterContent>("footer", locale),
    resolvePageCopy<Record<string, string>>("navigation", locale),
    resolvePageCopy<ContactContent>("contact", locale),
  ]);
  const navItems = getNavItems(locale).map((item) => ({
    ...item,
    label: navLabels[item.key] ?? item.label,
  }));

  return (
    <PublicFooterReveal>
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
            <FooterInquiriesBlock content={content} email={contact.info.email} />
            <FooterNavBlock locale={locale} content={content} navItems={navItems} />
            <FooterScrollTop label={content.scrollToTop} />
          </div>

          <FooterBottomBar content={content} />
        </Container>
      </div>
    </PublicFooterReveal>
  );
}
