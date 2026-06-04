import { Container } from "@/components/shared/Container";
import type { Locale } from "@/lib/i18n";

type PublicFooterProps = {
  locale: Locale;
};

const FOOTER_TEXT: Record<Locale, string> = {
  en: "Digital products built with clarity.",
  hy: "Թվային լուծումներ՝ հստակ մտածված կառուցվածքով։",
};

export function PublicFooter({ locale }: PublicFooterProps) {
  return (
    <footer className="public-footer">
      <Container className="public-footer-inner">
        <p className="public-footer-text">Evolver</p>
        <p className="public-footer-text">{FOOTER_TEXT[locale]}</p>
        <p className="public-footer-text">© {new Date().getFullYear()} Evolver</p>
      </Container>
    </footer>
  );
}
