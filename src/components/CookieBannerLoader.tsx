"use client";

import dynamic from "next/dynamic";

// Defers CookieBanner JS from the initial SSR bundle. Since the banner
// reads localStorage (client-only), ssr: false is correct and safe here.
const CookieBanner = dynamic(() => import("@/components/CookieBanner"), {
  ssr: false,
});

export default function CookieBannerLoader() {
  return <CookieBanner />;
}
