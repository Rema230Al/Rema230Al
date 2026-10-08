export default function Grain() {
  // the grain is oversized so its jitter never shows edges; this layer keeps it from widening the page
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      <div className="grain" />
    </div>
  );
}
