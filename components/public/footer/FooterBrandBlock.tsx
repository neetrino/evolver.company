import Image from "next/image";
import Link from "next/link";
import { BRAND_LOGO } from "@/lib/brand";
import type { FooterContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import { FooterSocialIcon } from "@/components/public/footer/FooterSocialIcon";

type FooterBrandBlockProps = {
  locale: Locale;
  content: FooterContent;
};

export function FooterBrandBlock({ locale, content }: FooterBrandBlockProps) {
  return (
    <div className="footer-brand">
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
              <FooterSocialIcon platform={item.key} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
