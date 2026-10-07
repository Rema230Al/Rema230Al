import { FOOTER } from "@/data/content";

export default function Footer() {
  return (
    <footer className="relative flex items-end justify-between px-[var(--gutter)] pb-10 pt-6">
      <span className="display text-[clamp(3rem,14vw,14rem)] !leading-[0.8] text-ink/[0.06]" aria-hidden>
        RN
      </span>
      <span className="label">{FOOTER}</span>
    </footer>
  );
}
