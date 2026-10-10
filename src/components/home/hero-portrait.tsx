import type { ReactNode } from "react";

/**
 * Portrait du héros posé dans un cadre de verre, avec un anneau lumineux en
 * rotation lente. Si aucune photographie n'est fournie, un monogramme élégant
 * prend sa place (jamais d'image inventée).
 */
export function HeroPortrait({
  initial,
  children,
}: {
  initial: string;
  children?: ReactNode;
}) {
  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* Halos */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-[2.5rem] opacity-70 blur-2xl"
        style={{
          background:
            "radial-gradient(60% 60% at 30% 20%, rgba(230,194,122,0.35), transparent 70%), radial-gradient(60% 60% at 80% 80%, rgba(255,122,69,0.3), transparent 70%)",
        }}
      />

      {/* Anneau conique animé */}
      <div
        aria-hidden="true"
        className="absolute -inset-[1px] rounded-[2rem] opacity-60"
        style={{
          background:
            "conic-gradient(from 0deg, transparent, rgba(230,194,122,0.7), transparent 40%, rgba(255,122,69,0.6), transparent 75%)",
          animation: "hp-spin-slow 14s linear infinite",
        }}
      />

      <div className="glass relative overflow-hidden rounded-[2rem] p-2.5">
        <div className="relative overflow-hidden rounded-[1.5rem]">
          {children ?? (
            <div className="relative flex aspect-[4/5] items-center justify-center bg-[radial-gradient(120%_120%_at_30%_10%,rgba(230,194,122,0.16),transparent_60%),linear-gradient(180deg,#141422,#0b0b14)]">
              <span
                aria-hidden="true"
                className="text-shine select-none font-serif text-[12rem] leading-none"
              >
                {initial}
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-x-10 bottom-8 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
              />
            </div>
          )}
        </div>
      </div>

      {/* Petite étiquette flottante */}
      <span className="glass absolute -bottom-4 left-6 rounded-full px-4 py-2 font-sans text-[0.65rem] uppercase tracking-[0.22em] text-gold-bright">
        Avec tout notre amour
      </span>
    </div>
  );
}
