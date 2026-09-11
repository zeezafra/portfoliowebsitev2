import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

/**
 * Shared shell for every bento-grid tile — same card treatment used
 * across the whole dashboard (border, radius, shadow) plus a consistent
 * icon + eyebrow-style title row so the dashboard reads as one system
 * rather than five differently-styled cards.
 */
export function BentoCard({
  title,
  icon: Icon,
  action,
  className = "",
  id,
  children,
}: {
  title: string;
  icon?: LucideIcon;
  action?: ReactNode;
  className?: string;
  /** Optional anchor id — e.g. so a case-study page can link back to
   *  `/#featured-projects` instead of the still-stub `/projects` index. */
  id?: string;
  children: ReactNode;
}) {
  return (
    <div
      id={id}
      className={`scroll-mt-20 flex flex-col gap-4 rounded-radius border border-card-border bg-card p-5 shadow-card md:p-6 ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {Icon && (
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
          )}
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground/50">
            {title}
          </h3>
        </div>
        {action}
      </div>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
