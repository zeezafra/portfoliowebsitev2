// Shared between components/contact/ContactForm.tsx (instant feedback,
// no round trip for obvious mistakes) and app/api/contact/route.ts (the
// server never trusts client-side validation alone) so the rules can't
// drift out of sync between the two.

export type ContactFields = {
  name: string;
  email: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};

  if (!fields.name.trim()) {
    errors.name = "Enter your name.";
  }

  if (!fields.email.trim()) {
    errors.email = "Enter your email.";
  } else if (!EMAIL_RE.test(fields.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!fields.message.trim()) {
    errors.message = "Enter a message.";
  } else if (fields.message.trim().length < 10) {
    errors.message = "Message is a bit short — add a few more details.";
  }

  return errors;
}
