export const BLOG_CONTENT_VERSION = 1;
export const BLOG_REVALIDATE_SECONDS = 60;
export const BLOG_CACHE_TAG = "blog-posts";
export const FEATURED_HOME_LIMIT = 5;
export const FEATURED_ORDER_DEFAULT = 5;
export const TITLE_MIN_LENGTH = 2;
export const TITLE_MAX_LENGTH = 160;
export const CATEGORY_TITLE_MAX_LENGTH = 120;
export const SLUG_MAX_LENGTH = 160;
export const CONTENT_MAX_LENGTH = 100_000;
export const SHORT_DESCRIPTION_MAX_LENGTH = 800;
export const SEO_DESCRIPTION_LIMIT = 160;
export const PLAIN_TEXT_CHUNK_LIMIT = 300;
export const PLAIN_TEXT_TOTAL_LIMIT = 380;
export const HOME_EXCERPT_LIMIT = 140;
export const API_RATE_LIMIT = 60;
export const API_RATE_WINDOW_MS = 60_000;
export const BLOG_POSTS_ANCHOR_ID = "blog-posts";
export const BLOG_HTML_H2_CLASS = "blog-html-heading blog-html-h2";
export const BLOG_HTML_H3_CLASS = "blog-html-heading blog-html-h3";

export const BLOG_BLOCK_TYPES = [
  "heading",
  "description",
  "photo",
  "youtube",
  "gallery",
  "link",
] as const;

export type BlogBlockType = (typeof BLOG_BLOCK_TYPES)[number];
