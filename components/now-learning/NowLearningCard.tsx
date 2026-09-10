import { GraduationCap } from "lucide-react";
import type { NowLearning } from "@/data/profile";

export function NowLearningCard({ nowLearning }: { nowLearning: NowLearning }) {
  const filled = nowLearning.title.trim().length > 0;

  return (
    <div className="flex flex-col gap-3 rounded-radius border border-card-border bg-card p-5 shadow-card md:p-6">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <GraduationCap className="h-4 w-4" aria-hidden="true" />
        </span>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/50">
          Now Learning
        </h2>
      </div>

      {filled ? (
        <div>
          <p className="text-base font-semibold text-heading">{nowLearning.title}</p>
          {nowLearning.description && (
            <p className="mt-1 text-sm leading-relaxed text-foreground/70">
              {nowLearning.description}
            </p>
          )}
        </div>
      ) : (
        <p className="text-sm italic text-foreground/40">
          Add what you&rsquo;re actively studying or building right now to data/profile.ts.
        </p>
      )}
    </div>
  );
}
