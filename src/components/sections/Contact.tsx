"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { revealOnScroll } from "@/lib/reveal";
import { pad2 } from "@/lib/format";
import { CONTACT } from "@/data/content";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => revealOnScroll(root.current!), { scope: root });

  return (
    <section
      ref={root}
      id="contact"
      aria-label="Contact section"
      className="relative overflow-hidden px-[var(--gutter)] pb-[36svh] pt-[16svh]"
    >
      <div aria-hidden className="horizon" />

      <div className="relative">
        <SectionHeading chapter={CONTACT.chapter} title={CONTACT.title} desc={CONTACT.desc} />

        <ul aria-label="Contact options" className="mt-16 space-y-3">
          {CONTACT.links.map((c, i) => {
            const external = c.href.startsWith("http") || c.href.endsWith(".pdf");
            return (
              <li key={c.label} className="rv-fade">
                <a
                  href={c.href}
                  {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                  className="channel grid items-center gap-x-6 gap-y-3 rounded-lg border border-line bg-void/50 px-5 py-6 transition-[background-color,border-color,box-shadow] duration-500 hover:border-ink/25 hover:bg-ink/[0.04] hover:shadow-[0_0_40px_rgba(120,160,255,0.18)] md:grid-cols-12 md:px-8"
                >
                  <span className="label md:col-span-3">
                    Channel {pad2(i + 1)} · {c.label}
                  </span>
                  <span className="md:col-span-6">
                    <span className="block break-all text-[length:var(--fs-lg)] font-light tracking-[-0.02em]">
                      {c.value}
                    </span>
                    {c.sub && <span className="label mt-2 block">{c.sub}</span>}
                  </span>
                  <span className="flex items-center gap-3 md:col-span-3 md:justify-end">
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
        </ul>
      </div>
    </section>
  );
}
