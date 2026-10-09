const SKIP_KEYS = new Set([
  "id",
  "key",
  "icon",
  "accent",
  "reversed",
  "gradient",
  "emphasis",
  "width",
  "height",
  "logoWidth",
  "logoHeight",
  "poster",
  "src",
]);

function joinPath(prefix: string, key: string): string {
  return prefix ? `${prefix}.${key}` : key;
}

function shouldSkipKey(key: string): boolean {
  return SKIP_KEYS.has(key) || key.endsWith("Src");
}

/** Dot-paths of user-facing strings. Structural and media keys are skipped. */
export function collectCopyPaths(value: unknown, prefix = ""): string[] {
  if (typeof value === "string") {
    return prefix ? [prefix] : [];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collectCopyPaths(item, joinPath(prefix, String(index))));
  }

  if (!value || typeof value !== "object") {
    return [];
  }

  return Object.entries(value).flatMap(([key, child]) => {
    if (shouldSkipKey(key)) {
      return [];
    }

    return collectCopyPaths(child, joinPath(prefix, key));
  });
}

export function readStringPath(value: unknown, path: string): string | null {
  let current: unknown = value;

  for (const segment of path.split(".")) {
    if (!current || typeof current !== "object") {
      return null;
    }

    current = (current as Record<string, unknown>)[segment];
  }

  return typeof current === "string" ? current : null;
}

function writeStringPath(target: unknown, path: string, value: string): void {
  const segments = path.split(".");
  let current: unknown = target;

  for (const segment of segments.slice(0, -1)) {
    if (!current || typeof current !== "object") {
      return;
    }

    current = (current as Record<string, unknown>)[segment];
  }

  if (!current || typeof current !== "object") {
    return;
  }

  const leaf = segments[segments.length - 1];
  if (!leaf || typeof (current as Record<string, unknown>)[leaf] !== "string") {
    return;
  }

  (current as Record<string, unknown>)[leaf] = value;
}

/** Applies only paths that already exist as strings on the defaults. */
export function applyCopyOverrides<T>(defaults: T, overrides: Record<string, string>): T {
  const clone = structuredClone(defaults);

  for (const [path, value] of Object.entries(overrides)) {
    if (typeof value === "string") {
      writeStringPath(clone, path, value);
    }
  }

  return clone;
}
