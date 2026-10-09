import type { PageCopyId } from "@/lib/page-copy/constants";
import type { PageCopyMediaItem } from "@/lib/page-copy/model-types";

const LIST_KEYS: Partial<Record<PageCopyId, string>> = {
  "what-we-do": "products",
  services: "items",
  "services-detail": "blocks",
  "about-projects": "items",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function writeMediaSrc(target: unknown, path: string, src: string): void {
  const segments = path.split(".");
  let current: unknown = target;

  for (const segment of segments.slice(0, -1)) {
    if (!current || typeof current !== "object") {
      return;
    }
    current = (current as Record<string, unknown>)[segment];
  }

  if (!isRecord(current)) {
    return;
  }

  const leaf = segments[segments.length - 1];
  if (leaf && typeof current[leaf] === "string") {
    current[leaf] = src;
  }
}

function removeMediaItem(root: unknown, path: string): void {
  const parts = path.split(".").slice(0, -1);
  let parent: unknown = root;
  let list: unknown[] | null = null;
  let index = -1;

  for (const part of parts) {
    if (Array.isArray(parent) && /^\d+$/.test(part)) {
      list = parent;
      index = Number(part);
      parent = parent[index];
      continue;
    }
    if (!isRecord(parent)) {
      return;
    }
    parent = parent[part];
  }

  if (list && index >= 0 && index < list.length) {
    list.splice(index, 1);
  }
}

function blankFromTemplate(template: unknown, item: PageCopyMediaItem): Record<string, unknown> {
  const clone = isRecord(template) ? (structuredClone(template) as Record<string, unknown>) : {};
  clone.id = item.id;
  if ("title" in clone || !isRecord(template)) {
    clone.title = item.label;
  }
  if ("name" in clone) {
    clone.name = item.label;
  }
  if ("brandName" in clone) {
    clone.brandName = item.label;
  }
  if ("logoSrc" in clone || !isRecord(template)) {
    clone.logoSrc = item.src;
  }
  if ("imageSrc" in clone) {
    clone.imageSrc = item.src;
  }
  if ("imageAlt" in clone) {
    clone.imageAlt = item.label;
  }
  return clone;
}

function appendTeamMember(root: unknown, item: PageCopyMediaItem): void {
  if (!isRecord(root) || !Array.isArray(root.rows)) {
    return;
  }

  const member = {
    id: item.id,
    name: item.label,
    role: "",
    imageSrc: item.src,
    imageAlt: item.label,
  };
  const last = root.rows[root.rows.length - 1];
  if (isRecord(last) && Array.isArray(last.members)) {
    last.members.push(member);
    return;
  }

  root.rows.push({ id: item.id, members: [member] });
}

function appendListedItem(pageId: PageCopyId, root: unknown, item: PageCopyMediaItem): void {
  if (pageId === "about-team") {
    appendTeamMember(root, item);
    return;
  }

  const key = LIST_KEYS[pageId];
  if (!key || !isRecord(root) || !Array.isArray(root[key])) {
    return;
  }

  const list = root[key] as unknown[];
  list.push(blankFromTemplate(list[list.length - 1], item));
}

function storedById(items: PageCopyMediaItem[]): Map<string, PageCopyMediaItem> {
  return new Map(items.map((item) => [item.id, item]));
}

/** Replaces, removes, and appends images that live inside page content. */
export function applyPageMedia<T>(pageId: PageCopyId, source: T, builtin: PageCopyMediaItem[], stored: PageCopyMediaItem[]): T {
  const clone = structuredClone(source);
  const saved = storedById(stored);
  const known = new Set(builtin.map((item) => item.id));

  for (const item of builtin) {
    const next = saved.get(item.id);
    if (next && item.id.includes(".")) {
      writeMediaSrc(clone, item.id, next.src);
    }
  }

  const removed = builtin
    .filter((item) => item.id.includes(".") && !saved.has(item.id))
    .map((item) => item.id)
    .sort((left, right) => right.localeCompare(left, undefined, { numeric: true }));

  for (const path of removed) {
    removeMediaItem(clone, path);
  }

  for (const item of stored) {
    if (!known.has(item.id) && item.kind === "image") {
      appendListedItem(pageId, clone, item);
    }
  }

  return clone;
}
