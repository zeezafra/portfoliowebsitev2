// Single typed source for Zee's profile info. Sidebar and Hero both read
// from this (per the roadmap's "one typed data source" rule) — later
// phases (About, Contact) should reuse it too rather than re-declaring
// name/role/socials locally.

export type SocialLink = {
  label: string;
  // TODO(Zee): fill in your real profile URLs. Left blank on purpose —
  // an invented LinkedIn/GitHub/Facebook URL would just be a dead link.
  // A link with an empty href is skipped by <SocialLinks> below.
  href: string;
  icon: "linkedin" | "github" | "facebook" | "mail";
};

export type StatIcon = "projects" | "experience" | "satisfaction" | "reliability";

export type Stat = {
  icon: StatIcon;
  /** TODO(Zee): these are placeholder numbers — replace with your real figures. */
  value: number;
  suffix?: string;
  label: string;
};

export type ToolIcon =
  | "web"
  | "code"
  | "styling"
  | "design"
  | "hardware"
  | "support"
  | "ai";

export type Tool = {
  icon: ToolIcon;
  name: string;
  subtitle: string;
};

export type Profile = {
  name: string;
  role: string;
  /** Footer tagline in the sidebar. TODO(Zee): confirm wording. */
  tagline: string;
  availability: {
    isAvailable: boolean;
    label: string;
  };
  socials: SocialLink[];
  hero: {
    pill: string;
    /** TODO(Zee): confirm final headline copy. */
    headline: string;
    subtext: string;
    ctaLabel: string;
    ctaHref: string;
  };
  /** TODO(Zee): confirm these are your real numbers before this goes live. */
  stats: Stat[];
  /** TODO(Zee): confirm/edit this list — drafted from what's visible in your
   *  toolset (Next.js/TS/Tailwind from this project, Photoshop, IT/hardware
   *  support, MCP/AI agent dev), not a complete inventory of everything you use. */
  tools: Tool[];
};

export const profile: Profile = {
  name: "Zee Zafra",
  role: "IT Technician & Web Developer",
  tagline: "Build · Support · Improve",
  availability: {
    isAvailable: true,
    label: "Available for work",
  },
  socials: [
    { label: "LinkedIn", href: "", icon: "linkedin" },
    { label: "GitHub", href: "", icon: "github" },
    { label: "Facebook", href: "", icon: "facebook" },
    { label: "Email", href: "", icon: "mail" },
  ],
  hero: {
    pill: "IT Technician & Web Developer",
    headline: "I build reliable systems and practical web experiences.",
    subtext:
      "From hands-on hardware diagnostics to full web builds, I help people and small teams keep their tech running smoothly.",
    ctaLabel: "Let's work together",
    ctaHref: "/contact",
  },
  stats: [
    { icon: "projects", value: 10, suffix: "+", label: "Projects Completed" },
    { icon: "experience", value: 2, suffix: "+", label: "Years of Experience" },
    { icon: "satisfaction", value: 95, suffix: "%", label: "Client Satisfaction" },
    { icon: "reliability", value: 99, suffix: "%", label: "Uptime / Reliability" },
  ],
  tools: [
    {
      icon: "web",
      name: "Next.js & React",
      subtitle: "Web Development — App Router, TypeScript",
    },
    { icon: "styling", name: "Tailwind CSS", subtitle: "UI & Design Systems" },
    { icon: "code", name: "TypeScript", subtitle: "Application Logic" },
    { icon: "design", name: "Photoshop", subtitle: "Graphic & Layout Design" },
    {
      icon: "hardware",
      name: "Hardware Diagnostics",
      subtitle: "PC · Laptop · Devices",
    },
    { icon: "support", name: "Technical Support", subtitle: "Troubleshooting & Repair" },
    { icon: "ai", name: "AI Agent Development", subtitle: "MCP Servers & Tooling" },
  ],
};
