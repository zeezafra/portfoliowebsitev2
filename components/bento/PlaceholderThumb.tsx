import type { LucideIcon } from "lucide-react";

/**
 * Standing in for real photography (project screenshots, certificate
 * scans, hackathon photos) that doesn't exist yet. Deliberately an
 * on-brand icon tile rather than a stock/placeholder photo — nothing
 * here should look like real content at a glance.
 */
export function PlaceholderThumb({
  icon: Icon,
  className = "",
}: {
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-radius border border-dashed border-card-border bg-primary/5 text-primary/40 ${className}`}
    >
      <Icon className="h-6 w-6" aria-hidden="true" />
    </div>
  );
}
