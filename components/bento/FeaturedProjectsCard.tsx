"use client";

import { useState } from "react";
import Link from "next/link";
import { FolderKanban } from "lucide-react";
import { BentoCard } from "@/components/bento/BentoCard";
import { PlaceholderThumb } from "@/components/bento/PlaceholderThumb";
import { projects, type Project } from "@/data/projects";
import { CATEGORY_ICONS, CATEGORY_LABELS } from "@/lib/project-category";

// "all" plus every real category from the data source — deriving this
// from Project["category"] instead of hand-listing the categories again
// keeps this in sync with data/projects.ts automatically.
type FilterValue = "all" | Project["category"];

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "web", label: "Web" },
  { value: "hardware", label: "Hardware" },
  { value: "technical-support", label: "Technical Support" },
  { value: "hackathon", label: "Hackathon" },
];

export function FeaturedProjectsCard({
  className = "",
  id,
}: {
  className?: string;
  id?: string;
}) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");

  const visibleProjects =
    activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <BentoCard title="Featured Projects" icon={FolderKanban} className={className} id={id}>
      <div className="scrollbar-none -mx-1 mb-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {FILTERS.map((filter) => {
          const active = filter.value === activeFilter;
          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActiveFilter(filter.value)}
              aria-pressed={active}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-card-border bg-transparent text-foreground/60 hover:text-foreground"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {visibleProjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {visibleProjects.map((project) => {
            const Icon = CATEGORY_ICONS[project.category];
            return (
              <div
                key={project.slug}
                className="flex flex-col gap-3 rounded-radius border border-card-border bg-background/40 p-3"
              >
                <PlaceholderThumb icon={Icon} className="h-28 w-full" />
                <div className="flex flex-col gap-1">
                  <span className="w-fit rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                    {CATEGORY_LABELS[project.category]}
                  </span>
                  <p className="text-sm font-semibold text-heading">{project.title}</p>
                  <p className="text-xs text-foreground/60">{project.summary}</p>
                  {/*
                    Now points at the real static case-study route Phase 6
                    built — was a stub pointing at /projects until now.
                  */}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="mt-1 text-xs font-semibold text-primary hover:underline"
                  >
                    View Project →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-radius border border-dashed border-card-border p-8 text-center">
          <p className="text-xs italic text-foreground/40">
            No projects in this category yet.
          </p>
        </div>
      )}
    </BentoCard>
  );
}
