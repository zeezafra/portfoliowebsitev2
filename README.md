# Zee Zafra — Portfolio (Next.js)

Built incrementally per the phased roadmap. This zip contains through
**Phase 8: Contact Page**.

## ⚠️ Fill these in before it's really "yours"

Open `data/profile.ts` and:
- Add your real **LinkedIn / GitHub / Facebook** URLs to `socials`.
  Left blank on purpose — a made-up link would just be a dead link. Icons
  only appear in the sidebar once a link has a real `href`. **Email is
  filled in as of Phase 8** (pulled from your uploaded résumé), so that
  icon already shows up.
- Confirm `availability` — is "Available for work" accurate right now?
- Confirm/edit `hero.headline` and `tagline` — both are placeholders from
  the project brief, easy to swap for your own wording.
- **`stats` — these are placeholder numbers (10+ projects, 2+ years, 95%,
  99%), not your real figures.** Replace them before this goes live —
  publishing made-up stats about your own work isn't something I wanted to
  do silently.
- **`tools` — this is a draft list**, inferred from what's actually visible
  (this project's stack, Photoshop, IT/hardware support, MCP/AI agent dev),
  not a full inventory of everything you use. Add/remove/reorder freely.
- **`about.bio` and `about.facts`** — bio is drafted from your existing hero
  copy + tools list; reads fine but put it in your own words. `facts.location`
  is left blank on purpose (same reasoning as the blank social hrefs) — the
  About Me card shows an "add this" prompt until you fill it in.
- **`services` bullets** — inferred from your tools list, not a full
  service-scope description. Reword/expand freely.
- **`certifications` (currently empty) and `hackathon` (currently unfilled)**
  — I did **not** invent certification names or a hackathon placement/result.
  Those are specific factual claims, not placeholder numbers like the stats
  above, so making them up isn't something I wanted to do silently. The
  Certifications and Hackathon Achievement cards show "add a certification" /
  "add your event details" prompts until you fill these in.
  - Phase 7 added an `image` field to each certification and split
    `hackathon` into `result`/`description` (short, for the home card) plus
    `problem`/`techUsed`/`writeup`/`images` (for the full `/hackathon` page).
    All still empty — add real values and matching photos under
    `/public/images` when you have them.
- **Three brand-new fields as of Phase 7 — all currently empty:**
  - `experience` — your real role history (title, organization, period,
    one-line description each). The roadmap names "On-Call Technical
    Assistant" and "Freelance Technical Support Specialist" as examples
    from your brief, but I didn't fill in employers/dates I don't actually
    have. Powers the new `/about` page's timeline; shows a fill-in prompt
    until it has entries.
  - `testimonials` — optional. Only add real client quotes here; I'm not
    fabricating any. Leave empty and the Testimonials section just doesn't
    render on `/about` — no empty placeholder section either.
  - `nowLearning` — one line on what you're actively studying/building
    right now. Shows a fill-in prompt on `/about` until `title` is set.
- **`data/projects.ts` — same reasoning, one level deeper.** I populated
  `slug`/`title`/`category` for the 4 projects named in the roadmap (IT
  Inventory System, PC Diagnostics & Repair, this portfolio site, Arduino
  Smart System), but left `role`, `tools`, `problem`, `solution`, `outcome`,
  and `images` blank — I didn't want to invent a problem/solution/outcome
  narrative for your actual work without you confirming it. Two things to
  double check:
  - **Category for "IT Inventory System"** — I filed it under
    `technical-support` (reads as an internal IT-ops tool), not `web`. Move
    it if that's wrong.
  - **No hackathon project yet** — none of the 4 named projects fit that
    category, so the "Hackathon" filter tab on the home page currently shows
    an empty state. Add an entry once you've got the details (pairs with
    the still-unfilled Hackathon Achievement card above).

The avatar and hero portrait are set up (see Phase 2 notes below) — no
outstanding image placeholders left.

## What's in Phase 1 (Foundation)

- Next.js App Router + TypeScript + Tailwind CSS v4 scaffold (no `src/` dir)
- Visual system wired as CSS theme tokens in `app/globals.css`:
  warm off-white background, dark navy headings, brand blue primary,
  orange/green status accents, shared card radius + shadow
- Dark/light mode via `next-themes` (`components/ThemeProvider.tsx`),
  class-based so it pairs with Tailwind's `dark:` variant
  (see `@custom-variant dark` in `globals.css`)
