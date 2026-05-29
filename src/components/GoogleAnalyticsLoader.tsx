"use client";

import { useEffect } from "react";
import Script from "next/script";

const GA_ID = "G-MQ2ZVBMQWW";
const STORAGE_KEY = "wemakeit_cookie_consent";

declare global {
  interface Window {
    gtag(command: string, ...args: unknown[]): void;
    dataLayer: unknown[];
  }
}

function updateConsent(granted: boolean) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: granted ? "granted" : "denied",
      ad_storage: "denied", // we do not run ads
    });
  }
}

export default function GoogleAnalyticsLoader() {
  useEffect(() => {
    // Apply stored consent immediately so GA gets the right state on load.
    const check = () =>
      updateConsent(localStorage.getItem(STORAGE_KEY) === "all");
    check();
    window.addEventListener("wemakeit:consent-updated", check);
    window.addEventListener("storage", check);
    return () => {
      window.removeEventListener("wemakeit:consent-updated", check);
      window.removeEventListener("storage", check);
    };
  }, []);

  // The tag is always present so GA can verify/detect it.
  // Actual data collection is gated by the consent state above.
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){window.dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}
