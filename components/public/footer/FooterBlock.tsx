import type { CSSProperties, ReactNode } from "react";
import { footerDelayStyle } from "@/lib/footer-motion";

type FooterBlockAccent = "purple" | "cyan";

type FooterBlockProps = {
  icon: ReactNode;
  title: string;
  accent?: FooterBlockAccent;
  delay?: number;
  children: ReactNode;
};

export function FooterBlock({
  icon,
  title,
  accent = "purple",
  delay = 0,
  children,
}: FooterBlockProps) {
  const animateStyle = footerDelayStyle(delay) as CSSProperties;

  return (
    <section className="footer-block footer-animate" style={animateStyle}>
      <div className="footer-block-head">
        <div className={`footer-block-icon footer-block-icon--${accent}`}>
          <span className="footer-block-icon-glow" aria-hidden="true" />
          {icon}
        </div>
        <h3 className="footer-block-title">{title}</h3>
      </div>
      <div className={`footer-block-divider footer-block-divider--${accent}`} aria-hidden="true">
        <span className="footer-block-divider-shimmer" />
      </div>
      <div className="footer-block-body">{children}</div>
    </section>
  );
}
