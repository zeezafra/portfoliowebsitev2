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

export type AboutFact = {
  icon: "location" | "experience" | "focus";
  label: string;
  /** Empty string means "not filled in yet" — AboutMeCard renders a
   *  fill-in prompt instead of an empty value. */
  value: string;
};

export type Service = {
  /** Reuses ToolIcon since these map 1:1 onto the tool categories above. */
  icon: Extract<ToolIcon, "support" | "web" | "hardware">;
  title: string;
  bullets: string[];
};

export type Certification = {
  name: string;
  issuer: string;
  /** Path under /public/images. Empty string means "no scan uploaded yet"
   *  — the certifications gallery renders a fill-in tile instead of a
   *  broken image. */
  image: string;
};

export type Hackathon = {
  name: string;
  result: string;
  /** One-line summary — what the Phase 4 home card shows. */
  description: string;
  /** Problem the hackathon project solved. Full-page only. */
  problem: string;
  /** Tech stack used for the hackathon build. Full-page only. */
  techUsed: string[];
  /** Longer narrative/writeup. Full-page only. */
  writeup: string;
  /** Event photos for the full /hackathon page. Empty array is the
   *  current/default state — same "don't invent it" reasoning as the
   *  fields above. */
  images: string[];
};

export type ExperienceEntry = {
  role: string;
  organization: string;
  /** Freeform date range, e.g. "2023 – Present". Left as a string rather
   *  than start/end dates since Zee may want to word it either way. */
  period: string;
  description: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export type NowLearning = {
  title: string;
  description: string;
};

export type Faq = {
  question: string;
  answer: string;
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
  /** TODO(Zee): bio is drafted from your existing hero copy + tools list —
   *  reads fine but is worth putting in your own voice. `facts` with an
   *  empty `value` render a "add this" prompt on the card rather than a
   *  blank line — `location` is left blank on purpose, same reasoning as
   *  the blank social hrefs above. */
  about: {
    bio: string;
    facts: AboutFact[];
  };
  /** TODO(Zee): bullets are inferred from your tools list, not a full
   *  service-scope description — reword/expand freely. */
  services: Service[];
  /** Deliberately empty. TODO(Zee): add your real certifications here —
   *  I'm not going to invent credential names, since that's not a
   *  "placeholder" in the same sense as a stat, it's a specific factual
   *  claim. CertificationsCard shows "add a certification" prompts until
   *  this has entries. */
  certifications: Certification[];
  /** Deliberately unfilled for the same reason as certifications above —
   *  TODO(Zee): fill in your actual placement/result, a one-line summary,
   *  and (for the full /hackathon page) the problem solved, tech used,
   *  and a longer writeup. HackathonCard shows a fill-in prompt while
   *  `name` is empty. */
  hackathon: Hackathon;
  /** Deliberately empty. TODO(Zee): add your real role history (title,
   *  organization, period, one-line description) — the roadmap names
   *  "On-Call Technical Assistant" and "Freelance Technical Support
   *  Specialist" as examples from your brief, but I'm not filling in
   *  dates/employers I don't actually have. ExperienceTimeline shows a
   *  fill-in prompt until this has entries. */
  experience: ExperienceEntry[];
  /** Optional per the roadmap — only shows on the About page if this has
   *  entries. I'm not fabricating client quotes; leave empty if you don't
   *  have real testimonials to add, or fill in real ones and the section
   *  appears automatically. */
  testimonials: Testimonial[];
  /** TODO(Zee): what are you actively studying/building right now? Shown
   *  as a small card on the About page; renders a fill-in prompt while
   *  `title` is empty. */
  nowLearning: NowLearning;
  /** Phase 8 — draft headline/subtext for the Contact page hero. Not a
   *  factual claim like stats/certifications, so drafted directly rather
   *  than left blank — edit the wording freely. */
  contact: {
    headline: string;
    subtext: string;
  };
  /** Phase 8 — real FAQ content, supplied by Zee directly rather than
   *  invented generic questions (per the roadmap's explicit instruction).
   *  FaqAccordion shows a fill-in prompt if this is ever emptied out. */
  faqs: Faq[];
  /** Phase 8 — path to the résumé PDF under /public, for the plain
   *  `<a download>` link on the Contact page. Empty string means "no file
   *  yet" — ContactInfoPanel shows a fill-in prompt instead of a dead
   *  download link. */
  resume: {
    href: string;
  };
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
    // Filled in Phase 8 from Zee's uploaded résumé (a real address, not
    // invented) — LinkedIn/GitHub/Facebook stay blank since those URLs
    // weren't resolvable from the résumé's text.
    { label: "Email", href: "zeezafra17@gmail.com", icon: "mail" },
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
  about: {
    bio: "IT Technician and Web Developer who likes keeping technology dependable — from diagnosing hardware issues to shipping full web builds. Equal parts hands-on troubleshooter and full-stack developer, with a growing focus on practical AI tooling alongside the rest of the stack.",
    facts: [
      { icon: "location", label: "Based in", value: "" },
      { icon: "experience", label: "Experience", value: "2+ years" },
      {
        icon: "focus",
        label: "Specialties",
        value: "Web Development & IT Support",
      },
    ],
  },
  services: [
    {
      icon: "support",
      title: "Technical Support",
      bullets: [
        "Troubleshooting & remote support",
        "System diagnostics & maintenance",
        "On-call and freelance support work",
      ],
    },
    {
      icon: "web",
      title: "Web Development",
      bullets: [
        "Custom sites & web apps (Next.js, React)",
        "Responsive, accessible UI",
        "Ongoing maintenance & updates",
      ],
    },
    {
      icon: "hardware",
      title: "System & Hardware Support",
      bullets: [
        "PC & laptop diagnostics",
        "Hardware repair & upgrades",
        "Device setup & configuration",
      ],
    },
  ],
  certifications: [],
  hackathon: {
    name: "",
    result: "",
    description: "",
    problem: "",
    techUsed: [],
    writeup: "",
    images: [],
  },
  experience: [],
  testimonials: [],
  nowLearning: {
    title: "",
    description: "",
  },
  contact: {
    headline: "Let's talk about your project",
    subtext:
      "Send a message about web development, technical support, or anything else — I'll get back to you as soon as I can. Check the FAQ below first in case it's already answered.",
  },
  // Phase 8 — real FAQ content supplied by Zee, used verbatim.
  faqs: [
    {
      question: "What services do you offer?",
      answer:
        "I offer practical digital and technical services, including web development, website creation, computer repair and troubleshooting, Meta Ads management, and Meta Instant Forms setup.",
    },
    {
      question: "Can you build a website for my business?",
      answer:
        "Yes. I can build a modern, responsive website tailored to your business, whether you need a simple business website, portfolio, landing page, or a more customized web solution.",
    },
    {
      question: "Do you also maintain or update existing websites?",
      answer:
        "Yes. I can help with website updates, content changes, layout improvements, troubleshooting, and other maintenance tasks depending on the website's technology and requirements.",
    },
    {
      question: "Do you repair computers and laptops?",
      answer:
        "Yes. I provide computer and laptop troubleshooting, hardware diagnostics, software installation, operating system setup, performance troubleshooting, and other technical support services.",
    },
    {
      question: "Can you help if my computer is slow or having problems?",
      answer:
        "Yes. I can diagnose common hardware and software issues, identify possible causes of performance problems, and recommend or perform appropriate solutions.",
    },
    {
      question: "Do you offer Meta Ads management?",
      answer:
        "Yes. I can help set up and manage Meta advertising campaigns, including campaign configuration, audience setup, ad creatives, monitoring, and optimization based on the campaign's goals.",
    },
    {
      question: "Can you create Meta Instant Forms?",
      answer:
        "Yes. I can create and configure Meta Instant Forms designed to collect customer information directly from Facebook or Instagram ads.",
    },
    {
      question: "Can you connect Instant Forms to my business workflow?",
      answer:
        "Depending on your requirements, I can help structure your Instant Form and lead-collection workflow. Integrations with external CRM, email, or automation platforms can be discussed separately.",
    },
    {
      question: "How do I get started?",
      answer:
        "Simply send me a message describing what you need. I'll review your requirements, discuss the available options, and provide the next steps.",
    },
    {
      question: "Do you offer customized packages?",
      answer:
        "Yes. Services can be tailored depending on the project's scope, complexity, and requirements. Contact me so we can discuss what you need.",
    },
  ],
  resume: {
    href: "/resume/Zee-Zafra-Resume.pdf",
  },
};
