import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for API routes, Next.js internals, and static files
  matcher: [
    "/",
    "/(en|it|ru)/:path*",
    "/((?!api|_next|_vercel|sitemap\\.xml|robots\\.txt|.*\\..*).*)",
  ],
};
