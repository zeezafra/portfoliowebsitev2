import { HelpCircle, Send } from "lucide-react";
import { profile } from "@/data/profile";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfoPanel } from "@/components/contact/ContactInfoPanel";
import { FaqAccordion } from "@/components/contact/FaqAccordion";

// Phase 8 — replaces the Phase 1 stub. Form validation + honeypot + rate
// limiting are all real and live in app/api/contact/route.ts; actual
// email delivery (Resend/Formspree) is the deliberate next step, per
// Zee's Phase 8 answer to build the UI/route first.
export default function ContactPage() {
  return (
    <div className="flex flex-col gap-10 px-6 py-12 md:px-12 md:py-16">
      <header className="flex flex-col gap-3">
        <span className="flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
          <Send className="h-3.5 w-3.5" aria-hidden="true" />
          Contact
        </span>
        <h1 className="text-3xl font-semibold text-heading md:text-4xl">
          {profile.contact.headline}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-foreground/70">
          {profile.contact.subtext}
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-start">
        <div className="rounded-radius border border-card-border bg-card p-5 shadow-card md:p-6">
          <ContactForm />
        </div>
        <ContactInfoPanel />
      </div>

      <section className="flex max-w-3xl flex-col gap-4">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground/50">
          <HelpCircle className="h-4 w-4 text-primary" aria-hidden="true" />
          Frequently Asked Questions
        </h2>
        <FaqAccordion faqs={profile.faqs} />
      </section>
    </div>
  );
}
