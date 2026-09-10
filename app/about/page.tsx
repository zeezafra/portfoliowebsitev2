import Image from "next/image";
import { Briefcase } from "lucide-react";
import { profile } from "@/data/profile";
import { AboutFactRow } from "@/components/shared/AboutFactRow";
import { ExperienceTimeline } from "@/components/timeline/ExperienceTimeline";
import { NowLearningCard } from "@/components/now-learning/NowLearningCard";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";

// Phase 7 builds this out from a bare stub. The home page's compact
// AboutMeCard stays as-is (a dashboard tile); this is the fuller
// destination that card's "About" nav link always pointed at. The
// Experience Timeline and Now Learning card live here rather than the
// home page, per the roadmap's "home page or About page" choice for
// Now Learning — keeping both narrative-heavy additions together on one
// page instead of crowding the already-dense bento dashboard further.
export default function AboutPage() {
  return (
    <div className="flex flex-col gap-10 px-6 py-12 md:px-12 md:py-16">
      <header className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <Image
          src="/images/hero-portrait.png"
          alt={profile.name}
          width={96}
          height={96}
          className="h-24 w-24 shrink-0 rounded-full object-cover shadow-card"
        />
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold text-heading md:text-4xl">{profile.name}</h1>
          <p className="text-foreground/60">{profile.role}</p>
        </div>
      </header>

      <div className="flex max-w-3xl flex-col gap-6">
        <p className="text-base leading-relaxed text-foreground/80">{profile.about.bio}</p>
        <div className="flex flex-col gap-2.5 border-t border-card-border pt-5 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2.5">
          {profile.about.facts.map((fact) => (
            <AboutFactRow key={fact.label} {...fact} />
          ))}
        </div>
      </div>

      <section className="flex max-w-3xl flex-col gap-4">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground/50">
          <Briefcase className="h-4 w-4 text-primary" aria-hidden="true" />
          Experience
        </h2>
        <ExperienceTimeline entries={profile.experience} />
      </section>

      <div className="max-w-sm">
        <NowLearningCard nowLearning={profile.nowLearning} />
      </div>

      <div className="max-w-3xl">
        <TestimonialsSection testimonials={profile.testimonials} />
      </div>
    </div>
  );
}
