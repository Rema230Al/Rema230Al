"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { revealOnScroll } from "@/lib/reveal";
import { SKILLS } from "@/data/content";
import SectionHeading from "@/components/ui/SectionHeading";

const pad2 = (n: number) => String(n).padStart(2, "0");

export default function Skills() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => revealOnScroll(root.current!), { scope: root });

  return (
    <section ref={root} id="skills" aria-label="Skills section" className="relative px-[var(--gutter)] py-[16svh]">
      <SectionHeading chapter={SKILLS.chapter} title={SKILLS.title} desc={SKILLS.desc} />

      <div className="mt-20 grid gap-12 sm:grid-cols-3 sm:gap-8">
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
    </section>
  );
}
