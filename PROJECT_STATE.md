# Project State

## 1. Project Overview

A static, single-page "dark futuristic AI/ML engineer" portfolio for Erick Pradhan. Hand-built with plain HTML, CSS, and vanilla JavaScript — no framework, no build tool, no runtime dependencies. Deployed on Vercel static hosting. Scrollytelling-style with sections for hero, projects/work, about, skills, timeline, AI Lab, CV, and contact. Includes a rule-based in-page AI assistant.

## 2. Technology Stack

- Framework: None (plain static site)
- Language: HTML5, CSS3, vanilla JavaScript (no TypeScript)
- Build tool: None (no build step)
- Package manager: None (no package.json, no node_modules)
- Styling: Single `styles.css` (minified base rules on long lines + readable appended overrides)
- Animation: CSS keyframes + vanilla JS (IntersectionObserver reveal, pointermove tilt/magnetic, requestAnimationFrame canvas); no animation library
- UI libraries: None (hand-written components)
- Icon library: None (text glyphs: `↗`, `✦`, `☰`, `×`, `↓`)
- Other important dependencies: None runtime. External: Google Fonts (Inter + Space Grotesk, async load with print-swap + noscript fallback). Deployment: Vercel (`vercel.json`, `.vercel/project.json`).

## 3. Project Structure

Root: `C:\Users\lenovo legion\Downloads\erick-pradhan-ai-portfolio\erick-pradhan-ai-portfolio\`

- `index.html` — entire site (all sections, AI assistant dialog, JSON-LD schema)
- `styles.css` — all styling (design tokens on :root, keyframes, responsive overrides)
- `script.js` — all JS interactions (network canvas, reveal, nav, tilt/magnetic/cursor, mobile menu, AI assistant, matrix easter egg)
- `vercel.json` — Vercel config: cleanUrls, trailingSlash false, header rules (CV download-as-attachment; cache for favicon/hero image)
- `README.md` — maintainer notes
- `.gitignore` — ignores `.vercel`
- `.vercel/` — Vercel link metadata (projectId/orgId), not committed
- `favicon.svg` — site icon
- `Porfolio.jpg` — hero portrait (used), `Porfolio.png` — master source of portrait
- `Erick_Pradhan.pdf` — CV (linked + download in CV section)
- `IoT Smart Agriculture System.pdf` — present, NOT yet linked
- `Diwali Sales Data Analysis.pdf` — present, NOT yet linked
- Unused/legacy: `PortfolioImg.png`, `PortfolioImg1.png`, `audit-desktop.png`, `audit-desktop-final.png` (not referenced by index.html)

No `src/`, `components/`, `public/`, `assets/`, or build directories exist. All assets are flat in the project root.

## 4. Application Structure

Single page; all sections inline in `index.html`.

| Section | index.html lines | Element |
|---|---|---|
| Skip link | 31 | `.skip-link` |
| Background canvas | 32 | `#network` (neural network animation) |
| Scanlines / cursor glow | 33–34 | `.scanlines`, `.cursor-glow` |
| Navbar | 36–47 | `.nav` (brand, `#desktopNav`, "Ask AI" button, hamburger) |
| Hero | 50–76 | `.hero` (name, tagline, CTAs, portrait, scroll cue) |
| Ticker | 78–91 | `.ticker` marquee |
| Work / Projects | 93–132 | `#work` → `.projects` (2 hardcoded cards) |
| About | 134–144 | `#about` (`about-statement`, `about-copy`, facts) |
| Skills | 146–159 | `#skills` (skill-wall clusters + skill-meter bars) |
| Journey / Timeline | 161–168 | `.timeline` (education, experience, certifications) |
| AI Lab | 170–186 | `#lab` (terminal-styled console with lab-grid) |
| CV | 188–193 | `.cv-card` + Download CV link |
| Contact | 195–206 | `#contact` (email, GitHub, LinkedIn, YouTube) |
| AI Assistant | 209–215 | `.assistant-fab`, `#assistant` dialog |
| Footer | 217 | three-line footer |

Navbar links: Work (`#work`), About (`#about`), Skills (`#skills`), AI Lab (`#lab`), Contact (`#contact`). Active section highlighted via scroll spy.

## 5. Important Components

No component system exists. Notable inline "components" and behaviors:

