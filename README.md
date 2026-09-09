# Zee Zafra — Portfolio (Next.js)

Built incrementally per the phased roadmap. This zip contains **Phase 1: Foundation**.

## What's in Phase 1

- Next.js App Router + TypeScript + Tailwind CSS v4 scaffold (no `src/` dir)
- Visual system wired as CSS theme tokens in `app/globals.css`:
  warm off-white background, dark navy headings, brand blue primary,
  orange/green status accents, shared card radius + shadow
- Dark/light mode via `next-themes` (`components/ThemeProvider.tsx`),
  class-based so it pairs with Tailwind's `dark:` variant
  (see `@custom-variant dark` in `globals.css`)
- A **temporary** manual theme toggle on the home page
  (`components/TempThemeToggle.tsx`) — just to prove the wiring works.
  This gets deleted in Phase 2 once the real sidebar toggle exists.
- Empty route stubs, each just a heading, so Phase 2's nav has somewhere
  to link to: `/`, `/projects`, `/services`, `/certifications`,
  `/hackathon`, `/about`, `/contact`

No real content, images, or the sidebar yet — that starts in Phase 2.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Click the "Toggle theme" button on the home
page (or change your OS light/dark setting) to confirm the theme switches.

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

**Phase 2 — Sidebar + Home Hero**: the persistent sidebar (avatar, name,
availability badge, social links, nav, theme toggle) and the home page's
hero section (headline, CTA, portrait). That's also when the first real
images (your avatar + hero portrait) come in.
