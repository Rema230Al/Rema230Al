"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SKILLS } from "@/data/content";

// Elliptical rings in container-width units (cqw), inner → outer. The gaps between rings are wider
// than any label, so labels on different rings never touch; `speed` is rad/s (sign = direction).
const RINGS = [
  { rx: 19, ry: 12, speed: 0.1 },
  { rx: 31, ry: 19, speed: -0.07 },
  { rx: 43, ry: 26, speed: 0.05 },
];

/** Skills as moons circling an "RN" planet; each ring's title rides along as one evenly spaced slot. */
export default function SkillOrbits() {
  const root = useRef<HTMLDivElement>(null);
  const paused = useRef(RINGS.map(() => false));

  useEffect(() => {
    const el = root.current!;
    const slots = [...el.querySelectorAll<HTMLElement>("[data-ring]")];
    const angles = RINGS.map((_, i) => i * 0.9);

    const place = () => {
      for (const s of slots) {
        const i = Number(s.dataset.ring);
        const a = angles[i] + (Number(s.dataset.slot) / Number(s.dataset.count)) * Math.PI * 2;
        s.style.transform = `translate(${RINGS[i].rx * Math.cos(a)}cqw, ${RINGS[i].ry * Math.sin(a)}cqw)`;
      }
    };
    const tick = (_: number, dt: number) => {
      if (!el.offsetParent) return; // hidden: the stacked lists are shown instead
      RINGS.forEach((r, i) => {
        if (!paused.current[i]) angles[i] += (r.speed * dt) / 1000;
      });
      place();
    };

    place();
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <div ref={root} className="skill-orbits rv-fade relative aspect-[100/60] w-full [container-type:inline-size]">
      <div
        aria-hidden
        className="orbit-core absolute left-1/2 top-1/2 grid h-[13cqw] w-[13cqw] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
      >
        <span className="display text-[4.5cqw]">RN</span>
      </div>

      {SKILLS.groups.map((g, i) => {
        const count = g.items.length + 1; // + the ring title
        return (
          <div key={g.title}>
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-line"
              style={{ width: `${RINGS[i].rx * 2}cqw`, height: `${RINGS[i].ry * 2}cqw` }}
            />
            <p aria-hidden data-ring={i} data-slot={0} data-count={count} className="absolute left-1/2 top-1/2">
              <span className="label absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap !text-[clamp(9px,0.8cqw,12px)] !tracking-[0.12em] !text-[#9db8ff]">
                {g.title}
              </span>
            </p>
            <ul aria-label={g.title}>
              {g.items.map((s, j) => (
                <li key={s} data-ring={i} data-slot={j + 1} data-count={count} className="absolute left-1/2 top-1/2">
                  <span
                    onPointerEnter={() => (paused.current[i] = true)}
                    onPointerLeave={() => (paused.current[i] = false)}
                    className="group absolute flex -translate-x-1/2 -translate-y-[0.5cqw] flex-col items-center gap-[0.5cqw] whitespace-nowrap"
                  >
                    <span className="h-[1cqw] w-[1cqw] rounded-full bg-ink/80 transition-[transform,background-color,box-shadow] duration-500 group-hover:scale-150 group-hover:bg-ink group-hover:shadow-[0_0_16px_5px_rgba(150,180,255,0.7)]" />
                    <span className="text-[clamp(12px,1.25cqw,18px)] text-ink/75 transition-colors duration-500 group-hover:text-ink">
                      {s}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
