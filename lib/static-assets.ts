const STATIC_ASSET_PREFIX = "static";

function getR2PublicBase(): string {
  const base = process.env.NEXT_PUBLIC_R2_PUBLIC_URL?.trim();

  if (!base) {
    throw new Error("NEXT_PUBLIC_R2_PUBLIC_URL is not configured.");
  }

  return base.replace(/\/$/, "");
}

/** Resolves a former `/public` asset path to its R2 CDN URL. SVG assets stay local. */
export function staticAssetUrl(publicPath: `/${string}`): string {
  if (publicPath.endsWith(".svg")) {
    return publicPath;
  }

  const relativePath = publicPath.replace(/^\//, "");
  return `${getR2PublicBase()}/${STATIC_ASSET_PREFIX}/${relativePath}`;
}
