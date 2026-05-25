import Link from 'next/link';

import { FOOTER_QUICK_LINK_ROWS } from '@/features/home/constants/content';
import { FOOTER_QUICK_LINKS_GRID_CLASS } from '@/shared/constants/layout';

const FOOTER_QUICK_LINK_LABEL_CLASS =
  'whitespace-nowrap text-sm text-white/55 transition-colors hover:text-white';

export function FooterQuickLinks() {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold text-white">Quick Links</h3>
      <ul className={FOOTER_QUICK_LINKS_GRID_CLASS}>
        {FOOTER_QUICK_LINK_ROWS.map((row) =>
          row.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={FOOTER_QUICK_LINK_LABEL_CLASS}>
                {item.label}
              </Link>
            </li>
          )),
        )}
      </ul>
    </div>
  );
}
