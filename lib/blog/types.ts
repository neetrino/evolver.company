import type { BlogContentBlock, BlogGalleryItem, PublicBlogBlock } from "@/lib/blog/blocks";
import type { LocaleTextMap } from "@/lib/blog/translatable";

export type BlogCategoryRef = {
  id: string;
  slug: string;
  title: string;
};

export type BlogListItem = {
  id: string;
  title: string;
  slug: string;
  content: string;
  shortDescription: string;
  image: string | null;
  headerImage: string | null;
  gallery: BlogGalleryItem[];
  publishedAt: string;
  order: number;
  category: BlogCategoryRef | null;
};

export type BlogDetail = BlogListItem & {
  blocks: PublicBlogBlock[];
};

export type BlogCategoryTab = {
  id: string;
  slug: string;
  title: string;
};

export type BlogImageValue = {
  url: string;
  key: string;
};

export type BlogPostFormValues = {
  titles: LocaleTextMap;
  shortDescriptions: LocaleTextMap;
  slug: string;
  categoryId: string;
  publishedAt: string;
  blocks: BlogContentBlock[];
  image: BlogImageValue | null;
  headerImage: BlogImageValue | null;
  isPublished: boolean;
  featuredOnHome: boolean;
  featuredOrder: string;
};

export type AdminBlogPostRow = {
  id: string;
  slug: string;
  title: string;
  image: string | null;
  publishedAt: string;
  isPublished: boolean;
  featuredOnHome: boolean;
  featuredOrder: number | null;
  categoryTitle: string;
};

export type AdminBlogCategoryRow = {
  id: string;
  slug: string;
  title: string;
  order: number;
};

export type BlogCategoryOption = {
  id: string;
  title: string;
};
