import { getProductAsset } from "./product-showcase";

export type ProjectAccent = "magenta" | "blue" | "teal" | "coral" | "purple";

type ProjectVisualMeta = {
  background: string;
  illustration: string;
  accent: ProjectAccent;
};

export type ProjectLogoMeta = {
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
};

const PROJECT_VISUALS: Record<string, ProjectVisualMeta> = {
  estatedata: {
    background: "/images/projects/estatedata-bg.png",
    illustration: "/images/services/estatedata-illustration.png",
    accent: "magenta",
  },
  vexpo: {
    background: "/images/projects/vexpo-bg.png",
    illustration: "/images/services/vexpo-illustration.png",
    accent: "blue",
  },
  vcity: {
    background: "/images/projects/vcity-bg.png",
    illustration: "/images/services/vcity-illustration.png",
    accent: "teal",
  },
  vrealty: {
    background: "/images/projects/vrealty-bg.png",
    illustration: "/images/services/vrealty-illustration.png",
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

/** High-res 3D background for portfolio cards; falls back to illustration. */
export function resolveProjectBackgroundImage(slug: string, coverImage: string | null): string | null {
  const visual = getProjectVisual(slug);

  if (visual.background) {
    return visual.background;
  }

  if (coverImage) {
    return coverImage;
  }

  return visual.illustration || null;
}

/** Cover image with illustration fallback for known slugs. */
export function resolveProjectCoverImage(slug: string, coverImage: string | null): string | null {
  if (coverImage) {
    return coverImage;
  }

  const visual = getProjectVisual(slug);
  return visual.illustration || null;
}
