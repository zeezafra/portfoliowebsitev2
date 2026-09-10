import { ExternalLink, Play, type LucideIcon } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import type { Project } from "@/data/projects";
import { GithubGlyph } from "@/components/icons/SocialGlyphs";

const LINK_FIELDS: {
  key: keyof Pick<Project, "liveUrl" | "demoUrl" | "repoUrl">;
  label: string;
  icon: LucideIcon | ComponentType<SVGProps<SVGSVGElement>>;
}[] = [
  { key: "liveUrl", label: "Live Demo", icon: ExternalLink },
  { key: "demoUrl", label: "Demo", icon: Play },
  // lucide-react doesn't ship a GitHub mark in this version (same reason
  // the sidebar uses a custom glyph) — reuse that one here.
  { key: "repoUrl", label: "GitHub", icon: GithubGlyph },
];

// Only renders buttons for links that actually exist on the project — per
// the roadmap: "a project missing an optional field (no liveUrl, say)
// doesn't render a broken link."
export function ProjectLinks({ project }: { project: Project }) {
  const available = LINK_FIELDS.filter(({ key }) => Boolean(project[key]));

  if (available.length === 0) {
    return (
      <p className="text-sm italic text-foreground/40">
        No live link, demo, or repo added for this project yet.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      {available.map(({ key, label, icon: Icon }) => (
        <a
          key={key}
          href={project[key]}
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center gap-2 rounded-full border border-card-border bg-card px-4 py-2 text-sm font-semibold text-heading shadow-card transition-colors hover:border-primary hover:text-primary"
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
          {label}
        </a>
      ))}
    </div>
  );
}
