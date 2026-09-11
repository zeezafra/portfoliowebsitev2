"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";
import { BarChart3, FolderCheck, CalendarClock, Smile, ShieldCheck } from "lucide-react";
import { profile, type Stat, type StatIcon } from "@/data/profile";
import { BentoCard } from "@/components/bento/BentoCard";

const ICONS: Record<StatIcon, typeof FolderCheck> = {
  projects: FolderCheck,
  experience: CalendarClock,
  satisfaction: Smile,
  reliability: ShieldCheck,
};

function useCountUp(target: number, shouldStart: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;
    // animate() drives updates via requestAnimationFrame on its own
    // schedule, not synchronously in this effect body, so this doesn't
    // trigger the cascading-render issue the set-state-in-effect rule
    // guards against.
    const controls = animate(0, target, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => setValue(latest),
    });
    return () => controls.stop();
  }, [shouldStart, target]);

  return value;
}

function StatTile({ icon, value, suffix, label }: Stat) {
  const ref = useRef<HTMLDivElement>(null);
  // once: true -> the count-up fires the first time the card scrolls into
  // view and never again, even if the component re-renders later.
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const animated = useCountUp(value, inView);
  const Icon = ICONS[icon];

  return (
    <div
      ref={ref}
      className="flex flex-col items-start gap-2 rounded-radius border border-card-border bg-background/40 p-4"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <p className="text-2xl font-semibold text-heading">
        {Math.round(animated)}
        {suffix}
      </p>
      <p className="text-xs text-foreground/60">{label}</p>
    </div>
  );
}

/**
 * Right-rail "Work Outcomes" card — the same count-up stat tiles that
 * used to be a bare full-width row below the hero (old StatCards.tsx)
 * now grouped into one titled card next to the hero, matching the
 * reference layout's boxed stat panel instead of a separate section
 * underneath it. No "View all" action here: there isn't yet a real
 * destination page for the full stat breakdown, and a link to nowhere
 * would be worse than no link.
 */
export function WorkOutcomesCard({ className = "" }: { className?: string }) {
  return (
    <BentoCard title="Work Outcomes" icon={BarChart3} className={className}>
      <div className="grid grid-cols-2 gap-3">
        {profile.stats.map((stat) => (
          <StatTile key={stat.label} {...stat} />
        ))}
      </div>
    </BentoCard>
  );
}
