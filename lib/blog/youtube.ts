const YOUTUBE_ID_PATTERN = /^[\w-]{11}$/;

export function toSafeMediaUrl(url: string): string | null {
  const trimmed = url.trim();
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
    return trimmed;
  }

  return toSafeHttpUrl(trimmed);
}

export function toSafeHttpUrl(url: string): string | null {
  try {
    const parsed = new URL(url.trim());
    if (parsed.protocol === "https:" || parsed.protocol === "http:") {
      return parsed.toString();
    }
  } catch {
    return null;
  }

  return null;
}

function readId(candidate: string): string | null {
  const id = candidate.split(/[?&#]/)[0] ?? "";
  return YOUTUBE_ID_PATTERN.test(id) ? id : null;
}

export function toYouTubeEmbedUrl(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) {
    return null;
  }

  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = readId(parsed.pathname.slice(1));
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
      if (parsed.pathname === "/watch") {
        const id = readId(parsed.searchParams.get("v") ?? "");
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }

      const embedMatch = parsed.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/);
      const id = embedMatch ? readId(embedMatch[1] ?? "") : null;
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
  } catch {
    return null;
  }

  return null;
}
