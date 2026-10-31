"use client";

import { PartyPopper } from "lucide-react";
import { celebrate } from "@/lib/celebrate";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Bouton « en ligne » qui déclenche une grande salve de confettis. */
export function BurstButton({
  label,
  className,
  variant = "gold",
}: {
  label: string;
  className?: string;
  variant?: "gold" | "glass" | "outline" | "ghost";
}) {
  return (
    <button
      type="button"
      onClick={() => celebrate({ count: 240 })}
      className={cn(buttonVariants({ variant, size: "lg" }), className)}
    >
      <PartyPopper className="h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  );
}
