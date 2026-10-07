"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Small restrained cursor: a dot that follows and a ring that expands over links. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    document.documentElement.classList.add("has-custom-cursor");
    const d = dot.current!;
    const r = ring.current!;
    gsap.set([d, r], { xPercent: -50, yPercent: -50, opacity: 0 });
    const dx = gsap.quickTo(d, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(d, "y", { duration: 0.12, ease: "power3" });
    const rx = gsap.quickTo(r, "x", { duration: 0.5, ease: "power3" });
    const ry = gsap.quickTo(r, "y", { duration: 0.5, ease: "power3" });
    let shown = false;

    const move = (e: PointerEvent) => {
      if (!shown) {
        gsap.to([d, r], { opacity: 1, duration: 0.4 });
        shown = true;
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };
    const leave = () => {
      shown = false;
      gsap.to([d, r], { opacity: 0, duration: 0.3 });
    };
    // DOM interactive elements expand the ring via delegation
    const over = (e: Event) => {
      const t = (e.target as HTMLElement).closest?.("a, button") as HTMLElement | null;
      if (t) r.setAttribute("data-dom", "hover");
      else r.removeAttribute("data-dom");
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] hidden [@media(pointer:fine)]:block">
      <div ref={dot} className="fixed left-0 top-0 h-[5px] w-[5px] rounded-full bg-ink mix-blend-difference" />
      <div
        ref={ring}
        className="fixed left-0 top-0 h-8 w-8 rounded-full border border-ink/35 transition-[width,height,border-color,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] data-[dom=hover]:h-12 data-[dom=hover]:w-12 data-[dom=hover]:border-ink/70"
      />
    </div>
  );
}
