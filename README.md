# Abhishek Shah — portfolio

Source for <https://abh2050.github.io/abhishek-shah-portfolio/>: six evidence-backed case studies, career history, writing, and a downloadable résumé.

React 18 · TypeScript · Vite 6 · Tailwind · React Router 7 (HashRouter) · GitHub Pages. No backend.

## Setup

```sh
nvm use            # Node 24 (.nvmrc)
npm ci
npm run dev        # http://localhost:8080/abhishek-shah-portfolio/
```

## Where content lives

| File | Contents |
|---|---|
| `src/content/profile.ts` | Name, current title/employer, contact links, résumé path |
| `src/content/experience.ts`, `education.ts` | Career and education |
| `src/content/projects.ts` | The six case studies (order = homepage order) |
| `src/content/evidence.ts` | Claims register: every displayed metric with scope, limitation, and source at a pinned commit |
| `src/content/assets.ts` | Image metadata; provenance in `docs/portfolio/assets.json` |
| `src/content/writing.ts` | Articles and podcasts for the archive |
| `public/resume/Abhishek-Shah-Resume.pdf` | Current résumé (owner-supplied) |

Changing the current role: update `profile.title` and `experience[0].title` together (the content check enforces they match), plus `jobTitle` in the JSON-LD in `index.html`.

Updating the résumé: replace `public/resume/Abhishek-Shah-Resume.pdf` with the new PDF. Keep the filename or update `profile.resume`.

Adding images: put sources where `scripts/prepare-assets.mjs` expects them and run `npm run assets:prepare`. The content check rejects any shipped image that has no provenance record.

## Verification

```sh
npm run verify     # typecheck → lint → build → check:content → test:e2e → check:release
```

Results go to `docs/portfolio/verification/verify.json`, with one log per step. The Playwright suite runs against the production build at `/abhishek-shah-portfolio/`. It covers navigation, all six case studies, refresh/back, unknown routes, FAQ, the figure viewer, the résumé PDF, archive embeds, metadata, axe (WCAG 2.1 AA) at 390/1440, and reduced motion.

Other scripts:

- `npm run capture`: screenshots at 360–1440 px into `docs/portfolio/verification/screenshots/` (git-ignored). Needs `npm run preview` running.
- `npm run check:links`: checks external links (network required).
- Lighthouse: `npx lighthouse http://127.0.0.1:4173/abhishek-shah-portfolio/ --output=json --output-path=docs/portfolio/verification/lighthouse-home.json`

No test provisions infrastructure, calls a model, or reruns a project evaluation.

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md). A push to `main` builds, runs `check:release`, and deploys to GitHub Pages.

## Project records

`docs/portfolio/` holds the audit, project research, claims register, design decisions, visual review, and release status (`completion.md`).
