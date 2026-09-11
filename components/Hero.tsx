import Link from "next/link";
import Image from "next/image";
import { profile } from "@/data/profile";

/**
 * Enclosed in one card (border, radius, shadow, soft primary-tinted
 * wash) instead of sitting bare on the page background — matches the
 * reference layout's boxed hero panel structurally, without cloning its
 * exact palette or copy. The small dashed tag under the portrait reuses
 * Zee's own existing tagline (already shown in the sidebar footer)
 * rather than inventing new annotation copy.
 */
export function Hero() {
  const { pill, headline, subtext, ctaLabel, ctaHref } = profile.hero;

  return (
    <section className="relative flex flex-col items-center gap-8 overflow-hidden rounded-radius border border-card-border bg-gradient-to-br from-primary/5 to-card p-6 shadow-card sm:flex-row sm:gap-10 md:p-10">
      <div className="flex max-w-xl flex-1 flex-col items-center gap-5 text-center sm:items-start sm:text-left">
        <span className="rounded-full border border-card-border bg-card px-3 py-1 text-xs font-medium text-primary">
          {pill}
        </span>
        <h1 className="text-3xl font-semibold leading-tight text-heading sm:text-4xl md:text-5xl">
          {headline}
        </h1>
        <p className="text-base text-foreground/70 md:text-lg">{subtext}</p>
        <Link
          href={ctaHref}
          className="rounded-radius bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-card transition-opacity hover:opacity-90"
        >
          {ctaLabel}
        </Link>
      </div>

      <div className="flex shrink-0 flex-col items-center gap-3">
        <div className="relative">
          <div
            className="absolute -inset-6 -z-10 rounded-full bg-primary/10 blur-2xl"
            aria-hidden="true"
          />
          <Image
            src="/images/hero-portrait.png"
            alt={profile.name}
            width={280}
            height={340}
            className="rounded-radius object-cover shadow-card"
            priority
          />
        </div>
        <span className="rounded-full border border-dashed border-primary/30 bg-card px-3 py-1 text-[11px] font-medium text-primary/70 shadow-card">
          {profile.tagline}
        </span>
      </div>
    </section>
  );
}
