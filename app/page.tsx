import { Hero } from "@/components/Hero";
import { ToolsStrip } from "@/components/ToolsStrip";
import { BentoDashboard } from "@/components/bento/BentoDashboard";
import { WorkOutcomesCard } from "@/components/bento/WorkOutcomesCard";
import { RightRail } from "@/components/RightRail";

/**
 * Home dashboard layout, restructured to match the reference
 * screenshot's actual two-column structure (main column + persistent
 * right rail) instead of one long stack of full-width sections:
 *
 *   [ Hero (main column) ]              [ Work Outcomes (rail) ]
 *   [ Tools I Work With — full width, spans both columns        ]
 *   [ Featured Projects (main column) ]  [ About Me (rail) ]
 *   [ Services | Certifications (main) ]  [ Hackathon (rail) ]
 *   [ Availability banner (main only) ]  [ Get in Touch (rail) ]
 *
 * Below `lg` every column collapses to a single stack in source order
 * (main column content first, then the rail), same pattern already
 * used inside BentoDashboard/RightRail themselves.
 */
export default function HomePage() {
  return (
    <div className="flex flex-col gap-4 px-6 pb-16 pt-6 md:px-12">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
        <div className="min-w-0 flex-1">
          <Hero />
        </div>
        <div className="w-full lg:w-80 lg:shrink-0">
          <WorkOutcomesCard className="h-full" />
        </div>
      </div>

      <ToolsStrip />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1">
          <BentoDashboard />
        </div>
        <RightRail />
      </div>
    </div>
  );
}
