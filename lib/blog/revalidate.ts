import "server-only";

import { revalidatePath, revalidateTag } from "next/cache";
import { BLOG_CACHE_TAG } from "@/lib/blog/constants";
import { LOCALES } from "@/lib/i18n";

export function revalidateBlog(slugs: string[] = []): void {
  revalidateTag(BLOG_CACHE_TAG, "max");
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  revalidatePath("/admin/blog/categories");
  revalidatePath("/api/blog-posts");

  for (const locale of LOCALES) {
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/blog`);
  }

  for (const slug of slugs) {
    revalidatePath(`/blog/${slug}`);
    for (const locale of LOCALES) {
      revalidatePath(`/${locale}/blog/${slug}`);
    }
  }
}
