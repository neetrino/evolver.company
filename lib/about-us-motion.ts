import type { CSSProperties } from "react";

export const ABOUT_US_VIEW_THRESHOLD = 0.14;
export const ABOUT_US_REVEAL_ROOT_MARGIN = "0px 0px -6% 0px";
export const ABOUT_US_ENTER_BASE_DELAY_S = 0.1;
export const ABOUT_US_ENTER_STEP_DELAY_S = 0.08;

/** Stagger delay for About Us scroll-reveal animations. */
export function aboutUsDelayStyle(delaySeconds: number): CSSProperties {
  return { "--about-us-delay": `${delaySeconds}s` } as CSSProperties;
}
