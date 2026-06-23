import type { FooterContent } from "@/lib/content";
import { FOOTER_ENTER_BASE_DELAY_S, FOOTER_ENTER_STEP_DELAY_S, footerDelayStyle } from "@/lib/footer-motion";

type FooterBottomBarProps = {
  content: FooterContent;
};

export function FooterBottomBar({ content }: FooterBottomBarProps) {
  const year = new Date().getFullYear();
  const delay = FOOTER_ENTER_BASE_DELAY_S + FOOTER_ENTER_STEP_DELAY_S * 5;

  return (
    <div className="footer-bottom footer-animate" style={footerDelayStyle(delay)}>
      <p className="footer-bottom-copy">
        © {year}, {content.copyright}
      </p>
      <p className="footer-bottom-rights">{content.rightsReserved}</p>
    </div>
  );
}
