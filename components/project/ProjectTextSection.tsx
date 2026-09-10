import type { LucideIcon } from "lucide-react";

/**
 * One labeled prose block on a case-study page (Problem / My Role /
 * Solution / Outcome). Reuses the same muted "add this" prompt pattern as
 * AboutMeCard/HackathonCard when the field is still blank, rather than
 * rendering an empty-looking heading with nothing under it — most of
 * data/projects.ts is blank today, so this is the common case, not an
 * edge case.
 */
export function ProjectTextSection({
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
