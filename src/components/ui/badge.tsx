import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-sans text-[0.65rem] font-medium uppercase tracking-[0.16em]",
  {
    variants: {
      variant: {
        demo: "border-gold/40 bg-gold/10 text-gold-bright",
        neutral: "border-white/15 bg-white/[0.05] text-mist",
        dark: "border-white/12 bg-white/[0.04] text-mist",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
