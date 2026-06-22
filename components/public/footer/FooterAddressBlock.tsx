import { FooterBlock } from "@/components/public/footer/FooterBlock";
import { FooterBlockIcons } from "@/components/public/footer/FooterBlockIcons";
import type { FooterContent } from "@/lib/content";

type FooterAddressBlockProps = {
  content: FooterContent;
};

export function FooterAddressBlock({ content }: FooterAddressBlockProps) {
  return (
    <FooterBlock icon={FooterBlockIcons.location} title={content.locationTitle}>
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
