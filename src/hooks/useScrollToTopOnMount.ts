"use client";

import { useEffect } from "react";

/**
 * Forces the viewport to the top once the real form (not the Suspense
 * fallback) has mounted. Next.js's built-in scroll-to-top on navigation
 * races with the Suspense boundary swapping in a taller form after the
 * fallback, which can leave the page scrolled to wherever it happened to
 * land mid-swap instead of the top.
 */
export function useScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
    // A second pass after paint catches late layout shifts (e.g. web
    // fonts swapping in) that can nudge the page a few pixels after the
    // first call.
    const id = requestAnimationFrame(() => window.scrollTo(0, 0));
    return () => cancelAnimationFrame(id);
  }, []);
}
