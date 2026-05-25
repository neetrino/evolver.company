import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { SOLUTION_CARDS } from '@/features/home/constants/content';
import { cn } from '@/shared/lib/index';

import { SectionShell } from './section-shell';

export function SolutionsSection() {
  return (
    <SectionShell id="services">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">Our Solutions</h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {SOLUTION_CARDS.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.title}
              className="group relative flex min-h-[280px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#12141c] p-6 transition-colors hover:border-white/20"
            >
              <div
                className={cn(
                  'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60',
                  card.accentClass,
                )}
              />
              <Icon className="relative size-8 text-cyan-400" aria-hidden />
              <h3 className="relative mt-6 text-xl font-semibold text-white">{card.title}</h3>
              <p className="relative mt-2 flex-1 text-sm leading-relaxed text-white/55">
                {card.description}
              </p>
              <Link
                href="/services"
                className="relative mt-6 inline-flex size-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors group-hover:border-cyan-400/50 group-hover:text-cyan-300"
                aria-label={`Learn more about ${card.title}`}
              >
                <ArrowRight className="size-4" />
              </Link>
            </article>
          );
        })}
      </div>
    </SectionShell>
  );
}
