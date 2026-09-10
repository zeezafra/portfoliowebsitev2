import type { LucideIcon } from "lucide-react";
import { Globe, HardDrive, Headset, Trophy } from "lucide-react";
import type { Project } from "@/data/projects";

// Shared category display config. Previously this lived only inside
// FeaturedProjectsCard; the Phase 6 case-study header needs the exact same
// label/icon per category, so it's pulled out here once instead of being
// hand-duplicated — same "single source of truth" reasoning the roadmap
// applies to data/projects.ts itself, just one level up.
export const CATEGORY_LABELS: Record<Project["category"], string> = {
  web: "Web",
  hardware: "Hardware",
  "technical-support": "Technical Support",
  hackathon: "Hackathon",
};

export const CATEGORY_ICONS: Record<Project["category"], LucideIcon> = {
  web: Globe,
  hardware: HardDrive,
  "technical-support": Headset,
  hackathon: Trophy,
};
