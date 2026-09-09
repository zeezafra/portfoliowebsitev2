import { Code2, Palette, Image as ImageIcon, HardDrive, Headset, Bot, Globe } from "lucide-react";
import { profile, type Tool, type ToolIcon } from "@/data/profile";

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
    <div className="flex w-64 shrink-0 snap-start items-center gap-3 rounded-radius border border-card-border bg-card p-4 shadow-card">
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

export function ToolsStrip() {
  return (
    <section className="px-6 py-8 md:px-12">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground/50">
        Tools I Work With
      </h2>
      {/*
        Plain horizontal scroll (not an auto-scrolling marquee) — a
        reasonable default for now. Every chip has a fixed width (w-64,
        shrink-0) so scrolling never reflows neighboring chips, which is
        what avoids layout shift on mobile. Happy to switch this to a
        slow auto-scroll marquee instead if you'd prefer that look.
      */}
      <div className="scrollbar-none -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 md:mx-0 md:px-0">
        {profile.tools.map((tool) => (
          <ToolChip key={tool.name} {...tool} />
        ))}
      </div>
    </section>
  );
}
