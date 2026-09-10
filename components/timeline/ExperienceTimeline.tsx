import { Briefcase } from "lucide-react";
import type { ExperienceEntry } from "@/data/profile";

/**
 * Single-column dot-and-line timeline at every breakpoint (the roadmap's
 * test explicitly calls out staying readable on mobile — a two-column
 * left/right alternating layout is the more common timeline pattern but
 * doesn't hold up under 400px, so this skips it rather than adding a
 * breakpoint-specific variant).
 */
export function ExperienceTimeline({ entries }: { entries: ExperienceEntry[] }) {
  if (entries.length === 0) {
    return (
      <div className="flex items-start gap-3 rounded-radius border border-dashed border-card-border p-4">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary/40">
          <Briefcase className="h-4 w-4" aria-hidden="true" />
        </span>
        <p className="text-sm italic text-foreground/40">
          Add your role history — title, organization, dates, and a one-line description
          for each — to data/profile.ts.
        </p>
      </div>
    );
  }

  return (
    <ol className="flex flex-col">
      {entries.map((entry, index) => {
        const isLast = index === entries.length - 1;
        return (
          <li key={`${entry.role}-${entry.organization}`} className="relative flex gap-4 pb-8">
            {!isLast && (
              <span
                className="absolute left-[15px] top-8 h-[calc(100%-1rem)] w-px bg-card-border"
                aria-hidden="true"
              />
            )}
            <span className="relative z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-card-border bg-card text-primary shadow-card">
              <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <div className="flex flex-1 flex-col gap-0.5 pb-2">
              <p className="text-xs font-medium uppercase tracking-wide text-foreground/50">
                {entry.period}
              </p>
              <p className="text-base font-semibold text-heading">{entry.role}</p>
              <p className="text-sm text-foreground/60">{entry.organization}</p>
              {entry.description && (
                <p className="mt-1 text-sm leading-relaxed text-foreground/70">
                  {entry.description}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
