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
    message: "Cochez cette case pour enregistrer votre message.",
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

function isGuestbookEntry(value: unknown): value is GuestbookEntry {
  if (typeof value !== "object" || value === null) return false;
  const entry = value as Partial<GuestbookEntry>;
  return (
    typeof entry.id === "string" &&
    typeof entry.authorName === "string" &&
    (typeof entry.relationship === "string" || entry.relationship === null) &&
    typeof entry.body === "string" &&
    typeof entry.createdAt === "string"
  );
}

function readFromStorage(): GuestbookEntry[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;
    return parsed.filter(isGuestbookEntry);
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

/**
 * Instantané utilisé par React pendant le rendu serveur **et** l'hydratation.
 *
 * Il doit toujours renvoyer la même chose que ce que le serveur a rendu (une
 * liste vide, puisque `localStorage` n'existe pas côté serveur). Le navigateur
 * bascule ensuite sur `loadGuestbook` après l'hydratation : c'est ce qui évite
 * l'erreur « Hydration failed ».
 */
export function loadGuestbookServerSnapshot(): GuestbookEntry[] {
  return EMPTY;
}

/**
 * Enregistre un message localement.
 * Retourne `null` si le stockage est indisponible (navigation privée, quota,
 * stockage désactivé) : l'appelant peut ainsi afficher une vraie erreur au
 * lieu de faire croire à un succès.
 */
export function addGuestbookEntry(values: GuestbookValues): GuestbookEntry | null {
  if (typeof window === "undefined") return null;

  const entry: GuestbookEntry = {
    id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    authorName: values.authorName.trim(),
    relationship: values.relationship?.trim() ? values.relationship.trim() : null,
    body: values.body.trim(),
    createdAt: new Date().toISOString(),
  };

  try {
    const next = [entry, ...readFromStorage()].slice(0, 100);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    cache = next;
    window.dispatchEvent(new Event(CHANGE_EVENT));
    return entry;
  } catch {
    return null;
  }
}

export function removeGuestbookEntry(id: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const next = readFromStorage().filter((entry) => entry.id !== id);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    cache = next;
    window.dispatchEvent(new Event(CHANGE_EVENT));
    return true;
  } catch {
    return false;
  }
}

/** S'abonne aux changements (même onglet + autres onglets). */
export function subscribeGuestbook(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  const onStorage = () => {
    // Un autre onglet a modifié le stockage : le cache n'est plus valide.
    cache = null;
    callback();
  };

  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", onStorage);
  };
}