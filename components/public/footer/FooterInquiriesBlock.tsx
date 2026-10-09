import { FooterBlock } from "@/components/public/footer/FooterBlock";
import { FooterBlockIcons } from "@/components/public/footer/FooterBlockIcons";
import type { FooterContent } from "@/lib/content";
import {
  FOOTER_ENTER_BASE_DELAY_S,
  FOOTER_ENTER_STEP_DELAY_S,
} from "@/lib/footer-motion";
type FooterInquiriesBlockProps = {
  content: FooterContent;
  email: string;
};

export function FooterInquiriesBlock({ content, email }: FooterInquiriesBlockProps) {
  const inquiriesDelay = FOOTER_ENTER_BASE_DELAY_S + FOOTER_ENTER_STEP_DELAY_S * 2;
  const phoneDelay = FOOTER_ENTER_BASE_DELAY_S + FOOTER_ENTER_STEP_DELAY_S * 3;

  return (
    <div className="footer-inquiries-column">
      <FooterBlock
        icon={FooterBlockIcons.briefcase}
        title={content.workInquiriesTitle}
        delay={inquiriesDelay}
      >
        <p className="footer-block-text">{content.workInquiriesText}</p>
        <a href={`mailto:${email}`} className="footer-link-accent">
          {email}
        </a>
      </FooterBlock>

      <FooterBlock icon={FooterBlockIcons.phone} title={content.phoneTitle} delay={phoneDelay}>
        <a href={`tel:${content.phone.replace(/\s/g, "")}`} className="footer-block-text footer-block-link">
          Ph: {content.phone}
        </a>
      </FooterBlock>
    </div>
  );
}
