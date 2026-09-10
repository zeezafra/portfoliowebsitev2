import { CalendarClock, Layers, MapPin } from "lucide-react";
import type { AboutFact } from "@/data/profile";

const FACT_ICONS: Record<AboutFact["icon"], typeof MapPin> = {
  location: MapPin,
  experience: CalendarClock,
  focus: Layers,
};

export function AboutFactRow({ icon, label, value }: AboutFact) {
  const Icon = FACT_ICONS[icon];
  const filled = value.trim().length > 0;

  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
      <p className="text-sm">
        <span className="text-foreground/50">{label}: </span>
        {filled ? (
          <span className="font-medium text-heading">{value}</span>
        ) : (
          <span className="italic text-foreground/40">add this</span>
        )}
      </p>
    </div>
  );
}
