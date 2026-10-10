import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium tracking-wide transition-[color,background-color,border-color,transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] disabled:pointer-events-none disabled:opacity-55 focus-visible:outline-none active:translate-y-px",
  {
    variants: {
      variant: {
        gold: "bg-[linear-gradient(100deg,var(--color-gold-bright),var(--color-gold)_45%,var(--color-ember))] text-void shadow-[0_18px_50px_-18px_rgba(230,194,122,0.7)] hover:shadow-[0_22px_60px_-16px_rgba(255,122,69,0.75)] hover:brightness-105",
        glass:
          "glass text-ivory hover:border-gold/50 hover:text-gold-bright",
        outline:
          "border border-white/20 text-ivory hover:border-gold/60 hover:bg-white/[0.05]",
        ghost: "text-mist hover:text-ivory",
      },
      size: {
        sm: "h-9 px-4 text-[0.8rem]",
        md: "h-11 px-6 text-sm",
        lg: "h-[3.35rem] px-8 text-[0.95rem]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "gold",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);

Button.displayName = "Button";
