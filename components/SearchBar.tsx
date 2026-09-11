"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

type SearchResult = {
  key: string;
  label: string;
  sublabel: string;
  category: string;
  href: string;
};

/**
 * Lightweight, real client-side quick-search across this site's own
 * content (projects, tools, services, certifications, hackathon) — not
 * a search backend, just a substring match over data already on the
 * page. Matches the reference layout's top-bar search field, but this
 * one actually does something rather than being decorative chrome: an
 * empty query shows nothing, a query with no matches says so plainly
 * rather than faking results.
 */
export function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // profile/projects are static module-level imports, not props or
  // state, so an empty dep array is correct here — this only needs to
  // run once per mount, not re-derive on every render.
  const index = useMemo<SearchResult[]>(() => {
    const items: SearchResult[] = [];

    projects.forEach((project) => {
      items.push({
        key: `project-${project.slug}`,
        label: project.title,
        sublabel: project.summary,
        category: "Project",
        href: `/projects/${project.slug}`,
      });
    });

    profile.tools.forEach((tool) => {
      items.push({
        key: `tool-${tool.name}`,
        label: tool.name,
        sublabel: tool.subtitle,
        category: "Skill",
        href: "/#tools",
      });
    });

    profile.services.forEach((service) => {
      items.push({
        key: `service-${service.title}`,
        label: service.title,
        sublabel: "Service",
        category: "Service",
        href: "/#services",
      });
    });

    profile.certifications.forEach((cert) => {
      items.push({
        key: `cert-${cert.name}`,
        label: cert.name,
        sublabel: "Certification",
        category: "Certification",
        href: "/certifications",
      });
    });

    if (profile.hackathon.name.trim().length > 0) {
      items.push({
        key: "hackathon",
        label: profile.hackathon.name,
        sublabel: profile.hackathon.result,
        category: "Hackathon",
        href: "/hackathon",
      });
    }

    return items;
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index
      .filter(
        (item) =>
          item.label.toLowerCase().includes(q) || item.sublabel.toLowerCase().includes(q),
      )
      .slice(0, 6);
  }, [query, index]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full sm:max-w-xs">
      <div className="flex items-center gap-2 rounded-full border border-card-border bg-card px-4 py-2 shadow-card">
        <Search className="h-4 w-4 shrink-0 text-foreground/40" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setOpen(false);
          }}
          placeholder="Search projects, skills, or anything…"
          aria-label="Search projects, skills, or anything"
          className="w-full bg-transparent text-sm text-foreground placeholder:text-foreground/40 focus:outline-none"
        />
      </div>

      {open && query.trim().length > 0 && (
        <div className="absolute right-0 z-30 mt-2 w-full min-w-[280px] rounded-radius border border-card-border bg-card p-2 shadow-card">
          {results.length > 0 ? (
            <ul className="flex flex-col gap-1">
              {results.map((result) => (
                <li key={result.key}>
                  <Link
                    href={result.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between gap-3 rounded-radius px-3 py-2 text-sm hover:bg-foreground/5"
                  >
                    <span className="min-w-0 truncate text-foreground/80">{result.label}</span>
                    <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide text-foreground/40">
                      {result.category}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-3 py-2 text-xs italic text-foreground/40">
              No matches for &ldquo;{query}&rdquo;.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
