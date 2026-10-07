"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { revealOnScroll } from "@/lib/reveal";
import { SKILLS } from "@/data/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Constellation, { type Shape } from "./Constellation";

// One hand-placed shape per skill group, in SKILLS.groups order (star i = item i).
// Edges form a tree so every star is reached exactly once; labels sit clear of each other.
const SHAPES: Shape[] = [
  {
    stars: [
      { x: 10, y: 18, side: "right" },
      { x: 42, y: 40, side: "right" },
      { x: 16, y: 72, side: "right" },
      { x: 72, y: 82, side: "left" },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [1, 3],
    ],
  },
  {
    stars: [
      { x: 6, y: 8, side: "right" },
      { x: 30, y: 26, side: "right" },
      { x: 10, y: 48, side: "right" },
      { x: 56, y: 50, side: "right" },
      { x: 92, y: 14, side: "left" },
      { x: 86, y: 76, side: "left" },
      { x: 34, y: 92, side: "right" },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [1, 3],
      [3, 4],
      [3, 5],
      [5, 6],
    ],
  },
  {
    stars: [
      { x: 8, y: 26, side: "right" },
      { x: 26, y: 62, side: "right" },
      { x: 50, y: 36, side: "right" },
      { x: 66, y: 74, side: "right" },
      { x: 92, y: 8, side: "left" },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [2, 4],
    ],
  },
];

export default function Skills() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => revealOnScroll(root.current!), { scope: root });

  return (
    <section ref={root} id="skills" aria-label="Skills section" className="relative px-[var(--gutter)] py-[16svh]">
      <SectionHeading chapter={SKILLS.chapter} title={SKILLS.title} desc={SKILLS.desc} />

      <div className="relative mt-20">
        <div aria-hidden className="star-grid pointer-events-none absolute -inset-x-[var(--gutter)] -inset-y-16" />
        <div className="relative mx-auto grid max-w-sm gap-20 lg:max-w-none lg:grid-cols-3 lg:gap-12">
          {SKILLS.groups.map((g, i) => (
            <Constellation key={g.title} index={i} title={g.title} items={g.items} shape={SHAPES[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}
