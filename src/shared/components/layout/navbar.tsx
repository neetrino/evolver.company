import Image from 'next/image';
import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { NavbarNav } from '@/shared/components/layout/navbar-nav';
import {
  BRAND_LOGO_INTRINSIC_HEIGHT,
  BRAND_LOGO_INTRINSIC_WIDTH,
  BRAND_LOGO_PATH,
} from '@/shared/constants/brand';
import {
  NAVBAR_CLASS,
  NAVBAR_LOGO_HEIGHT_CLASS,
  NAVBAR_ROW_HEIGHT_CLASS,
  SITE_CONTAINER_CLASS,
} from '@/shared/constants/layout';
import { cn } from '@/shared/lib/index';

export function Navbar() {
  return (
    <header className={NAVBAR_CLASS}>
      <div
        className={cn(
          'relative flex w-full items-center justify-between',
          SITE_CONTAINER_CLASS,
          NAVBAR_ROW_HEIGHT_CLASS,
        )}
      >
        <Link
          href="/"
          className="relative z-10 flex shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0b10]"
          aria-label={`${siteConfig.name} — home`}
        >
          <Image
            src={BRAND_LOGO_PATH}
            alt={siteConfig.name}
            width={BRAND_LOGO_INTRINSIC_WIDTH}
            height={BRAND_LOGO_INTRINSIC_HEIGHT}
            className={cn(NAVBAR_LOGO_HEIGHT_CLASS, 'w-auto')}
            priority
          />
        </Link>

        <NavbarNav />
      </div>
    </header>
  );
}
