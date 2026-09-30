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
- `UPDATES` — `{ id, type, title, description, project, publishedAt, expiresAt, link }`. `type` is one of `project`, `document`, `milestone`, `status`, `update`, `achievement` and selects the icon. Dates are `YYYY-MM-DD`.

Write updates as visitor-facing outcomes ("Published the project report for…"), not as change-log entries ("Fixed the build"). Keep the feed low-noise: new projects, major features, milestones, certifications, portfolio features, and achievements only. Do **not** add an update for CSS or spacing tweaks, typo fixes, minor visual changes, or internal refactoring.

Entries are deduplicated by `id` and the recent list is capped at 8.

### Notification expiry

Every notification carries its own lifetime, so nothing depends on a blanket "30 days" rule:

- `publishedAt` — the day the update went live (also what the relative timestamp is measured from). The legacy field name `date` is still accepted.
- `expiresAt` — the **last day** the update stays in the panel. Omit it and `DEFAULT_LIFETIME_DAYS` (30) is applied to `publishedAt` instead.

An update whose `expiresAt` has passed is filtered out *before* rendering, so it can never appear in the list and can never count towards the unread badge. Expiry is re-checked on page load, every time the panel is opened, when the tab becomes visible again, and — while the panel is already open — by a single one-shot timer aimed at the next expiry boundary, so a notification that lapses as the date rolls over disappears without waiting for another trigger. That timer is not a poll: exactly one is ever armed, it re-arms from the same refresh path, and it is cleared when the panel closes and on page unload. Each active row also shows a factual "N days left" / "Expires today" label derived from its own stored expiry — that is a countdown to the expiry date, not a progress percentage.

Dates are validated as real calendar days, and `expiresAt` is inclusive — an update stays visible through the whole of its final day. A malformed or impossible date (for example `2026-02-31`, which JavaScript would otherwise roll over to 3 March) is rejected and the update falls back to the 30-day default rather than silently getting the wrong lifetime. Real leap days such as `2024-02-29` are accepted.

### Read / unread

The unread dot reflects updates published since the visitor's last visit. Read state is stored per-browser in `localStorage`:

- `ep.updates.seen` — ids the visitor has already read. Marks persist during normal page use, and clicking a notification (or its **Mark read** button) saves immediately.
- `ep.updates.known` — the id set that existed on their last visit. Compared against the live list so only genuinely new ids light up the bell; expired ids are pruned from both keys so the stored lists stay bounded.

On a first-ever visit everything already published is treated as read, so the bell starts quiet. Read state does not sync across devices and resets if site data is cleared.

`localStorage` is treated as untrusted input. A missing, malformed, or non-array value is normalised instead of being trusted, so the panel always renders — a returning visitor whose read state was lost is repaired from their own last-visit baseline (their earlier updates stay read, only genuinely new ones light the bell) rather than being mistaken for a first visit or lighting every row. Pruning `known` is also what makes a *new* update that reuses a retired id behave like a new update instead of a stale one.

## Interactive features

- **Command palette**: Press `Ctrl/Cmd+K` (or click "COMMANDS Ctrl+K") to navigate sections and open the assistant. Arrow up/down, Enter, and Escape keys glow on the hint bar as you use them.
- **AI Lab terminal**: Local, rule-based terminal with `help`, `about`, `projects`, `skills`, `stack`, `lab`, `contact`, `github`, `clear`. Hover/focus a research slot to preview its status.
- **Assistant "Sheru"**: Rule-based page helper (the owner's dog) with honest scope note, typing indicator, and suggested prompts. No external AI service.
- **Typing headlines**: About and CV headings type out live (paused when off-screen; static text shown for reduced-motion and no-JS).
- **Interactive sections**: Skill wall and journey timeline show contextual tooltips / categories on hover or focus; stack chips and process cards respond to hover/focus.
- **Contact form**: Locally validated (no backend — nothing is sent); shows a demo success state when valid.
- **Activity & current work**: Bell icon in the nav opens an Updates panel showing what is new plus what is currently in development, with an unread dot for updates published since the last visit. Each notification carries its own expiry and drops out of the panel automatically when it lapses. Curated content only — no developer activity log.

No framework or build step is required.