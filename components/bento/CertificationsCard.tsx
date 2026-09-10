import Link from "next/link";
import Image from "next/image";
import { Award, Plus } from "lucide-react";
import { profile } from "@/data/profile";
import { BentoCard } from "@/components/bento/BentoCard";
import { PlaceholderThumb } from "@/components/bento/PlaceholderThumb";

// No invented certification names here — see the TODO on
// `profile.certifications` in data/profile.ts for why. This renders
// "add a certification" prompt tiles until that array has real entries.
export function CertificationsCard({ className = "" }: { className?: string }) {
  const { certifications } = profile;
  const emptySlots = Math.max(3 - certifications.length, 0);

  return (
    <BentoCard
      title="Certifications"
      icon={Award}
      className={className}
      action={
        <Link
          href="/certifications"
          className="text-xs font-semibold text-primary hover:underline"
        >
          View all →
        </Link>
      }
    >
      <div className="grid grid-cols-3 gap-2">
        {certifications.map((cert) => (
          <div
            key={cert.name}
            className="flex flex-col items-center gap-1.5 rounded-radius border border-card-border bg-background/40 p-2 text-center"
          >
            {cert.image ? (
              <div className="relative h-14 w-14 overflow-hidden rounded-radius">
                <Image src={cert.image} alt={cert.name} fill className="object-cover" />
              </div>
            ) : (
              <PlaceholderThumb icon={Award} className="h-14 w-14" />
            )}
            <p className="truncate text-[11px] font-medium text-heading">{cert.name}</p>
          </div>
        ))}
        {Array.from({ length: emptySlots }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className="flex flex-col items-center justify-center gap-1.5 rounded-radius border border-dashed border-card-border p-2 text-center"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/5 text-primary/40">
              <Plus className="h-4 w-4" aria-hidden="true" />
            </span>
            <p className="text-[10px] italic text-foreground/40">Add certification</p>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
