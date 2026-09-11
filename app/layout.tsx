import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zee Zafra — IT Technician & Web Developer",
  description:
    "Portfolio of Zee Zafra, IT Technician and Web Developer — projects, services, and certifications.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: next-themes sets the `dark` class on the
    // client before paint, which legitimately differs from the server's
    // markup on first render. This is the documented fix, not a bug hide.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <div className="flex min-h-full flex-col md:flex-row">
            <Sidebar />
            {/* min-w-0 is required here: without it, a flex child defaults
                to min-width:auto, so any wide descendant (long unbroken
                text, an un-guarded grid track, etc.) can force this whole
                column wider than the space the sidebar leaves it — which
                pushes <body> wider than the viewport and causes page-level
                horizontal scroll. This is the single most common cause of
                that bug in a sidebar+flex layout. */}
            <main className="min-w-0 flex-1">
              {/* Shared content container: caps and centers page content
                  at 1280px on large/ultra-wide desktop screens per the
                  design spec, while leaving each page's own responsive
                  horizontal padding (px-6/md:px-12) untouched. TopBar
                  lives here (not in Sidebar) so it's a persistent header
                  for the main column across every route, matching the
                  reference layout's logo+search row. */}
              <div className="mx-auto w-full max-w-[1280px]">
                <TopBar />
                {children}
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
