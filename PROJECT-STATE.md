# Project State

## Latest session — Certifications filled in, Hackathon/socials partially blocked on Zee's input
Zee sent a `img.rar` with real certificate scans and event photos in response
to the request to fill in Certifications/Hackathon/socials content.

**Done:**
- `public/images/certifications/` (new) — 8 real certificate scans, converted
  PNG→JPEG (quality 85) to cut file size ~85% with no visible loss on scanned
  documents: DNTS "Outstanding Technical Assistant" and "Junior Engineer"
  appreciation certs, three ACT (Asian College of Technology) seminar/workshop
  certs (Real-World Web Development, Cybersecurity, Network Architecture &
  Security), one ACT Certificate of Recognition for academic performance
  (2nd Year BSCpE, 1st Sem AY2023-2024, 1.45 weighted average), the Yichan
  Techtrade OJT completion certificate (240 hours), and the Solana x AI
  Hackathon completion certificate.
- `data/profile.ts` — `certifications` array filled with all 8 (name/issuer
  transcribed directly from each scan, not phrased from a template).
- `public/images/hackathon/` (new) — 2 real event photos (Solana AI Consumer
  Hack team photo, a Solana workshop photo), wired into
  `profile.hackathon.images`.
- Verified: `tsc --noEmit` clean, `eslint .` clean, `/`, `/certifications`,
  `/hackathon` all 200 under `next dev`; certifications render with real
  thumbnails and captions.

**Deliberately left blank — needs Zee's input, not guessable from the files
he sent:**
- `hackathon.name` / `.result` / `.description` / `.problem` / `.techUsed` /
  `.writeup` — the certificate confirms the event ("Solana x AI Hackathon",
  Demo Day Oct 12, 2024) and a banner photo suggests the event may have been
  branded "Solana AI Consumer Hack", but neither says whether Zee placed/won
  or only participated, nor what he actually built (problem/tech
  stack/narrative). `hackathon.name` is left empty on purpose rather than
  half-filled — `HackathonCard`/`hackathon/page.tsx` show a clean single
  fill-in prompt while `name` is empty, but would show a broken-looking
  card (populated title, blank result line) if `name` were filled without
  `result`/`description`.
- `socials` — the uploaded files include a "Web3 Portfolio" personal pitch
  deck (Zee's own web3-community slide deck, not a hackathon submission —
  distinct from the images actually needed here) whose Contact slide lists
  Discord/Twitter/Telegram handles, not LinkedIn/GitHub/Facebook (the three
  the `SocialLink` type currently supports). Left `socials` unchanged
  pending Zee's answer on whether to extend `SocialLink`'s icon union to
  add Discord/Twitter/Telegram, or whether he has actual LinkedIn/GitHub/
  Facebook URLs to use instead.
- Other images in the same `img.rar` (Multi-Purpose Training Board and
  Web3-Portfolio project screenshots, Work Technical Assistant / Freelance
  TA photos, MiZee Tech logo) look relevant to Featured Projects thumbnails
  and Experience, not this session's Certifications/Hackathon/socials scope
  — left untouched per the roadmap's "touch only what the phase needs" rule.


## Project
Zee Zafra — Next.js portfolio site (IT Technician & Web Developer),
built incrementally per `references/roadmap.md` in the
`portfolio-nextjs-builder` skill.

## Note: two roadmaps now apply to this codebase
- `portfolio-nextjs-builder` skill — the original build-from-scratch
  roadmap (Phase 1–10 +11) used to get the site to its current feature
  set. Currently at its Phase 8 (contact page + email delivery).
- `zee-zafra-portfolio-v2` skill — a separate 20-phase QA/improvement
  pass over the now-mostly-built site (layout/overflow, placeholder
  removal, content polish, a11y, performance, final QA). Its Phase 1
  (Layout Foundation & Responsiveness) was completed this session — see
  below. The two roadmaps are tracked independently; phase numbers are
  not shared between them.

## Current milestone (zee-zafra-portfolio-v2 roadmap)
Phase 1 — Layout Foundation & Responsiveness: COMPLETE.
- `app/layout.tsx`: added `min-w-0` to `<main>` (defensive flex-overflow
  guard — a flex child without it can force the column wider than the
  space the sidebar leaves, pushing `<body>` past the viewport) and
  wrapped `{children}` in a `mx-auto w-full max-w-[1280px]` container so
  page content is capped and centered on large/ultra-wide desktop
  screens, per the spec's recommended 1200–1280px content container.
  Per-page horizontal padding (`px-6 md:px-12`, already consistent
  across every route) was left untouched rather than duplicated at the
  container level.
- Audited for the spec's other listed overflow culprits (100vw/w-screen,
  hard-coded pixel widths, fixed grid tracks, `whitespace-nowrap`,
  unguarded `overflow-` usage) — none found beyond intentional,
  already-correct patterns (ToolsStrip's and FeaturedProjectsCard's
  horizontal scroll strips use the negative-margin bleed technique
  correctly; the mobile drawer is `fixed` and capped at `max-w-[85vw]`;
  the lightbox modal is `fixed inset-0` with `max-h-[85vh] max-w-4xl`).
  No other Phase 1 code changes were needed.
