import { FOOTER } from "@/data/content";

export default function Footer() {
  return (
    <footer className="relative flex items-end justify-between gap-6 px-[var(--gutter)] pb-10 pt-6">
      <span className="display shrink-0 text-[clamp(3rem,14vw,14rem)] !leading-[0.8] text-ink/[0.06]" aria-hidden>
        RN
      </span>
      {/* may wrap onto two right-aligned lines instead of running off the screen */}
      <span className="label min-w-0 text-right">{FOOTER}</span>
    </footer>
  );
}
