import "server-only";

import { getClientLogos, type ClientLogo } from "@/lib/clients-section";
import type { Locale } from "@/lib/i18n";
import { getPageCopyDefinition } from "@/lib/page-copy/catalog";
import type { PageCopyId } from "@/lib/page-copy/constants";
import { readPageCopy } from "@/lib/page-copy/store";
import { applyCopyOverrides } from "@/lib/page-copy/tree";

/** Built-in copy with saved overrides for one public locale. */
export async function resolvePageCopy<T>(pageId: PageCopyId, locale: Locale): Promise<T> {
  const defaults = getPageCopyDefinition(pageId).load(locale) as T;
  const stored = await readPageCopy(pageId);
  return applyCopyOverrides(defaults, stored[locale] ?? {});
}

/** Client logos with editable display names. */
export async function resolveClientLogos(locale: Locale): Promise<ClientLogo[]> {
  const names = await resolvePageCopy<Record<string, string>>("clients", locale);

  return getClientLogos().map((logo) => ({
    ...logo,
    name: names[logo.id] ?? logo.name,
  }));
}
