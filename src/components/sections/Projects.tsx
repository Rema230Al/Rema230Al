"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { revealOnScroll } from "@/lib/reveal";
import { PROJECTS } from "@/data/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Project from "./Project";

export default function Projects() {
  const head = useRef<HTMLDivElement>(null);
  useGSAP(() => revealOnScroll(head.current!), { scope: head });

  return (
    <section id="projects" aria-label="Projects section" className="relative">
      <div ref={head} className="px-[var(--gutter)] pt-[16svh]">
        <SectionHeading chapter={PROJECTS.chapter} title={PROJECTS.title} desc={PROJECTS.desc} />
      </div>
      {PROJECTS.items.map((p, i) => (
        <Project key={p.title} project={p} reverse={i % 2 === 1} />
      ))}
    </section>
  );
}
