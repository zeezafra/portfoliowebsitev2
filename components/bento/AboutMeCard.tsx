import Image from "next/image";
import { User } from "lucide-react";
import { profile } from "@/data/profile";
import { BentoCard } from "@/components/bento/BentoCard";
import { AboutFactRow } from "@/components/shared/AboutFactRow";

export function AboutMeCard({ className = "" }: { className?: string }) {
  return (
    <BentoCard title="About Me" icon={User} className={className}>
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-center gap-4">
          <Image
            src="/images/hero-portrait.png"
            alt={profile.name}
            width={64}
            height={64}
            className="h-16 w-16 shrink-0 rounded-full object-cover shadow-card"
          />
          <div>
            <p className="text-base font-semibold text-heading">{profile.name}</p>
            <p className="text-sm text-foreground/60">{profile.role}</p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-foreground/70">{profile.about.bio}</p>

        <div className="mt-auto flex flex-col gap-2.5 border-t border-card-border pt-4">
          {profile.about.facts.map((fact) => (
            <AboutFactRow key={fact.label} {...fact} />
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
