/** Fixed navbar row height (matches former `py-6` + `h-14` layout). */
export const NAVBAR_ROW_HEIGHT_CLASS = 'h-20';

/** Shared horizontal bounds with navbar (edge-to-edge bar, aligned content). */
export const SITE_CONTAINER_CLASS = 'mx-auto w-full max-w-7xl px-6 md:px-8';

/** Sticky navbar (solid bar above hero). */
export const NAVBAR_CLASS =
  'sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0b10]/95 backdrop-blur-md';

export const FOOTER_CLASS = 'w-full border-t border-white/10 bg-[#0a0b10]';

export const FOOTER_INNER_CLASS = `${SITE_CONTAINER_CLASS} py-14`;

/** Logo (start) | Quick Links (center) | Contact + USA (end). */
export const FOOTER_ROW_CLASS =
  'grid w-full grid-cols-1 gap-12 lg:grid-cols-[auto_1fr_auto] lg:items-start';

export const FOOTER_START_COLUMN_CLASS = 'lg:justify-self-start';

export const FOOTER_CENTER_CLASS = 'lg:justify-self-center';

/** Contact Us + USA — same grid slot (end); content left-aligned. */
export const FOOTER_END_COLUMN_CLASS =
  'flex flex-col gap-10 text-left sm:flex-row sm:items-start sm:justify-start sm:gap-x-12 lg:justify-self-end lg:gap-x-16';

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

/**
 * Footer Quick Links — fixed 3×2 grid (row 1: Home, Services, Projects;
 * row 2: About Us, Contact Us, Privacy Policy).
 */
export const FOOTER_QUICK_LINKS_GRID_CLASS =
  'm-0 grid w-max max-w-full list-none grid-cols-3 grid-rows-2 gap-x-6 gap-y-3 p-0 sm:gap-x-8';
