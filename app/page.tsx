import { TempThemeToggle } from "@/components/TempThemeToggle";

// Phase 1: blank-but-themed shell. Real hero content is Phase 2.
export default function HomePage() {
  return (
    <section className="flex min-h-[calc(100vh-0px)] flex-col items-start justify-center gap-4 px-6 py-16 md:px-12">
      <h1 className="text-3xl font-semibold text-heading">Home</h1>
      <p className="max-w-prose text-foreground/70">
        Foundation shell is live — background, heading color, primary blue,
        and dark/light mode are wired up. The hero, sidebar, and real content
        land in later phases.
      </p>
      <TempThemeToggle />
    </section>
  );
}
