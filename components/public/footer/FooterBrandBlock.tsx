import Image from "next/image";
import Link from "next/link";
import { FooterSocialIcon } from "@/components/public/footer/FooterSocialIcon";
import { BRAND_LOGO } from "@/lib/brand";
import type { FooterContent } from "@/lib/content";
import { footerDelayStyle, FOOTER_ENTER_BASE_DELAY_S } from "@/lib/footer-motion";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";

type FooterBrandBlockProps = {
  locale: Locale;
  content: FooterContent;
};

export function FooterBrandBlock({ locale, content }: FooterBrandBlockProps) {
  return (
    <div className="footer-brand footer-animate" style={footerDelayStyle(FOOTER_ENTER_BASE_DELAY_S)}>
      <Link href={localePath(locale)} className="footer-brand-logo-link">
        <Image
          src={BRAND_LOGO.src}
          alt={BRAND_LOGO.alt}
          width={BRAND_LOGO.width}
          height={BRAND_LOGO.height}
          className="footer-brand-logo"
        />
      </Link>
      <p className="footer-brand-description">{content.brandDescription}</p>
      <ul className="footer-social-list" aria-label="Social media">
        {content.social.map((item) => (
          <li key={item.key}>
            <a
              href={item.href}
              className="footer-social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
            >
              <span className="footer-social-link-glow" aria-hidden="true" />
              <FooterSocialIcon platform={item.key} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
