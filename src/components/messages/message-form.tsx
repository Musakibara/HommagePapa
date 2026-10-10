"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import type { MessagesCopy } from "@/content/schema";
import {
  GUESTBOOK_LIMITS,
  addGuestbookEntry,
  guestbookSchema,
  type GuestbookValues,
} from "@/lib/guestbook";
import { celebrate } from "@/lib/celebrate";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldError, FieldHint, Input, Label, Textarea } from "@/components/ui/field";

interface MessageFormProps {
  copy: MessagesCopy;
  fatherName: string;
}

export function MessageForm({ copy, fatherName }: MessageFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<GuestbookValues>({
    resolver: zodResolver(guestbookSchema),
    defaultValues: { authorName: "", relationship: "", body: "", consent: false },
    mode: "onSubmit",
  });

  const bodyValue = useWatch({ control, name: "body" }) ?? "";

  const onSubmit = (values: GuestbookValues) => {
    setStatus("submitting");
    const entry = addGuestbookEntry(values);
    reset();
    setStatus("success");
    if (entry) celebrate({ count: 170 });
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="glass-card flex flex-col items-center gap-3 rounded-[var(--radius-card)] px-8 py-12 text-center"
      >
        <CheckCircle2 className="h-9 w-9 text-gold" aria-hidden="true" />
        <p className="font-serif text-2xl text-ivory">{copy.successTitle}</p>
        <p className="max-w-md font-sans text-sm leading-relaxed text-mist">
          {copy.moderationNotice}
        </p>
        <Button variant="glass" size="sm" onClick={() => setStatus("idle")}>
          Écrire un autre message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div>
        <Label htmlFor="authorName" required>
          Votre prénom
        </Label>
        <div className="mt-2">
          <Input
            id="authorName"
            autoComplete="given-name"
            placeholder="Ex. Camille"
            invalid={Boolean(errors.authorName)}
            aria-describedby={errors.authorName ? "authorName-error" : undefined}
            {...register("authorName")}
          />
        </div>
        <FieldError id="authorName-error">{errors.authorName?.message}</FieldError>
      </div>

      <div>
        <Label htmlFor="relationship">{`Votre lien avec ${fatherName}`}</Label>
        <div className="mt-2">
          <Input
            id="relationship"
            placeholder="Ex. sa fille, un ami de la famille…"
            invalid={Boolean(errors.relationship)}
            {...register("relationship")}
          />
        </div>
        <FieldError id="relationship-error">{errors.relationship?.message}</FieldError>
      </div>

      <div>
        <Label htmlFor="body" required>
          Votre message
        </Label>
        <div className="mt-2">
          <Textarea
            id="body"
            rows={6}
            placeholder="Écrivez-lui quelques mots…"
            invalid={Boolean(errors.body)}
            aria-describedby="body-hint"
            {...register("body")}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <FieldError id="body-error">{errors.body?.message}</FieldError>
          <FieldHint id="body-hint">
            {bodyValue.length} / {GUESTBOOK_LIMITS.bodyMax}
          </FieldHint>
        </div>
      </div>

      <div>
        <div className="flex items-start gap-3">
          <Checkbox
            id="consent"
            invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            {...register("consent")}
          />
          <label htmlFor="consent" className="font-sans text-sm leading-relaxed text-mist">
            {copy.consentLabel}
          </label>
        </div>
        <FieldError id="consent-error">{errors.consent?.message}</FieldError>
      </div>

      <div className="flex flex-col gap-4">
        <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Publication…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              Ajouter mon message
            </>
          )}
        </Button>
        <p className="font-sans text-xs leading-relaxed text-mist-soft">
          {copy.moderationNotice}
        </p>
      </div>
    </form>
  );
}
