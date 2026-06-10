import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";

type CTASectionProps = {
  title: string;
  text: string;
  buttonHref: string;
  buttonLabel: string;
};

export function CTASection({ title, text, buttonHref, buttonLabel }: CTASectionProps) {
  return (
    <section className="cta-section">
      <Container>
        <h2 className="cta-title">{title}</h2>
        <p className="cta-text">{text}</p>
        <Button href={buttonHref}>{buttonLabel}</Button>
      </Container>
    </section>
  );
}