- Navbar: `index.html:36-47`. Fixed, blur backdrop, mobile hamburger with `mobile-open` class toggle.
- Project cards: `index.html:99-129`. `<article class="project-card tilt reveal">`, inline hardcoded; see section 6.
- News ticker: `index.html:78-91`. Duplicate `.ticker-group` blocks, `marquee` 60s infinite CSS animation.
- AI assistant: `index.html:209-215` + `script.js:33-53`. Rule-based regex Q&A over a static `answers` array; FAB/nav open; Escape closes; Tab focus trap; "matrix" Easter egg swaps `--blue` to green for 3s.
- Hero portrait: `index.html:66-74` + `styles.css:43-122`. Clipped frame (`clip-path` polygon), dark blue-tint gradient overlays, hover static (no tilt).
- CV card: `index.html:188-193`. "Download CV" uses `<a href="Erick_Pradhan.pdf" download>`.

## 6. Projects / Work Section

- Project data source: **hardcoded HTML inside `index.html`** — no data file, no render loop, no props.
- Project card component: inline `<article class="project-card tilt reveal">` (2 instances).
- Card structure (both identical):
  1. `.project-top` — series number + status (e.g. `01 / IOT` · `FIELD SYSTEM`)
  2. `.project-visual` — **pure CSS illustration** (no images):
     - `.agriculture`: `.plant`, `.soil`, `.sensor.s1/.s2` (MOIST/TEMP), `.signal` (animated)
     - `.sales`: `.bars i` ×7 (animated heights), `.chart-line` (dead div, has NO CSS rule), `.chart-labels` (JAN…SEP)
  3. `.project-body` — `.tag` (category), `h2` (title), `p` (description, `text-align: justify`), `.techs span` (chips), `.project-links`
- Categories: via `.tag` (e.g. `IoT · SMART AGRICULTURE`, `DATA ANALYSIS · PYTHON`).
- Technology tags: `.techs span` chips.
- Hover: CSS `translateY(-7px)` + border-color blue + shadow; JS 3D tilt via `.tilt` class (disabled under 900px and under `prefers-reduced-motion`).
- Reveal animation: `.reveal` + IntersectionObserver threshold 0.12.
- Responsive: `.projects` grid `1fr 1fr` → `1fr` at ≤900px; `.project-visual` 330px → 260px at ≤560px.

## 7. Current Projects

### IoT Smart Agriculture (card at index.html:99-113)
- Category: `IoT · SMART AGRICULTURE`
- Description: IoT-based smart agriculture system using Raspberry Pi and Arduino Uno to monitor soil moisture and environmental conditions in real time; sensor data collection, monitoring dashboard, automated irrigation.
- Technologies: Python, Arduino Uno, Raspberry Pi, IoT
- Repository: `https://github.com/ErickPradhan/Iot-Smart-Agricultural-System`
- Project/PDF link: `IoT%20Smart%20Agriculture%20System.pdf` (new tab via `View Project <span>↗</span>`)
- Visualization: CSS `.agriculture` scene with animated signal

### Diwali Sales Data Analysis (card at index.html:115-129)
- Category: `DATA ANALYSIS · PYTHON`
- Description: End-to-end exploratory analysis of Diwali sales data — customer behaviour, demographic trends, product preferences, regional patterns; cleaning, feature engineering, statistical testing, visualisations.
- Technologies: Python, Pandas, NumPy, Matplotlib, SciPy
- Repository: `https://github.com/ErickPradhan/DiwaliSales-DataAnalysis`
- Project/PDF link: `Diwali%20Sales%20Data%20Analysis.pdf` (new tab via `View Project <span>↗</span>`)
- Visualization: CSS `.sales` bar chart with animated bars

## 8. Assets

- Images: `Porfolio.jpg` (hero, used), `Porfolio.png` (master), `PortfolioImg.png`, `PortfolioImg1.png`, `audit-desktop.png`, `audit-desktop-final.png` (unused legacy)
- Fonts: Google Fonts (Inter, Space Grotesk) — no local font files
- PDFs (all in project root, all publicly served by Vercel):
  - `Erick_Pradhan.pdf` — linked (download)
  - `IoT Smart Agriculture System.pdf` — present, linked to its card's "View Project" button
  - `Diwali Sales Data Analysis.pdf` — present, linked to its card's "View Project" button
- Static serving: Vercel serves project root; files have root-relative URLs (e.g. `/Erick_Pradhan.pdf`).

## 9. Routing and Links

