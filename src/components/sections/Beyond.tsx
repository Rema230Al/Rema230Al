"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedNow } from "@/lib/hooks";
import { revealOnScroll } from "@/lib/reveal";
import { scrollToTarget } from "@/lib/scroll";
import { BEYOND } from "@/data/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Lightbox from "@/components/ui/Lightbox";

const link = "link-underline font-mono text-[11px] uppercase tracking-[0.2em] text-ink/80 hover:text-ink";

/** A calm vertical log: one glowing line, each entry revealed as it scrolls in. */
export default function Beyond() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedNow()) return; // everything is visible by default
      revealOnScroll(root.current!);
      gsap.utils.toArray<HTMLElement>(".bx-item", root.current).forEach((item) =>
        gsap.from(item, {
          opacity: 0,
          y: 30,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 80%", toggleActions: "play none none reverse" },
        }),
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} id="beyond" aria-label="Beyond the code section" className="relative px-[var(--gutter)] py-[16svh]">
      <SectionHeading chapter={BEYOND.chapter} title={BEYOND.title} />

      <div className="relative mt-20 md:ml-[8vw]">
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[#9db8ff]/60 to-transparent shadow-[0_0_10px_rgba(120,160,255,0.5)]"
        />
        <ol className="max-w-3xl space-y-24 pl-8 md:pl-16">
          {BEYOND.items.map((item) => (
            <li key={item.title} className="bx-item relative">
              <span
                aria-hidden
                className="absolute -left-8 top-1 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-ink shadow-[0_0_12px_3px_rgba(157,184,255,0.6)] md:-left-16"
              />
              <p className="label">{item.label}</p>
              <h3 className="mt-3 text-[length:var(--fs-lg)] font-light leading-tight tracking-[-0.02em]">{item.title}</h3>
              <p className="mt-4 max-w-xl font-light leading-relaxed text-ink/70">{item.text}</p>

              {item.stats && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {item.stats.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-ink/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/80"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}

              {item.link && (
                <a
                  href={item.link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToTarget(item.link.href, 2);
                  }}
                  className={`${link} mt-6 inline-block`}
                >
                  {item.link.label}
                </a>
              )}

              {item.thumb && (
                <div className="mt-8">
                  <Lightbox {...item.thumb} />
                </div>
              )}

              {item.shots && (
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {item.shots.map((m) => (
                    <figure key={m.src}>
                      <Image src={m.src} width={m.width} height={m.height} alt={m.alt} className="h-auto w-full rounded-md border border-line" />
                      <figcaption className="label mt-3">{m.caption}</figcaption>
                      {m.link && (
                        <a href={m.link.href} target="_blank" rel="noopener noreferrer" className={`${link} mt-3 inline-block`}>
                          {m.link.label}
                        </a>
                      )}
                    </figure>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
