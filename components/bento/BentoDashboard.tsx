import { FeaturedProjectsCard } from "@/components/bento/FeaturedProjectsCard";
import { ServicesCard } from "@/components/bento/ServicesCard";
import { CertificationsCard } from "@/components/bento/CertificationsCard";
import { AvailabilityBanner } from "@/components/AvailabilityBanner";

/**
 * Main-column stack of the home dashboard's lower section: Featured
 * Projects, then Services and Certifications side by side, then the
 * availability banner. About Me / Hackathon Achievement / Get in Touch
 * now live in the persistent right rail instead (see RightRail.tsx) —
 * this is a structural fix to match the reference layout's true
 * two-column dashboard (main column + fixed-width rail) rather than
 * the single wrapping bento grid this section used to be.
 */
export function BentoDashboard() {
  return (
    <div className="flex flex-col gap-4">
      <FeaturedProjectsCard id="featured-projects" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ServicesCard id="services" />
        <CertificationsCard />
      </div>
      <AvailabilityBanner />
    </div>
  );
}