- Internal: anchor links only (`href="#section"`), smooth scroll via CSS `scroll-behavior: smooth`; no routing library, no SPA routes.
- External (all `target="_blank" rel="noopener noreferrer"`): GitHub, LinkedIn, YouTube, both repository links.
- GitHub project links: "View Repository ↗" in each card — external, new tab.
- PDF links: CV (`Erick_Pradhan.pdf`, `download` attribute) and both project "View Project" links — `IoT%20Smart%20Agriculture%20System.pdf`, `Diwali%20Sales%20Data%20Analysis.pdf`, each `target="_blank" rel="noopener noreferrer"` new-tab.
- Vercel config: `cleanUrls: true`, `trailingSlash: false`; no rewrites/redirects that would block static files.
- Header rules in vercel.json:
  - `/Erick_Pradhan.pdf` → `Content-Disposition: attachment` (forces download)
  - `/(favicon.svg|Porfolio.jpg)` → cache immutable 7 days
  - The two project PDFs have NO header rule → Vercel serves them inline (browser PDF viewer), supporting new-tab open.

## 10. Design System (verified)

Design tokens (`styles.css:1`): `--bg:#05070a`, `--panel:#0a0e13`, `--panel2:#0d1219`, `--text:#f4f7fb`, `--muted:#8793a3`, `--line:rgba(255,255,255,.09)`, `--blue:#2e9bff`, `--blue2:#74c2ff`, `--glow:rgba(46,155,255,.2)`, `--max:1240px`.

- Backgrounds: near-black `#05070a`; panels `#0a0e13`/`#0d1219`; card gradient `linear-gradient(145deg, rgba(255,255,255,.035), rgba(255,255,255,.012))`.
- Accents: blue `#2e9bff` / light blue `#74c2ff`; glows via `box-shadow: 0 0 Npx rgba(46,155,255,…)`.
- Typography: fonts Inter (body) + Space Grotesk (headings/labels); uppercase small-caps labels with 1.5–2px letter-spacing; project card h2 700/27px; hero h1 800 `clamp(76px,11vw,…)`.
- Borders: `1px solid var(--line)`; card visual borders; no border-radius on cards (sharp corners), 5px radius on `.btn`.
- Shadows/glow: primary btn `0 0 30px rgba(46,155,255,.18)`; card hover `0 20px 60px rgba(0,0,0,.35)`; portrait `0 0 70px rgba(46,155,255,.16)`.
- Buttons: `.btn` (ghost) and `.btn.primary` (blue bg, `#00111f` text); hover `translateY(-3px)` + shadow.
- Layout: `.section` max-width 1240px, padding 140px 28px (→ 100px 20px ≤900px).
- Responsive breakpoints: 900px (nav→menu, single-column grids, hero portrait absolute) and 560px (single columns, font-scale downs).

## 11. Interaction System

- Card 3D tilt: JS pointermove `perspective(900px) rotateX/rotateY + translateY(-7px)`, reset on pointerleave; disabled <900px width and when `prefers-reduced-motion` (`script.js:24`).
- Card hover: CSS border-color → blue, `translateY(-7px)`, deep shadow.
- "View Project" link (`.project-links a.view-project`, both cards): explicit visible baseline `display:inline-block; color:#c4ccd5;` with 0.25s color/text-shadow/transform transitions; hover brightens to `var(--blue2)` with blue glow `text-shadow: 0 0 14px rgba(46,155,255,.35)`; arrow `<span>` nudges `translateX(4px)`. Repository links retain their original plain hover (color → blue).
- Magnetic buttons: `.magnetic` pointermove translate (~0.12 factor) (`script.js:24`).
- Scroll reveal: `.reveal` opacity/translateY 0.8s; IntersectionObserver adds `.visible`; reduced-motion adds visible immediately.
- Cursor glow: fixed 300px radial `.cursor-glow` follows pointer (`script.js:22`).
- Neural background: `#network` canvas, ~55 nodes, links <145px opacity fade, rAF loop, lowered opacity 0.32 (`script.js:5-9`).
- Scanlines overlay: fixed repeating-gradient 4px.
- Ticker marquee: `@keyframes marquee` translateX -50%, 60s infinite, duplicated groups.
- Visual animations: `@keyframes signal` (agriculture sensor pulse), `@keyframes bars` (sales chart), `.pulse` dot, `.blink` cursor.
- Mobile menu: hamburger toggles `mobile-open`; resets ≥900px; Escape closes.
- Accessibility: `prefers-reduced-motion: reduce` disables all animations/transitions (CSS override at `styles.css:33-40`); skip-link; focus-visible outlines; ARIA labels on menu/assistant.

## 12. Important Existing Functionality (preserve)

- Fixed navbar with scroll-spy active states and smooth scroll.
- All present animations (ticker, signal, bars, tilt, magnetic, reveal, cursor glow, neural canvas).
- Hero portrait with clipped blue-tinted frame (mobile back-layer behavior).
- Project cards, both GitHub "View Repository" links (new tab), and both "View Project" PDF links (new tab).
- AI assistant dialog: open/close, focus trap, Escape, rule-based answers.
- CV download with Vercel attachment header.
- Responsive layouts at 900px / 560px breakpoints.
- Reduced-motion handling throughout.
- "matrix" keyboard Easter egg.
- `vercel.json` header rules and cleanUrls.

