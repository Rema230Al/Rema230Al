"use client";

import { useRef, type ReactNode, type AnchorHTMLAttributes } from "react";
import { gsap } from "@/lib/gsap";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode; strength?: number };

/** SOL's MagneticButton as a link: minimal magnetic pull toward the pointer. */
export default function MagneticLink({ children, className = "", strength = 0.25, ...rest }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current!;
    const b = el.getBoundingClientRect();
    gsap.to(el, {
      x: (e.clientX - (b.left + b.width / 2)) * strength,
      y: (e.clientY - (b.top + b.height / 2)) * strength,
      duration: 0.6,
      ease: "power3.out",
    });
  };
  const onLeave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.5)" });

  return (
    <a
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`inline-flex items-center gap-3 rounded-full border border-ink/25 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink transition-colors duration-500 hover:border-ink/60 hover:bg-ink/[0.04] ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
