# Visual and performance review (G4)

Reviewed 2026-10-01 against the production build served at `http://127.0.0.1:4173/abhishek-shah-portfolio/`.

## Captures

`npm run capture` writes 24 full-page screenshots to `docs/portfolio/verification/screenshots/` (git-ignored; regenerate locally) and an index to `verification/captures.json`.

- Home and Enterprise RAG case study at 360, 390, 768, 1024, 1440 px.
- The other five case studies at 390 and 1440 px.
- Writing archive, not-found page, open mobile menu, and reduced-motion home at 390 px.

Horizontal overflow detected: **0 of 22** page captures (also asserted by the axe tests at 390 and 1440).

## Manual inspection

| Check | Result |
|---|---|
| Hero, cards, career, contact at 1440 and 390 | Pass. Titles match the résumé; "Download résumé" visible in hero and contact. |
| Case-study figures | Pass. Diagram labels legible at full size via the Enlarge dialog; dialog scrolls large figures; "Open full-size image" link provided. |
| Results tables on mobile | Pass. Reflow to fixed layout at 360/390 px without horizontal scroll; limitation text stays beside each value. |
| Limitations and negative findings | Pass. Visible on every card ("The agent chain did not beat the deterministic diagnosis baseline", "frozen-threshold recall failed", etc.) and in each case study. |
| Focus visibility and keyboard | Pass. Skip link, mobile menu (Escape, focus return), figure dialog (focus moves into dialog, returns to trigger). Covered by Playwright. |
| Reduced motion | Pass. Layout identical; no motion-dependent content. |
| Zoomed text | Pass. 200% zoom on 1280/1440 screens (640/720 CSS px): no overflow on home, two case studies, or the archive. |

## Lighthouse (mobile, simulated throttling, Lighthouse 13.5)

| Page | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Home | 98 | 100 | 100 | 100 |
| Enterprise RAG case study | 99 | 100 | 100 | 100 |

Targets 90/95/95/95 met. Raw reports: `verification/lighthouse-home.json`, `verification/lighthouse-case.json`.

## Palette and type revision (2026-10-01)

Applied the owner-selected palette and a larger type scale (see `design.md`). After the change: axe found 0 contrast violations at 390 and 1440 px, captures showed 0 overflow, and Lighthouse was unchanged (98/100/100/100 and 99/100/100/100). Fixed "Read case study" wrapping on the narrowest card, and widened the hero portrait card for the larger text.

## Issues found and fixed during review

- Missing space in the hero heading's accessible name.
- Logo link accessible name did not match visible text.
- Mobile line-break spacing in the profile note.
- Flaky mobile-menu test: Escape pressed during the Radix open transition, before the dismiss listener was attached (reproduced ~1 in 6 under load; second Escape always closed). Test now waits for the transition; 0 failures in 144 probe runs and 51/51 in a 3× repeated suite.
- Figure dialog auto-focus landed on Close (Radix skips links); now focuses the full-size link explicitly.
