const STATIC_CDN_PREFIX = "/cdn/static";

/** Resolves a former `/public` asset path to a same-origin CDN path (rewritten to R2). SVG assets stay local. */
export function staticAssetUrl(publicPath: `/${string}`): string {
  if (publicPath.endsWith(".svg")) {
    return publicPath;
  }

  const relativePath = publicPath.replace(/^\//, "");
  return `${STATIC_CDN_PREFIX}/${relativePath}`;
}
