import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "admin_session";
const LOCALES = ["en", "hy"] as const;
const DEFAULT_LOCALE = "en";

function isLocale(value: string): boolean {
  return (LOCALES as readonly string[]).includes(value);
}

function hasAdminSessionCookie(request: NextRequest): boolean {
  return Boolean(request.cookies.get(SESSION_COOKIE)?.value);
}

export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/admin")) {
      const isLoginPage = pathname === "/admin/login";
      const hasSessionCookie = hasAdminSessionCookie(request);

      if (!hasSessionCookie && !isLoginPage) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }

      if (hasSessionCookie && isLoginPage) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }

      return NextResponse.next();
    }

    if (pathname === "/") {
      return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, request.url));
    }

    const firstSegment = pathname.split("/")[1];

    if (firstSegment && !isLocale(firstSegment) && !pathname.startsWith("/api")) {
      return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
