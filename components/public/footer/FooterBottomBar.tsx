import type { FooterContent } from "@/lib/content";

type FooterBottomBarProps = {
  content: FooterContent;
};

export function FooterBottomBar({ content }: FooterBottomBarProps) {
  const year = new Date().getFullYear();

  return (
    <div className="footer-bottom">
      <p className="footer-bottom-copy">
        © {year}, {content.copyright}
      </p>
      <p className="footer-bottom-rights">{content.rightsReserved}</p>
    </div>
  );
}
