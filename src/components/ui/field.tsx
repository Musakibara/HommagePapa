import * as React from "react";
import { cn } from "@/lib/utils";

export function Label({
  className,
  children,
  required,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }) {
  return (
    <label
      className={cn("block font-sans text-sm font-medium text-ivory", className)}
      {...props}
    >
      {children}
      {required ? (
        <span className="ml-1 text-gold" aria-hidden="true">
          *
        </span>
      ) : (
        <span className="ml-2 text-xs font-normal text-mist-soft">(facultatif)</span>
      )}
    </label>
  );
}

const controlBase =
  "w-full rounded-[var(--radius-card)] border border-white/12 bg-white/[0.04] px-4 py-3 font-sans text-[0.95rem] text-ivory placeholder:text-mist-soft transition-colors duration-300 focus:border-gold/60 focus:bg-white/[0.06] focus:outline-none focus-visible:outline-none";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }
>(({ className, invalid, ...props }, ref) => (
  <input
    ref={ref}
    aria-invalid={invalid || undefined}
    className={cn(
      controlBase,
      invalid && "border-rose/60 focus:border-rose",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }
>(({ className, invalid, ...props }, ref) => (
  <textarea
    ref={ref}
    aria-invalid={invalid || undefined}
    className={cn(
      controlBase,
      "min-h-40 resize-y leading-relaxed",
      invalid && "border-rose/60 focus:border-rose",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 font-sans text-sm text-rose">
      {children}
    </p>
  );
}

export function FieldHint({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1.5 font-sans text-xs text-mist-soft">
      {children}
    </p>
  );
}
