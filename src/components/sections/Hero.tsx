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

      // fade-in on load and drift-away on scroll combine, so neither overrides the other
      // (e.g. a reload mid-page keeps the Earth hidden)
      const f = { intro: 0, away: 0 };
      const apply = () => {
        earth.opacity = f.intro * (1 - f.away);
        earth.y = at.y + 0.9 * f.away;
        earth.spin = 1.5 * f.away;
      };
      gsap.to(f, { intro: 1, duration: 2.4, ease: "power2.out", delay: 0.3, onUpdate: apply });
      gsap.to(f, {
        away: 1,
        ease: "none",
        onUpdate: apply,
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.15 },
      });

      gsap.from(".hr-title .mask-inner", { yPercent: 115, stagger: 0.1, duration: 1.6, ease: "expo.out", delay: 0.2 });
      gsap.from(".hr-fade", { opacity: 0, y: 20, stagger: 0.1, duration: 1.2, ease: "power3.out", delay: 0.7 });
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
