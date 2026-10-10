"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { CELEBRATE_EVENT, type CelebrateDetail } from "@/lib/celebrate";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
  round: boolean;
}

const COLORS = [
  "#ffe7ae",
  "#e6c27a",
  "#c2974a",
  "#ff7a45",
  "#ffa06e",
  "#ff6b8a",
  "#f7f2e8",
];

/**
 * Salve de confettis plein écran, déclenchée par l'événement `hp:celebrate`.
 * Canvas unique, en `pointer-events-none` : n'interfère jamais avec la page.
 * Aucune animation n'est jouée si l'utilisateur préfère un mouvement réduit.
 */
export function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);
  const runningRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const spawn = (detail: CelebrateDetail) => {
      if (prefersReducedMotion) return;

      const count = detail.count ?? 160;
      const originX = detail.x ?? window.innerWidth / 2;
      const originY = detail.y ?? window.innerHeight * 0.72;

      for (let i = 0; i < count; i += 1) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.6;
        const speed = 4 + Math.random() * 11;
        const life = 70 + Math.random() * 70;
        particlesRef.current.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 5,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.3,
          size: 5 + Math.random() * 8,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          life: 0,
          maxLife: life,
          round: Math.random() > 0.6,
        });
      }

      if (!runningRef.current) {
        runningRef.current = true;
        rafRef.current = requestAnimationFrame(loop);
      }
    };

    const loop = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const p = particles[i];
        p.life += 1;
        p.vy += 0.16;
        p.vx *= 0.992;
        p.vy *= 0.992;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;

        if (p.life > p.maxLife || p.y > window.innerHeight + 40) {
          particles.splice(i, 1);
          continue;
        }

        const fade = 1 - p.life / p.maxLife;
        ctx.save();
        ctx.globalAlpha = Math.max(0, fade);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        if (p.round) {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        }
        ctx.restore();
      }

      if (particles.length > 0) {
        rafRef.current = requestAnimationFrame(loop);
      } else {
        runningRef.current = false;
      }
    };

    const onCelebrate = (event: Event) => {
      spawn((event as CustomEvent<CelebrateDetail>).detail ?? {});
    };

    window.addEventListener(CELEBRATE_EVENT, onCelebrate as EventListener);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener(CELEBRATE_EVENT, onCelebrate as EventListener);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      runningRef.current = false;
      particlesRef.current = [];
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90]"
    />
  );
}
