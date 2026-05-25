'use client';

import { Globe, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { mainNavItems } from '@/config/navigation';
import { defaultLocale, localeLabels, locales, type Locale } from '@/config/i18n';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/index';

const NAV_LINK_CLASS =
  'relative text-sm transition-colors text-white/70 hover:text-white aria-[current=page]:text-white aria-[current=page]:after:absolute aria-[current=page]:after:-bottom-1 aria-[current=page]:after:left-0 aria-[current=page]:after:h-px aria-[current=page]:after:w-full aria-[current=page]:after:bg-gradient-to-r aria-[current=page]:after:from-cyan-400 aria-[current=page]:after:to-fuchsia-400';

function isNavItemActive(pathname: string, href: string): boolean {
  if (href === '/') {
    return pathname === '/';
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

type NavLinksProps = {
  className?: string;
  onNavigate?: () => void;
};

function NavLinks({ className, onNavigate }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <div className={className}>
      {mainNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={isNavItemActive(pathname, item.href) ? 'page' : undefined}
          className={NAV_LINK_CLASS}
          onClick={onNavigate}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

function LanguageSwitch({ className }: { className?: string }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  return (
    <div role="group" aria-label="Language" className={cn('flex items-center gap-1.5', className)}>
      <Globe className="size-4 text-white/50" aria-hidden />
      {locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => setLocale(loc)}
          className={cn(
            'rounded px-1.5 py-1 text-sm font-medium transition-colors',
            locale === loc ? 'text-white' : 'text-white/70 hover:text-white',
          )}
          aria-pressed={locale === loc}
        >
          {localeLabels[loc]}
        </button>
      ))}
    </div>
  );
}

export function NavbarNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav
        className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:flex"
        aria-label="Main navigation"
      >
        <NavLinks className="flex items-center gap-6 lg:gap-8" />
      </nav>

      <div className="relative z-10 flex items-center gap-2">
        <LanguageSwitch className="hidden md:flex" />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 hover:text-white md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {mobileOpen ? (
        <nav
          id="mobile-nav"
          className="absolute inset-x-0 top-full border-b border-white/10 bg-black px-8 py-6 md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-4">
            <NavLinks className="flex flex-col gap-4" onNavigate={closeMobile} />
            <LanguageSwitch className="border-t border-white/20 pt-4" />
          </div>
        </nav>
      ) : null}
    </>
  );
}
