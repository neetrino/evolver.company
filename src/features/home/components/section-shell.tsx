import type { ReactNode } from 'react';

import { SITE_CONTAINER_CLASS } from '@/shared/constants/layout';
import { cn } from '@/shared/lib/index';

type SectionShellProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function SectionShell({ children, className, id }: SectionShellProps) {
  return (
    <section id={id} className={cn('py-16 md:py-24', className)}>
      <div className={SITE_CONTAINER_CLASS}>{children}</div>
    </section>
  );
}
