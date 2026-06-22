"use client";

import { parseAboutStatValue } from "@/lib/about-stat-value";
import { useCountUp } from "@/lib/hooks/use-count-up";

const STAT_COUNT_DURATION_MS = 1900;
const STAT_COUNT_BASE_DELAY_MS = 280;

type AboutStatValueProps = {
  value: string;
  active: boolean;
  index?: number;
};

export function AboutStatValue({ value, active, index = 0 }: AboutStatValueProps) {
  const parsed = parseAboutStatValue(value);
  const count = useCountUp(parsed.number, active, {
    durationMs: STAT_COUNT_DURATION_MS,
    delayMs: STAT_COUNT_BASE_DELAY_MS + index * 120,
  });

  return (
    <p className="about-section-stat-value" aria-label={value}>
      {count}
      {parsed.suffix}
    </p>
  );
}
