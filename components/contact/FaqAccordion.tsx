"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/data/profile";

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  // First question open by default; only one open at a time.
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (faqs.length === 0) {
    return (
      <p className="text-sm italic text-foreground/40">
        Add your frequently asked questions to data/profile.ts.
      </p>
    );
  }

  return (
    <div className="flex flex-col divide-y divide-card-border rounded-radius border border-card-border bg-card shadow-card">
      {faqs.map((faq, index) => {
        const open = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;
        return (
          <div key={faq.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-heading"
              >
                {faq.question}
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-foreground/50 transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!open}
              className="px-5 pb-4 text-sm leading-relaxed text-foreground/70"
            >
              {faq.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
