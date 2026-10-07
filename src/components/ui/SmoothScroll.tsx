"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis } from "@/lib/scroll";

export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // native scrolling for reduced motion

    const lenis = new Lenis({
      lerp: 0.18, // high lerp = page tracks the wheel closely, just softened
      wheelMultiplier: 1.1,
      touchMultiplier: 1.6,
    });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // Let triggers remeasure once mounted.
  useEffect(() => {
    const remeasure = () => {
      ScrollTrigger.sort(); // keep triggers in page order, whatever order they were created in
      ScrollTrigger.refresh();
    };
    const id = requestAnimationFrame(remeasure);
    // web fonts swapping in change text heights, and with them every pin position
    let alive = true;
    document.fonts?.ready.then(() => alive && remeasure());
    return () => {
      alive = false;
      cancelAnimationFrame(id);
    };
  }, []);

  return null;
}
