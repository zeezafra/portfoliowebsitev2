import { Download } from "lucide-react";
import { profile } from "@/data/profile";
import { AvailabilityBadge } from "@/components/AvailabilityBadge";
import { SocialLinks } from "@/components/SocialLinks";

// Deliberately reuses the sidebar's AvailabilityBadge/SocialLinks (and
// data/profile.ts) rather than a second source of truth, per the roadmap.
export function ContactInfoPanel() {
  const hasResume = profile.resume.href.trim().length > 0;
  const hasAnySocial = profile.socials.some((s) => s.href.trim().length > 0);

  return (
    <div className="flex flex-col gap-6 rounded-radius border border-card-border bg-card p-5 shadow-card md:p-6">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/50">
          Availability
        </h2>
        <div className="mt-2">
          <AvailabilityBadge
            isAvailable={profile.availability.isAvailable}
            label={profile.availability.label}
          />
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/50">
          Elsewhere
        </h2>
        <div className="mt-2">
          {hasAnySocial ? (
            <SocialLinks socials={profile.socials} />
          ) : (
            <p className="text-sm italic text-foreground/40">
              Add your social links to data/profile.ts.
            </p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/50">
          Résumé
        </h2>
        <div className="mt-2">
          {hasResume ? (
            <a
              href={profile.resume.href}
              download
              className="flex w-fit items-center gap-2 rounded-radius border border-card-border px-3 py-2 text-sm font-medium text-heading transition-colors hover:border-primary hover:text-primary"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download Résumé
            </a>
          ) : (
            <p className="text-sm italic text-foreground/40">
              Add a résumé PDF under /public and set profile.resume.href.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
