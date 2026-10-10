"use client";

import { PartyPopper } from "lucide-react";
import { celebrate } from "@/lib/celebrate";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Bouton « en ligne » qui déclenche une grande salve de confettis. */
export function BurstButton({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => celebrate({ count: 240 })}
      className={cn(buttonVariants({ variant: "gold", size: "lg" }), className)}
    >
      <PartyPopper className="h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  );
}