- Empty route stubs, each just a heading: `/`, `/projects`, `/services`,
  `/certifications`, `/hackathon`, `/about`, `/contact`

## What's in Phase 2 (Sidebar + Home Hero)

- `data/profile.ts` — single typed source for name, role, availability,
  socials, and hero copy (later phases should read from this too, not
  re-declare it)
- `components/Sidebar.tsx` — sticky desktop sidebar, collapsible to
  icon-only; collapses into a top bar + slide-in drawer on mobile;
  active-route highlighting; state survives navigation
- `components/Hero.tsx` — role pill, headline, value statement, CTA to
  `/contact`, placeholder portrait panel
- `components/ThemeToggleSwitch.tsx` — the real toggle switch (replaces
  Phase 1's temporary button, now removed)
- `components/Avatar.tsx`, `components/AvailabilityBadge.tsx`,
  `components/SocialLinks.tsx`, `components/icons/SocialGlyphs.tsx` —
  supporting pieces used by the sidebar

No real project/services/certification content yet — that starts Phase 4
(bento dashboard).

## What's in Phase 3 (Work Outcomes + Tools Strip)

- `components/StatCards.tsx` — 4 stat cards (Projects Completed, Years of
  Experience, Client Satisfaction, Uptime/Reliability); each number
  animates from 0 the first time it scrolls into view (once only, via
  Framer Motion's `useInView`), not on every re-render
- `components/ToolsStrip.tsx` — horizontal row of tool/skill chips
  (icon, name, subtitle); scrolls smoothly on mobile, fixed-width chips
  so nothing reflows while scrolling
- `data/profile.ts` extended with `stats` and `tools` — **both currently
  hold placeholder/draft data, see the warning above**
- Both render on the home page, below the hero

## What's in Phase 4 (Bento Dashboard)

- `components/bento/BentoDashboard.tsx` — the card-grid layout below the
  tools strip; Featured Projects and About Me anchor the grid as tall
  cards, Services/Certifications/Hackathon sit in a row underneath
  (reflows to 2 columns on tablet, single column on mobile)
- `components/bento/FeaturedProjectsCard.tsx` — filter tabs
  (All/Web/Hardware/Technical Support/Hackathon) that switch active state
  on click; **visual only this phase** — the grid always shows the same
  4 static placeholder project cards regardless of the active tab. Real
  project data + real filtering is Phase 5.
- `components/bento/AboutMeCard.tsx` — portrait, bio, and 3 labeled facts
  (Based in / Experience / Specialties), reading from `data/profile.ts`
- `components/bento/ServicesCard.tsx` — Technical Support, Web
  Development, and System & Hardware Support, each with a short bullet list
- `components/bento/CertificationsCard.tsx` and
  `components/bento/HackathonCard.tsx` — **deliberately empty/unfilled**
  right now (see the warning section above) — they render fill-in prompts
  instead of invented content
- `components/bento/BentoCard.tsx` and `components/bento/PlaceholderThumb.tsx`
  — shared card shell and icon-tile placeholder used in place of real
  project/certificate/hackathon photography that doesn't exist yet
- `data/profile.ts` extended with `about`, `services`, `certifications`,
  and `hackathon`

## What's in Phase 5 (Project Data Model + Filtering)

- `data/projects.ts` — the typed `Project` shape from the roadmap, plus the
  4 real projects named in the brief (see the warning above for what's
  filled in vs. still a TODO)
- `components/bento/FeaturedProjectsCard.tsx` — now reads from
  `data/projects.ts` instead of static placeholders, and the filter tabs
  **actually filter** by category (client-side state, no page reload,
  no URL params — add `useSearchParams` later if you want filters to be
  shareable/bookmarkable)
- A category with no matching projects (currently "Hackathon") shows a
  "No projects in this category yet" empty state instead of an empty grid
- "View Project →" links to the `/projects` stub in this phase — Phase 6
  updates it to point at the real `/projects/<slug>` route

## What's in Phase 6 (Case-Study Pages)

- `app/projects/[slug]/page.tsx` — one real, statically-generated page per
  project (via `generateStaticParams` reading `data/projects.ts`), plus
  `generateMetadata` for a per-page `<title>`/description. Unknown slugs
  correctly 404 (`dynamicParams = false`) instead of trying to render a
  page with no data behind it.
- Section order per the roadmap: back link, category pill + title + tool
  tags, hero screenshot, Problem, My Role, Tools Used, screenshots gallery,
  Solution, Outcome, then a link row (Live Demo / Demo / GitHub).
- `components/project/` — `ProjectHeader`, `ProjectToolsUsed`,
  `ProjectGallery`, `ProjectLinks`, plus the shared `LabeledSection`
  (originally `ProjectTextSection` here, renamed and moved to
  `components/shared/` in Phase 7 once the Hackathon page needed the same
  pattern). Every blank `problem`/`role`/`solution`/`outcome`/`tools`/link
  field renders the same muted "add this" fill-in prompt used elsewhere on
  the site (AboutMeCard, HackathonCard) — **since 3 of the 4 projects have
  every narrative field still blank, and even the 4th ("This Portfolio
  Site") has no problem/solution/outcome yet, most of every case-study page
  currently renders as fill-in prompts.** Fill in `data/projects.ts` to
  replace them.
- `components/project/ProjectGallery.tsx` — originally a self-built
  lightbox (grid of thumbnails → fullscreen overlay, arrow keys +
  click-outside + Escape to navigate/close); the lightbox itself was
  extracted to `components/gallery/ImageLightboxGrid.tsx` in Phase 7 so
  the certifications gallery could reuse it rather than duplicating it.
  ProjectGallery is now a thin wrapper adding the "Screenshots" heading
  and the category-icon placeholder shown when a project's `images` array
  is empty (true for all 4 projects right now).
- `lib/project-category.ts` — the category → label/icon mapping, pulled
  out of `FeaturedProjectsCard` so the home grid's category pill and the
  case-study header's category pill can't drift out of sync.
- `components/bento/FeaturedProjectsCard.tsx` — "View Project →" now links
  to the real `/projects/<slug>` case-study page instead of the `/projects`
  stub.
- Home page's Featured Projects card gained `id="featured-projects"`
  (threaded through `BentoCard`'s new optional `id` prop) so each
  case-study page's back link (`/#featured-projects`) actually scrolls to
  it, rather than pointing at the still-empty `/projects` index — the
  roadmap allows either target, and a full `/projects` listing page isn't
  scheduled on any phase.

## What's in Phase 7 (Certifications, Timeline, Testimonials, Now-Learning)

- **`components/gallery/ImageLightboxGrid.tsx`** — the shared lightbox
  (thumbnail grid → fullscreen overlay, prev/next, Escape/click-outside to
  close, arrow-key navigation). Extracted from Phase 6's `ProjectGallery`
  so it has exactly one implementation, reused by both `/projects/<slug>`
  screenshots and the new `/certifications` gallery, per the roadmap's
  explicit "reuse whatever lightbox approach Phase 6 used" instruction.
  Supports an optional caption per image (used for certification
  name/issuer, not used for project screenshots).
- **`components/shared/LabeledSection.tsx`** — the "heading + prose, with
  an italic fill-in prompt when blank" pattern, similarly extracted from
  Phase 6's case-study pages (where it was `ProjectTextSection`) since the
  new `/hackathon` page needed the exact same thing for Problem
  Solved/Writeup.
- **`components/shared/AboutFactRow.tsx`** — the icon+label+value row from
  the home page's `AboutMeCard`, extracted so the new `/about` page could
  reuse it instead of a second copy.
- **`/certifications`** (full page) — grid of certificate images via
  `ImageLightboxGrid`; a certification with a name/issuer but no `image`
  yet still shows as a labeled card rather than being silently dropped.
  Currently empty — see the fill-in note above.
- **`/about`** (full page, replacing the Phase 1 stub) — bio + facts (reused
  from the home page's About Me card), the new Experience Timeline, the
  Now Learning card, and Testimonials (only rendered if any exist). I put
  Experience and Now Learning here rather than the home page — the roadmap
  allows either, and the bento dashboard is already the densest part of
  the site (6 cards).
- **`components/timeline/ExperienceTimeline.tsx`** — dot-and-line vertical
  timeline, kept single-column at every breakpoint (not just mobile) since
  the more common left/right-alternating layout doesn't hold up under
  ~400px and the roadmap's test specifically calls out mobile readability.
  Shows a fill-in prompt until `profile.experience` has entries.
- **`components/testimonials/TestimonialsSection.tsx`** — unlike
  Certifications/Hackathon/Now-Learning, this renders **nothing at all**
  when `profile.testimonials` is empty (no empty-state prompt either) —
  per the roadmap, testimonials are optional and I'm not fabricating
  client quotes. Confirm with me whether you have real ones to add, or
  whether this section should come out entirely.
- **`/hackathon`** (full page, replacing the Phase 1 stub) — placement,
  problem solved, tech used, a photo gallery (`ImageLightboxGrid` again),
  and a longer writeup, per the roadmap's exact list. Required splitting
  `data/profile.ts`'s `hackathon` object into more granular fields (see
  the fill-in note above) — all still empty.
- **`components/bento/CertificationsCard.tsx`** and **`HackathonCard.tsx`**
  — now show a real thumbnail (`cert.image` / `hackathon.images[0]`) when
  one exists, falling back to the placeholder icon otherwise.

## Run it locally

```bash
npm install
npm run dev
```

Optional: copy `.env.local.example` to `.env.local` and add a
`RESEND_API_KEY` if you want the contact form to actually send email
locally. Without it, the site runs fine — the form just returns "not
configured yet" on submit instead of sending.

Open http://localhost:3000. Things to check:
- Collapse arrow at the bottom of the sidebar shrinks it to icon-only, and
  it stays collapsed as you click between nav links (state isn't lost on
  navigation)
- Resize below tablet width (or open dev tools' device toolbar) — the
  sidebar should become a top bar with a hamburger that opens a drawer
- The theme switch in the sidebar flips light/dark instantly
- The hero CTA button ("Let's work together") links to `/contact`
- Scroll down: the 4 stat numbers should count up from 0 once, the first
  time they enter the viewport (reload and scroll slowly to see it — it
  won't replay if you scroll past and back up)
- The tools strip scrolls horizontally on a narrow/mobile viewport without
  the chips jumping around
- Scroll to the bento grid: Featured Projects and About Me stand as tall
  cards on desktop, with Services/Certifications/Hackathon in a row below
- Resize to tablet and mobile widths and confirm the grid reflows to 2
  columns then 1, without cards overlapping or overflowing
- Certifications and Hackathon Achievement currently show "add" prompts —
  that's expected until you fill in `data/profile.ts`
- Click each Featured Projects filter tab — the grid actually narrows to
  matching projects now; "All" shows all 4; "Hackathon" shows the
  "no projects yet" empty state; nothing reloads the page
- Click "View Project →" on any project card — it should land on a real
  `/projects/<slug>` page, not the old `/projects` stub
- On a case-study page, click "Back to Projects" — it should jump to the
  home page's Featured Projects card, not the top of the page
- Try a project with no `images` (all 4, currently) — the gallery shows a
  single placeholder tile instead of an empty grid; Problem/My Role/
  Solution/Outcome show italic "add this"-style prompts instead of blank
  headings
- View page source (or Next.js's metadata debugging) on a case-study page
  and confirm the `<title>` is the project's name, not the generic
  site-wide title
- Manually visit a bogus slug, e.g. `/projects/not-a-real-project` — it
  should 404, not render a blank page
- Visit `/about` — bio, facts, Experience Timeline, and Now Learning card
  all show fill-in prompts (expected — `experience` and `nowLearning` are
  still empty); no empty "Testimonials" heading should appear anywhere on
  the page
- Visit `/certifications` — shows the empty-state prompt (expected,
  `certifications` is still empty); once you add entries with `image` set,
  clicking a thumbnail should open the same lightbox style as the
  case-study pages
- Visit `/hackathon` — every section (Problem Solved, Tech Used, Photos,
  Writeup) shows its own fill-in prompt rather than one blank page
- On a touch device (or your browser's device toolbar with touch
  simulation), open a lightbox on `/certifications` or a case-study page
  and confirm tap opens/closes/navigates it — this doesn't rely on mouse
  hover
- Narrow the browser to mobile width on `/about` and confirm the
  Experience Timeline stays single-column and readable, not squeezed or
  overlapping

## Push to GitHub

```bash
git init
git add .
git commit -m "Phase 1: foundation scaffold"
git branch -M main
git remote add origin <your-empty-github-repo-url>
git push -u origin main
```

## Deploy to Vercel

1. Go to https://vercel.com/new
2. Import the GitHub repo you just pushed
3. Framework preset auto-detects as Next.js — no config changes needed
4. Deploy, then open the preview URL and confirm it matches localhost

Once that preview URL is live, every later phase can be checked there
instead of only on your machine.

## What's in Phase 8 (Contact Page)

- **`app/contact/page.tsx`** — replaces the Phase 1 stub. Header, a
  two-column layout (contact form + info panel) that stacks to one
  column below `lg`, then the FAQ accordion.
- **`components/contact/ContactForm.tsx`** — name/email/message fields
  with inline validation, a visually-hidden honeypot field (real users
  never see or tab into it), loading/success/error states. Submits to
  the API route below rather than faking success client-side.
- **`app/api/contact/route.ts`** — the real server-side logic: honeypot
  check (silently returns a fake success so bots don't learn to avoid
  it), field validation (shared with the client via
  `lib/contact-validation.ts` so the rules can't drift), basic in-memory
  IP + timestamp rate limiting (`lib/rate-limit.ts`, 3 requests/60s —
  resets per server instance, which is a known limit of the "basic"
  approach the roadmap calls for), then **email delivery via Resend**
  (`lib/send-contact-email.ts`).
  - If `RESEND_API_KEY` isn't set, the route still returns the same
    honest `{ ok: false, reason: "not_configured" }` (HTTP 503) it
    always has, so the rest of the form works before you've added a key.
  - If the key is set but the send itself fails (bad key, Resend outage,
    etc.), it returns `{ ok: false, reason: "send_failed" }` (HTTP 502)
    instead of a false success.
  - On a real send, the visitor's email is set as `replyTo`, so you can
    just hit reply in your inbox.
  - **Setup:** copy `.env.local.example` to `.env.local`, add your
    [Resend](https://resend.com) API key, and set the same variable in
    Vercel's dashboard for the deployed site (never commit the key
    itself). See `.env.local.example` for the optional
    `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` overrides and the note
    about Resend's sandbox-sender delivery restriction until you verify
    your own domain.
- **`components/contact/FaqAccordion.tsx`** — accessible single-open
  accordion (proper `aria-expanded`/`aria-controls`), first question
  open by default. `data/profile.ts`'s new `faqs` array holds Zee's real
  questions and answers, supplied directly rather than invented.
- **`components/contact/ContactInfoPanel.tsx`** — reuses the sidebar's
  `AvailabilityBadge` and `SocialLinks` (no second source of truth), plus
  a résumé download button.
- **Résumé** — `public/resume/Zee-Zafra-Resume.pdf` is Zee's real,
  uploaded résumé; `profile.resume.href` points at it. Download button
  shows a fill-in prompt instead if this field is ever emptied.
- **`data/profile.ts`** extended with `faqs`, `resume`, and `contact`
  (headline/subtext — drafted copy, not a factual claim, edit freely).
  `socials.email` was also filled in from the résumé (a real address, not
  invented) — LinkedIn/GitHub/Facebook are still blank since those URLs
  weren't resolvable from the résumé text.

**Known limitations, not code bugs:**
- `next build` fails in a network-restricted sandbox because
  `next/font/google` can't reach `fonts.googleapis.com` — it builds fine
  anywhere with normal internet access (your machine, Vercel).
- A real Resend send can't be exercised inside that same sandbox (no
  route to `api.resend.com` either), so the send path was verified by
  forcing each response branch — `not_configured` (no key),
  `send_failed` (key present, network call rejected), plus honeypot,
  validation, and rate-limit — via direct requests to the local dev
  server. It should send for real the moment `RESEND_API_KEY` is set
  somewhere with normal internet access.
- `tsc --noEmit`, `eslint`, and `next dev` all pass/run clean.

## Next phase

**Phase 9 — SEO, Performance & Accessibility**: per-route metadata, Open
Graph images, `sitemap.ts`/`robots.ts`, `next/image` everywhere, animated
route transitions, an accessibility pass, and click analytics on the
résumé download + contact-form submit.

Still open from earlier phases:
- **Add your `RESEND_API_KEY`** (see `.env.local.example`) so the
  contact form actually sends — the code is wired, it just needs your
  key in `.env.local` and in Vercel's env vars.
- Do you have real client testimonials to add (or should that section
  come out entirely)?
- What's your actual role history for the Experience Timeline?
- Certifications and Hackathon Achievement are still empty — add real
  entries when you have them.
