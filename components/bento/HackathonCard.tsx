import Link from "next/link";
import Image from "next/image";
import { Trophy } from "lucide-react";
import { profile } from "@/data/profile";
import { BentoCard } from "@/components/bento/BentoCard";
import { PlaceholderThumb } from "@/components/bento/PlaceholderThumb";

// No invented event name/placement here — see the TODO on
// `profile.hackathon` in data/profile.ts. Renders a fill-in prompt
// while `name` is empty instead of a fabricated result.
export function HackathonCard({ className = "" }: { className?: string }) {
  const { hackathon } = profile;
  const filled = hackathon.name.trim().length > 0;
  const thumbnail = hackathon.images[0];

  return (
    <BentoCard
      title="Hackathon Achievement"
      icon={Trophy}
      className={className}
      action={
        <Link
          href="/hackathon"
          className="text-xs font-semibold text-primary hover:underline"
        >
          View Details →
        </Link>
      }
    >
      <div className="flex flex-1 items-center gap-4">
        {thumbnail ? (
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-radius">
            <Image src={thumbnail} alt={hackathon.name} fill className="object-cover" />
          </div>
        ) : (
          <PlaceholderThumb icon={Trophy} className="h-16 w-16 shrink-0" />
        )}
        {filled ? (
          <div>
            <p className="text-sm font-semibold text-heading">{hackathon.result}</p>
            <p className="text-xs text-foreground/60">{hackathon.name}</p>
            <p className="mt-1 text-xs text-foreground/60">{hackathon.description}</p>
          </div>
        ) : (
          <p className="text-xs italic text-foreground/40">
            Add your event name, placement/result, and a one-line description.
          </p>
        )}
      </div>
    </BentoCard>
  );
}