- Verified: `tsc --noEmit` clean, `eslint .` clean, all seven routes
  (`/`, `/about`, `/projects`, `/services`, `/certifications`,
  `/hackathon`, `/contact`) return 200 under `next dev` with no runtime
  errors. `next build` still fails only on the pre-existing, unrelated
  `next/font/google` → `fonts.googleapis.com` sandbox network
  restriction (documented below) — not a regression from this change.
- **Found during the audit, not fixed (out of Phase 1's scope — belongs
  to `zee-zafra-portfolio-v2` Phase 2, "Remove Placeholders &
  Unfinished Content"):** `app/projects/page.tsx` and
  `app/services/page.tsx` are still the original bare stubs
  ("Content coming in a later phase.") despite `PROJECT-STATE.md`
  previously describing project data/filtering and case-study pages as
  done — the case-study *detail* route (`/projects/[slug]`) and the
  bento dashboard's project card both work, but the `/projects` and
  `/services` listing pages themselves were never filled in.

### Ad-hoc fix — Featured Projects / About Me height mismatch (this session)
Zee flagged via screenshots that the About Me card had a large empty
gap below its bio text.
- **Root cause:** `BentoDashboard.tsx` set `lg:row-span-2` on both
  `FeaturedProjectsCard` and `AboutMeCard`, forcing About Me to stretch
  to match Featured Projects' old 2x2 project-card grid — About Me's
  own content (avatar, bio, 3 facts) is much shorter, so the extra
  height showed up as dead space.
- **Fix:** `FeaturedProjectsCard`'s project cards (previously a
  `sm:grid-cols-2` 2x2 grid) are now a horizontal-scroll strip — same
  `-mx` bleed + `scrollbar-none` + `snap-x` pattern already used by
  `ToolsStrip` and this card's own filter-chip row — so the card is one
  row tall no matter which filter is active. `lg:row-span-2` removed
  from both cards in `BentoDashboard.tsx`; they now size to their own
  content and sit side by side in row one, with Services/
  Certifications/Hackathon auto-flowing into row two as before.
- **Verified:** `tsc --noEmit` clean, `eslint` clean on both changed
  files. Full `next build` still blocked only by the pre-existing
  sandboxed `fonts.googleapis.com` restriction noted above — unrelated
  to this change, and won't apply on Vercel.
