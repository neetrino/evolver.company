import Link from "next/link";
import { FooterBlock } from "@/components/public/footer/FooterBlock";
import { FooterBlockIcons } from "@/components/public/footer/FooterBlockIcons";
import type { FooterContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { getNavItems } from "@/lib/i18n";

type FooterNavBlockProps = {
  locale: Locale;
  content: FooterContent;
};

export function FooterNavBlock({ locale, content }: FooterNavBlockProps) {
  const navItems = getNavItems(locale);

  return (
    <FooterBlock
      icon={FooterBlockIcons.links}
      title={content.usefulLinksTitle}
      accent="cyan"
    >
      <ul className="footer-nav-list">
        {navItems.map((item) => (
          <li key={item.key}>
            <Link href={item.href} className="footer-nav-link">
              <span className="footer-nav-chevron" aria-hidden="true">
                ›
              </span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </FooterBlock>
  );
}
