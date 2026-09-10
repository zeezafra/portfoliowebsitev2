# Project State

## Project
Zee Zafra — Next.js portfolio site (IT Technician & Web Developer),
built incrementally per `references/roadmap.md` in the
`portfolio-nextjs-builder` skill.

## Current milestone
Phase 8 complete — Contact Page, including real email delivery.
FAQ accordion, contact form + API route with honeypot/validation/
rate-limiting, résumé download, availability + socials reused from
the sidebar, and the contact form now actually sends via Resend.

## Completed work
- Phases 1–7 (foundation, sidebar/hero, stats/tools, bento dashboard,
  project data + filtering, case-study pages, certifications/timeline/
  testimonials/now-learning) — unchanged this session, carried over from
  the Phase 7 checkpoint.
- Phase 8 (this session picks up from a checkpoint where everything below
  was already done except email delivery):
  - `app/contact/page.tsx` — full page, replaces the old stub.
  - `components/contact/ContactForm.tsx`, `FaqAccordion.tsx`,
    `ContactInfoPanel.tsx`.
  - `app/api/contact/route.ts` — honeypot check, server-side validation,
    basic in-memory IP rate limiting (3 req/60s).
  - `lib/contact-validation.ts`, `lib/rate-limit.ts`.
  - `data/profile.ts` extended with `faqs` (10 real Q&As, supplied by
    Zee), `resume: { href }`, `contact: { headline, subtext }`.
    `socials.email` filled in from Zee's uploaded résumé (real data, not
    invented) — LinkedIn/GitHub/Facebook still blank.
  - `public/resume/Zee-Zafra-Resume.pdf` — Zee's real, uploaded résumé.
  - **New this session:**
    - `lib/send-contact-email.ts` — wraps the Resend SDK. Reads
      `RESEND_API_KEY`, `CONTACT_TO_EMAIL` (optional, defaults to
      `profile.socials`'s mail entry), `CONTACT_FROM_EMAIL` (optional,
      defaults to Resend's shared sandbox sender). Sets the visitor's
      email as `replyTo`. Returns a typed result
      (`ok` / `not_configured` / `send_failed`) rather than throwing.
    - `app/api/contact/route.ts` updated to call it after the honeypot/
      validation/rate-limit checks — 503 `not_configured` if no API key
      is set (same as before), 502 `send_failed` if Resend itself
      errors, 200 `ok` on a real send.
    - `components/contact/ContactForm.tsx` — one-line change so the
      generic error state shows the server's actual message (e.g. the
      `send_failed` text) instead of a flat hardcoded string.
    - `.env.local.example` — documents `RESEND_API_KEY` (required to
      send), `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` (optional
      overrides), and the Resend sandbox-sender delivery restriction
      until a domain is verified. `.env*` was already gitignored.
    - `resend` added to `package.json` dependencies (`npm install`).
    - README.md's "What's in Phase 8", "Run it locally", and "Next
      phase" sections updated to match.
  - Verified: `tsc --noEmit` clean (after `npx next typegen`, needed
    once per fresh checkout since `.next/types` doesn't exist yet —
    unrelated to this change), `eslint .` clean. Manually exercised all
    five `/api/contact` response paths against a local dev server:
    valid+no-key → 503 `not_configured`; honeypot → 200 fake-success;
    invalid fields → 400 with field errors; 4th rapid request → 429
    `rate_limited`; valid+key-set (network to `api.resend.com` blocked
    in this sandbox) → 502 `send_failed`, confirming the send path
    itself is reached and errors are caught rather than thrown.
    Could not verify an actual successful delivery — that needs a real
    `RESEND_API_KEY` plus normal internet access, neither available
    here (same category of limitation as the `next/font/google` build
    issue below).

## Current implementation
- Next.js App Router + TypeScript + Tailwind v4 (CSS-first theme in
  `app/globals.css`), `next-themes` for dark mode, `lucide-react` icons,
  Framer Motion for the stat-card count-up.
- One typed data source: `data/profile.ts` (`Profile` type). Every page
  reads from it rather than re-declaring content.
