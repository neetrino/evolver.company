import { ArrowRight, Box, Play } from 'lucide-react';
import Link from 'next/link';

import { STATS } from '@/features/home/constants/content';
import { cn } from '@/shared/lib/index';

import { SectionShell } from './section-shell';

export function AboutSection() {
  return (
    <SectionShell id="about">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-8">
          <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#12141c]">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(34,211,238,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.15) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
            <Box className="size-24 text-cyan-400/40" strokeWidth={0.75} aria-hidden />
            <Link
              href="#showreel"
              className="relative flex size-16 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
              aria-label="Play about video"
            >
              <Play className="size-7 fill-current" />
            </Link>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-semibold tracking-widest text-cyan-400">ABOUT EVOLVER</p>
            <h2 className="text-2xl font-bold leading-tight text-white md:text-3xl">
              We transform the physical world into powerful digital experiences
            </h2>
            <p className="max-w-lg text-base leading-relaxed text-white/55">
              Evolver combines cutting-edge 3D scanning, real-time digital twins, and interactive
              storytelling to help developers, agencies, and brands communicate space like never
              before.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition-colors hover:text-cyan-200"
            >
              Learn More About Us
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 divide-x divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-[#12141c]">
          {STATS.map((stat) => {
            const Icon = stat.icon;

            return (
              <div key={stat.label} className="flex flex-col gap-3 p-6 md:p-8">
                <Icon className={cn('size-7', stat.iconClass)} aria-hidden />
                <p className="text-3xl font-bold text-white md:text-4xl">{stat.value}</p>
                <p className="text-sm text-white/55">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
