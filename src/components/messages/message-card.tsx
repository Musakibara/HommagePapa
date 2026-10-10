import { Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatMessageDate } from "@/lib/datetime";
import { cn } from "@/lib/utils";

export interface MessageCardData {
  id: string;
  authorName: string;
  relationship: string | null;
  body: string;
  createdAt: string;
}

interface MessageCardProps {
  message: MessageCardData;
  locale: string;
  timeZone: string;
  isDemo?: boolean;
  onRemove?: () => void;
  className?: string;
}

export function MessageCard({
  message,
  locale,
  timeZone,
  isDemo = false,
  onRemove,
  className,
}: MessageCardProps) {
  const date = message.createdAt
    ? formatMessageDate(message.createdAt, locale, timeZone)
    : "";

  return (
    <article
      className={cn(
        "glass-card card-interactive flex h-full flex-col rounded-[var(--radius-card)] p-6",
        className,
      )}
    >
      <Quote className="h-5 w-5 text-gold/70" aria-hidden="true" />
      <p className="mt-4 whitespace-pre-line font-serif text-lg leading-relaxed text-ivory/90">
        {message.body}
      </p>
      <footer className="mt-auto flex items-end justify-between gap-3 pt-6">
        <div>
          <p className="font-sans text-sm font-medium text-gold-bright">{message.authorName}</p>
          {message.relationship ? (
            <p className="mt-0.5 font-sans text-xs text-mist">{message.relationship}</p>
          ) : null}
          <p className="mt-1 flex items-center gap-2 font-sans text-xs text-mist-soft">
            {date ? <time dateTime={message.createdAt}>{date}</time> : null}
            {isDemo ? <Badge variant="demo">démo</Badge> : null}
          </p>
        </div>
        {onRemove ? (
          <button
            type="button"
            onClick={onRemove}
            className="rounded-full border border-white/12 px-2.5 py-1 font-sans text-[0.65rem] uppercase tracking-[0.14em] text-mist-soft transition-colors hover:border-rose/50 hover:text-rose"
            aria-label={`Retirer le message de ${message.authorName}`}
          >
            Retirer
          </button>
        ) : null}
      </footer>
    </article>
  );
}
