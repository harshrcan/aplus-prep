# CompTIA A+ Prep (220-1201 + 220-1202)

A 28-day CompTIA A+ study plan as a static web app. No build step. Works on phones (installable, offline after first load).

- 28 lessons: Days 1–14 Core 1, Days 15–28 Core 2. Each has an explanation page with tables, exam traps and "know cold" facts, a concept map, a flashcard deck and ~18 questions
- 533 questions: single-answer MCQ, choose-two/three, type-the-answer (ports, commands), PBQ-style ordering and matching. Every answer explained, misses saved until cleared, flag for review
- 18 help-desk tickets (scenario questions)
- 618 flashcards with spaced repetition: daily decks plus ports, acronyms, Windows commands/tools, Linux/macOS commands
- 4 timed mocks: checkpoints on Day 7 and Day 21 (40 Q / 40 min), full Core 1 and Core 2 mocks on Days 14 and 28 (90 Q / 90 min, domain-weighted, PBQs first, estimated 100–900 score)
- Domain readiness, mastery levels with 1/3/7/14-day retests, exam-date countdown, active study time

## Install on your phone
Open the GitHub Pages link in Safari (iPhone) or Chrome (Android), then Share → Add to Home Screen (iPhone) or menu → Install app (Android).

## Saving and sync
Progress saves on the device (`aplus-prep-v1` in localStorage). Cloud sync:
- **On GitHub Pages / home screen:** name + password account (no email). Supabase tables `ap_players` / `ap_sessions` (RLS on, no policies) reached only through the `ap_register`, `ap_login`, `ap_load`, `ap_save`, `ap_logout` functions. The key in `js/core.js` is a publishable key.
- **As a claude.ai artifact:** syncs to the signed-in Claude account automatically (artifact `db`, per-person doc).
- Save codes (Me → Data) move progress anywhere without an account.

## Files
- `js/data/core1-*.js`, `core2-*.js` lessons · `decks.js` flashcards · `tickets.js` scenarios
- `js/core.js` state, sync, SRS, scoring · `js/engine.js` question runner and flashcards · `js/pages.js` pages and router
- `sw.js` offline cache (bump `VERSION` after changes) · `manifest.webmanifest` install info

Not affiliated with CompTIA.
