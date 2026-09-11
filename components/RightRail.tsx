import { AboutMeCard } from "@/components/bento/AboutMeCard";
import { HackathonCard } from "@/components/bento/HackathonCard";
import { GetInTouchCard } from "@/components/bento/GetInTouchCard";

/**
 * Right-hand column that runs alongside Featured Projects / Services /
 * Certifications on the home dashboard — About Me, Hackathon
 * Achievement, then the Get in Touch CTA, stacked. Fixed width at lg+
 * (matching the reference layout's persistent rail); collapses to a
 * plain stack below the main column at smaller widths.
 *
 * The Work Outcomes card is deliberately NOT included here — it sits in
 * its own row directly beside the Hero (see app/page.tsx), not this
 * lower rail.
 */
export function RightRail() {
  return (
    <div className="flex w-full flex-col gap-4 lg:w-80 lg:shrink-0">
      <AboutMeCard />
      <HackathonCard />
      <GetInTouchCard />
    </div>
  );
}
