import SplitWords from "./SplitWords";

/** Chapter label, masked title, rule and intro line shared by every section. */
export default function SectionHeading({ chapter, title, desc }: { chapter: string; title: string; desc?: string }) {
  return (
    <div>
      <p className="rv-fade label mb-6" aria-hidden>
        {chapter}
      </p>
      <h2 className="rv-title display text-[length:var(--fs-xl)]">
        <SplitWords text={title} />
      </h2>
      <span aria-hidden className="rv-fade mt-8 block h-px w-16 bg-ink/30" />
      {desc && (
        <p className="rv-fade mt-8 max-w-lg text-[length:var(--fs-md)] font-light leading-relaxed text-ink/70">{desc}</p>
      )}
    </div>
  );
}
