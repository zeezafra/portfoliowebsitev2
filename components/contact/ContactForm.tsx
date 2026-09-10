"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Construction, Loader2, Send } from "lucide-react";
import {
  validateContactForm,
  type ContactErrors,
  type ContactFields,
} from "@/lib/contact-validation";

type Status = "idle" | "submitting" | "success" | "not_configured" | "rate_limited" | "error";

const initialFields: ContactFields = { name: "", email: "", message: "" };

export function ContactForm() {
  const [fields, setFields] = useState<ContactFields>(initialFields);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  function updateField<K extends keyof ContactFields>(key: K, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const clientErrors = validateContactForm(fields);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }
    setErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, website: honeypot }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setStatus("success");
        setFields(initialFields);
        return;
      }

      if (res.status === 429) {
        setStatus("rate_limited");
        setStatusMessage(
          data.retryAfterSeconds
            ? `Too many messages sent — try again in about ${data.retryAfterSeconds}s.`
            : "Too many messages sent — try again shortly."
        );
        return;
      }

      if (data.reason === "not_configured") {
        setStatus("not_configured");
        setStatusMessage(data.message ?? "Email delivery isn't wired up yet.");
        return;
      }

      if (data.errors) {
        setErrors(data.errors as ContactErrors);
        setStatus("idle");
        return;
      }

      setStatus("error");
      setStatusMessage(data.message ?? "Something went wrong — please try again.");
    } catch {
      setStatus("error");
      setStatusMessage("Couldn't reach the server — check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-2">
        <CheckCircle2 className="h-6 w-6 text-accent-success" aria-hidden="true" />
        <p className="text-base font-medium text-heading">
          Message sent — thanks for reaching out.
        </p>
        <p className="text-sm text-foreground/60">I&rsquo;ll get back to you as soon as I can.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-medium text-primary hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative flex flex-col gap-4">
      {/* Honeypot — real visitors never see or tab into this. Bots that
          autofill every field will, and get silently dropped server-side
          (see app/api/contact/route.ts). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-px w-px overflow-hidden [clip:rect(0,0,0,0)]"
      >
        <label htmlFor="website">Leave this field blank</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-heading">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={fields.name}
          onChange={(e) => updateField("name", e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={`rounded-radius border bg-card px-3 py-2 text-sm text-heading outline-none transition-colors focus:border-primary ${
            errors.name ? "border-red-400" : "border-card-border"
          }`}
        />
        {errors.name && (
          <p id="name-error" className="text-xs text-red-500">
            {errors.name}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-heading">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={fields.email}
          onChange={(e) => updateField("email", e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`rounded-radius border bg-card px-3 py-2 text-sm text-heading outline-none transition-colors focus:border-primary ${
            errors.email ? "border-red-400" : "border-card-border"
          }`}
        />
        {errors.email && (
          <p id="email-error" className="text-xs text-red-500">
            {errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-heading">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={fields.message}
          onChange={(e) => updateField("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`resize-none rounded-radius border bg-card px-3 py-2 text-sm text-heading outline-none transition-colors focus:border-primary ${
            errors.message ? "border-red-400" : "border-card-border"
          }`}
        />
        {errors.message && (
          <p id="message-error" className="text-xs text-red-500">
            {errors.message}
          </p>
        )}
      </div>

      {status === "not_configured" && (
        <p className="flex items-start gap-2 rounded-radius border border-accent-pending/30 bg-accent-pending/10 px-3 py-2 text-sm text-foreground/80">
          <Construction className="mt-0.5 h-4 w-4 shrink-0 text-accent-pending" aria-hidden="true" />
          {statusMessage}
        </p>
      )}
      {(status === "rate_limited" || status === "error") && (
        <p className="flex items-start gap-2 rounded-radius border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-foreground/80">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" aria-hidden="true" />
          {statusMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex items-center justify-center gap-2 rounded-radius bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
