"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

const GA_ID = "G-2M2GP44WYZ";
const STORAGE_KEY = "wemakeit_cookie_consent";

export default function GoogleAnalyticsLoader() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const check = () => setConsented(localStorage.getItem(STORAGE_KEY) === "all");
    check();
    // Fires when consent is accepted in the same tab (custom event from CookieBanner)
    window.addEventListener("wemakeit:consent-updated", check);
    // Fires when consent is set in another tab
    window.addEventListener("storage", check);
    return () => {
      window.removeEventListener("wemakeit:consent-updated", check);
      window.removeEventListener("storage", check);
    };
  }, []);

  if (!consented) return null;

  return <GoogleAnalytics gaId={GA_ID} />;
}
