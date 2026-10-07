"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { isMobileNow, prefersReducedNow } from "@/lib/hooks";
import { revealOnScroll } from "@/lib/reveal";
import { stage, trackNear } from "@/lib/stage";
import type { ProjectItem } from "@/data/content";
import SplitWords from "@/components/ui/SplitWords";

const btn =
  "inline-flex items-center gap-3 rounded-full border px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-500";

/** A pinned scene (desktop): the project's planet rises behind the mockup, holds, then flies off. */
export default function Project({ project, reverse }: { project: ProjectItem; reverse: boolean }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mobile = isMobileNow();
      const q = gsap.utils.selector(root);
      const body = stage[project.planet];
      const at = mobile ? { x: 0, y: 0, size: 0.55 } : { x: reverse ? -0.5 : 0.5, y: 0, size: 0.78 };

      revealOnScroll(root.current!);

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: mobile ? "top bottom" : "top top",
          end: () => (mobile ? "bottom top" : `+=${window.innerHeight}`),
          pin: !mobile,
          scrub: prefersReducedNow() ? true : 0.05,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        body,
        { ...at, y: at.y - 1.3, size: at.size * 0.5, opacity: 0, spin: 0 },
        { ...at, opacity: mobile ? 0.6 : 1, spin: 1.2, duration: 0.4, ease: "power2.out" },
        0,
      );
      tl.from(q(".pj-shot"), { opacity: 0, y: 80, scale: 0.94, duration: 0.3, ease: "power2.out" }, 0.1);
      tl.to(body, { y: at.y + 1.3, size: at.size * 1.2, opacity: 0, spin: 2.4, duration: 0.3, ease: "power2.in" }, 0.7);
      if (!mobile) tl.to(q(".pj-content"), { opacity: 0, y: -40, duration: 0.3 }, 0.7);

      trackNear(project.planet, root.current!); // after the pin, so it measures the pinned length
    },
    { scope: root },
  );

  return (
    <article
      ref={root}
      aria-label={`Project: ${project.title}`}
      className="pj-content relative grid min-h-[100svh] items-center gap-12 px-[var(--gutter)] py-[12svh] md:grid-cols-12 md:py-0"
    >
      <div className={`md:col-span-5 ${reverse ? "md:order-2 md:col-start-8" : ""}`}>
        <p className="rv-fade label">{project.category}</p>
        <h3 className="rv-title display mt-4 text-[clamp(2.5rem,5vw,5rem)]">
          <SplitWords text={project.title} />
        </h3>
        <ul aria-label="Technologies used" className="rv-fade mt-6 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-ink/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/80"
            >
              {t}
            </li>
          ))}
        </ul>
        <span aria-hidden className="rv-fade mt-8 block h-px w-16 bg-ink/30" />
        <p className="rv-fade mt-6 max-w-xl font-light leading-relaxed text-ink/75">{project.desc}</p>
        <div className="rv-fade mt-8 flex flex-wrap gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} source code on GitHub, opens in new tab`}
            className={`${btn} border-ink/25 hover:border-ink/70 hover:bg-ink/[0.05]`}
          >
            GitHub
          </a>
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.title} live website, opens in new tab`}
              className={`${btn} border-ink bg-ink text-void hover:bg-ink/85`}
            >
              Visit Website
            </a>
          )}
        </div>
      </div>

      <div className={`md:col-span-7 ${reverse ? "md:order-1" : ""}`}>
        <Image
          src={project.image.src}
          width={project.image.width}
          height={project.image.height}
          alt={`${project.title} screenshot`}
          className="pj-shot mx-auto h-auto max-h-[60svh] w-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
        />
      </div>
    </article>
  );
}
