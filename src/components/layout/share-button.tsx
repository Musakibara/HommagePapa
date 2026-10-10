"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Share2 } from "lucide-react";

type ShareState = "idle" | "copied" | "shared" | "error";

interface ShareButtonProps {
  label?: string;
  copiedLabel?: string;
  className?: string;
}

/**
 * Partage via l'API Web Share si disponible, sinon copie du lien.
 * Un retour visuel confirme toujours l'action.
 */
export function ShareButton({
  label = "Partager",
  copiedLabel = "Lien copié",
  className,
}: ShareButtonProps) {
  const [state, setState] = useState<ShareState>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const flash = useCallback((next: ShareState) => {
    setState(next);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setState("idle"), 2400);
  }, []);

  const copyLink = useCallback(async () => {
    const url = window.location.href;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = url;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      flash("copied");
    } catch {
      flash("error");
    }
  }, [flash]);

  const onShare = useCallback(async () => {
    const shareData = { title: document.title, url: window.location.href };

    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share(shareData);
        flash("shared");
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    await copyLink();
  }, [copyLink, flash]);

  const message =
    state === "copied"
      ? copiedLabel
      : state === "shared"
        ? "Merci !"
        : state === "error"
          ? "Impossible de copier"
          : label;

  return (
    <button
      type="button"
      onClick={onShare}
      aria-live="polite"
      title={label}
      className={
        "inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-sans text-xs uppercase tracking-[0.14em] text-mist transition-colors duration-300 hover:border-gold/50 hover:bg-white/[0.06] hover:text-gold-bright " +
        (className ?? "")
      }
    >
      {state === "copied" || state === "shared" ? (
        <Check className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
      ) : (
        <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
      )}
      <span className="hidden sm:inline">{message}</span>
      <span className="sr-only sm:hidden">{message}</span>
    </button>
  );
}
