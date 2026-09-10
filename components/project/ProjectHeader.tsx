import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Project } from "@/data/projects";
import { CATEGORY_ICONS, CATEGORY_LABELS } from "@/lib/project-category";
import { PlaceholderThumb } from "@/components/bento/PlaceholderThumb";

export function ProjectHeader({ project }: { project: Project }) {
  const CategoryIcon = CATEGORY_ICONS[project.category];
  const heroImage = project.images[0];

  return (
    <header className="flex flex-col gap-6">
      {/*
        Points at the home page's Featured Projects card rather than the
        still-stub /projects index — the roadmap explicitly allows either,
        and building a full /projects listing page isn't scheduled on any
        phase, so this avoids inventing one.
      */}
      <Link
        href="/#featured-projects"
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-foreground/60 hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to Projects
      </Link>

      <div className="flex flex-col gap-3">
        <span className="flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
          <CategoryIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {CATEGORY_LABELS[project.category]}
        </span>

        <h1 className="text-3xl font-semibold text-heading md:text-4xl">{project.title}</h1>

        {project.tools.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-card-border px-2.5 py-1 text-xs font-medium text-foreground/60"
              >
                {tool}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="relative h-56 w-full overflow-hidden rounded-radius border border-card-border shadow-card sm:h-72 md:h-96">
        {heroImage ? (
          <Image
            src={heroImage}
            alt={`${project.title} screenshot`}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <PlaceholderThumb icon={CategoryIcon} className="h-full w-full" />
        )}
      </div>
    </header>
  );
}
