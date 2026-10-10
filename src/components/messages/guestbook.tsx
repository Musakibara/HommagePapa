"use client";

import { useSyncExternalStore } from "react";
import { MessageSquareText } from "lucide-react";
import type { MessagesCopy } from "@/content/schema";
import type { DemoMessage } from "@/content/demo-messages";
import {
  loadGuestbook,
  removeGuestbookEntry,
  subscribeGuestbook,
  type GuestbookEntry,
} from "@/lib/guestbook";
import { MessageCard } from "./message-card";
import { MessageForm } from "./message-form";

interface GuestbookProps {
  copy: MessagesCopy;
  locale: string;
  timeZone: string;
  showDemo: boolean;
  demoMessages: DemoMessage[];
  fatherName: string;
}

/**
 * Livre d'or : messages intégrés + messages ajoutés localement par le visiteur.
 * Tout se passe dans le navigateur (localStorage) — aucun backend.
 * `useSyncExternalStore` synchronise l'état avec le stockage local sans effet.
 */
export function Guestbook({
  copy,
  locale,
  timeZone,
  showDemo,
  demoMessages,
  fatherName,
}: GuestbookProps) {
  const entries = useSyncExternalStore<GuestbookEntry[]>(
    subscribeGuestbook,
    loadGuestbook,
    loadGuestbook,
  );

  const showDemoCards = showDemo && demoMessages.length > 0;
  const isEmpty = entries.length === 0 && !showDemoCards;

  const handleRemove = (id: string) => {
    removeGuestbookEntry(id);
  };

  return (
    <div className="space-y-20">
      <div>
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
          <h3 className="font-serif text-2xl text-ivory sm:text-3xl">{copy.wallTitle}</h3>
          {entries.length > 0 ? (
            <span className="eyebrow text-gold">
              {entries.length} sur cet appareil
            </span>
          ) : null}
        </div>

        {showDemoCards ? (
          <p className="mb-8 max-w-2xl font-sans text-sm leading-relaxed text-mist">
            {copy.demoNotice}
          </p>
        ) : null}

        {isEmpty ? (
          <div className="glass-card flex flex-col items-center gap-3 rounded-[var(--radius-panel)] px-8 py-16 text-center">
            <MessageSquareText className="h-7 w-7 text-gold" aria-hidden="true" />
            <p className="font-serif text-xl text-ivory">{copy.emptyTitle}</p>
            <p className="max-w-md font-sans text-sm text-mist">{copy.emptyBody}</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map((entry) => (
              <MessageCard
                key={entry.id}
                message={entry}
                locale={locale}
                timeZone={timeZone}
                onRemove={() => handleRemove(entry.id)}
              />
            ))}
            {showDemoCards
              ? demoMessages.map((message) => (
                  <MessageCard
                    key={message.id}
                    message={{ ...message, createdAt: "" }}
                    locale={locale}
                    timeZone={timeZone}
                    isDemo
                  />
                ))
              : null}
          </div>
        )}
      </div>

      <div id="laisser-un-message" className="mx-auto max-w-2xl scroll-mt-28">
        <div className="glass rounded-[var(--radius-panel)] p-7 sm:p-10">
          <h3 className="font-serif text-2xl text-ivory sm:text-3xl">{copy.formTitle}</h3>
          <p className="mt-3 font-sans text-sm leading-relaxed text-mist">{copy.formIntro}</p>
          <div className="mt-8">
            <MessageForm copy={copy} fatherName={fatherName} />
          </div>
        </div>
      </div>
    </div>
  );
}