import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { profile } from "@/data/profile";
import { BentoCard } from "@/components/bento/BentoCard";

/**
 * Small CTA tile at the bottom of the right rail, matching the
 * reference layout's "Get in Touch" box. Reuses the headline already
 * drafted for the Contact page hero (Phase 8) rather than inventing new
 * marketing copy just for this card.
 */
export function GetInTouchCard({ className = "" }: { className?: string }) {
  return (
    <BentoCard title="Let's Connect" icon={MessageCircle} className={className}>
      <div className="flex flex-1 flex-col gap-4">
        <p className="text-sm text-foreground/70">{profile.contact.headline}</p>
        <Link
          href="/contact"
          className="mt-auto inline-flex items-center justify-center rounded-radius bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-card transition-opacity hover:opacity-90"
        >
          Get in Touch
        </Link>
      </div>
    </BentoCard>
  );
}
