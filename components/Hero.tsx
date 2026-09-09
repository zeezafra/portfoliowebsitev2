import Link from "next/link";
import { User } from "lucide-react";
import { profile } from "@/data/profile";
import Image from "next/image";

export function Hero() {
  const { pill, headline, subtext, ctaLabel, ctaHref } = profile.hero;

  return (
    <section className="flex flex-col-reverse items-center gap-10 px-6 py-12 md:flex-row md:gap-16 md:px-12 md:py-24">
      <div className="flex max-w-xl flex-col items-start gap-5 text-center md:text-left">
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
      <Image src="/images/hero-portrait.png" alt={profile.name} width={360} height={440} className="rounded-radius object-cover shadow-card" priority /> 
      <div className="flex h-64 w-64 shrink-0 items-center justify-center rounded-radius border border-card-border bg-card shadow-card sm:h-80 sm:w-80 md:h-96 md:w-80">
        <User className="h-20 w-20 text-foreground/20" aria-hidden="true" />
        <span className="sr-only">Portrait placeholder — photo coming soon</span>
      </div>
    </section>
  );
}
