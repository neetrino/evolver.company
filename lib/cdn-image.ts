import "server-only";

const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL?.trim().replace(/\/$/, "");

/** Maps R2 absolute URLs to same-origin `/cdn/` paths so Next.js Image can optimize them. */
export function toSameOriginCdnPath(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) {
    return trimmed;
  }

  if (trimmed.startsWith("/cdn/") || (trimmed.startsWith("/") && !trimmed.startsWith("//"))) {
    return trimmed;
  }

  if (R2_PUBLIC_URL && trimmed.startsWith(`${R2_PUBLIC_URL}/`)) {
    return `/cdn/${trimmed.slice(R2_PUBLIC_URL.length + 1)}`;
  }

  return trimmed;
}

export function isRemoteAbsoluteUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}

export function isNextOptimizableImage(url: string): boolean {
  const resolved = toSameOriginCdnPath(url);
  return resolved.startsWith("/") && !resolved.startsWith("//") && !isRemoteAbsoluteUrl(resolved);
}
