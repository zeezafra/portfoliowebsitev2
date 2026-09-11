import { Sparkles } from "lucide-react";
import { profile } from "@/data/profile";

/**
 * Full-width strip at the bottom of the home dashboard's main column,
 * matching the reference layout's "open to work" banner beneath the
 * content column (it deliberately does not run under the right rail —
 * same width as the Services/Certifications row above it).
 */
export function AvailabilityBanner() {
  return (
    <div className="flex items-center gap-3 rounded-radius border border-card-border bg-card px-5 py-4 shadow-card">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Sparkles className="h-4 w-4" aria-hidden="true" />
      </span>
      <p className="text-sm text-foreground/70">{profile.availability.banner}</p>
    </div>
  );
}
