import { Quote } from "lucide-react";
import type { Testimonial } from "@/data/profile";

/**
 * Unlike Certifications/Hackathon/Now-Learning, testimonials are optional
 * per the roadmap ("confirm with Zee whether he has real client
 * testimonials to use; don't fabricate quotes if he doesn't"). So instead
 * of a fill-in prompt when empty, this section renders nothing at all —
 * no empty "Testimonials" heading cluttering the About page for a
 * section that may never get real content.
 */
export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/50">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <figure
            key={`${testimonial.name}-${testimonial.role}`}
            className="flex flex-col gap-3 rounded-radius border border-card-border bg-card p-5 shadow-card"
          >
            <Quote className="h-5 w-5 text-primary/40" aria-hidden="true" />
            <blockquote className="flex-1 text-sm leading-relaxed text-foreground/80">
              “{testimonial.quote}”
            </blockquote>
            <figcaption className="text-sm">
              <span className="font-semibold text-heading">{testimonial.name}</span>
              <span className="text-foreground/50"> — {testimonial.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
