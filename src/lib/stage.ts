import { ScrollTrigger } from "@/lib/gsap";
import type { PlanetSlug } from "@/data/planets";

/**
 * Where each planet sits in the shared 3D scene. Sections tween these with GSAP; the canvas reads them every frame.
 * x/y: -1..1 across the viewport, size: diameter as a fraction of viewport height,
 * near: its section is within a screen of the viewport, so the canvas keeps it mounted.
 */
export type Body = { x: number; y: number; size: number; opacity: number; spin: number; near: boolean };

const body = (): Body => ({ x: 0, y: 0, size: 0.6, opacity: 0, spin: 0, near: false });

export const stage: Record<PlanetSlug, Body> = {
  earth: body(),
  neptune: body(),
  mars: body(),
  saturn: body(),
};

/** Keeps `stage[slug].near` true while `trigger` is within one screen of the viewport. Call inside useGSAP. */
export function trackNear(slug: PlanetSlug, trigger: Element) {
  ScrollTrigger.create({
    trigger,
    start: () => `top bottom+=${window.innerHeight}`,
    end: () => `bottom top-=${window.innerHeight}`,
    invalidateOnRefresh: true,
    onToggle: (self) => (stage[slug].near = self.isActive),
  });
}
