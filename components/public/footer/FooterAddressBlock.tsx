import { FooterBlock } from "@/components/public/footer/FooterBlock";
import { FooterBlockIcons } from "@/components/public/footer/FooterBlockIcons";
import type { FooterContent } from "@/lib/content";
import { FOOTER_ENTER_BASE_DELAY_S, FOOTER_ENTER_STEP_DELAY_S } from "@/lib/footer-motion";

type FooterAddressBlockProps = {
  content: FooterContent;
};

export function FooterAddressBlock({ content }: FooterAddressBlockProps) {
  return (
    <FooterBlock
      icon={FooterBlockIcons.location}
      title={content.locationTitle}
      delay={FOOTER_ENTER_BASE_DELAY_S + FOOTER_ENTER_STEP_DELAY_S}
    >
      <address className="footer-address">
        {content.locationLines.map((line) => (
          <span key={line} className="footer-address-line">
            {line}
          </span>
        ))}
      </address>
    </FooterBlock>
  );
}
