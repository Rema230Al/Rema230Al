"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { revealOnScroll } from "@/lib/reveal";
import { CONTACT } from "@/data/content";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => revealOnScroll(root.current!), { scope: root });

  return (
    <section ref={root} id="contact" aria-label="Contact section" className="relative px-[var(--gutter)] py-[16svh]">
      <SectionHeading chapter={CONTACT.chapter} title={CONTACT.title} desc={CONTACT.desc} />

      <ul aria-label="Contact options" className="mt-16 border-t border-line">
        {CONTACT.links.map((c) => {
          const external = c.href.startsWith("http") || c.href.endsWith(".pdf");
          return (
            <li key={c.label} className="rv-fade border-b border-line">
              <a
                href={c.href}
                {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                className="group grid gap-2 py-7 md:grid-cols-12 md:items-baseline"
              >
                <span className="label md:col-span-3">{c.label}</span>
                <span className="md:col-span-9">
                  <span className="link-underline break-all text-[length:var(--fs-lg)] font-light tracking-[-0.02em] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                    {c.value}
                  </span>
                  {c.sub && <span className="label mt-2 block">{c.sub}</span>}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
