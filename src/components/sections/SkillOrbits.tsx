import type { CSSProperties } from "react";
import { SKILLS } from "@/data/content";

// Ring diameter (% of the system) and seconds per revolution, inner → outer
const RINGS = [
  { size: 40, period: 60 },
  { size: 68, period: 90 },
  { size: 96, period: 130 },
];

/** Skills as moons circling an "RN" planet; hovering a moon pauses its ring. */
export default function SkillOrbits() {
  return (
    <div className="skill-orbits rv-fade relative mx-auto aspect-square w-full max-w-[min(720px,80svh)] [container-type:size]">
      <div
        aria-hidden
        className="orbit-core absolute left-1/2 top-1/2 grid h-[15cqw] w-[15cqw] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
      >
        <span className="display text-[4cqw]">RN</span>
      </div>

      {SKILLS.groups.map((g, i) => {
        const { size, period } = RINGS[i];
        const vars = { "--period": `${period}s`, "--dir": i % 2 ? "reverse" : "normal" } as CSSProperties;
        return (
          <div key={g.title} className="pointer-events-none absolute inset-0">
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-line"
              style={{ width: `${size}%`, height: `${size}%` }}
            />
            <p
              aria-hidden
              className="label absolute left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 bg-void px-2"
              style={{ top: `${50 - size / 2}%` }}
            >
              {g.title}
            </p>
            <ul aria-label={g.title} className="orbit absolute inset-0" style={vars}>
              {g.items.map((s, j) => {
                const angle = (360 / g.items.length) * j + 30 + i * 25;
                return (
                  <li
                    key={s}
                    className="absolute left-1/2 top-1/2"
                    style={{ transform: `rotate(${angle}deg) translateX(${size / 2}cqw) rotate(${-angle}deg)` }}
                  >
                    {/* counter-spins with the ring so the label stays upright */}
                    <span className="moon-upright block h-0 w-0">
                      <span className="moon group pointer-events-auto absolute left-[-4px] top-0 flex -translate-y-1/2 items-center gap-2 whitespace-nowrap">
                        <span className="h-2 w-2 rounded-full bg-ink/70 transition-[transform,background-color,box-shadow] duration-500 group-hover:scale-150 group-hover:bg-ink group-hover:shadow-[0_0_14px_4px_rgba(150,180,255,0.7)]" />
                        <span className="text-[13px] text-ink/70 transition-colors duration-500 group-hover:text-ink">{s}</span>
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
