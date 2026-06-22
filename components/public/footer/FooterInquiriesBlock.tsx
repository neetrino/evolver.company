import { FooterBlock } from "@/components/public/footer/FooterBlock";
import { FooterBlockIcons } from "@/components/public/footer/FooterBlockIcons";
import type { FooterContent } from "@/lib/content";
import { getContactContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

type FooterInquiriesBlockProps = {
  locale: Locale;
  content: FooterContent;
};

export function FooterInquiriesBlock({ locale, content }: FooterInquiriesBlockProps) {
  const contact = getContactContent(locale);

  return (
    <div className="footer-inquiries-column">
      <FooterBlock icon={FooterBlockIcons.briefcase} title={content.workInquiriesTitle}>
        <p className="footer-block-text">{content.workInquiriesText}</p>
        <a href={`mailto:${contact.info.email}`} className="footer-link-accent">
          {contact.info.email}
        </a>
      </FooterBlock>

      <FooterBlock icon={FooterBlockIcons.phone} title={content.phoneTitle}>
        <a href={`tel:${content.phone.replace(/\s/g, "")}`} className="footer-block-text footer-block-link">
          Ph: {content.phone}
        </a>
      </FooterBlock>
    </div>
  );
}
