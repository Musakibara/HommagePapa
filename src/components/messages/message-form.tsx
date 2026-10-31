"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Copy, MessageCircle, Send } from "lucide-react";
import type { MessagesCopy } from "@/content/schema";
import {
  GUESTBOOK_LIMITS,
  addGuestbookEntry,
  guestbookSchema,
  type GuestbookValues,
} from "@/lib/guestbook";
import { celebrate } from "@/lib/celebrate";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldError, FieldHint, Input, Label, Textarea } from "@/components/ui/field";

interface MessageFormProps {
  copy: MessagesCopy;
  fatherName: string;
}

type Status = "idle" | "success" | "error";

export function MessageForm({ copy, fatherName }: MessageFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [lastMessage, setLastMessage] = useState<{ authorName: string; body: string } | null>(
    null,
  );
  const [copied, setCopied] = useState(false);
  const successRef = useRef<HTMLParagraphElement>(null);

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

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const onSubmit = (values: GuestbookValues) => {
    const entry = addGuestbookEntry(values);

    if (!entry) {
      setStatus("error");
      return;
    }

    setLastMessage({ authorName: entry.authorName, body: entry.body });
    reset();
    setCopied(false);
    setStatus("success");
    celebrate({ count: 170 });
  };

  const messageText = lastMessage
    ? `${lastMessage.body}\n\n— ${lastMessage.authorName}`
    : "";

  const copyMessage = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard indisponible");
      await navigator.clipboard.writeText(messageText);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  if (status === "success" && lastMessage) {
    return (
      <div
        role="status"
        className="glass-card flex flex-col items-center gap-4 rounded-[var(--radius-card)] px-6 py-10 text-center sm:px-8"
      >
        <CheckCircle2 className="h-9 w-9 text-gold" aria-hidden="true" />
        <p
          ref={successRef}
          tabIndex={-1}
          className="font-serif text-2xl text-ivory outline-none"
        >
          {copy.successTitle}
        </p>
        <p className="max-w-md font-sans text-sm leading-relaxed text-mist">
          Votre message est enregistré sur cet appareil. Envoyez-le maintenant à la famille
          pour qu&apos;il arrive jusqu&apos;à Papa.
        </p>

        <blockquote className="w-full max-w-md rounded-[var(--radius-card)] border border-gold/20 bg-gold/[0.04] px-5 py-4 text-left">
          <p className="whitespace-pre-line font-serif text-base leading-relaxed text-ivory">
            {lastMessage.body}
          </p>
          <footer className="mt-2 font-sans text-xs text-gold-bright">
            — {lastMessage.authorName}
          </footer>
        </blockquote>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(messageText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "gold", size: "sm" })}
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Envoyer sur WhatsApp
          </a>
          <Button variant="glass" size="sm" onClick={copyMessage}>
            <Copy className="h-4 w-4" aria-hidden="true" />
            {copied ? "Message copié !" : "Copier le message"}
          </Button>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setStatus("idle");
            setCopied(false);
          }}
        >
          Écrire un autre message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <p className="font-sans text-xs text-mist-soft">
        <span className="text-gold" aria-hidden="true">
          *
        </span>{" "}
        Champs obligatoires
      </p>

      <div>
        <Label htmlFor="authorName" required>
          Votre prénom
        </Label>
        <div className="mt-2">
          <Input
            id="authorName"
            autoComplete="given-name"
            placeholder="Ex. Camille"
            required
            maxLength={GUESTBOOK_LIMITS.nameMax}
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
            maxLength={GUESTBOOK_LIMITS.relationshipMax}
            invalid={Boolean(errors.relationship)}
            aria-describedby={errors.relationship ? "relationship-error" : undefined}
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
            required
            maxLength={GUESTBOOK_LIMITS.bodyMax}
            invalid={Boolean(errors.body)}
            aria-describedby={errors.body ? "body-hint body-error" : "body-hint"}
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
            required
            aria-required="true"
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
        <Button type="submit" size="lg" className="w-full">
          <Send className="h-4 w-4" aria-hidden="true" />
          Enregistrer mon message
        </Button>

        {status === "error" ? (
          <p
            role="alert"
            className="rounded-[var(--radius-card)] border border-ember/40 bg-ember/[0.08] px-4 py-3 font-sans text-sm leading-relaxed text-ivory"
          >
            Impossible d&apos;enregistrer le message sur cet appareil. Vérifiez que le
            stockage du navigateur est autorisé, puis réessayez.
          </p>
        ) : null}

        <p className="font-sans text-xs leading-relaxed text-mist-soft">
          {copy.moderationNotice}
        </p>
      </div>
    </form>
  );
}
