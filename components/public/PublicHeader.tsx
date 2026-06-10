"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Container } from "@/components/shared/Container";
import { LanguageSwitcher } from "@/components/public/LanguageSwitcher";
import type { Locale } from "@/lib/i18n";
import { getNavItems } from "@/lib/i18n";

type PublicHeaderProps = {
  locale: Locale;
};

export function PublicHeader({ locale }: PublicHeaderProps) {
  const pathname = usePathname();
  const navItems = getNavItems(locale);
  const [mobileOpen, setMobileOpen] = useState(false);

  function isActive(href: string): boolean {
    if (href === `/${locale}`) {
      return pathname === href;
    }

    return pathname.startsWith(href);
  }

  return (
    <header className="public-header">
      <Container className="public-header-inner">
        <Link href={`/${locale}`} className="public-brand">
          Evolver
        </Link>

        <nav className="public-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`public-nav-link ${isActive(item.href) ? "public-nav-link-active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="public-header-actions">
          <LanguageSwitcher locale={locale} />
          <button
            type="button"
            className="mobile-menu-btn"
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((open) => !open)}
          >
            Menu
          </button>
        </div>
      </Container>

      {mobileOpen ? (
        <Container className="mobile-nav mobile-nav-open">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="public-nav-link"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </Container>
      ) : null}
    </header>
  );
}
