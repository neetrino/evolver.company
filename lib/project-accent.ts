import type { CSSProperties } from "react";
import { getProjectVisual, type ProjectAccent } from "@/lib/project-visuals";
import type { ProjectWithDetails } from "@/lib/project-types";

const HEX_3_PATTERN = /^#([0-9a-f]{3})$/i;
const HEX_6_PATTERN = /^#([0-9a-f]{6})$/i;

const PORTFOLIO_ACCENT_ALPHA = 0.62;
const PORTFOLIO_ACCENT_SOFT_ALPHA = 0.18;
const PORTFOLIO_ACCENT_GLOW_ALPHA = 0.35;
const HOME_ACCENT_SOFT_ALPHA = 0.16;

type ProjectAccentInput = Pick<ProjectWithDetails, "accentColor" | "catalogSlug" | "slug">;

export type ResolvedProjectAccent = {
  token: ProjectAccent;
  accentColor: string | null;
};

/** Normalize #rgb / #rrggbb to lowercase #rrggbb, or null when invalid. */
export function normalizeHexColor(value: string | null | undefined): string | null {
  if (!value?.trim()) {
    return null;
  }

  const trimmed = value.trim();
  const shortMatch = HEX_3_PATTERN.exec(trimmed);

  if (shortMatch) {
    const [r, g, b] = shortMatch[1].split("");
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }

  const longMatch = HEX_6_PATTERN.exec(trimmed);
  if (longMatch) {
    return `#${longMatch[1].toLowerCase()}`;
  }

  return null;
}

export function isValidHexColor(value: string | null | undefined): boolean {
  if (!value?.trim()) {
    return true;
  }

  return normalizeHexColor(value) !== null;
}

function parseRgbChannels(hex: string): { r: number; g: number; b: number } | null {
  const normalized = normalizeHexColor(hex);
  if (!normalized) {
    return null;
  }

  return {
    r: Number.parseInt(normalized.slice(1, 3), 16),
    g: Number.parseInt(normalized.slice(3, 5), 16),
    b: Number.parseInt(normalized.slice(5, 7), 16),
  };
}

/** Convert hex to rgba(); falls back to purple when hex is invalid. */
export function hexToRgba(hex: string, alpha: number): string {
  const channels = parseRgbChannels(hex);
  if (!channels) {
    return `rgba(123, 92, 255, ${alpha})`;
  }

  return `rgba(${channels.r}, ${channels.g}, ${channels.b}, ${alpha})`;
}

export function resolveProjectAccent(project: ProjectAccentInput): ResolvedProjectAccent {
  const visualKey = project.catalogSlug ?? project.slug;
  const token = getProjectVisual(visualKey).accent;
  const accentColor = normalizeHexColor(project.accentColor);

  return { token, accentColor };
}

export function buildPortfolioAccentStyle(accentColor: string | null): CSSProperties | undefined {
  if (!accentColor) {
    return undefined;
  }

  return {
    "--portfolio-accent": hexToRgba(accentColor, PORTFOLIO_ACCENT_ALPHA),
    "--portfolio-accent-soft": hexToRgba(accentColor, PORTFOLIO_ACCENT_SOFT_ALPHA),
    "--portfolio-accent-glow": hexToRgba(accentColor, PORTFOLIO_ACCENT_GLOW_ALPHA),
  } as CSSProperties;
}

export function buildHomeAccentStyle(accentColor: string | null): CSSProperties | undefined {
  if (!accentColor) {
    return undefined;
  }

  return {
    "--home-project-accent": accentColor,
    "--home-project-accent-soft": hexToRgba(accentColor, HOME_ACCENT_SOFT_ALPHA),
  } as CSSProperties;
}
