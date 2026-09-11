import { Code2, Palette, Image as ImageIcon, HardDrive, Headset, Bot, Globe, Layers } from "lucide-react";
import { profile, type Tool, type ToolIcon } from "@/data/profile";
import { BentoCard } from "@/components/bento/BentoCard";

const ICONS: Record<ToolIcon, typeof Code2> = {
  web: Globe,
  code: Code2,
  styling: Palette,
  design: ImageIcon,
  hardware: HardDrive,
  support: Headset,
  ai: Bot,
};

function ToolChip({ icon, name, subtitle }: Tool) {
  const Icon = ICONS[icon];
  return (
    <div className="flex w-64 shrink-0 snap-start items-center gap-3 rounded-radius border border-card-border bg-background/40 p-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-heading">{name}</p>
        <p className="truncate text-xs text-foreground/60">{subtitle}</p>
      </div>
    </div>
  );
}

/**
 * Now a titled BentoCard (folder-style "Layers" icon) instead of a bare
 * heading + strip, for the same one-system card treatment as every
 * other dashboard section — matches the reference layout's bordered
 * "Tools I work with" panel. Spans the full width of both dashboard
 * columns on the home page (see app/page.tsx), not just the main
 * column, same as the reference.
 */
export function ToolsStrip() {
  return (
    <BentoCard title="Tools I Work With" icon={Layers} id="tools">
      {/*
        Plain horizontal scroll (not an auto-scrolling marquee) — a
        reasonable default for now. Every chip has a fixed width (w-64,
        shrink-0) so scrolling never reflows neighboring chips, which is
        what avoids layout shift on mobile. Bleed margins match
        BentoCard's own padding (p-5/md:p-6) so the strip runs edge to
        edge inside the card.
      */}
      <div className="scrollbar-none -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-1 md:-mx-6 md:px-6">
        {profile.tools.map((tool) => (
          <ToolChip key={tool.name} {...tool} />
        ))}
      </div>
    </BentoCard>
  );
}
