import { Check, Globe, HardDrive, Headset, Wrench } from "lucide-react";
import { profile, type Service } from "@/data/profile";
import { BentoCard } from "@/components/bento/BentoCard";

const SERVICE_ICONS: Record<Service["icon"], typeof Globe> = {
  support: Headset,
  web: Globe,
  hardware: HardDrive,
};

function ServiceColumn({ icon, title, bullets }: Service) {
  const Icon = SERVICE_ICONS[icon];
  return (
    <div className="flex flex-1 flex-col gap-2 rounded-radius border border-card-border bg-background/40 p-4">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <p className="text-sm font-semibold text-heading">{title}</p>
      <ul className="flex flex-col gap-1.5">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-1.5 text-xs text-foreground/60">
            <Check className="mt-0.5 h-3 w-3 shrink-0 text-accent-success" aria-hidden="true" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ServicesCard({
  className = "",
  id,
}: {
  className?: string;
  id?: string;
}) {
  return (
    <BentoCard title="Services" icon={Wrench} className={className} id={id}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {profile.services.map((service) => (
          <ServiceColumn key={service.title} {...service} />
        ))}
      </div>
    </BentoCard>
  );
}
