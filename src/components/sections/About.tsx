"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { revealOnScroll } from "@/lib/reveal";
import { ABOUT } from "@/data/content";
import SectionHeading from "@/components/ui/SectionHeading";

export default function About() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => revealOnScroll(root.current!), { scope: root });

  return (
    <section
      ref={root}
      id="about"
      aria-label="About me section"
      className="relative grid gap-16 px-[var(--gutter)] py-[16svh] md:grid-cols-12"
    >
      <div className="md:col-span-6">
        <SectionHeading chapter={ABOUT.chapter} title={ABOUT.title} desc={ABOUT.desc} />
      </div>

      <ol aria-label="Study timeline" className="relative space-y-14 border-l border-line pl-8 md:col-span-5 md:col-start-8 md:self-center md:pl-12">
        {ABOUT.timeline.map((t) => (
          <li key={t.year} className="rv-fade relative">
            <span aria-hidden className="absolute -left-[calc(2rem+3px)] top-1 h-[5px] w-[5px] rounded-full bg-ink md:-left-[calc(3rem+3px)]" />
            <p className="label">{t.label}</p>
            <p className="display mt-3 text-[length:var(--fs-huge)]">{t.year}</p>
            <p className="mt-4 font-light text-ink/70">{t.subtitle}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
