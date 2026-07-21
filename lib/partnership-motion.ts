import type { CSSProperties } from "react";

export const PARTNERSHIP_VIEW_THRESHOLD = 0.12;
export const PARTNERSHIP_REVEAL_ROOT_MARGIN = "0px 0px -6% 0px";
export const PARTNERSHIP_ENTER_BASE_DELAY_S = 0.06;
export const PARTNERSHIP_ENTER_STEP_DELAY_S = 0.055;

/** Stagger delay for Partnership page scroll-reveal animations. */
export function partnershipDelayStyle(delaySeconds: number): CSSProperties {
  return { "--partnership-delay": `${delaySeconds}s` } as CSSProperties;
}
