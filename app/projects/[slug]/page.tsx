import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Lightbulb, Link2, Target, TrendingUp, UserCheck } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectHeader } from "@/components/project/ProjectHeader";
import { LabeledSection } from "@/components/shared/LabeledSection";
import { ProjectToolsUsed } from "@/components/project/ProjectToolsUsed";
import { ProjectGallery } from "@/components/project/ProjectGallery";
import { ProjectLinks } from "@/components/project/ProjectLinks";

// One static page per project, generated at build time from the Phase 5
// data source — never hand-listing slugs separately.
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

// Unknown/typo'd slugs should 404, not attempt an on-demand render there's
// no data for — every valid slug already lives in data/projects.ts.
export const dynamicParams = false;

function findProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return {};

  // Falls back to the home-grid summary when the longer case-study
  // `description` hasn't been filled in yet, rather than an empty
  // <meta description>.
  const description = project.description.trim() || project.summary;

  return {
    title: `${project.title} — Zee Zafra`,
    description,
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();

  return (
    <article className="flex flex-col gap-10 px-6 py-12 md:px-12 md:py-16">
      <ProjectHeader project={project} />

      <div className="flex max-w-3xl flex-col gap-8">
        <LabeledSection
          icon={Target}
          title="Problem"
          text={project.problem}
          placeholder="Add the problem this project set out to solve."
        />
        <LabeledSection
          icon={UserCheck}
          title="My Role"
          text={project.role}
          placeholder="Add your role on this project."
        />
        <ProjectToolsUsed tools={project.tools} />
      </div>

      <ProjectGallery images={project.images} title={project.title} category={project.category} />

      <div className="flex max-w-3xl flex-col gap-8">
        <LabeledSection
          icon={Lightbulb}
          title="Solution"
          text={project.solution}
          placeholder="Add how you solved it."
        />
        <LabeledSection
          icon={TrendingUp}
          title="Outcome"
          text={project.outcome}
          placeholder="Add the result or impact of this project."
        />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground/50">
          <Link2 className="h-4 w-4 text-primary" aria-hidden="true" />
          Links
        </h2>
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}
