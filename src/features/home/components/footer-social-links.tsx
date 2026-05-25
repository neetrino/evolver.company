import { FOOTER_SOCIAL_LINKS } from '@/features/home/constants/content';
import {
  FOOTER_SOCIAL_ICON_SIZE_CLASS,
  FOOTER_SOCIAL_LINKS_LIST_CLASS,
} from '@/shared/constants/layout';
import { cn } from '@/shared/lib/index';

const FOOTER_SOCIAL_LINK_CLASS =
  'inline-flex items-center opacity-55 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0b10]';

export function FooterSocialLinks() {
  return (
    <ul className={FOOTER_SOCIAL_LINKS_LIST_CLASS}>
      {FOOTER_SOCIAL_LINKS.map(({ label, href, iconSrc, iconWidth, iconHeight }) => (
        <li key={href} className="flex h-6 items-center">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(FOOTER_SOCIAL_LINK_CLASS, 'h-6')}
            aria-label={label}
          >
            {/* SVG from Figma — native img avoids Next image SVG config */}
            <img
              src={iconSrc}
              alt=""
              width={iconWidth}
              height={iconHeight}
              className={cn(FOOTER_SOCIAL_ICON_SIZE_CLASS, 'object-contain')}
              aria-hidden
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
