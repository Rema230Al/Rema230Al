"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string, initial = false) {
  const [matches, setMatches] = useState(initial);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return matches;
}

/**
 * Point-in-time checks for ScrollTrigger setup. Scroll animations must be created once, in page
 * order, so they read these at refresh time instead of re-creating themselves when a media
 * query flips (re-creating one out of order makes the triggers below it measure wrong).
 */
export const isMobileNow = () => window.innerWidth < 768;
export const prefersReducedNow = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const useReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");
export const useIsMobile = () => useMediaQuery("(max-width: 767px)");
