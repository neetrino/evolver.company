import type { LucideIcon } from 'lucide-react';
import { Box, Globe, Target, Users } from 'lucide-react';

import {
  FOOTER_SOCIAL_FACEBOOK_ICON_HEIGHT,
  FOOTER_SOCIAL_FACEBOOK_ICON_PATH,
  FOOTER_SOCIAL_FACEBOOK_ICON_WIDTH,
  FOOTER_SOCIAL_INSTAGRAM_ICON_PATH,
  FOOTER_SOCIAL_INSTAGRAM_ICON_SIZE,
  FOOTER_SOCIAL_LINKEDIN_ICON_HEIGHT,
  FOOTER_SOCIAL_LINKEDIN_ICON_PATH,
  FOOTER_SOCIAL_LINKEDIN_ICON_WIDTH,
  PRODUCT_ESTATE_DATA_LOGO_PATH,
  PRODUCT_VCITY_LOGO_PATH,
  PRODUCT_VEXPO_LOGO_PATH,
  PRODUCT_VREALTY_LOGO_PATH,
} from '@/shared/constants/brand';
export const HERO_TITLE = 'WE CREATE THE NEXT GENERATION OF MARKETING CONTENT' as const;

export const HERO_DESCRIPTION =
  'Evolver specializes in 3D scanning and digitizing a wide range of physical spaces, bringing your imagination to life.' as const;

export const NEETRINO_COMPANY_URL = 'https://neetrino.com' as const;

export const WHAT_WE_DO_SUBTITLE = 'What we do' as const;

export const WHAT_WE_DO_HEADLINE_LINES = [
  'Using',
  'cutting edge',
  'technologies',
  'Evolver virtualizes the world.',
] as const;

export type ProductShowcaseItem = {
  name: string;
  href: string;
  logoSrc: string;
  tagline: string;
};

export const PRODUCT_SHOWCASE_COLUMN_LEFT: readonly ProductShowcaseItem[] = [
  {
    name: 'Estate Data',
    href: 'https://estatedata.am/',
    logoSrc: PRODUCT_ESTATE_DATA_LOGO_PATH,
    tagline: 'Experience Your Future Home Today with Our Virtual 3D Tours.',
  },
  {
    name: 'vExpo',
    href: 'https://evolver.company',
    logoSrc: PRODUCT_VEXPO_LOGO_PATH,
    tagline: 'Missed an Expo? No worries. Explore with vExpo.',
  },
];

export const PRODUCT_SHOWCASE_COLUMN_RIGHT: readonly ProductShowcaseItem[] = [
  {
    name: 'vCity',
    href: 'https://vcity.guide',
    logoSrc: PRODUCT_VCITY_LOGO_PATH,
    tagline: 'Walk in your favorite city virtually.',
  },
  {
    name: 'vRealty',
    href: 'https://vrealty.am',
    logoSrc: PRODUCT_VREALTY_LOGO_PATH,
    tagline: 'Your dream homes are just one click away!',
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

/** Quick Links: column 1 — Home, Services, Projects; column 2 — About, Contact, Privacy. */
export const FOOTER_QUICK_LINK_COLUMNS: readonly (readonly FooterLink[])[] = [
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
} as const;

/** Shown in Contact Us next to the MapPin icon. */
export const FOOTER_USA_ADDRESS_LINES = [
  'A19709, 651 H Board St. 201 S',
  'Middletown, Delaware',
] as const;

export type FooterSocialLink = {
  label: string;
  href: string;
  iconSrc: string;
  iconWidth: number;
  iconHeight: number;
};

export const FOOTER_SOCIAL_LINKS: readonly FooterSocialLink[] = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/evolverarmenia/',
    iconSrc: FOOTER_SOCIAL_FACEBOOK_ICON_PATH,
    iconWidth: FOOTER_SOCIAL_FACEBOOK_ICON_WIDTH,
    iconHeight: FOOTER_SOCIAL_FACEBOOK_ICON_HEIGHT,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/evolver.company/',
    iconSrc: FOOTER_SOCIAL_INSTAGRAM_ICON_PATH,
    iconWidth: FOOTER_SOCIAL_INSTAGRAM_ICON_SIZE,
    iconHeight: FOOTER_SOCIAL_INSTAGRAM_ICON_SIZE,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/evolvercompany/',
    iconSrc: FOOTER_SOCIAL_LINKEDIN_ICON_PATH,
    iconWidth: FOOTER_SOCIAL_LINKEDIN_ICON_WIDTH,
    iconHeight: FOOTER_SOCIAL_LINKEDIN_ICON_HEIGHT,
  },
];
