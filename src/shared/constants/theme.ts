/** Evolver marketing site palette (Figma / brand). */
export const EVOLVER_BG = '#0a0b10' as const;

export const EVOLVER_CARD_BG = '#12141c' as const;

export const GRADIENT_ACCENT_CLASS =
  'bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400' as const;

export const GRADIENT_CTA_CLASS =
  'bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500' as const;

export const GRADIENT_TEXT_CLASS =
  'bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent' as const;

/** Evolver brand pink — footer links, accents (matches navbar active dot). */
export const EVOLVER_PINK_HOVER_CLASS = 'hover:text-fuchsia-400' as const;

/** Footer body links (Quick Links, contact). */
export const EVOLVER_FOOTER_LINK_CLASS = `transition-colors ${EVOLVER_PINK_HOVER_CLASS}` as const;

/** Neetrino attribution in footer copyright — cyan only, no pink hover. */
export const EVOLVER_BRAND_LINK_CLASS =
  'font-semibold text-cyan-400 transition-colors hover:text-cyan-300' as const;

/** Footer logo — pink glow on hover. */
export const EVOLVER_FOOTER_LOGO_LINK_CLASS =
  'inline-block rounded-sm transition-[filter] duration-200 hover:drop-shadow-[0_0_14px_rgba(232,121,249,0.55)]' as const;

/** Footer social icons — simple opacity hover, no glow. */
export const EVOLVER_FOOTER_SOCIAL_LINK_CLASS =
  'inline-flex items-center opacity-55 transition-opacity duration-200 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0b10]' as const;
