"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FolderKanban,
  Wrench,
  Award,
  Trophy,
  User,
  Mail,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { profile } from "@/data/profile";
import { Avatar } from "@/components/Avatar";
import { AvailabilityBadge } from "@/components/AvailabilityBadge";
import { SocialLinks } from "@/components/SocialLinks";
import { ThemeToggleSwitch } from "@/components/ThemeToggleSwitch";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/services", label: "Services", icon: Wrench },
  { href: "/certifications", label: "Certifications", icon: Award },
  { href: "/hackathon", label: "Hackathon", icon: Trophy },
  { href: "/about", label: "About", icon: User },
  { href: "/contact", label: "Contact", icon: Mail },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavList({
  pathname,
  collapsed,
  onNavigate,
}: {
  pathname: string;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-col gap-1">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            title={collapsed ? label : undefined}
            className={`flex items-center gap-3 rounded-radius px-3 py-2 text-sm font-medium transition-colors ${
              collapsed ? "justify-center" : ""
            } ${
              active
                ? "bg-primary/10 text-primary"
                : "text-foreground/70 hover:bg-foreground/5 hover:text-heading"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {!collapsed && <span>{label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  // Desktop icon-only collapse. Lives in this client component (rendered
  // once from the root layout, which App Router keeps mounted across
  // route changes), so the state survives navigation without extra
  // context/state-lifting.
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/*
        Desktop sidebar — permanently dark, independent of the site-wide
        light/dark toggle (which only affects the main content area, per
        the reference layout). Scoping the `dark` class to this subtree
        is enough: every color here already comes from the CSS custom
        properties in globals.css (bg-card, text-foreground, etc.), and
        those are re-defined by `.dark`, so they cascade to this whole
        subtree via normal CSS inheritance — no separate "sidebar theme"
        token set to maintain.
      */}
      <aside
        className={`dark sticky top-0 hidden h-screen shrink-0 flex-col justify-between border-r border-card-border bg-card px-3 py-5 transition-[width] duration-200 md:flex ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
              <Avatar name={profile.name} size={collapsed ? 36 : 44} />
              {!collapsed && (
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-heading">{profile.name}</p>
                  <p className="truncate text-xs text-foreground/60">{profile.role}</p>
                </div>
              )}
            </div>
          </div>

          {!collapsed && (
            <AvailabilityBadge
              isAvailable={profile.availability.isAvailable}
              label={profile.availability.label}
            />
          )}

          <NavList pathname={pathname} collapsed={collapsed} />
        </div>

        <div className="flex flex-col gap-3">
          <SocialLinks
            socials={profile.socials}
            className={collapsed ? "flex-wrap justify-center" : ""}
          />
          <ThemeToggleSwitch collapsed={collapsed} />
          {!collapsed && (
            <p className="px-1 text-xs text-foreground/50">{profile.tagline}</p>
          )}
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={`flex items-center gap-2 rounded-radius border border-card-border px-2 py-1.5 text-xs text-foreground/60 hover:text-primary ${
              collapsed ? "justify-center" : "justify-center"
            }`}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Mobile top bar — same permanent-dark treatment as the desktop
          sidebar, so the nav "shell" reads as one consistent brand
          element across breakpoints. */}
      <div className="dark sticky top-0 z-40 flex items-center justify-between border-b border-card-border bg-card px-4 py-3 md:hidden">
        <Link href="/" className="flex items-center gap-2">
          <Avatar name={profile.name} size={32} />
          <span className="text-sm font-semibold text-heading">{profile.name}</span>
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="text-foreground/70"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${mobileOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!mobileOpen}
      >
        <div
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-foreground/30 transition-opacity duration-200 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`dark absolute right-0 top-0 flex h-full w-72 max-w-[85vw] flex-col justify-between gap-6 bg-card px-4 py-5 shadow-card transition-transform duration-200 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar name={profile.name} size={44} />
                <div>
                  <p className="text-sm font-semibold text-heading">{profile.name}</p>
                  <p className="text-xs text-foreground/60">{profile.role}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="text-foreground/60"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <AvailabilityBadge
              isAvailable={profile.availability.isAvailable}
              label={profile.availability.label}
            />

            <NavList
              pathname={pathname}
              collapsed={false}
              onNavigate={() => setMobileOpen(false)}
            />
          </div>

          <div className="flex flex-col gap-3">
            <SocialLinks socials={profile.socials} />
            <ThemeToggleSwitch />
            <p className="px-1 text-xs text-foreground/50">{profile.tagline}</p>
          </div>
        </div>
      </div>
    </>
  );
}
