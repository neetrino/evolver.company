"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/shared/Container";
import { LanguageSwitcher } from "@/components/public/LanguageSwitcher";
import { BRAND_LOGO } from "@/lib/brand";
import type { Locale } from "@/lib/i18n";
import { getNavItems } from "@/lib/i18n";

type PublicHeaderProps = {
  locale: Locale;
};

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="public-header-menu-icon">
      <path
        className={`public-header-menu-line ${open ? "public-header-menu-line-top-open" : ""}`}
        d="M5 7h14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        className={`public-header-menu-line ${open ? "public-header-menu-line-mid-open" : ""}`}
        d="M5 12h14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        className={`public-header-menu-line ${open ? "public-header-menu-line-bottom-open" : ""}`}
        d="M5 17h14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PublicHeader({ locale }: PublicHeaderProps) {
  const pathname = usePathname();
  const navItems = getNavItems(locale);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMenuPathname, setMobileMenuPathname] = useState(pathname);
  const isHomePage = pathname === `/${locale}`;
  const isServicesPage = pathname === `/${locale}/services`;
  const isProjectsPage = pathname === `/${locale}/projects`;
  const isAboutUsPage = pathname === `/${locale}/about-us`;
  const isOverlayHeader = isHomePage || isServicesPage || isProjectsPage || isAboutUsPage;

  if (mobileMenuPathname !== pathname) {
    setMobileMenuPathname(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function isActive(href: string): boolean {
    if (href === `/${locale}`) {
      return pathname === href;
    }

    return pathname.startsWith(href);
  }

  return (
    <header
      className={`public-header ${isOverlayHeader ? "public-header-overlay" : ""} public-header--locale-${locale}`}
    >
      <Container className="public-header-wrap">
        <div className="public-header-shell">
          <Link href={`/${locale}`} className="public-brand">
            <Image
              src={BRAND_LOGO.src}
              alt={BRAND_LOGO.alt}
              width={BRAND_LOGO.width}
              height={BRAND_LOGO.height}
              className="public-brand-logo"
              priority
            />
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
              className="public-header-menu-btn"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((open) => !open)}
            >
              <MenuIcon open={mobileOpen} />
            </button>
          </div>

          <div className="public-header-shell-accent" aria-hidden="true" />
        </div>
      </Container>

      <div className={`public-header-mobile ${mobileOpen ? "public-header-mobile-open" : ""}`}>
        <Container>
          <nav className="public-header-mobile-nav" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`public-nav-link public-nav-link-mobile ${isActive(item.href) ? "public-nav-link-active" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </Container>
      </div>
    </header>
  );
}
