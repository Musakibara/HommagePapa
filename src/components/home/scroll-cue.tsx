import { ArrowDown } from "lucide-react";

export function ScrollCue({ label, targetId }: { label: string; targetId: string }) {
  return (
    <a
      href={`#${targetId}`}
      className="group absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2.5 text-mist transition-colors hover:text-gold-bright"
    >
      <span className="eyebrow">{label}</span>
      <span
        aria-hidden="true"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 group-hover:border-gold/50 motion-safe:animate-bounce"
      >
        <ArrowDown className="h-4 w-4" />
      </span>
    </a>
  );
}
