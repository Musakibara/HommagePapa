/**
 * Utilitaires de date et d'heure sensibles au fuseau horaire.
 *
 * Le contenu du site exprime la date de célébration sous forme de date/heure
 * locale (« 2026-11-15T19:00:00 ») accompagnée d'un fuseau IANA
 * (« Europe/Paris »). Ces fonctions convertissent proprement cette valeur en
 * instant absolu, sans dépendance externe.
 */

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
  isPast: boolean;
}

/** Décalage (en millisecondes) du fuseau donné par rapport à UTC, à un instant. */
function timeZoneOffsetMs(date: Date, timeZone: string): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const parts = dtf.formatToParts(date);
  const map: Record<string, number> = {};
  for (const part of parts) {
    if (part.type !== "literal") map[part.type] = Number(part.value);
  }

  const asUTC = Date.UTC(
    map.year,
    map.month - 1,
    map.day,
    map.hour === 24 ? 0 : map.hour,
    map.minute,
    map.second,
  );

  return asUTC - date.getTime();
}

/**
 * Convertit une date/heure locale (« YYYY-MM-DDTHH:mm:ss ») interprétée dans un
 * fuseau IANA en un instant absolu. Renvoie `null` si la chaîne est invalide.
 */
export function zonedTimeToInstant(
  localDateTime: string,
  timeZone: string,
): Date | null {
  const match = localDateTime
    .trim()
    .match(/^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2}))?)?$/);

  if (!match) return null;

  const [, y, mo, d, h = "0", mi = "0", s = "0"] = match;
  const guess = Date.UTC(
    Number(y),
    Number(mo) - 1,
    Number(d),
    Number(h),
    Number(mi),
    Number(s),
  );

  try {
    const offset = timeZoneOffsetMs(new Date(guess), timeZone);
    return new Date(guess - offset);
  } catch {
    // Fuseau inconnu de l'environnement : on retombe sur UTC.
    return new Date(guess);
  }
}

/** Vrai si la date/heure locale est valide et strictement future. */
export function isFuture(
  localDateTime: string | null | undefined,
  timeZone: string,
  now: Date = new Date(),
): boolean {
  if (!localDateTime) return false;
  const instant = zonedTimeToInstant(localDateTime, timeZone);
  return instant !== null && instant.getTime() > now.getTime();
}

/** Calcule le temps restant entre deux instants. */
export function computeCountdown(target: Date, now: Date = new Date()): Countdown {
  const totalMs = target.getTime() - now.getTime();

  if (totalMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs, isPast: true };
  }

  const totalSeconds = Math.floor(totalMs / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    totalMs,
    isPast: false,
  };
}

/** Formate une date en français dans le fuseau configuré. */
export function formatDate(
  date: Date,
  timeZone: string,
  options: Intl.DateTimeFormatOptions = { dateStyle: "long" },
  locale = "fr-FR",
): string {
  try {
    return new Intl.DateTimeFormat(locale, { ...options, timeZone }).format(date);
  } catch {
    return new Intl.DateTimeFormat(locale, options).format(date);
  }
}

/** Formate la date de publication d'un message. */
export function formatMessageDate(
  iso: string,
  locale = "fr-FR",
  timeZone = "Europe/Paris",
): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return formatDate(date, timeZone, { dateStyle: "long" }, locale);
}

/** Formate une date/heure locale exprimée dans un fuseau. */
export function formatLocalDateTime(
  localDateTime: string,
  timeZone: string,
  options?: Intl.DateTimeFormatOptions,
  locale = "fr-FR",
): string | null {
  const instant = zonedTimeToInstant(localDateTime, timeZone);
  if (!instant) return null;
  return formatDate(instant, timeZone, options, locale);
}
