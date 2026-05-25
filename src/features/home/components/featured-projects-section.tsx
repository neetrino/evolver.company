'use client';

import { ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

import { FEATURED_PROJECTS } from '@/features/home/constants/content';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/index';

import { SectionShell } from './section-shell';

const CARD_WIDTH_REM = 18;

export function FeaturedProjectsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollNext = () => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: CARD_WIDTH_REM * 16, behavior: 'smooth' });
  };

  return (
    <SectionShell id="projects">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-start lg:gap-14">
        <div className="flex flex-col gap-5 lg:sticky lg:top-28">
          <p className="text-xs font-semibold tracking-widest text-cyan-400">FEATURED PROJECTS</p>
          <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">
            Spaces We&apos;ve Brought to Life
          </h2>
          <p className="max-w-md text-base leading-relaxed text-white/55">
            Explore how we transform real-world architecture into immersive digital experiences for
            real estate, hospitality, sports, and exhibitions.
          </p>
          <Button
            asChild
            variant="outline"
            className="mt-2 h-11 w-fit rounded-xl border-white/20 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/projects">
              Explore All Projects
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="relative min-w-0">
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {FEATURED_PROJECTS.map((project) => (
              <article
                key={project.name}
                className="w-72 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#12141c]"
              >
                <div
                  className={cn('aspect-[4/3] bg-gradient-to-br', project.gradientClass)}
                  role="img"
                  aria-label={project.name}
                />
                <div className="space-y-1 p-5">
                  <p className="text-xs font-semibold tracking-widest text-cyan-400/90">
                    {project.category}
                  </p>
                  <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                  <p className="text-sm text-white/50">{project.location}</p>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            onClick={scrollNext}
            className="absolute -right-2 top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#12141c] text-white shadow-lg transition-colors hover:border-cyan-400/40 hover:text-cyan-300 md:flex"
            aria-label="Scroll to next projects"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </SectionShell>
  );
}
