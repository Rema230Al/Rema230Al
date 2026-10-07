"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { revealOnScroll } from "@/lib/reveal";
import { pad2 } from "@/lib/format";
import { SKILLS } from "@/data/content";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillOrbits from "./SkillOrbits";

export default function Skills() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => revealOnScroll(root.current!), { scope: root });

  return (
    <section
      ref={root}
      id="skills"
      aria-label="Skills section"
      className="relative grid gap-16 px-[var(--gutter)] py-[16svh] md:grid-cols-12 md:items-center"
    >
      <div className="md:col-span-4">
        <SectionHeading chapter={SKILLS.chapter} title={SKILLS.title} desc={SKILLS.desc} />
      </div>

      <div className="md:col-span-8">
        <SkillOrbits />

        {/* mobile / reduced motion: plain stacked lists */}
        <div className="skill-lists grid gap-12 sm:grid-cols-3 sm:gap-8">
          {SKILLS.groups.map((g, i) => (
            <div key={g.title} aria-label={g.title} className="border-t border-line pt-6">
              <p className="rv-fade label">{pad2(i + 1)}</p>
              <h3 className="rv-fade mt-3 text-[length:var(--fs-lg)] font-light tracking-[-0.02em]">{g.title}</h3>
              <ul className="mt-6 space-y-2">
                {g.items.map((s) => (
                  <li key={s} className="rv-fade text-ink/70 transition-colors hover:text-ink">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
