import type { LucideIcon } from 'lucide-react';
import { Box, Building2, Globe, Layers, Target, Users } from 'lucide-react';

export const HERO_TITLE = 'WE CREATE THE NEXT GENERATION OF MARKETING CONTENT' as const;

export const HERO_DESCRIPTION =
  'Evolver specializes in 3D scanning and digitizing a wide range of physical spaces, bringing your imagination to life.' as const;

export const NEETRINO_COMPANY_URL = 'https://neetrino.com' as const;

export type SolutionCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  accentClass: string;
};

export const SOLUTION_CARDS: readonly SolutionCard[] = [
  {
    title: 'Estate Data',
    description:
      'Comprehensive property data captured with millimeter precision for smarter decisions.',
    icon: Layers,
    accentClass: 'from-cyan-500/20 to-cyan-500/5',
  },
  {
    title: 'vExpo',
    description: 'Virtual exhibition spaces that engage visitors before they step on site.',
    icon: Box,
    accentClass: 'from-violet-500/20 to-violet-500/5',
  },
  {
    title: 'vCity',
    description: 'City-scale digital twins for planning, marketing, and stakeholder collaboration.',
    icon: Building2,
    accentClass: 'from-fuchsia-500/20 to-fuchsia-500/5',
  },
  {
    title: 'vRealty',
    description: 'Immersive property tours that convert browsers into qualified leads.',
    icon: Building2,
    accentClass: 'from-blue-500/20 to-blue-500/5',
  },
];

export type ProjectCard = {
  category: string;
  name: string;
  location: string;
  gradientClass: string;
};

export const FEATURED_PROJECTS: readonly ProjectCard[] = [
  {
    category: 'REAL ESTATE',
    name: 'Waterfront Residences',
    location: 'Dubai, UAE',
    gradientClass: 'from-slate-700 via-slate-800 to-cyan-900',
  },
  {
    category: 'HOSPITALITY',
    name: 'Grand Marina Hotel',
    location: 'Abu Dhabi, UAE',
    gradientClass: 'from-amber-900/80 via-stone-800 to-stone-900',
  },
  {
    category: 'SPORTS',
    name: 'National Stadium',
    location: 'Riyadh, KSA',
    gradientClass: 'from-emerald-900/60 via-slate-800 to-slate-900',
  },
  {
    category: 'EXPO',
    name: 'Future Pavilion',
    location: 'Doha, Qatar',
    gradientClass: 'from-violet-900/70 via-slate-800 to-fuchsia-950',
  },
];

export type StatItem = {
  value: string;
  label: string;
  icon: LucideIcon;
  iconClass: string;
};

export const STATS: readonly StatItem[] = [
  { value: '1,200+', label: 'Projects Delivered', icon: Box, iconClass: 'text-cyan-400' },
  { value: '250+', label: 'Happy Clients', icon: Users, iconClass: 'text-fuchsia-400' },
  { value: '40+', label: 'Countries Served', icon: Globe, iconClass: 'text-cyan-400' },
  { value: '98%', label: 'Scan Accuracy', icon: Target, iconClass: 'text-fuchsia-400' },
];

export const FOOTER_TAGLINE = 'Shaping spaces. Building experiences.' as const;

export const FOOTER_COPYRIGHT_PREFIX = 'Copyright © 2026 ' as const;

export const FOOTER_COPYRIGHT_COMPANY_NAME = 'Neetrino IT Company' as const;

export const FOOTER_COPYRIGHT_SUFFIX = '. All Rights Reserved.' as const;

export type FooterLink = {
  label: string;
  href: string;
};

/** Quick Links: 2 rows × 3 columns (row-major order). */
export const FOOTER_QUICK_LINK_ROWS: readonly (readonly FooterLink[])[] = [
  [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
  ],
  [
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
];

export const FOOTER_CONTACT = {
  email: 'hello@evolver.company',
  phone: '+971 4 000 0000',
  address: 'Dubai, UAE',
} as const;

export const FOOTER_USA_ADDRESS = {
  label: 'USA',
  lines: ['A19709, 651 H Board St. 201 S', 'Middletown, Delaware'],
} as const;
