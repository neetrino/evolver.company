import { ABOUT_US_HERO_IMAGE } from "@/lib/about-us-hero";
import { BLOG_DEFAULT_IMAGE } from "@/lib/blog/images";
import { BRAND_LOGO } from "@/lib/brand";
import { getClientLogos } from "@/lib/clients-section";
import { HOME_HERO_IMAGE } from "@/lib/home-hero-image";
import { getHomeVideos } from "@/lib/home-videos";
import type { PageCopyId } from "@/lib/page-copy/constants";
import { fieldLabel } from "@/lib/page-copy/fields";
import type { PageCopyMediaItem } from "@/lib/page-copy/model-types";
import { listProjectVisuals } from "@/lib/project-visuals";

const MEDIA_EXTENSION = /\.(png|jpe?g|webp|gif|svg|avif|mp4|webm)(\?.*)?$/i;
const VIDEO_EXTENSION = /\.(mp4|webm)(\?.*)?$/i;
const LOGO_PAGES = new Set<PageCopyId>(["clients", "trusted-by", "customers", "partnership"]);
const LABEL_KEYS = ["name", "title", "label", "id"] as const;

function joinPath(prefix: string, key: string): string {
  return prefix ? `${prefix}.${key}` : key;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isMediaKey(key: string): boolean {
  return key === "src" || key === "poster" || key.endsWith("Src");
}

function mediaItem(id: string, label: string, src: string): PageCopyMediaItem | null {
  const trimmed = src.trim();
  if (!MEDIA_EXTENSION.test(trimmed)) {
    return null;
  }

  return {
    id,
    label,
    src: trimmed,
    kind: VIDEO_EXTENSION.test(trimmed) ? "video" : "image",
  };
}

function recordLabel(record: Record<string, unknown>, path: string): string {
  for (const key of LABEL_KEYS) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return fieldLabel(path) || "Media";
}

function compact(items: Array<PageCopyMediaItem | null>): PageCopyMediaItem[] {
  return items.filter((item): item is PageCopyMediaItem => item !== null);
}

/** Image and video URLs skipped by the text-field walker. */
export function collectPageMedia(value: unknown, prefix = ""): PageCopyMediaItem[] {
  if (Array.isArray(value)) {
    return value.flatMap((entry, index) => collectPageMedia(entry, joinPath(prefix, String(index))));
  }

  if (!isRecord(value)) {
    return [];
  }

  const label = recordLabel(value, prefix);
  return Object.entries(value).flatMap(([key, child]) => {
    const path = joinPath(prefix, key);
    if (typeof child !== "string") {
      return collectPageMedia(child, path);
    }

    if (!isMediaKey(key) && !MEDIA_EXTENSION.test(child)) {
      return [];
    }

    const media = mediaItem(path, label, child);
    return media ? [media] : [];
  });
}

function logoMedia(): PageCopyMediaItem[] {
  return compact(
    getClientLogos().map((client) => mediaItem(`client-${client.id}`, client.name, client.logoSrc)),
  );
}

function videoMedia(): PageCopyMediaItem[] {
  return compact(getHomeVideos().map((video) => mediaItem(video.id, video.title.en, video.src)));
}

function projectMedia(): PageCopyMediaItem[] {
  return listProjectVisuals().flatMap(({ slug, visual }) => {
    const name = slug.charAt(0).toUpperCase() + slug.slice(1);
    return compact([
      mediaItem(`${slug}-background`, `${name} background`, visual.background),
      mediaItem(`${slug}-illustration`, `${name} illustration`, visual.illustration),
      mediaItem(`${slug}-detail`, `${name} detail`, visual.detailCover ?? ""),
    ]);
  });
}

function extraFor(pageId: PageCopyId): PageCopyMediaItem[] {
  if (pageId === "home-videos") {
    return videoMedia();
  }
  if (LOGO_PAGES.has(pageId)) {
    return logoMedia();
  }
  if (pageId === "about") {
    return compact([mediaItem("about-hero", "About hero", ABOUT_US_HERO_IMAGE.src)]);
  }
  if (pageId === "footer") {
    return compact([mediaItem("brand-logo", BRAND_LOGO.alt, BRAND_LOGO.src)]);
  }
  if (pageId === "home") {
    return compact([mediaItem("home-hero", "Home hero", HOME_HERO_IMAGE.src)]);
  }
  if (pageId === "projects") {
    return projectMedia();
  }
  if (pageId === "blog") {
    return compact([mediaItem("blog-default", "Default cover", BLOG_DEFAULT_IMAGE)]);
  }

  return [];
}

function uniqueMedia(items: PageCopyMediaItem[]): PageCopyMediaItem[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.src)) {
      return false;
    }
    seen.add(item.src);
    return true;
  });
}

export function mediaForPage(pageId: PageCopyId, source: unknown): PageCopyMediaItem[] {
  return uniqueMedia([...extraFor(pageId), ...collectPageMedia(source)]);
}
