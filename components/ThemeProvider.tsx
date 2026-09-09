"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * Wraps next-themes' provider. Kept as its own client component so
 * app/layout.tsx can stay a server component.
 *
 * attribute="class"  -> toggles a `dark` class on <html>, which pairs with
 *                        the `@custom-variant dark` rule in globals.css.
 * defaultTheme="system" -> respects the OS preference until the user
 *                        picks one explicitly (Phase 2 adds the toggle UI).
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem {...props}>
      {children}
    </NextThemesProvider>
  );
}