- **Deliberately not touched:** the "Based in: *add this*" placeholder
  (content, not layout — still Zee's to fill in) and the black "N"
  badge visible in the screenshots (Next.js's dev-mode indicator,
  dev-only, absent from production/deployed builds).

## Latest session — home dashboard layout fix (against reference screenshot)
Zee attached the original reference screenshot again and asked to fix the
home page against it. Comparing the actual reference image pixel-by-pixel
against the built site turned up a real structural gap: the home page was
one long full-width stack (Hero → stats row → tools strip → wrapping bento
grid), but the reference is a genuine two-column dashboard — a main
content column plus a persistent right rail (Work Outcomes / About Me /
Hackathon Achievement / a CTA), with "Tools I Work With" as the one row
that spans full width between them. This was a cross-cutting fix touching
Phase 2–4 territory (Hero, stats, tools strip, bento dashboard), flagged
here rather than silently folded into a later phase.

**Changes:**
- `app/page.tsx` rebuilt as: [Hero | Work Outcomes] row → full-width Tools
  strip → [Featured Projects + Services/Certifications + availability
  banner | About Me + Hackathon + Get in Touch] row. Collapses to a single
  stack in source order below `lg`.
- `components/StatCards.tsx` → replaced by `components/bento/WorkOutcomesCard.tsx`:
  same count-up stat tiles, now a titled `BentoCard` ("Work Outcomes") in
  the right rail instead of a bare full-width row. No "View all" link —
  there's no real destination page for a fuller stat breakdown, and a dead
  link would be worse than none.
- `components/Hero.tsx`: now enclosed in one card (border/radius/shadow +
  a soft primary-tinted gradient wash) instead of sitting bare on the page
  background. Added a small dashed tag under the portrait reusing Zee's
  existing `tagline` ("Build · Support · Improve") — deliberately not the
  reference screenshot's own annotation copy, per the roadmap's
  structure-yes/copy-no rule for that image.
- `components/ToolsStrip.tsx`: now wrapped in `BentoCard` (titled, bordered)
  instead of a bare `<h2>` + strip, for the same one-system card treatment
  as every other section. Given `id="tools"` for anchor-linking.
- `components/bento/BentoDashboard.tsx`: trimmed to just the main column's
  lower content (Featured Projects, Services+Certifications row,
  availability banner) — About Me / Hackathon / Get in Touch moved out.
- New `components/RightRail.tsx`: About Me, Hackathon, Get in Touch,
  stacked; new `components/bento/GetInTouchCard.tsx`: small CTA reusing
  `profile.contact.headline` rather than inventing new marketing copy.
- New `components/AvailabilityBanner.tsx` + new `profile.availability.banner`
  field (drafted UI copy, same precedent as `contact.headline`/`subtext` —
  not a factual claim, so written directly: "Open to freelance projects,
  part-time roles, and collaborative work.").
- New `components/TopBar.tsx` + `components/SearchBar.tsx`, mounted in
  `app/layout.tsx` so it's persistent across every route (not just home).
  The search is a real, working client-side quick-search over
  projects/tools/services/certifications/hackathon (substring match,
  dropdown of up to 6 results, "no matches" state) — not decorative
  chrome standing in for a feature that doesn't exist. `ServicesCard`
  gained an `id` prop so its anchor (`/#services`) resolves.
- `components/bento/BentoCard.tsx`: one stale doc-comment fixed (referenced
  the now-deleted `StatCards.tsx`).

**Deliberately not done:** no backend/full-text search, no new page for a
detailed stats breakdown, no attempt to replicate the reference
screenshot's own hero annotation copy or exact palette (per the roadmap's
standing rule that the screenshot is a structural reference only).

**Verified:** `tsc --noEmit` clean, `eslint .` clean (zero warnings after
removing one now-unneeded eslint-disable comment). All seven routes
(`/`, `/about`, `/projects`, `/services`, `/certifications`, `/hackathon`,
`/contact`) return 200 under `next dev` with no runtime errors.
`next build` still fails only on the pre-existing, unrelated
`next/font/google` → `fonts.googleapis.com` sandbox network restriction
documented below — not a regression from this session's changes.

## Previous milestone (portfolio-nextjs-builder roadmap)
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

## Latest session — sidebar/nav shell darkened to match reference UI
Zee re-attached the reference dashboard screenshot and asked to continue
the fix against it. Comparing side-by-side (Playwright screenshot of the
live build vs. the reference), the home page's two-column layout,
Work Outcomes card, Tools strip, and bento grid all already matched
structurally from the prior session — but the **sidebar** didn't: the
reference uses a persistently dark navy nav shell (with a real profile
photo) regardless of the site's light/dark toggle, while the built
sidebar was just following the global theme (so it rendered white in
light mode instead of staying dark). This is also what the roadmap's
"Visual direction" section calls for ("Keep the dark theme... Keep the
left sidebar on desktop") — the toggle is meant to switch the *content*
area's theme, not the nav shell's.

**Changes:**
- `components/Sidebar.tsx`: added a `dark` class to the desktop `<aside>`,
  the mobile top bar, and the mobile drawer panel. No new color tokens
  needed — every sidebar element already reads color via the CSS custom
  properties in `globals.css` (`bg-card`, `text-foreground`,
  `border-card-border`, etc.), and those are already re-defined under
  `.dark`. Scoping that class to the sidebar subtree makes the existing
  dark palette cascade there via normal CSS inheritance, independent of
  whatever class is on `<html>`. Verified by toggling the theme switch:
  main content flips light/dark as before, sidebar stays dark navy
  throughout, collapsed icon-rail state included.
- `components/Avatar.tsx`: replaced the "ZZ" initials placeholder with
  the real portrait (`/images/hero-portrait.png`) — the same asset
  already used by `Hero.tsx` and `AboutMeCard.tsx`, just reused here
  rather than a new/invented image, per the reference's circular profile
  photo at the top of the sidebar.
- `components/ThemeToggleSwitch.tsx`: label now reads "Light" / "Dark"
  based on the resolved theme instead of a static "Theme", matching the
  reference's toggle copy.

**Deliberately not changed this session:** Featured Projects' horizontal-
scroll-strip layout (still a reasoned trade-off from the prior session,
not a regression); `BentoCard`'s uppercase eyebrow-style titles (an
intentional, already-documented typographic system — reference uses
sentence case, but this isn't a bug); the placeholder stat values,
empty certifications/hackathon/socials fields (all pre-existing,
correctly-flagged TODOs for Zee to fill in, out of scope for a layout
fix).

**Verified:** `tsc --noEmit` clean, `eslint .` clean on every changed
file. All seven routes return 200 under `next dev`. Checked desktop
(1600px), collapsed sidebar, mobile (390px) top bar + drawer, and both
light/dark content states via Playwright screenshots — sidebar renders
correctly and legibly (proper contrast) in every state; no overflow.

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
Sidebar now matches the reference. Remaining visual gaps vs. the
reference, if Zee wants them addressed next: real photos for the four
Featured Projects thumbnails (currently placeholder icons — can't be
filled without real screenshots), and the still-empty Certifications /
Hackathon / socials fields. Otherwise, Phase 9 (SEO, Performance &
Accessibility) is next on the `portfolio-nextjs-builder` roadmap, once
Zee has a `RESEND_API_KEY` in place (or wants to defer that further and
just move on — the form degrades gracefully either way).
