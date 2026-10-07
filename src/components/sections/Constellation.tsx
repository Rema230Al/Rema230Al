"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedNow } from "@/lib/hooks";
import { pad2 } from "@/lib/format";

/** A star's spot in the square chart (0–100) and which side its label sits on. */
export type Star = { x: number; y: number; side: "left" | "right" };
export type Shape = { stars: Star[]; edges: [number, number][] };

type Props = { index: number; title: string; items: string[]; shape: Shape };

/** One constellation: lines draw star to star on scroll while each star lights up in turn. */
export default function Constellation({ index, title, items, shape }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedNow()) return; // markup default is the final, fully drawn state
      const q = gsap.utils.selector(root);
      const stars = q(".cn-star");
      const lines = q(".cn-line");
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: { trigger: root.current, start: "top 75%", toggleActions: "play none none reverse" },
      });
      const unlit = { opacity: 0.15, scale: 0.5, duration: 0.35 };

      // edges form a tree: the first edge's start lights first, then each edge reaches one new star
      tl.from(stars[shape.edges[0][0]], unlit);
      shape.edges.forEach(([, to], i) => {
        tl.fromTo(lines[i], { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "none" });
        tl.from(stars[to], unlit, "-=0.05");
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <p className="label">
        Const. {pad2(index + 1)} · {title}
      </p>
      <div className="relative mt-8 aspect-square">
        <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
          {shape.edges.map(([a, b]) => (
            <line
              key={`${a}-${b}`}
              className="cn-line"
              x1={shape.stars[a].x}
              y1={shape.stars[a].y}
              x2={shape.stars[b].x}
              y2={shape.stars[b].y}
              pathLength={1}
              stroke="rgb(245 245 240 / 0.28)"
              strokeWidth={0.25}
            />
          ))}
        </svg>

        <ul aria-label={title}>
          {items.map((s, i) => {
            const { x, y, side } = shape.stars[i];
            return (
              <li key={s} className="cn-star absolute" style={{ left: `${x}%`, top: `${y}%` }}>
                <span
                  className={`group absolute top-0 flex -translate-y-1/2 items-center gap-3 whitespace-nowrap ${
                    side === "left" ? "right-0 translate-x-[5px] flex-row-reverse" : "left-0 -translate-x-[5px]"
                  }`}
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-ink shadow-[0_0_8px_rgba(245,245,240,0.45)] transition-[transform,box-shadow] duration-500 group-hover:scale-125 group-hover:shadow-[0_0_18px_5px_rgba(170,200,255,0.75)]" />
                  <span className="text-[13px] text-ink/60 transition-colors duration-500 group-hover:text-ink">{s}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
