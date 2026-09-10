// Single typed source for project data — the Featured Projects grid
// (Phase 4/5) and the case-study pages (Phase 6) both read from this file;
// project info should never be hand-duplicated between the two.
//
// TODO(Zee): `summary` is safe placeholder copy (restates the title, no
// invented specifics). `role`, `tools`, `problem`, `solution`, `outcome`,
// `images`, and the link fields are left blank/empty on purpose — I didn't
// write case-study narrative content (what problem you solved, what tools
// you used, what the outcome was) without you confirming it. That's a
// specific claim about your work, not a placeholder number like the stats
// in Phase 3. Fill these in before Phase 6 builds real case-study pages
// from them — an empty `tools`/`images` array or blank string is handled
// gracefully by Phase 6 rather than needing every field up front, so feel
// free to fill this in incrementally.
//
// Gap to flag plainly: there's no "hackathon" project here yet. The
// roadmap's named list (IT Inventory System, PC Diagnostics & Repair, this
// site, Arduino Smart System) doesn't include one, and the Hackathon
// Achievement card (Phase 4) is still unfilled too — so the "Hackathon"
// filter tab currently shows an empty state. Add an entry here (and fill
// in the Phase 4 hackathon card) once you've got the details.

export type ProjectCategory = "web" | "hardware" | "technical-support" | "hackathon";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  /** Short one-liner shown on the home page grid card. */
  summary: string;
  /** Longer write-up for the case-study page (Phase 6). */
  description: string;
  role: string;
  tools: string[];
  problem: string;
  solution: string;
  outcome: string;
  images: string[];
  liveUrl?: string;
  demoUrl?: string;
  repoUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "it-inventory-system",
    title: "IT Inventory System",
    // TODO(Zee): filed under "technical-support" since it reads as an
    // internal IT-ops tool rather than a public web build — move to "web"
    // if that's not the right call.
    category: "technical-support",
    summary: "A tool for tracking IT assets and inventory.",
    description: "",
    role: "",
    tools: [],
    problem: "",
    solution: "",
    outcome: "",
    images: [],
  },
  {
    slug: "pc-diagnostics-repair",
    title: "PC Diagnostics & Repair",
    category: "hardware",
    summary: "Hands-on hardware diagnostics and repair work.",
    description: "",
    role: "",
    tools: [],
    problem: "",
    solution: "",
    outcome: "",
    images: [],
  },
  {
    slug: "portfolio-site",
    title: "This Portfolio Site",
    category: "web",
    summary: "The dashboard-style site you're looking at right now, built phase by phase.",
    description: "",
    // Safe to state directly — it's this repo, built solo.
    role: "Solo designer & developer",
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    problem: "",
    solution: "",
    outcome: "",
    images: [],
  },
  {
    slug: "arduino-smart-system",
    title: "Arduino Smart System",
    category: "hardware",
    summary: "An Arduino-based smart system project.",
    description: "",
    role: "",
    tools: [],
    problem: "",
    solution: "",
    outcome: "",
    images: [],
  },
];
