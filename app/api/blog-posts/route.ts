import { NextResponse } from "next/server";
import { isRateLimited } from "@/lib/blog/rate-limit";
import { getPublishedBlogPosts } from "@/lib/blog/queries";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || "local";
}

function readLocale(request: Request): Locale {
  const locale = new URL(request.url).searchParams.get("locale");
  return locale && isLocale(locale) ? locale : DEFAULT_LOCALE;
}

export async function GET(request: Request): Promise<NextResponse> {
  if (isRateLimited(`blog-posts:${clientKey(request)}`)) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  const data = await getPublishedBlogPosts(readLocale(request));
  return NextResponse.json({ ok: true, data });
}
