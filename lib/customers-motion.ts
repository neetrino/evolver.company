import type { CSSProperties } from "react";

export const CUSTOMERS_VIEW_THRESHOLD = 0.12;
export const CUSTOMERS_REVEAL_ROOT_MARGIN = "0px 0px -6% 0px";
export const CUSTOMERS_ENTER_BASE_DELAY_S = 0.06;
export const CUSTOMERS_ENTER_STEP_DELAY_S = 0.05;
export const CUSTOMERS_GRID_STAGGER_CAP = 18;

/** Stagger delay for Customers page scroll-reveal animations. */
export function customersDelayStyle(delaySeconds: number): CSSProperties {
  return { "--customers-delay": `${delaySeconds}s` } as CSSProperties;
}
