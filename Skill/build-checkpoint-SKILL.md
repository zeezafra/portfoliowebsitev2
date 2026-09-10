---
name: build-checkpoint
description: Protects long, multi-phase app-building sessions (Next.js portfolio, broker website, MCP servers, or any project built phase-by-phase from a roadmap skill.md) against losing work if the session ends before the project is finished. Checkpoints proactively and regularly rather than waiting for a "running low" signal, since Claude cannot reliably observe its own remaining context budget. Always use this alongside project-specific builder skills (e.g. portfolio-nextjs-builder, broker-website-builder, it-helpdesk-mcp-builder) whenever a build session runs more than a couple of phases, involves many file edits/tool calls, or when the user says things like "checkpoint this", "save progress", "pick this up later", "continue this next time", "zip up what we have", or is about to end the session with the project unfinished.
---

# Build Checkpoint

## The core problem

Claude cannot directly see how much context budget remains in a conversation — there is no reliable "about to run out" signal to wait for. So the strategy is not to predict the exact moment of running out. It's to checkpoint proactively and often enough that losing the rest of a session is never costly.

## When to checkpoint

Checkpoint at all of these points, not just one:

1. After completing each roadmap phase (if the project follows a Phase-N structure).
2. After roughly every 5–8 tool calls / file edits within a phase, if a phase runs long.
3. Any time context feels crowded — needing to re-view a file already edited earlier in the session, the conversation running very long, or catching yourself about to summarize unprompted.
4. At the very end of every session — finished or not.
5. Immediately if the user says anything like "let's stop here," "I have to go," or "pause."

Don't wait for certainty. An unnecessary checkpoint costs a few seconds. A missed one can cost the whole session's work.

## What a checkpoint consists of

Do all three, in order, every time:

### 1. Commit to git, if the project has a repo
Check with `git status`. If it's a repo:
```bash
git add -A && git commit -m "checkpoint: <what just got done>"
git push   # if a remote is configured — this is what makes it recoverable from a different machine or account
```
This is the cheapest, most reliable checkpoint — prefer it over the zip whenever git is available.

### 2. Write or update a short handoff note
Keep a single `HANDOFF.md` at the project root (or append to the roadmap skill.md's progress log if one already exists). A fresh Claude session with zero memory of this conversation should be able to read it and know exactly where to resume. Keep it short:
- Current phase/task and its status (done / in progress / blocked)
- What just changed — a one-line-per-file list, not a diff
- What's next — the immediate next step, not the whole remaining roadmap
- Any decisions made that aren't obvious from the code (naming choices, trade-offs, things intentionally deferred)
- Anything known-broken or untested — never leave this implicit

### 3. Zip the project and hand it to the user
```bash
cd /path/to/project/.. && zip -r <project>-checkpoint-<label>.zip <project> \
  -x "*/node_modules/*" "*/.git/*" "*/.next/*" "*/dist/*" "*/build/*"
```
Exclude dependency and build output folders — they bloat the zip and aren't needed to resume (`npm install` / `git clone` reconstitutes them). Save to `/mnt/user-data/outputs/` and present it with the file-sharing tool so the user actually gets a downloadable card, not just a file they can't see. Name the zip by progress, not just a timestamp — e.g. `portfolio-phase6-lightbox-done.zip`.

If the project has **no** git repo, the zip is the only checkpoint that exists — increase the frequency and never skip this step, even for a small increment.

## Resuming from a checkpoint

When a session picks the project back up — new conversation, new account, an unzipped folder, a freshly cloned repo:

1. Look for `HANDOFF.md` first, before touching any code.
2. Cross-check it against the actual files and `git log` — the note is a summary, not ground truth. If they disagree, trust the code and flag the discrepancy to the user.
3. Confirm the resume point in one line ("Picking up at Phase 7 — the gallery lightbox — sound right?") before diving back in, since the note might be stale.

## Practical notes

- Don't ask permission to checkpoint — do it silently as part of the work, the same way you'd save a file. Mention it in your reply with one short line ("committed and zipped up progress through Phase 6"), not a status report.
- A checkpoint should be near-invisible overhead — seconds, not a whole extra phase of work.
- This complements project-specific roadmap skills, it doesn't replace them: they define *what* to build each phase; this defines *how not to lose it*.
