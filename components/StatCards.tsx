"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";
import { FolderCheck, CalendarClock, Smile, ShieldCheck } from "lucide-react";
import { profile, type Stat, type StatIcon } from "@/data/profile";

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

function StatCard({ icon, value, suffix, label }: Stat) {
  const ref = useRef<HTMLDivElement>(null);
  // once: true -> the count-up fires the first time the card scrolls into
  // view and never again, even if the component re-renders later.
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const animated = useCountUp(value, inView);
  const Icon = ICONS[icon];

  return (
    <div
      ref={ref}
      className="flex flex-col items-start gap-3 rounded-radius border border-card-border bg-card p-5 shadow-card"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <p className="text-3xl font-semibold text-heading">
        {Math.round(animated)}
        {suffix}
      </p>
      <p className="text-sm text-foreground/60">{label}</p>
    </div>
  );
}

export function StatCards() {
  return (
    <section className="px-6 pb-4 md:px-12">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {profile.stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
