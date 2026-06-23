import type { CSSProperties } from "react";

export const FOOTER_VIEW_THRESHOLD = 0.08;
export const FOOTER_REVEAL_ROOT_MARGIN = "0px 0px -4% 0px";
export const FOOTER_ENTER_BASE_DELAY_S = 0.06;
export const FOOTER_ENTER_STEP_DELAY_S = 0.08;

/** Stagger delay for footer scroll-reveal animations. */
export function footerDelayStyle(delaySeconds: number): CSSProperties {
  return { "--footer-delay": `${delaySeconds}s` } as CSSProperties;
}
