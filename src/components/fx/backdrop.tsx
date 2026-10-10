/* ==========================================================================
   Décor de fond : aurore, grille, grain et braises flottantes.
   Purement décoratif (aria-hidden), fixé derrière le contenu.
   ========================================================================== */

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

interface Ember {
  left: string;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
  color: string;
}

const EMBERS: Ember[] = [
  { left: "6%", size: 4, duration: 17, delay: 0, drift: 34, opacity: 0.55, color: "#e6c27a" },
  { left: "14%", size: 3, duration: 22, delay: 3, drift: -26, opacity: 0.4, color: "#ff7a45" },
  { left: "23%", size: 5, duration: 19, delay: 6, drift: 20, opacity: 0.5, color: "#ffe7ae" },
  { left: "31%", size: 3, duration: 25, delay: 1, drift: -40, opacity: 0.35, color: "#ff6b8a" },
  { left: "42%", size: 4, duration: 21, delay: 8, drift: 28, opacity: 0.45, color: "#e6c27a" },
  { left: "52%", size: 3, duration: 24, delay: 4, drift: -22, opacity: 0.4, color: "#ffa06e" },
  { left: "61%", size: 5, duration: 18, delay: 10, drift: 36, opacity: 0.5, color: "#ffe7ae" },
  { left: "69%", size: 3, duration: 27, delay: 2, drift: -30, opacity: 0.32, color: "#ff7a45" },
  { left: "78%", size: 4, duration: 20, delay: 7, drift: 24, opacity: 0.45, color: "#e6c27a" },
  { left: "86%", size: 3, duration: 23, delay: 5, drift: -18, opacity: 0.38, color: "#ff6b8a" },
  { left: "93%", size: 5, duration: 16, delay: 9, drift: 30, opacity: 0.5, color: "#ffe7ae" },
];

export function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Aurore : halos de couleur animés. */}
      <div className="absolute inset-0 bg-void" />
      <div
        className="absolute -left-[15%] -top-[20%] h-[60vw] w-[60vw] rounded-full opacity-40 blur-[130px]"
        style={{
          background: "radial-gradient(circle, #e6c27a 0%, transparent 68%)",
          animation: "hp-drift 26s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -right-[18%] top-[6%] h-[52vw] w-[52vw] rounded-full opacity-35 blur-[140px]"
        style={{
          background: "radial-gradient(circle, #ff7a45 0%, transparent 70%)",
          animation: "hp-drift 32s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute bottom-[-24%] left-[24%] h-[58vw] w-[58vw] rounded-full opacity-25 blur-[150px]"
        style={{
          background: "radial-gradient(circle, #ff6b8a 0%, transparent 72%)",
          animation: "hp-drift 38s ease-in-out infinite",
        }}
      />
      <div
        className="absolute right-[8%] bottom-[-10%] h-[40vw] w-[40vw] rounded-full opacity-25 blur-[130px]"
        style={{
          background: "radial-gradient(circle, #6d5bd0 0%, transparent 70%)",
          animation: "hp-drift 30s ease-in-out infinite reverse",
        }}
      />

      {/* Grille très discrète. */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 80%)",
        }}
      />

      {/* Grain premium. */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-soft-light"
        style={{ backgroundImage: GRAIN }}
      />

      {/* Braises qui montent doucement. */}
      {EMBERS.map((ember, index) => (
        <span
          key={index}
          className="absolute bottom-[-10vh] rounded-full"
          style={{
            left: ember.left,
            width: ember.size,
            height: ember.size,
            backgroundColor: ember.color,
            boxShadow: `0 0 ${ember.size * 3}px ${ember.size}px ${ember.color}55`,
            ["--ember-drift" as string]: `${ember.drift}px`,
            ["--ember-opacity" as string]: ember.opacity,
            animation: `hp-ember ${ember.duration}s linear ${ember.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
