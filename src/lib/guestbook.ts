import { z } from "zod";

/* ==========================================================================
   Livre d'or — 100 % frontend.
   Les messages ajoutés sont conservés dans le navigateur (localStorage).
   Aucun envoi, aucun serveur : ils restent sur l'appareil du visiteur.
   ========================================================================== */

export const GUESTBOOK_LIMITS = {
  nameMin: 2,
  nameMax: 60,
  relationshipMax: 60,
  bodyMin: 10,
  bodyMax: 1200,
} as const;

export const guestbookSchema = z.object({
  authorName: z
    .string()
    .trim()
    .min(GUESTBOOK_LIMITS.nameMin, { message: "Indiquez au moins 2 caractères." })
    .max(GUESTBOOK_LIMITS.nameMax, { message: "60 caractères maximum." }),
  relationship: z
    .string()
    .trim()
    .max(GUESTBOOK_LIMITS.relationshipMax, { message: "60 caractères maximum." })
    .optional(),
  body: z
    .string()
    .trim()
    .min(GUESTBOOK_LIMITS.bodyMin, {
      message: "Votre message doit contenir au moins 10 caractères.",
    })
    .max(GUESTBOOK_LIMITS.bodyMax, {
      message: "Votre message ne doit pas dépasser 1200 caractères.",
    }),
  consent: z.boolean().refine((value) => value === true, {
    message: "Cochez cette case pour partager votre message.",
  }),
});

export type GuestbookValues = z.infer<typeof guestbookSchema>;

export interface GuestbookEntry {
  id: string;
  authorName: string;
  relationship: string | null;
  body: string;
  createdAt: string;
}

const STORAGE_KEY = "hp:guestbook";
const CHANGE_EVENT = "hp:guestbook-change";

/** Cache en mémoire : même référence tant que le contenu n'a pas changé. */
let cache: GuestbookEntry[] | null = null;

const EMPTY: GuestbookEntry[] = [];

function readFromStorage(): GuestbookEntry[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;
    return parsed.filter(
      (entry): entry is GuestbookEntry =>
        typeof entry === "object" &&
        entry !== null &&
        typeof (entry as GuestbookEntry).id === "string" &&
        typeof (entry as GuestbookEntry).body === "string",
    );
  } catch {
    return EMPTY;
  }
}

/** Lit les messages locaux (session ou cache). Tolérant aux données corrompues. */
export function loadGuestbook(): GuestbookEntry[] {
  if (typeof window === "undefined") return EMPTY;
  if (cache) return cache;
  cache = readFromStorage();
  return cache;
}

export function addGuestbookEntry(values: GuestbookValues): GuestbookEntry {
  const entry: GuestbookEntry = {
    id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    authorName: values.authorName,
    relationship: values.relationship?.trim() ? values.relationship.trim() : null,
    body: values.body.trim(),
    createdAt: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    try {
      const next = [entry, ...readFromStorage()].slice(0, 100);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      cache = next;
      window.dispatchEvent(new Event(CHANGE_EVENT));
    } catch {
      // Quota / navigation privée : on n'échoue pas, l'entrée reste affichée.
    }
  }

  return entry;
}

export function removeGuestbookEntry(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const next = readFromStorage().filter((entry) => entry.id !== id);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    cache = next;
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    // Ignoré.
  }
}

/** S'abonne aux changements (même onglet + autres onglets). */
export function subscribeGuestbook(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}