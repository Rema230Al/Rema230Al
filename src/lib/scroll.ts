"use client";

import type Lenis from "lenis";

// Single Lenis instance shared across the app (set by <SmoothScroll />).
let lenis: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  lenis = l;
};

export const getLenis = () => lenis;

export function scrollToTarget(target: string | number | HTMLElement, duration = 2.2) {
  if (lenis) {
    lenis.scrollTo(target, {
      duration,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  } else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: "smooth" });
  }
}