## 13. Recent Changes

- 2026-09-21 — Confirmed root cause of "View Project links not visible": the LIVE Vercel deployment is STALE. `https://erick-pradhan-ai-portfolio.vercel.app` served the pre-change index.html (15,549 bytes; "View Project" NOT present; "View Repository" ×2 present), while the current local source (16,826 bytes) contains and RENDERS both links. A real-browser (headless Edge) computed-style check of both `.view-project` anchors returned `display:block, visibility:visible, opacity:1, color:rgb(196,204,213)`, `width:83px height:13px`, parent `display:flex`, overflow visible — i.e., visibly rendered. No code fix was required; the live site must be redeployed to serve the current files. No Vercel auth token exists on this machine, so deployment could not be performed here.
- 2026-09-21 — Added "View Project ↗" PDF links to both project cards:
  - `index.html:111` and `index.html:127` — new `<a class="view-project">` per card pointing at the existing project PDFs (`IoT%20Smart%20Agriculture%20System.pdf`, `Diwali%20Sales%20Data%20Analysis.pdf`) with `target="_blank" rel="noopener noreferrer"`; arrow wrapped in `<span>` for the hover nudge; "View Repository ↗" links left unchanged.
  - `styles.css` (end of file) — scoped `.project-links a.view-project` rules: explicit visible baseline, smooth 0.25s transitions, hover brightens to `var(--blue2)` with blue glow, arrow moves right 4px.
  - Result: both PDFs open in a new tab from their cards.
- Initial audit + creation of PROJECT_STATE.md (this file). No source files modified.

## 14. Verification

Latest:
- Build: NOT RUN (no build system)
- Lint: NOT RUN (no lint config)
- Tests: NOT RUN (no test framework)
- Actually performed on 2026-09-21 (after View Project fix):
  - Local HTTP server (Python, `127.0.0.1:8899`): `index.html` → 200 and serves both `<a class="view-project">` anchors with correct `%20` PDF hrefs; `IoT%20Smart%20Agriculture%20System.pdf` → 200 `application/pdf`; `Diwali%20Sales%20Data%20Analysis.pdf` → 200 `application/pdf`; `styles.css` → 200 `text/css`.
  - Headless Edge render (`--headless=new --dump-dom`, virtual time): rendered DOM contains 2 `view-project` anchors + 4 total link texts ("View Project" ×2, "View Repository" ×2).
  - Headless Edge computed-style check (throwaway copy, diagnostic script injected): both `.view-project` links report `visibility:visible`, `opacity:1`, `color:rgb(196,204,213)` (#c4ccd5), non-zero box (83×13px), parent `flex` with `overflow:visible` → verifiably rendered on screen by a real browser engine.
  - CSS cascade audit: no `display:none`, `opacity:0`, `visibility:hidden`, or `pointer-events:none` rule matches `.project-links`/`.view-project`; base color `#c4ccd5` applies; CSS braces balanced (234/234).
  - Live-site check: `https://erick-pradhan-ai-portfolio.vercel.app` → HTTP 200 but serves STALE index.html (15,549 bytes, no "View Project") → deployment is outdated, this is why the links are not on the live page yet.
  - NOT performed: pixel-level screenshot inspection (this model cannot read images); interactive click simulation.

## 15. Known Issues

- `.chart-line` element in the sales visual (`index.html:119`) has no CSS rule (dead empty div) — cosmetic only, not visible.
- Some unused legacy assets remain in root (`PortfolioImg*.png`, `audit-*.png`).
- LIVE DEPLOYMENT IS STALE: `https://erick-pradhan-ai-portfolio.vercel.app` does not yet include the "View Project" links. Local source is correct and browser-renders them; the site needs to be redeployed (Vercel dashboard or `vercel --prod`).
- No git repository initialized.

## 16. Planned Changes

- None outstanding. The previously planned "View Project" PDF links for both project cards are now implemented. No other changes requested.

## 17. Source-of-Truth Files

- `index.html` — all sections, project cards, links, assistant markup
- `styles.css` — design system, cards, keyframes, responsive
- `script.js` — all interactions and AI assistant logic
- `vercel.json` — hosting config and header rules
- `README.md` — maintainer notes
- This file (`PROJECT_STATE.md`) — persistent AI handoff snapshot