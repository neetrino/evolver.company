import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/index';

type SectionShellProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function SectionShell({ children, className, id }: SectionShellProps) {
  return (
    <section id={id} className={cn('px-6 py-16 md:px-8 md:py-24', className)}>
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}
