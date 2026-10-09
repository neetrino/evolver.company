import Link from "next/link";
import { FooterBlock } from "@/components/public/footer/FooterBlock";
import { FooterBlockIcons } from "@/components/public/footer/FooterBlockIcons";
import type { FooterContent } from "@/lib/content";
import { FOOTER_ENTER_BASE_DELAY_S, FOOTER_ENTER_STEP_DELAY_S } from "@/lib/footer-motion";
import { getNavItems, type Locale, type NavItem } from "@/lib/i18n";

type FooterNavBlockProps = {
  locale: Locale;
  content: FooterContent;
  navItems?: NavItem[];
};

export function FooterNavBlock({ locale, content, navItems: navItemsProp }: FooterNavBlockProps) {
  const navItems = navItemsProp ?? getNavItems(locale);

  return (
    <FooterBlock
      icon={FooterBlockIcons.links}
      title={content.usefulLinksTitle}
      accent="cyan"
      delay={FOOTER_ENTER_BASE_DELAY_S + FOOTER_ENTER_STEP_DELAY_S * 4}
    >
      <ul className="footer-nav-list">
        {navItems.map((item) => (
          <li key={item.key}>
            <Link href={item.href} prefetch className="footer-nav-link">
              <span className="footer-nav-chevron" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="footer-nav-chevron-svg">
                  <path
                    d="M9 6l6 6-6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </FooterBlock>
  );
}
