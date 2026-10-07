"use client";

import { useEffect, useState } from "react";
import { scrollToTarget } from "@/lib/scroll";
import { NAV_LINKS } from "@/data/content";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToTarget(id === "hero" ? 0 : `#${id}`, 2.4);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-700 ${
        scrolled
          ? "border-b border-line bg-void/35 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Main navigation" className="flex items-center justify-between px-[var(--gutter)] py-4 md:py-5">
        <a
          href="#hero"
          onClick={go("hero")}
          className="font-display text-[15px] font-semibold tracking-[0.32em]"
          aria-label="Remas Nafea portfolio home"
        >
          RN
        </a>
        <ul className="flex items-center gap-3 sm:gap-8">
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={go(l.id)}
                className="link-underline font-mono text-[10px] uppercase tracking-[0.16em] text-ink/80 hover:text-ink sm:text-[11px] sm:tracking-[0.2em]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
