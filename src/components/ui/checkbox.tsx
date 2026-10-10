import * as React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  invalid?: boolean;
}

/**
 * Case à cocher native, enrichie d'une couleur d'accent dorée.
 * Le rendu reste entièrement accessible (élément `input` natif).
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, invalid, ...props }, ref) => (
    <input
      ref={ref}
      type="checkbox"
      aria-invalid={invalid || undefined}
      className={cn(
        "mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded-[4px] border border-white/25 bg-white/[0.04] accent-[var(--color-gold)]",
        invalid && "border-rose outline outline-1 outline-rose",
        className,
      )}
      {...props}
    />
  ),
);

Checkbox.displayName = "Checkbox";
