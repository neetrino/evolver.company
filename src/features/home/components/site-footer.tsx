import { Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import {
  FOOTER_CONTACT,
  FOOTER_COPYRIGHT_COMPANY_NAME,
  FOOTER_COPYRIGHT_PREFIX,
  FOOTER_COPYRIGHT_SUFFIX,
  FOOTER_TAGLINE,
  FOOTER_USA_ADDRESS_LINES,
  NEETRINO_COMPANY_URL,
} from '@/features/home/constants/content';
import {
  EVOLVER_BRAND_LINK_CLASS,
  EVOLVER_FOOTER_LINK_CLASS,
  EVOLVER_FOOTER_LOGO_LINK_CLASS,
} from '@/shared/constants/theme';
import { siteConfig } from '@/config/site';
import {
  BRAND_LOGO_INTRINSIC_HEIGHT,
  BRAND_LOGO_INTRINSIC_WIDTH,
  BRAND_LOGO_PATH,
} from '@/shared/constants/brand';
import { FooterQuickLinks } from '@/features/home/components/footer-quick-links';
import { FooterSocialLinks } from '@/features/home/components/footer-social-links';
import {
  FOOTER_CENTER_CLASS,
  FOOTER_CLASS,
  FOOTER_CONTACT_NUDGE_LEFT_CLASS,
  FOOTER_QUICK_LINKS_NUDGE_LEFT_CLASS,
  FOOTER_BOTTOM_ROW_CLASS,
  FOOTER_COPYRIGHT_TEXT_CLASS,
  FOOTER_END_COLUMN_CLASS,
  FOOTER_INNER_CLASS,
  FOOTER_ROW_CLASS,
  FOOTER_START_COLUMN_CLASS,
  NAVBAR_LOGO_HEIGHT_CLASS,
} from '@/shared/constants/layout';
import { cn } from '@/shared/lib/index';

export function SiteFooter() {
  return (
    <footer className={FOOTER_CLASS}>
      <div className={FOOTER_INNER_CLASS}>
        <div className={FOOTER_ROW_CLASS}>
          <div className={cn('space-y-4', FOOTER_START_COLUMN_CLASS)}>
            <Link
              href="/"
              className={EVOLVER_FOOTER_LOGO_LINK_CLASS}
              aria-label={`${siteConfig.name} — home`}
            >
              <Image
                src={BRAND_LOGO_PATH}
                alt={siteConfig.name}
                width={BRAND_LOGO_INTRINSIC_WIDTH}
                height={BRAND_LOGO_INTRINSIC_HEIGHT}
                className={cn(NAVBAR_LOGO_HEIGHT_CLASS, 'w-auto')}
              />
            </Link>
            <p className="text-sm text-white/55">{FOOTER_TAGLINE}</p>
          </div>

          <div className={cn(FOOTER_CENTER_CLASS, FOOTER_QUICK_LINKS_NUDGE_LEFT_CLASS)}>
            <FooterQuickLinks />
          </div>

          <div className={FOOTER_END_COLUMN_CLASS}>
            <div className={FOOTER_CONTACT_NUDGE_LEFT_CLASS}>
              <h3 className="mb-4 text-sm font-semibold text-white">Contact Us</h3>
              <ul className="space-y-3 text-sm text-white/55">
                <li>
                  <a
                    href={`mailto:${FOOTER_CONTACT.email}`}
                    className={cn(
                      'inline-flex items-center gap-2 text-white/55',
                      EVOLVER_FOOTER_LINK_CLASS,
                    )}
                  >
                    <Mail className="size-4 shrink-0 text-cyan-400/80" aria-hidden />
                    {FOOTER_CONTACT.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${FOOTER_CONTACT.phone.replace(/\s/g, '')}`}
                    className={cn(
                      'inline-flex items-center gap-2 text-white/55',
                      EVOLVER_FOOTER_LINK_CLASS,
                    )}
                  >
                    <Phone className="size-4 shrink-0 text-cyan-400/80" aria-hidden />
                    {FOOTER_CONTACT.phone}
                  </a>
                </li>
                <li className="inline-flex items-start gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-cyan-400/80" aria-hidden />
                  <span className="leading-relaxed">
                    {FOOTER_USA_ADDRESS_LINES.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={FOOTER_BOTTOM_ROW_CLASS}>
          <p className={cn('min-w-0 shrink text-left', FOOTER_COPYRIGHT_TEXT_CLASS)}>
            {FOOTER_COPYRIGHT_PREFIX}
            <a
              href={NEETRINO_COMPANY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={EVOLVER_BRAND_LINK_CLASS}
            >
              {FOOTER_COPYRIGHT_COMPANY_NAME}
            </a>
            {FOOTER_COPYRIGHT_SUFFIX}
          </p>
          <FooterSocialLinks />
        </div>
      </div>
    </footer>
  );
}
