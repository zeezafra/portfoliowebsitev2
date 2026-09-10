import { Lightbulb, Images, Target, Trophy, Wrench } from "lucide-react";
import { profile } from "@/data/profile";
import { LabeledSection } from "@/components/shared/LabeledSection";
import { ImageLightboxGrid } from "@/components/gallery/ImageLightboxGrid";

// Phase 7 — the Phase 4 HackathonCard's "View Details →" destination.
// Reuses LabeledSection (same fill-in-prompt pattern as the case-study
// pages) and ImageLightboxGrid (same lightbox as Phase 6/certifications)
// rather than building page-specific equivalents of either.
export default function HackathonPage() {
  const { hackathon } = profile;
  const filled = hackathon.name.trim().length > 0;

  return (
    <div className="flex flex-col gap-10 px-6 py-12 md:px-12 md:py-16">
      <header className="flex flex-col gap-3">
        <span className="flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
          <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
          Hackathon Achievement
        </span>

        {filled ? (
          <>
            <h1 className="text-3xl font-semibold text-heading md:text-4xl">
              {hackathon.result}
            </h1>
            <p className="text-foreground/60">{hackathon.name}</p>
            {hackathon.description && (
              <p className="max-w-3xl text-base leading-relaxed text-foreground/80">
                {hackathon.description}
              </p>
            )}
          </>
        ) : (
          <p className="max-w-2xl text-sm italic text-foreground/40">
            Add your event name, placement/result, and a one-line description to
            data/profile.ts — nothing invented here.
          </p>
        )}
      </header>

      <div className="flex max-w-3xl flex-col gap-8">
        <LabeledSection
          icon={Target}
          title="Problem Solved"
          text={hackathon.problem}
          placeholder="Add the problem your hackathon project set out to solve."
        />

        <section className="flex flex-col gap-2">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground/50">
            <Wrench className="h-4 w-4 text-primary" aria-hidden="true" />
            Tech Used
          </h2>
          {hackathon.techUsed.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {hackathon.techUsed.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-card-border bg-card px-3 py-1 text-sm font-medium text-heading shadow-card"
                >
                  {tech}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm italic text-foreground/40">
              Add the tech stack used for this project.
            </p>
          )}
        </section>
      </div>

      <section className="flex flex-col gap-2">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground/50">
          <Images className="h-4 w-4 text-primary" aria-hidden="true" />
          Photos
        </h2>
        {hackathon.images.length > 0 ? (
          <ImageLightboxGrid
            images={hackathon.images.map((src, index) => ({
              src,
              alt: `${hackathon.name || "Hackathon"} photo ${index + 1}`,
            }))}
          />
        ) : (
          <p className="text-sm italic text-foreground/40">Add event photos.</p>
        )}
      </section>

      <div className="max-w-3xl">
        <LabeledSection
          icon={Lightbulb}
          title="Writeup"
          text={hackathon.writeup}
          placeholder="Add the fuller story — approach, challenges, what you'd do differently."
        />
      </div>
    </div>
  );
}
