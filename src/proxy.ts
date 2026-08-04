import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = handleI18nRouting(request);
  if (response.status === 307 && response.headers.has("location")) {
    return new Response(response.body, {
      status: 308,
      headers: response.headers,
    });
  }
  return response;
}

export const config = {
  // Match all pathnames except for API routes, Next.js internals, and static files
  matcher: [
    "/",
    "/(en)/:path*",
    "/((?!api|_next|_vercel|sitemap\\.xml|robots\\.txt|.*\\..*).*)",
  ],
};
