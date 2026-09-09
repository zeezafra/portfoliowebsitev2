# Zee Zafra — Portfolio (Next.js)

<<<<<<< HEAD
Built incrementally per the phased roadmap. This zip contains through
**Phase 2: Sidebar + Home Hero**.

## ⚠️ Fill these in before it's really "yours"

Open `data/profile.ts` and:
- Add your real **LinkedIn / GitHub / Facebook / email** URLs to `socials`.
  Left blank on purpose — a made-up link would just be a dead link. Icons
  only appear in the sidebar once a link has a real `href`.
- Confirm `availability` — is "Available for work" accurate right now?
- Confirm/edit `hero.headline` and `tagline` — both are placeholders from
  the project brief, easy to swap for your own wording.

The avatar and hero portrait are initials/icon placeholders
(`components/Avatar.tsx`, `components/Hero.tsx`) since no photo's been
uploaded yet — each has a comment showing exactly how to swap in a real
image once you have one.

## What's in Phase 1 (Foundation)
=======
Built incrementally per the phased roadmap. This zip contains **Phase 1: Foundation**.

## What's in Phase 1
>>>>>>> bec89969c4da81118dc5de0cbf7bb3e8d526fbfd

- Next.js App Router + TypeScript + Tailwind CSS v4 scaffold (no `src/` dir)
- Visual system wired as CSS theme tokens in `app/globals.css`:
  warm off-white background, dark navy headings, brand blue primary,
  orange/green status accents, shared card radius + shadow
- Dark/light mode via `next-themes` (`components/ThemeProvider.tsx`),
  class-based so it pairs with Tailwind's `dark:` variant
  (see `@custom-variant dark` in `globals.css`)
<<<<<<< HEAD
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

No real project/services/certification content yet — that starts Phase 3
(stat cards + tools strip) and Phase 4 (bento dashboard).
=======
- A **temporary** manual theme toggle on the home page
  (`components/TempThemeToggle.tsx`) — just to prove the wiring works.
  This gets deleted in Phase 2 once the real sidebar toggle exists.
- Empty route stubs, each just a heading, so Phase 2's nav has somewhere
  to link to: `/`, `/projects`, `/services`, `/certifications`,
  `/hackathon`, `/about`, `/contact`

No real content, images, or the sidebar yet — that starts in Phase 2.
>>>>>>> bec89969c4da81118dc5de0cbf7bb3e8d526fbfd

## Run it locally

```bash
npm install
npm run dev
```

<<<<<<< HEAD
Open http://localhost:3000. Things to check:
- Collapse arrow at the bottom of the sidebar shrinks it to icon-only, and
  it stays collapsed as you click between nav links (state isn't lost on
  navigation)
- Resize below tablet width (or open dev tools' device toolbar) — the
  sidebar should become a top bar with a hamburger that opens a drawer
- The theme switch in the sidebar flips light/dark instantly
- The hero CTA button ("Let's work together") links to `/contact`
=======
Open http://localhost:3000. Click the "Toggle theme" button on the home
page (or change your OS light/dark setting) to confirm the theme switches.
>>>>>>> bec89969c4da81118dc5de0cbf7bb3e8d526fbfd

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

<<<<<<< HEAD
**Phase 3 — Work Outcomes + Tools Strip**: a stat-card row (Projects
Completed, Years of Experience, etc. — real numbers, not invented ones)
and a horizontal strip of the tools/skills you actually work with.
=======
**Phase 2 — Sidebar + Home Hero**: the persistent sidebar (avatar, name,
availability badge, social links, nav, theme toggle) and the home page's
hero section (headline, CTA, portrait). That's also when the first real
images (your avatar + hero portrait) come in.
>>>>>>> bec89969c4da81118dc5de0cbf7bb3e8d526fbfd
