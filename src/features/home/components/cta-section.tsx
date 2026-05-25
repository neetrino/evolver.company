import { ArrowRight, Building2 } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/shared/components/ui/button';
import { GRADIENT_CTA_CLASS } from '@/shared/constants/theme';
import { cn } from '@/shared/lib/index';

import { SectionShell } from './section-shell';

export function CtaSection() {
  return (
    <SectionShell className="py-10 md:py-14">
      <div
        className={cn(
          'relative flex flex-col items-center gap-6 overflow-hidden rounded-3xl px-6 py-10 md:flex-row md:justify-between md:px-10 md:py-8',
          GRADIENT_CTA_CLASS,
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          aria-hidden
          style={{
            backgroundImage:
              'repeating-linear-gradient(-12deg, transparent, transparent 12px, rgba(255,255,255,0.08) 12px, rgba(255,255,255,0.08) 14px)',
          }}
        />

        <div className="relative flex size-14 shrink-0 items-center justify-center rounded-full bg-black/25 backdrop-blur-sm">
          <Building2 className="size-7 text-white" aria-hidden />
        </div>

        <p className="relative max-w-xl text-center text-xl font-semibold leading-snug text-white md:text-left md:text-2xl">
          Let&apos;s feature your business in our next success story.
        </p>

        <Button
          asChild
          className="relative h-11 shrink-0 rounded-full bg-black px-6 text-white hover:bg-black/90"
        >
          <Link href="/contact">
            Get in Touch
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </SectionShell>
  );
}
