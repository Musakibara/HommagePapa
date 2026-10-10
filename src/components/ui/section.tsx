import * as React from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-28 py-24 sm:py-32", className)}
      {...props}
    >
      {children}
    </section>
  );
}

export function Container({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)} {...props}>
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <header
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <p className="eyebrow text-gold">{eyebrow}</p> : null}
      <h2 className="mt-5 text-4xl leading-[1.12] text-ivory sm:text-5xl">
        {title}
      </h2>
      <span
        className={cn("rule-gold mt-7 w-20", align === "center" && "mx-auto")}
        aria-hidden="true"
      />
      {intro ? (
        <p className="mt-7 font-sans text-base leading-relaxed text-mist sm:text-lg">
          {intro}
        </p>
      ) : null}
    </header>
  );
}
