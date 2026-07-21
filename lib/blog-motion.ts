import type { CSSProperties } from "react";

export const BLOG_VIEW_THRESHOLD = 0.1;
export const BLOG_REVEAL_ROOT_MARGIN = "0px 0px -6% 0px";
export const BLOG_ENTER_BASE_DELAY_S = 0.06;
export const BLOG_ENTER_STEP_DELAY_S = 0.08;
export const BLOG_GRID_STAGGER_CAP = 9;

/** Stagger delay for Blog listing scroll-reveal animations. */
export function blogDelayStyle(delaySeconds: number): CSSProperties {
  return { "--blog-delay": `${delaySeconds}s` } as CSSProperties;
}
