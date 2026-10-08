"use client";

import { useRef, type CSSProperties } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedNow } from "@/lib/hooks";
import { revealOnScroll } from "@/lib/reveal";
import { pad2 } from "@/lib/format";
import { CONTACT } from "@/data/content";
import SectionHeading from "@/components/ui/SectionHeading";

// Planet colour per channel, in CONTACT.links order
const COLORS = ["#ff9f7a", "#5a86ff", "#a8f0f5", "#f5e3bb"];

export default function Contact() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      revealOnScroll(root.current!);
      if (prefersReducedNow()) return; // the markup's default is the final state
      const q = gsap.utils.selector(root);

      // the path draws itself; its tip sits on the 70% line of the viewport
      gsap.fromTo(
        q(".ch-path"),
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: q(".ch-list")[0], start: "top 70%", end: "bottom 70%", scrub: 0.15 } },
      );

      // when the tip reaches a channel: dot → planet, then its info
      q(".ch-item").forEach((item) => {
        gsap
          .timeline({ scrollTrigger: { trigger: item, start: "center 70%", toggleActions: "play none none reverse" } })
          .from(item.querySelector(".ch-planet"), { scale: 0.2, duration: 0.8, ease: "back.out(1.6)" })
          .from(item.querySelector(".ch-info"), { opacity: 0, y: 16, duration: 0.7, ease: "power3.out" }, "-=0.5");
      });

      // the horizon rises from below as the section ends, and sinks back on the way up
      gsap.from(q(".horizon-rise"), {
        y: () => window.innerHeight * 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "bottom 140%",
          end: "bottom bottom",
          scrub: 0.15,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="contact"
      aria-label="Contact section"
      className="relative overflow-hidden px-[var(--gutter)] pb-[36svh] pt-[16svh]"
    >
      <div aria-hidden className="horizon-rise pointer-events-none absolute inset-0">
        <div className="horizon" />
      </div>

      <div className="relative">
        <SectionHeading chapter={CONTACT.chapter} title={CONTACT.title} desc={CONTACT.desc} />

        <div className="ch-list relative mt-20">
          <span aria-hidden className="absolute inset-y-0 left-5 w-px -translate-x-1/2 bg-ink/10 md:left-1/2" />
          <span aria-hidden className="ch-path absolute inset-y-0 left-5 w-[2px] origin-top -translate-x-1/2 md:left-1/2" />

          <ol aria-label="Contact options" className="relative space-y-16 md:space-y-24">
            {CONTACT.links.map((c, i) => {
              const left = i % 2 === 0; // desktop side for the info
              const external = c.href.startsWith("http") || c.href.endsWith(".pdf");
              return (
                <li
                  key={c.label}
                  className="ch-item grid grid-cols-[40px_1fr] items-center gap-x-6 md:grid-cols-[1fr_64px_1fr] md:gap-x-12"
                >
                  <span
                    aria-hidden
                    className="ch-planet col-start-1 row-start-1 mx-auto h-10 w-10 rounded-full md:col-start-2 md:h-16 md:w-16"
                    style={{ "--c": COLORS[i] } as CSSProperties}
                  />
                  <a
                    href={c.href}
                    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                    className={`ch-info channel group col-start-2 row-start-1 block ${
                      left ? "md:col-start-1 md:text-right" : "md:col-start-3"
                    }`}
                  >
                    <span className="label block">
                      Channel {pad2(i + 1)} · {c.label}
                    </span>
                    <span className="link-underline mt-3 break-all text-[clamp(1.25rem,2.2vw,2rem)] font-light tracking-[-0.02em] transition-colors duration-500 group-hover:text-[#9db8ff]">
                      {c.value}
                    </span>
                    {c.sub && <span className="label mt-2 block">{c.sub}</span>}
                    <span className={`mt-4 flex items-center gap-3 ${left ? "md:justify-end" : ""}`}>
                      <span aria-hidden className="signal">
                        <i />
                        <i />
                        <i />
                      </span>
                      <span className="label !text-[#8ef0b5]">Online</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
