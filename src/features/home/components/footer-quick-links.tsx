import Link from 'next/link';

import { FOOTER_QUICK_LINK_COLUMNS } from '@/features/home/constants/content';
import {
  FOOTER_QUICK_LINK_COLUMN_LIST_CLASS,
  FOOTER_QUICK_LINKS_COLUMNS_CLASS,
} from '@/shared/constants/layout';
import { EVOLVER_FOOTER_LINK_CLASS } from '@/shared/constants/theme';
import { cn } from '@/shared/lib/index';

const FOOTER_QUICK_LINK_LABEL_CLASS = cn(
  'whitespace-nowrap text-sm text-white/55',
  EVOLVER_FOOTER_LINK_CLASS,
);

export function FooterQuickLinks() {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold text-white">Quick Links</h3>
      <div className={FOOTER_QUICK_LINKS_COLUMNS_CLASS}>
        {FOOTER_QUICK_LINK_COLUMNS.map((column) => (
          <ul key={column[0].href} className={FOOTER_QUICK_LINK_COLUMN_LIST_CLASS}>
            {column.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={FOOTER_QUICK_LINK_LABEL_CLASS}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