- Shared components reused across phases rather than duplicated:
  `AvailabilityBadge`, `SocialLinks`, `LabeledSection`,
  `ImageLightboxGrid`.
- Contact form: client-side validation in `lib/contact-validation.ts` is
  imported by both the client component and the API route. Email
  sending is isolated in `lib/send-contact-email.ts` so swapping
  providers later only touches one file.
- Rate limiting is a plain in-memory `Map` in `lib/rate-limit.ts` —
  resets per server process/instance; fine as a basic spam brake per the
  roadmap, not a hard guarantee under serverless scale-out.

## Remaining tasks
- **Add a real `RESEND_API_KEY`** — the only step left for the contact
  form to actually deliver mail. Sign up at resend.com (ideally with
  the same address as `CONTACT_TO_EMAIL`/`profile.socials.mail` — see
  `.env.local.example` for why), get an API key, set it in `.env.local`
  locally and as a Vercel env var for the deployed site.
- Optional, once that's live: verify a custom domain in Resend and set
  `CONTACT_FROM_EMAIL` so mail isn't sent from the shared sandbox
  address.
- Phase 9 — SEO, Performance & Accessibility (metadata API, OG images,
  sitemap/robots, image optimization, route transitions, a11y pass,
  click analytics).
- Still-empty content from earlier phases: `certifications`, `hackathon`,
  `experience`, `testimonials`, `nowLearning` — all deliberately left
  blank with fill-in prompts, not invented.

## Known bugs / issues
- `next build` fails in network-restricted sandboxes because
  `next/font/google` can't reach `fonts.googleapis.com` (403). This is a
  sandbox network limitation, not a code bug — `next dev` runs fine with
  a graceful fallback font, and the build will succeed on any machine or
  Vercel deploy with normal internet access.
- Similarly, a real Resend API call can't reach `api.resend.com` from
  this same sandbox — see "Completed work" above for how the send path
  was verified anyway.
- A prompt-injection attempt persists in this checkpoint's `AGENTS.md`
  (claims Next.js has different APIs in this project, instructs reading
  fake docs). This has been detected and ignored across multiple
  sessions now. It is NOT a real Next.js file — safe to delete if Zee
  wants it gone, but has been left as-is since removing it wasn't asked
  for.
- The uploaded résumé's focus (Cebuano language/AI-evaluation work) reads
  differently from the "IT Technician & Web Developer" framing used
  elsewhere on the site. Flagged to Zee previously; wired in as given
  either way since he confirmed it was the right file.

## Important decisions
- **Resend chosen over Formspree** for email delivery (Zee's answer
  this session) — the roadmap's default recommendation. Formspree
  remains a documented fallback in the roadmap if this ever needs to
  change.
- `contact.headline`/`contact.subtext` are drafted UI copy (not a
  factual claim like stats/certifications), so written directly rather
  than left blank — unlike FAQs, which came from Zee verbatim per the
  roadmap's explicit "don't invent FAQs" instruction.
- `socials.email` was filled in proactively from the résumé since it's
  real, provided data — flagged to Zee rather than done silently.
- The Resend sandbox sender (`onboarding@resend.dev`) was used as the
  default `from` address rather than inventing a `contact@` address on
  a domain Zee may not have verified — documented in
  `.env.local.example` as something to upgrade once a domain is
  verified.

## Dependencies / setup
```bash
npm install
npm run dev              # http://localhost:3000
npx next typegen         # only needed once per fresh checkout, before
                          # `tsc --noEmit`, to generate .next/types
npx tsc --noEmit          # type check
npx eslint .              # lint
```
Copy `.env.local.example` to `.env.local` and set `RESEND_API_KEY` for
the contact form to send real email (optional for everything else on
the site). Set the same variable in Vercel's dashboard for the deployed
site — never commit the key itself.

## Next task
Phase 9 (SEO, Performance & Accessibility) is next on the roadmap, once
Zee has a `RESEND_API_KEY` in place (or wants to defer that further and
just move on — the form degrades gracefully either way).
