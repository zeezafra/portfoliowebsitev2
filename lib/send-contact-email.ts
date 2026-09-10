// Phase 8 — wraps the Resend API so app/api/contact/route.ts stays
// focused on request handling (honeypot/validation/rate limiting).
// Same "own module" pattern as lib/contact-validation.ts and
// lib/rate-limit.ts: if Zee ever swaps providers, this is the only
// file that needs to change.

import { Resend } from "resend";
import { profile } from "@/data/profile";
import type { ContactFields } from "@/lib/contact-validation";

// Resend's shared sandbox sender. It works without verifying a custom
// domain, but — per Resend's own restriction, not something in this
// code — delivery in that mode is limited to the email address the
// Resend account itself was created with, until a domain is verified.
// Since CONTACT_TO_EMAIL defaults to Zee's own address below, this
// should work as-is once he signs up for Resend with that same
// address. See README for the upgrade path once a domain is verified.
const SANDBOX_FROM = "Portfolio Contact Form <onboarding@resend.dev>";

export type SendContactEmailResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" }
  | { ok: false; reason: "send_failed"; detail?: string };

export async function sendContactEmail(
  fields: ContactFields
): Promise<SendContactEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, reason: "not_configured" };
  }

  const to =
    process.env.CONTACT_TO_EMAIL ||
    profile.socials.find((s) => s.icon === "mail")?.href;
  if (!to) {
    // No destination address anywhere (env var or profile.ts) — from
    // the visitor's point of view this is the same "not wired up yet"
    // state as a missing API key.
    return { ok: false, reason: "not_configured" };
  }

  const from = process.env.CONTACT_FROM_EMAIL || SANDBOX_FROM;
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      // Lets Zee hit "reply" in his inbox and answer the visitor
      // directly, instead of having to copy their address out of the
      // message body.
      replyTo: fields.email,
      subject: `New message from ${fields.name} — portfolio contact form`,
      text: `${fields.name} (${fields.email}) sent a message via the portfolio contact form:\n\n${fields.message}`,
    });

    if (error) {
      console.error("Resend send error:", error);
      return { ok: false, reason: "send_failed", detail: error.message };
    }

    return { ok: true };
  } catch (err) {
    console.error("Resend send threw:", err);
    return { ok: false, reason: "send_failed" };
  }
}
