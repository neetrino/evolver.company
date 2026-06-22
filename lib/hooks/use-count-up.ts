"use client";

import { useEffect, useState } from "react";

const DEFAULT_COUNT_UP_DURATION_MS = 1800;
const DEFAULT_COUNT_UP_DELAY_MS = 0;

function easeOutCubic(progress: number): number {
  return 1 - (1 - progress) ** 3;
}

type UseCountUpOptions = {
  durationMs?: number;
  delayMs?: number;
};

export function useCountUp(
  target: number,
  active: boolean,
  options: UseCountUpOptions = {},
): number {
  const { durationMs = DEFAULT_COUNT_UP_DURATION_MS, delayMs = DEFAULT_COUNT_UP_DELAY_MS } = options;
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setValue(target);
      return;
    }

    let frame = 0;
    let startTime: number | null = null;
    let delayTimer = 0;

    const animate = (timestamp: number): void => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      setValue(Math.round(target * easeOutCubic(progress)));

      if (progress < 1) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    delayTimer = window.setTimeout(() => {
      frame = window.requestAnimationFrame(animate);
    }, delayMs);

    return () => {
      window.clearTimeout(delayTimer);
      window.cancelAnimationFrame(frame);
    };
  }, [active, delayMs, durationMs, target]);

  return value;
}
