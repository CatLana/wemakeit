"use client";

import { useEffect } from "react";

/** Resets scroll to top on every page mount — prevents Next.js scroll restoration from showing the middle of the page when navigating back to it. */
export default function PageScrollReset() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);
  return null;
}
