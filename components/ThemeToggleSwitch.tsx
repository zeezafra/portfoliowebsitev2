"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggleSwitch({ collapsed = false }: { collapsed?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoids a hydration mismatch: the server can't know the persisted/system
  // theme ahead of time. This is next-themes' own documented pattern.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`flex items-center gap-2 rounded-radius border border-card-border bg-card px-2 py-1.5 text-foreground/70 transition-colors hover:text-primary ${
        collapsed ? "w-10 justify-center" : "w-full justify-between"
      }`}
    >
      {!collapsed && (
        <span className="text-xs font-medium">{isDark ? "Dark" : "Light"}</span>
      )}
      <span className="relative inline-flex h-5 w-9 shrink-0 items-center rounded-full bg-foreground/15">
        <span
          className={`inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform ${
            isDark ? "translate-x-4" : "translate-x-0.5"
          }`}
        >
          {isDark ? <Moon className="h-2.5 w-2.5" /> : <Sun className="h-2.5 w-2.5" />}
        </span>
      </span>
    </button>
  );
}
