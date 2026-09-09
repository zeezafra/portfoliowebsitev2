# Zee Zafra — Portfolio (Next.js)

Built incrementally per the phased roadmap. This zip contains through
**Phase 3: Work Outcomes + Tools Strip**.

## ⚠️ Fill these in before it's really "yours"

Open `data/profile.ts` and:
- Add your real **LinkedIn / GitHub / Facebook / email** URLs to `socials`.
  Left blank on purpose — a made-up link would just be a dead link. Icons
  only appear in the sidebar once a link has a real `href`.
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

## Run it locally

```bash
npm install
npm run dev
```

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

## Next phase

**Phase 4 — Bento Dashboard**: the card-grid layout (Featured Projects,
About Me, Services, Certifications, Hackathon Achievement) that makes the
home page read as a dashboard. Filter tabs are visual-only this phase —
real filtering is Phase 5.
