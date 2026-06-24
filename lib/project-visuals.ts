import { getProductAsset } from "./product-showcase";
import { staticAssetUrl } from "@/lib/static-assets";

export type ProjectAccent = "magenta" | "blue" | "teal" | "coral" | "purple";

type ProjectVisualMeta = {
  background: string;
  illustration: string;
  detailCover?: string;
  accent: ProjectAccent;
};

export type ProjectLogoMeta = {
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
};

const PROJECT_VISUALS: Record<string, ProjectVisualMeta> = {
  estatedata: {
    background: staticAssetUrl("/images/projects/estatedata-bg.png"),
    illustration: staticAssetUrl("/images/services/estatedata-illustration.png"),
    detailCover: staticAssetUrl("/images/projects/estatedata-detail.png"),
    accent: "magenta",
  },
  vexpo: {
    background: staticAssetUrl("/images/projects/vexpo-bg.png"),
    illustration: staticAssetUrl("/images/services/vexpo-illustration.png"),
    detailCover: staticAssetUrl("/images/projects/vexpo-detail.png"),
    accent: "blue",
  },
  vcity: {
    background: staticAssetUrl("/images/projects/vcity-bg.png"),
    illustration: staticAssetUrl("/images/services/vcity-illustration.png"),
    detailCover: staticAssetUrl("/images/projects/vcity-detail.png"),
    accent: "teal",
  },
  vrealty: {
    background: staticAssetUrl("/images/projects/vrealty-bg.png"),
    illustration: staticAssetUrl("/images/services/vrealty-illustration.png"),
    accent: "coral",
  },
};

const DEFAULT_VISUAL: ProjectVisualMeta = {
  background: "",
  illustration: "",
  accent: "purple",
};

/** Illustration and accent theme for a project slug. */
export function getProjectVisual(slug: string): ProjectVisualMeta {
  return PROJECT_VISUALS[slug] ?? DEFAULT_VISUAL;
}

/** Product logo used on the homepage “What we do” section. */
export function getProjectLogo(slug: string): ProjectLogoMeta | null {
  if (!(slug in PROJECT_VISUALS)) {
    return null;
  }

  const asset = getProductAsset(slug);
  return {
    logoSrc: asset.logoSrc,
    logoWidth: asset.logoWidth,
    logoHeight: asset.logoHeight,
  };
}

/** Service-page illustration for homepage project cards. */
export function resolveHomeProjectImage(slug: string, coverImage: string | null): string | null {
  const visual = getProjectVisual(slug);

  if (visual.illustration) {
    return visual.illustration;
  }

  if (coverImage) {
    return coverImage;
  }

  return visual.background || null;
}

/** High-res 3D background for portfolio cards; DB cover first, then static fallbacks. */
export function resolveProjectBackgroundImage(slug: string, coverImage: string | null): string | null {
  const visual = getProjectVisual(slug);

  if (coverImage) {
    return coverImage;
  }

  if (visual.background) {
    return visual.background;
  }

  return visual.illustration || null;
}

/** Hero image for the project detail page; prefers slug-specific detail art. */
export function resolveProjectDetailImage(slug: string, coverImage: string | null): string | null {
  const visual = getProjectVisual(slug);

  if (visual.detailCover) {
    return visual.detailCover;
  }

  return resolveProjectBackgroundImage(slug, coverImage);
}

/** Cover image with illustration fallback for known slugs. */
export function resolveProjectCoverImage(slug: string, coverImage: string | null): string | null {
  if (coverImage) {
    return coverImage;
  }

  const visual = getProjectVisual(slug);
  return visual.illustration || null;
}
