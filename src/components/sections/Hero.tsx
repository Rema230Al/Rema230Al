"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { isMobileNow } from "@/lib/hooks";
import { stage } from "@/lib/stage";
import { HERO } from "@/data/content";
import SplitWords from "@/components/ui/SplitWords";
import MagneticLink from "@/components/ui/MagneticLink";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const earth = stage.earth;
      const at = isMobileNow() ? { x: 0, y: -0.62, size: 0.5 } : { x: 0.55, y: -0.05, size: 0.82 };
      Object.assign(earth, at, { opacity: 0 });

      gsap.to(earth, { opacity: 1, duration: 2.4, ease: "power2.out", delay: 0.3 });
      gsap.from(".hr-title .mask-inner", { yPercent: 115, stagger: 0.1, duration: 1.6, ease: "expo.out", delay: 0.2 });
      gsap.from(".hr-fade", { opacity: 0, y: 20, stagger: 0.1, duration: 1.2, ease: "power3.out", delay: 0.7 });

      // scrolling away: the Earth drifts up and dims
      gsap.fromTo(
        earth,
        { y: at.y, opacity: 1, spin: 0 },
        {
          y: at.y + 0.9,
          opacity: 0,
          spin: 1.5,
          ease: "none",
          immediateRender: false,
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.15 },
        },
      );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="hero"
      aria-label="Hero section"
      className="relative flex min-h-[100svh] flex-col justify-start px-[var(--gutter)] pt-[18svh] md:justify-center md:pt-0"
    >
      <p className="hr-fade label flex items-center gap-4">
        <span aria-hidden className="h-px w-10 bg-ink/40" />
        {HERO.welcome}
      </p>
      <h1 className="hr-title display mt-6 text-[clamp(3rem,8vw,8.5rem)]">
        <SplitWords text={HERO.name[0]} />
        <br />
        <SplitWords text={HERO.name[1]} />
      </h1>
      <p className="hr-fade mt-8 font-mono text-[12px] uppercase tracking-[0.2em] text-ink/80">{HERO.role}</p>
      <p className="hr-fade mt-3 max-w-md text-[length:var(--fs-md)] font-light text-ink/70">{HERO.desc}</p>
      <div className="hr-fade mt-10">
        <MagneticLink
          href={HERO.cta.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Explore my work on GitHub, opens in new tab"
        >
          <span>{HERO.cta.label}</span>
          <span aria-hidden>→</span>
        </MagneticLink>
      </div>
    </section>
  );
}
