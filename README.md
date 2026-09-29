# Erick Pradhan — AI/ML Engineer Portfolio

A dark, futuristic, single-page portfolio built with plain HTML, CSS, and vanilla JavaScript. No framework, package manager, backend, or build step.

Live at **https://erickpradhan.com.np**

## Run locally

The site is 100% static — no install or build required.

- Open `index.html` directly in a browser, or
- Use VS Code Live Server / any static server from the project root.

## Folder structure

```
index.html      page markup and all section content
styles.css      design system, layout, responsive rules, animations
script.js       interactions (network canvas, scroll reveal, nav, assistant)
CNAME           GitHub Pages custom-domain record (erickpradhan.com.np)
robots.txt      crawl rules
sitemap.xml     single-URL sitemap
assets/
  images/       Porfolio.jpg (hero portrait), favicon.svg
  documents/    Erick_Pradhan.pdf (CV) and project PDFs
  reference/    legacy/source image files (not referenced by the app)
```

## Deployment architecture

- **Host:** GitHub Pages (serves the repo root as a static site)
- **DNS:** Cloudflare (custom domain `erickpradhan.com.np`)
- **Custom domain:** GitHub Pages `CNAME` file points at the apex domain

GitHub Pages requires the `CNAME` file (with `erickpradhan.com.np`) at the repository root for the custom domain to keep working.

## Maintain

1. Keep `assets/images/Porfolio.jpg` and `assets/documents/Erick_Pradhan.pdf` — the page references them by relative path.
2. Re-generate `Porfolio.jpg` from the master photo (`assets/reference/Porfolio.png`) when the portrait changes; resize to ~1080px wide for a fast hero load.
3. Add a project card inside the `#work` section when you have another finished project to show. The expandable `<details>` block supports Problem / What was built / Verification content.
4. Publish an update by adding one entry to `UPDATES` (and optionally `CURRENT_WORK`) in `script.js` — see **Activity & current work** below. No other file needs to change.
5. Update the education, experience, certification, and assistant-answer content when your profile changes.
6. After any content change, update `robots.txt`, `sitemap.xml`, and the canonical/Open Graph `og:image` URL if paths changed.

## Activity & current work

The bell icon in the navigation opens an **Updates** panel with a *Currently Working On* block and a *Recent* list. Both are driven by two plain arrays at the top of the V2-C section in `script.js` — there is no backend, database, or build step, and raw git/infrastructure events are never surfaced.

- `CURRENT_WORK` — `{ id, project, status, note, link, progress }`. `status` is one of `In Progress`, `Completed`, `Planning`, `On Hold`, `Archived`. `progress` is optional and renders a bar **only** when set to a real number, so no percentage is ever invented.
- `UPDATES` — `{ id, type, title, description, project, date, link }`. `type` is one of `project`, `document`, `milestone`, `status`, `update`, `achievement` and selects the icon. `date` is `YYYY-MM-DD`.

Write updates as visitor-facing outcomes ("Published the project report for…"), not as change-log entries ("Fixed the build").

Entries are deduplicated by `id` and the recent list is capped at 8. The unread dot reflects updates added since the visitor's last visit and is stored in `localStorage` under `ep.updates.seen`, so read state is per-browser: it does not sync across devices and resets if site data is cleared. On a first-ever visit everything already published is treated as read, so the bell starts quiet.

## Interactive features

- **Command palette**: Press `Ctrl/Cmd+K` (or click "COMMANDS Ctrl+K") to navigate sections and open the assistant. Arrow up/down, Enter, and Escape keys glow on the hint bar as you use them.
- **AI Lab terminal**: Local, rule-based terminal with `help`, `about`, `projects`, `skills`, `stack`, `lab`, `contact`, `github`, `clear`. Hover/focus a research slot to preview its status.
- **Assistant "Sheru"**: Rule-based page helper (the owner's dog) with honest scope note, typing indicator, and suggested prompts. No external AI service.
- **Typing headlines**: About and CV headings type out live (paused when off-screen; static text shown for reduced-motion and no-JS).
- **Interactive sections**: Skill wall and journey timeline show contextual tooltips / categories on hover or focus; stack chips and process cards respond to hover/focus.
- **Contact form**: Locally validated (no backend — nothing is sent); shows a demo success state when valid.
- **Activity & current work**: Bell icon in the nav opens an Updates panel showing what is new plus what is currently in development, with an unread dot for updates added since the last visit. Curated content only — no developer activity log.

No framework or build step is required.