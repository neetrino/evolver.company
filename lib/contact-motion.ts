import type { CSSProperties } from "react";

export const CONTACT_VIEW_THRESHOLD = 0.12;
export const CONTACT_REVEAL_ROOT_MARGIN = "0px 0px -6% 0px";
export const CONTACT_ENTER_BASE_DELAY_S = 0.08;
export const CONTACT_ENTER_STEP_DELAY_S = 0.07;

/** Stagger delay for Contact page scroll-reveal animations. */
export function contactDelayStyle(delaySeconds: number): CSSProperties {
  return { "--contact-delay": `${delaySeconds}s` } as CSSProperties;
}
