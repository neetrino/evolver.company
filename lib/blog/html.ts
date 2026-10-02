import {
  BLOG_HTML_H2_CLASS,
  BLOG_HTML_H3_CLASS,
  PLAIN_TEXT_CHUNK_LIMIT,
  PLAIN_TEXT_TOTAL_LIMIT,
  SEO_DESCRIPTION_LIMIT,
} from "@/lib/blog/constants";

const TAG_PATTERN = /<\/?[a-z][\s\S]*?>/i;
const DANGEROUS_BLOCK =
  /<(script|style|iframe|object|embed)\b[^>]*>[\s\S]*?<\/\1>/gi;
const DANGEROUS_TAG =
  /<\/?(script|style|iframe|object|embed|meta|link)\b[^>]*>/gi;
const ALIGN_VALUES = new Set(["left", "center", "right", "justify"]);
const HEADER_PATTERN =
  /(?:^|(?<=[.!?]\s+))([A-Z][A-Za-z0-9]*(?:\s+[A-Z][A-Za-z0-9]*){0,6}):\s+/g;

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function keepStyle(style: string): string | null {
  const declarations = style.split(";");
  const kept: string[] = [];

  for (const declaration of declarations) {
    const [rawProperty, rawValue] = declaration.split(":");
    if (!rawProperty || !rawValue) {
      continue;
    }

    const property = rawProperty.trim().toLowerCase();
    const value = rawValue.trim().toLowerCase();
    if (property === "text-align" && ALIGN_VALUES.has(value)) {
      kept.push(`text-align: ${value}`);
    }
  }

  return kept.length > 0 ? kept.join("; ") : null;
}

function sanitizeAttributes(tagName: string, rawAttrs: string): string {
  const attrs: string[] = [];
  const attrPattern = /([^\s=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;
  let match = attrPattern.exec(rawAttrs);

  while (match) {
    const name = (match[1] ?? "").toLowerCase();
    const value = match[2] ?? match[3] ?? match[4] ?? "";

    if (!name.startsWith("on")) {
      appendSafeAttribute(attrs, name, value);
    }

    match = attrPattern.exec(rawAttrs);
  }

  return appendHeadingClass(tagName, attrs);
}

function appendSafeAttribute(attrs: string[], name: string, value: string): void {
  if ((name === "href" || name === "src") && /^\s*javascript:/i.test(value)) {
    attrs.push(`${name}="#"`);
    return;
  }

  if (name === "style") {
    const style = keepStyle(value);
    if (style) {
      attrs.push(`style="${escapeHtml(style)}"`);
    }
    return;
  }

  if (name === "align") {
    const align = value.trim().toLowerCase();
    if (ALIGN_VALUES.has(align)) {
      attrs.push(`align="${align}"`);
    }
    return;
  }

  if (name === "color") {
    return;
  }

  attrs.push(value ? `${name}="${escapeHtml(value)}"` : name);
}

function appendHeadingClass(tagName: string, attrs: string[]): string {
  const hasClass = attrs.some((attr) => attr.startsWith("class="));
  if (!hasClass && tagName === "h2") {
    attrs.push(`class="${BLOG_HTML_H2_CLASS}"`);
  }
  if (!hasClass && tagName === "h3") {
    attrs.push(`class="${BLOG_HTML_H3_CLASS}"`);
  }

  return attrs.length > 0 ? ` ${attrs.join(" ")}` : "";
}

export function sanitizeBlogHtml(html: string): string {
  const stripped = html.replace(DANGEROUS_BLOCK, "").replace(DANGEROUS_TAG, "");

  return stripped.replace(/<([a-zA-Z0-9]+)([^>]*)>/g, (_match, name: string, attrs: string) => {
    const tagName = name.toLowerCase();
    return `<${tagName}${sanitizeAttributes(tagName, attrs)}>`;
  });
}

function splitSentences(chunk: string): string[] {
  const parts = chunk
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter((part) => part.length > 0);

  return parts.length > 0 ? parts : [chunk];
}

function splitParagraphs(text: string): string[] {
  const chunks = text
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length > 0);
  const paragraphs = chunks.length > 0 ? chunks : [text.trim()];

  if (text.length <= PLAIN_TEXT_TOTAL_LIMIT) {
    return paragraphs;
  }

  return paragraphs.flatMap((chunk) =>
    chunk.length > PLAIN_TEXT_CHUNK_LIMIT ? splitSentences(chunk) : [chunk],
  );
}

function paragraphToHtml(paragraph: string): string {
  const sections: string[] = [];
  let cursor = 0;

  for (const match of paragraph.matchAll(HEADER_PATTERN)) {
    const index = match.index ?? 0;
    const before = paragraph.slice(cursor, index).trim();
    if (before) {
      sections.push(`<p>${escapeHtml(before)}</p>`);
    }

    const header = match[1] ?? "";
    sections.push(`<h2 class="${BLOG_HTML_H2_CLASS}">${escapeHtml(header)}</h2>`);
    cursor = index + match[0].length;
  }

  const rest = paragraph.slice(cursor).trim();
  if (rest) {
    sections.push(`<p>${escapeHtml(rest)}</p>`);
  }

  return sections.join("");
}

export function plainTextToHtml(text: string): string {
  const normalized = text.replace(/\r\n/g, "\n").trim();
  if (!normalized) {
    return "";
  }

  return splitParagraphs(normalized).map(paragraphToHtml).join("");
}

export function prepareBlogHtml(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) {
    return "";
  }

  if (TAG_PATTERN.test(trimmed)) {
    return sanitizeBlogHtml(trimmed);
  }

  return plainTextToHtml(trimmed);
}

export function stripHtmlTags(value: string): string {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function toMetaDescription(shortDescription: string, content: string): string {
  const source = stripHtmlTags(shortDescription) || stripHtmlTags(content);
  if (source.length <= SEO_DESCRIPTION_LIMIT) {
    return source;
  }

  const cut = source.slice(0, SEO_DESCRIPTION_LIMIT);
  const lastSpace = cut.lastIndexOf(" ");
  const bounded = lastSpace > 0 ? cut.slice(0, lastSpace) : cut;
  return `${bounded.trim()}…`;
}

export function truncateExcerpt(value: string, limit: number): string {
  const trimmed = value.trim();
  if (trimmed.length <= limit) {
    return trimmed;
  }

  const cut = trimmed.slice(0, limit);
  const lastSpace = cut.lastIndexOf(" ");
  const bounded = lastSpace > Math.floor(limit * 0.6) ? cut.slice(0, lastSpace) : cut;
  return `${bounded.trim()}…`;
}
