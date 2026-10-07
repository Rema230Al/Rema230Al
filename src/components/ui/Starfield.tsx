"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight fixed 2D starfield behind the DOM sections.
 * The 3D planets render on top of this.
 */
export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    type Star = { x: number; y: number; r: number; a: number; tw: number; ph: number; v: number };
    let stars: Star[] = [];

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / (w < 768 ? 6000 : 4200));
      stars = Array.from({ length: count }, () => {
        const big = Math.random() < 0.04;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: big ? 0.9 + Math.random() * 0.7 : 0.25 + Math.random() * 0.55,
          a: 0.15 + Math.random() * 0.6,
          tw: 0.4 + Math.random() * 1.6,
          ph: Math.random() * Math.PI * 2,
          v: 0.004 + Math.random() * 0.012,
        };
      });
    };

    const draw = (t: number) => {
      const time = t / 1000;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#f5f5f0";
      for (const s of stars) {
        if (!reduce) {
          s.x -= s.v;
          if (s.x < -2) s.x = w + 2;
        }
        const twinkle = reduce ? 1 : 0.65 + 0.35 * Math.sin(time * s.tw + s.ph);
        ctx.globalAlpha = Math.min(1, s.a * twinkle * 0.55);
        const r = s.r;
        if (r < 0.9) {
          ctx.fillRect(s.x - r, s.y - r, r * 2, r * 2); // tiny stars: a square is indistinguishable and far cheaper
        } else {
          ctx.beginPath();
          ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    build();
    raf = requestAnimationFrame(draw);
    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 150);
    };
    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(draw);
    };
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0" />;
}
