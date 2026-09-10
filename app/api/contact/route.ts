import { NextResponse } from "next/server";
import { validateContactForm } from "@/lib/contact-validation";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendContactEmail } from "@/lib/send-contact-email";

// Phase 8 — validates, honeypot-checks, rate-limits, then sends every
// submission via Resend (lib/send-contact-email.ts). If RESEND_API_KEY
// isn't set in the environment, sendContactEmail() itself reports
// "not_configured" and this route returns the same 503 it always has —
// so the rest of the form still works end-to-end before the key is added.
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid_body" }, { status: 400 });
  }

  const { name, email, message, website } = (body ?? {}) as Record<string, unknown>;

  // Honeypot: real visitors never see or fill this hidden field. Bots
  // that autofill every field will — they get a fake-success response
  // so they don't learn to avoid it next time, and nothing is processed
  // past this point.
  if (typeof website === "string" && website.trim().length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const fields = {
    name: typeof name === "string" ? name : "",
    email: typeof email === "string" ? email : "",
    message: typeof message === "string" ? message : "",
  };

  const errors = validateContactForm(fields);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, reason: "validation", errors }, { status: 400 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const { allowed, retryAfterSeconds } = checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { ok: false, reason: "rate_limited", retryAfterSeconds },
      { status: 429 }
    );
  }

  const result = await sendContactEmail(fields);

  if (!result.ok && result.reason === "not_configured") {
    return NextResponse.json(
      {
        ok: false,
        reason: "not_configured",
        message: "Message validated, but email delivery isn't wired up yet.",
      },
      { status: 503 }
    );
  }

  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        reason: "send_failed",
        message: "Message validated, but sending the email failed. Please try again shortly.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
