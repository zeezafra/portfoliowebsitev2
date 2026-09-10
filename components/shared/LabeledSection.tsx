import type { LucideIcon } from "lucide-react";

/**
 * One labeled prose block with a fallback for when its text is blank
 * (case-study Problem/My Role/Solution/Outcome, the Hackathon page's
 * write-up, etc). Reuses the same muted "add this" prompt pattern as
 * AboutMeCard/HackathonCard's home-page tile — most of the site's real
 * narrative content is still blank today, so this is the common case,
 * not an edge case. Originally lived under components/project/ as
 * ProjectTextSection; moved here in Phase 7 once the Hackathon page
 * needed the exact same pattern.
 */
export function LabeledSection({
  icon: Icon,
  title,
  text,
  placeholder,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
  placeholder: string;
}) {
  const filled = text.trim().length > 0;

  return (
    <section className="flex flex-col gap-2">
      <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground/50">
        <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
        {title}
      </h2>
      {filled ? (
        <p className="max-w-3xl text-base leading-relaxed text-foreground/80">{text}</p>
      ) : (
        <p className="max-w-3xl text-sm italic text-foreground/40">{placeholder}</p>
      )}
    </section>
  );
}
