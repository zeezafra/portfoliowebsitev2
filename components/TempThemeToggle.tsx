"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

/**
 * TEMPORARY, Phase 1 only. The real toggle switch lives in the Phase 2
 * sidebar. This just proves the next-themes wiring works before there's
 * any real UI to hang it off of. Safe to delete once Phase 2 lands.
 */
export function TempThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid a hydration mismatch: the server can't know the persisted/system
  // theme, so don't render theme-dependent text until mounted on the client.
  // This is next-themes' own documented pattern, not state we could derive
  // another way, so the set-state-in-effect rule is a false positive here.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button className="rounded-radius border border-foreground/15 px-3 py-1.5 text-sm">
        Toggle theme
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-radius border border-foreground/15 px-3 py-1.5 text-sm text-heading hover:bg-foreground/5"
    >
      Current: {theme} — click to toggle
    </button>
  );
}
