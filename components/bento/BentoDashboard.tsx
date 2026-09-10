import { FeaturedProjectsCard } from "@/components/bento/FeaturedProjectsCard";
import { AboutMeCard } from "@/components/bento/AboutMeCard";
import { ServicesCard } from "@/components/bento/ServicesCard";
import { CertificationsCard } from "@/components/bento/CertificationsCard";
import { HackathonCard } from "@/components/bento/HackathonCard";

/**
 * Home-page card grid. Layout (desktop, lg+):
 *
 *   [ Featured Projects (2 cols x 2 rows) ] [ About Me (1 col x 2 rows) ]
 *   [ Services (1 col) ] [ Certifications (1 col) ] [ Hackathon (1 col) ]
 *
 * Featured Projects and About Me are the tall left/right anchors; the
 * remaining three sit in a row underneath. Below `lg` everything
 * collapses to a single/double column stack in source order.
 */
export function BentoDashboard() {
  return (
    <section className="grid grid-cols-1 gap-4 px-6 pb-16 md:grid-cols-2 md:px-12 lg:grid-cols-3 lg:auto-rows-[minmax(0,auto)]">
      <FeaturedProjectsCard
        id="featured-projects"
        className="md:col-span-2 lg:col-span-2 lg:row-span-2"
      />
      <AboutMeCard className="md:col-span-2 lg:col-span-1 lg:row-span-2" />
      <ServicesCard className="md:col-span-2 lg:col-span-1" />
      <CertificationsCard />
      <HackathonCard />
    </section>
  );
}
