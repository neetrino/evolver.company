import "server-only";

import { getClientLogos, type ClientLogo } from "@/lib/clients-section";
import { getHomeVideos, type HomeVideoItem } from "@/lib/home-videos";
import type { Locale } from "@/lib/i18n";
import { getPageCopyDefinition } from "@/lib/page-copy/catalog";
import type { PageCopyId } from "@/lib/page-copy/constants";
import { applyPageMedia } from "@/lib/page-copy/media-apply";
import { mediaForPage } from "@/lib/page-copy/media";
import { readPageMedia } from "@/lib/page-copy/media-store";
import { readPageCopy } from "@/lib/page-copy/store";
import { applyCopyOverrides } from "@/lib/page-copy/tree";

const LOGO_WIDTH = 240;
const LOGO_HEIGHT = 240;
const CLIENT_ID_PREFIX = "client-";

/** Built-in copy with saved text and image overrides for one public locale. */
export async function resolvePageCopy<T>(pageId: PageCopyId, locale: Locale): Promise<T> {
  const definition = getPageCopyDefinition(pageId);
  const defaults = definition.load(locale) as T;
  const stored = await readPageCopy(pageId);
  const withText = applyCopyOverrides(defaults, stored[locale] ?? {});
  const media = await readPageMedia(pageId);

  if (!media) {
    return withText;
  }

  return applyPageMedia(pageId, withText, mediaForPage(pageId, definition.load("en")), media);
}

function logoId(itemId: string): string {
  return itemId.startsWith(CLIENT_ID_PREFIX) ? itemId.slice(CLIENT_ID_PREFIX.length) : itemId;
}

/** Client logos with editable names, files, and order. */
export async function resolveClientLogos(locale: Locale): Promise<ClientLogo[]> {
  const names = await resolvePageCopy<Record<string, string>>("clients", locale);
  const builtin = getClientLogos();
  const stored = await readPageMedia("clients");

  if (!stored) {
    return builtin.map((logo) => ({ ...logo, name: names[logo.id] ?? logo.name }));
  }

  const byId = new Map(builtin.map((logo) => [logo.id, logo]));

  return stored
    .filter((item) => item.kind === "image")
    .map((item, index) => {
      const id = logoId(item.id);
      const existing = byId.get(id);
      const accent = existing?.accent ?? (index % 2 === 0 ? "purple" : "cyan");

      return {
        id,
        name: names[id] ?? item.label,
        logoSrc: item.src,
        logoWidth: existing?.logoWidth ?? LOGO_WIDTH,
        logoHeight: existing?.logoHeight ?? LOGO_HEIGHT,
        accent,
      };
    });
}

/** Home showcase videos, including ones added in the admin. */
export async function resolveHomeVideos(): Promise<HomeVideoItem[]> {
  const stored = await readPageMedia("home-videos");
  const builtin = getHomeVideos();

  if (!stored) {
    return builtin;
  }

  const byId = new Map(builtin.map((video) => [video.id, video]));

  return stored
    .filter((item) => item.kind === "video")
    .map((item) => {
      const existing = byId.get(item.id);
      if (existing) {
        return { ...existing, src: item.src };
      }

      return {
        id: item.id,
        src: item.src,
        title: { en: item.label, hy: item.label },
        description: { en: item.label, hy: item.label },
      };
    });
}

/** One built-in image. Null means the admin removed it. */
export async function resolveMediaSrc(pageId: PageCopyId, id: string, fallback: string): Promise<string | null> {
  const stored = await readPageMedia(pageId);
  if (!stored) {
    return fallback;
  }

  return stored.find((item) => item.id === id)?.src ?? null;
}
