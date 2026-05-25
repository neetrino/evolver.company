export type NavItem = {
  label: string;
  href: string;
};

export const mainNavItems: readonly NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
];
