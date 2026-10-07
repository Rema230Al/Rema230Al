import type { PlanetSlug } from "@/data/planets";

/**
 * Where each planet sits in the shared 3D scene. Sections tween these with GSAP; the canvas reads them every frame.
 * x/y: -1..1 across the viewport, size: diameter as a fraction of viewport height.
 */
export type Body = { x: number; y: number; size: number; opacity: number; spin: number };

const body = (): Body => ({ x: 0, y: 0, size: 0.6, opacity: 0, spin: 0 });

export const stage: Record<PlanetSlug, Body> = {
  earth: body(),
  neptune: body(),
  mars: body(),
  saturn: body(),
};
