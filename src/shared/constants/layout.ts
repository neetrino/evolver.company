/** Fixed navbar row height (matches former `py-6` + `h-14` layout). */
export const NAVBAR_ROW_HEIGHT_CLASS = 'h-20';

/** Shared horizontal bounds with navbar (edge-to-edge bar, aligned content). */
export const SITE_CONTAINER_CLASS = 'mx-auto w-full max-w-7xl px-6 md:px-8';

/** Sticky navbar (solid bar above hero). */
export const NAVBAR_CLASS =
  'sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0b10]/95 backdrop-blur-md';

export const FOOTER_CLASS = 'w-full border-t border-white/10 bg-[#0a0b10]';

export const FOOTER_INNER_CLASS = `${SITE_CONTAINER_CLASS} py-14`;

export const FOOTER_BOTTOM_ROW_CLASS =
  'mt-12 flex w-full flex-row flex-nowrap items-center justify-between gap-4 border-t border-white/10 pt-8';

export const FOOTER_COPYRIGHT_TEXT_CLASS = 'text-base text-white/40';

/** Logo (start) | Quick Links (center) | Contact Us (end). */
export const FOOTER_ROW_CLASS =
  'grid w-full grid-cols-1 gap-12 lg:grid-cols-[auto_1fr_auto] lg:items-start';

export const FOOTER_START_COLUMN_CLASS = 'lg:justify-self-start';

/** Visual nudge left — keep in sync with `.footer-nudge-*` in `globals.css`. */
export const FOOTER_QUICK_LINKS_NUDGE_LEFT_PX = 10;
export const FOOTER_CONTACT_NUDGE_LEFT_PX = 25;

export const FOOTER_QUICK_LINKS_NUDGE_LEFT_CLASS = 'footer-nudge-quick-links';
export const FOOTER_CONTACT_NUDGE_LEFT_CLASS = 'footer-nudge-contact';

export const FOOTER_CENTER_CLASS = 'lg:justify-self-center';

/** Contact Us — end column; content left-aligned. */
export const FOOTER_END_COLUMN_CLASS = 'text-left lg:justify-self-end';

/** Logo display height — visual size only; row height stays fixed above. */
export const NAVBAR_LOGO_HEIGHT_CLASS = 'h-15';

/** Navbar is `h-20` (5rem); hero fills the rest of the viewport — one screen until scroll. */
export const HERO_HEIGHT_CLASS = 'h-[calc(100svh-5rem)]';

/** Full-bleed hero directly below navbar. */
export const HERO_SECTION_CLASS = `relative w-full overflow-hidden bg-[url('/images/hero-bg.jpg')] bg-cover bg-left bg-no-repeat ${HERO_HEIGHT_CLASS}`;

export const HERO_CONTENT_WRAPPER_CLASS = `relative z-10 flex h-full w-full items-center justify-end ${SITE_CONTAINER_CLASS}`;

export const HERO_COPY_COLUMN_CLASS = 'flex w-full max-w-xl flex-col gap-6 lg:max-w-md xl:max-w-lg';

export const HERO_TITLE_TEXT_CLASS =
  'text-3xl font-bold uppercase leading-tight tracking-tight text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.9)] sm:text-4xl lg:text-5xl';

export const HERO_DESCRIPTION_TEXT_CLASS =
  'text-base leading-relaxed text-white drop-shadow-[0_1px_12px_rgba(0,0,0,0.85)] md:text-lg';

/** Footer Quick Links — two vertical columns. */
export const FOOTER_QUICK_LINKS_COLUMNS_CLASS = 'flex w-max max-w-full gap-x-6 sm:gap-x-8';

export const FOOTER_QUICK_LINK_COLUMN_LIST_CLASS = 'm-0 list-none space-y-3 p-0';

export const FOOTER_SOCIAL_LINKS_LIST_CLASS =
  'm-0 flex h-6 shrink-0 list-none flex-row flex-nowrap items-center gap-7 p-0';

/** Display size for footer social SVGs (transparent background). */
export const FOOTER_SOCIAL_ICON_SIZE_CLASS = 'size-6 shrink-0';
