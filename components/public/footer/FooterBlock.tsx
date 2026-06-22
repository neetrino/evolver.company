import type { ReactNode } from "react";

type FooterBlockAccent = "purple" | "cyan";

type FooterBlockProps = {
  icon: ReactNode;
  title: string;
  accent?: FooterBlockAccent;
  children: ReactNode;
};

export function FooterBlock({
  icon,
  title,
  accent = "purple",
  children,
}: FooterBlockProps) {
  return (
    <section className="footer-block">
      <div className="footer-block-head">
        <div className={`footer-block-icon footer-block-icon--${accent}`}>{icon}</div>
        <h3 className="footer-block-title">{title}</h3>
      </div>
      <div className={`footer-block-divider footer-block-divider--${accent}`} />
      <div className="footer-block-body">{children}</div>
    </section>
  );
}
