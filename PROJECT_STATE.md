# PROJECT_STATE.md — Erick Pradhan Portfolio (source of truth)

Updated: 2026-09-22

## What this project is

A single-page static portfolio for Erick Pradhan, positioned as an AI/ML Engineer and BSc (Hons) Computing with Artificial Intelligence student. Dark, futuristic, AI/engineering aesthetic. Plain HTML + CSS + vanilla JavaScript — no framework, no package manager, no build step, no backend.

Live domain: **https://erickpradhan.com.np**

## Current architecture

- `index.html` — complete page markup and all section content (single page, anchor navigation).
- `styles.css` — full design system, layout, responsive rules, animations.
- `script.js` — all interactions (network background canvas, scroll reveal, nav scroll-spy, mobile menu, magnetic/tilt effects, rule-based assistant, command palette, local AI Lab terminal, "matrix" easter egg).
- Static assets served from `assets/` by relative path.
- No routing, no components, no build, no server, no API calls (except nothing — the assistant is fully local).

## Hosting & domain

- **Host:** GitHub Pages, serving the repository root as a static site.
- **DNS:** Cloudflare, custom domain `erickpradhan.com.np` mapped to the Pages site.
- Repository: `ErickPradhan/My-Portfolio` (branch `main`).
- `CNAME` at repo root contains the apex domain `erickpradhan.com.np` (required by GitHub Pages for custom-domain serving).
- **Vercel is no longer used for hosting.** The obsolete `vercel.json` and the `.vercel/` metadata folders were removed in this update, and all canonical/Open Graph URLs point to the apex domain. No `vercel.app` / `vercel.com` URLs exist anywhere in the site code.

## File/folder map

Project root: `erick-pradhan-ai-portfolio/` inside the working copy.

```
index.html
styles.css
script.js
README.md
PROJECT_STATE.md        (this file)
CNAME                   github pages custom domain (erickpradhan.com.np)
robots.txt              crawl rules -> apex sitemap
sitemap.xml             single-URL sitemap -> https://erickpradhan.com.np/
.gitignore              minimal (ignores .vercel, node_modules, .DS_Store)
assets/
  images/
    Porfolio.jpg        hero portrait (1080x1440, ~187 KB), src + og:image
    favicon.svg         site favicon
  documents/
    Erick_Pradhan.pdf   CV (linked as Download CV)
    IoT Based Smart Irrigation System.pdf   project document
    Diwali Sales Data Analysis.pdf     project document
  reference/
    Porfolio.png        master portrait source image (not referenced)
    PortfolioImg.png    legacy/duplicate image (not referenced)
    PortfolioImg1.png   legacy/duplicate image (not referenced)
    audit-desktop.png   old audit screenshot (not referenced)
    audit-desktop-final.png  old audit screenshot (not referenced)
```

Notable absences (intentional): no `src/`, no `public/`, no `components/`, no `package.json`, no `node_modules`, no `.env`, no `vercel.json`, no `.vercel/`.

## Section inventory (index.html)

1. Header / nav (`#main-content`, `#work`, `#about`, `#skills`, `#lab`, `#contact`) + "Ask Erick" button + mobile menu.
2. Hero — portrait, name (`Erick Pradhan`), positioning line, two CTAs (Explore Work→#work, Connect→#contact), eyebrow "AI / ML ENGINEER · OPEN TO INTERNSHIPS", plus a "COMMANDS Ctrl+K" shortcut button and a small static status line. Portrait quote is Linus Torvalds: "Talk is cheap. Show me the code."
3. Ticker marquee — AI/ML/software/cloud/data/IoT phrase loop.
4. Process — "HOW I BUILD" three cards (problem-first thinking, AI and data, systems that work).
5. Work/projects — `SELECTED SYSTEMS`, two project cards (see below).
6. About — BSc at Islington College (London Met affiliate), build-first/learn-deep/ship-clean facts.
7. Skills — 4 clusters + self-assessed meter.
8. Timeline/journey — education, tutor experience, AWS Academy certifications.
9. AI Lab — interactive terminal: decorative top region (research slots explicitly labeled EXPLORING / QUEUED — prototypes, not products) + real input form running local predefined commands (see V2-A below).
10. CV — download card linking `assets/documents/Erick_Pradhan.pdf`.
11. Contact — email / GitHub / LinkedIn / YouTube external links.
12. Assistant panel — "PORTFOLIO ASSISTANT" dialog.
13. Command palette overlay — `#paletteOverlay` dialog (Ctrl/Cmd+K), sits between the assistant panel and the footer in markup.
14. Footer.

## Project cards & shown-work behavior

Two cards, hardcoded in HTML (not data-driven). Each card has: a CSS illustration visual, tag, title, 2-line summary, 3 bullet points, technology chips, an expandable `<details>` block ("Implementation & verification" / "Implementation & results"), and two links (Project document PDF + View Repository, both `target="_blank" rel="noopener noreferrer"`).

**Project 1 — IoT Smart Agriculture** (`assets/documents/IoT Based Smart Irrigation System.pdf`, repo `ErickPradhan/Iot-Smart-Agricultural-System`)
- Problem: manual irrigation wastes water; no real-time field visibility.
- Built: ESP32 firmware in Arduino IDE; DHT11, HC-SR04 ultrasonic, soil moisture sensor, I2C LCD, buzzer, 5V relay + mini water pump; Blynk for remote monitoring/alerts.
- Verification (from report): six hardware tests all passed; auto-irrigation on dry soil; buzzer alerts; Blynk low-water notification.
- Tech chips: ESP32, Arduino IDE, DHT11, HC-SR04, Soil Moisture, Blynk, IoT.
- Note: the project report uses an ESP32; the CV's older "Raspberry Pi / Arduino Uno" phrasing is kept in the CV but the card intentionally reflects the report document.

**Project 2 — Diwali Sales Data Analysis** (`assets/documents/Diwali Sales Data Analysis.pdf`, repo `ErickPradhan/DiwaliSales-DataAnalysis`)
- Dataset: 11,251 records × 15 attributes (per report).
- Built: pandas cleaning (dropna, de-dup, drop irrelevant cols), feature engineering (ordered age groups, purchase-value tiers), correlation/skewness/kurtosis, suite of visualisations.
- Key results (documented in report): ANOVA occupation vs amount F=2.477, p=0.00166; Chi-square category vs zone χ²=1634.97, p≈1.45×10⁻²⁹⁶, df=68. Insights: female-led spending, adult age group highest spend, top states UP/Maharashtra/Karnataka, top categories clothing/food/electronics.
- Tech chips: Python, Pandas, NumPy, Matplotlib, SciPy, Jupyter Notebook.

No third project is shown because no other finished, documented project exists in the repository. Do not add one without real evidence.

## AI assistant behavior ("Ask Erick")

- Implemented in `script.js` as a local rule-based engine: an `answers` array of `[regex, reply]` pairs, matched against lowercased input.
- No external API, no LLM, no backend, no network call. This is intentional and must stay true.
- UI: floating FAB "Ask Erick" (`#assistantFab`) and nav button (`#openAssistant`), both `aria-haspopup="dialog" aria-controls="assistant"`. Dialog header reads "PORTFOLIO ASSISTANT". Intro message and a footer note ("Rule-based page helper · not connected to an external AI service.") make the scope explicit.
- Behaviors: open/close, keyboard focus trap (Tab cycling), Escape closes, `aria-hidden` toggling, focus return to trigger element, three suggested prompts, 250 ms simulated reply delay.
- The assistant answers remain consistent with the portfolio claims (facts sourced from the CV/report documents).

## Design system & interactions

- Tokens: `--bg:#05070a`, `--panel`, `--panel2`, `--text`, `--muted`, `--line`, `--blue:#2e9bff`, `--blue2`, `--glow`, `--max:1240px`.
- Fonts: Space Grotesk (display) + Inter (body) via Google Fonts, async `media="print" onload` swap with `<noscript>` fallback.
- Interactions: canvas neural background (~55 nodes), reveal-on-scroll (IntersectionObserver), scroll-spy nav highlighting, magnetic buttons, 3D tilt on cards, ticker marquee, cursor glow, asset link glow, matrix easter egg, "signal"/"bars" decorative animations.
- Reduced motion: all of the above respect `prefers-reduced-motion` (canvas stops rAF loop, reveals un-hide, CSS animations neutralized).
- Project detail expansion uses native `<details>/<summary>` — keyboard accessible, no JS.
- Accessibility: skip link, focus-visible outlines (incl. `summary`), `aria-*` on menu/assistant buttons, semantic headings, `aria-live="polite"` chat, alt text on portrait, `aria-hidden` on ticker duplicates and canvas.

## SEO / metadata state

- Title: "Erick Pradhan — AI/ML Engineer".
- meta description, author, robots `index, follow`.
- Canonical: `https://erickpradhan.com.np/`.
- og:title/description/url/image, twitter:card/title/description/image — all point to the apex domain; og:image and twitter:image are `https://erickpradhan.com.np/assets/images/Porfolio.jpg`.
- Favicon: `assets/images/favicon.svg` (absolute-URL safe relative link).
- JSON-LD `Person` (schema.org): name, url, image, jobTitle, email, sameAs (GitHub, LinkedIn, YouTube).
- robots.txt: allow all + sitemap `https://erickpradhan.com.np/sitemap.xml`.
- sitemap.xml: single URL `https://erickpradhan.com.np/`.
- No `www.` URLs anywhere in site code. Theme color `#05070a`.

## Recent changes (this update)

- Restored `CNAME` (apex) — the file is required by GitHub Pages for the custom domain; it had been deleted in the previous Vercel-era cleanup.
- Removed obsolete Vercel artifacts: `vercel.json` and `.vercel/` (deployment metadata). `.gitignore` reduced to a minimal set.
- Reorganized assets into `assets/images`, `assets/documents`, `assets/reference`; updated all references in `index.html` and metadata.
- Changed canonical domain usage from `www.erickpradhan.com.np` to apex `erickpradhan.com.np` across canonical/og/twitter/robots/sitemap/JSON-LD.
- Strengthened both project cards: precise, document-verified summaries, clearer bullet points, matching tech chips, and an expandable Problem → What was built → Verification / Key results block. IoT card techs now reflect the report (ESP32/Arduino IDE/sensors/Blynk) instead of the older CV phrasing.
- Replaced the "That's what she said!" (Michael Scott) quote with a professional, engineering-flavored attributed quote (Linus Torvalds, "Talk is cheap. Show me the code.").
- Skills: added `HTML / CSS` (CV-supported) to the engineering cluster; skill meter converted to named self-assessed levels with an explicit "self-assessed / not benchmarked" caption instead of inline percentage marks.
- Repositioned the assistant: renamed to "PORTFOLIO ASSISTANT" / "Ask Erick", honest intro + footer note clarifying it is a rule-based page helper with no external AI; added `aria-haspopup`/`aria-controls` and `type="button"` on suggestions.
- CSS: styled the previously-unstyled `.chart-line` element, added `<details>` panel styles and `summary:focus-visible`, added `.assistant-note`, slightly bumped project-body text size for readability.
- Added `url` + `image` to the JSON-LD Person schema.
- Updated `README.md`.

## Second targeted pass (2026-09-22) — after independent OpenAI code review

Scope was strictly targeted: no redesign, no framework/permission changes, no new dependencies, no Vercel, no DNS/GitHub Pages changes, no content invention.

### Exact changes this pass

- **index.html**
  - `<html>` now starts with `class="no-js"` and an inline 1-line script swaps it to `js` before first paint. This is the progressive-enhancement hook.
  - `#openAssistant` and `#assistantFab` gained `aria-expanded="false"` (mirrors the `aria-haspopup`/`aria-controls` already present); the fiction is updated in JS on open/close.
  - IoT verification wording softened to match the report exactly: "six build-and-verification phases — sensor readings, LCD output, relay-driven pump switching, and a Blynk low-water notification all functioned as intended (the report notes the ESP32 occasionally needed a reboot during extended testing)." Previously it said "six hardware tests all passed", which the report does not literally support (the six items are wiring/build phases, and the report mentions intermittent reboots).
  - AI Lab terminal line changed from "→ 4 active research slots detected" to "→ 4 research slots in progress" so it no longer reads as measured runtime telemetry.
- **styles.css**
  - Reveal-on-scroll hiding is now gated on `html.js .reveal{…}` / `html.js .reveal.visible{…}`; the default `.reveal{opacity:1;transform:none}` keeps all content readable when JS is disabled or fails. Animations are unchanged when JS works.
  - Modest readability bumps for the smallest text (design unchanged): skill-meter labels 8→10px, lab-grid phase tags 8→10px, suggestions buttons 9→10px, timeline dates 9→10px, portrait-quote cite 9→10px, `summary` label 10→11px, detail-block headers 9→10px, assistant note 9→10px, meter note 10→11px.
- **script.js**
  - Mobile menu: opening focuses the first nav link (`preventScroll`); closing after a link choice does not yank focus; Escape returns focus to the menu button when focus is still inside the menu. UX and markup untouched otherwise.
  - Assistant: `openAI`/`closeAI` now toggle `aria-expanded` on both triggers and bump an internal `assistantEpoch`; the 250 ms delayed reply is discarded if the epoch changed (assistant closed/reopened) or the panel is no longer open — stale responses can no longer be inserted after close/reset.
  - Escape handler now routes mobile-menu close through `closeMobileMenu(true)` for focus return.
- **No CV/PDF edits.** All three PDFs are byte-for-byte untouched (verified via git and re-hashed from the previous state's copies in Git).

### CV inconsistency — status & evidence

The CV (`assets/documents/Erick_Pradhan.pdf`) "ACADEMIC PROJECTS → IoT Smart Agriculture" says it was built "using **Raspberry Pi and Arduino Uno**" with "a monitoring dashboard". The authoritative project report (`assets/documents/IoT Based Smart Irrigation System.pdf`, 16 pages) documents **ESP32** written in the **Arduino IDE**, wired to **DHT11, HC-SR04, soil moisture sensor, I2C LCD, buzzer, 5V relay + mini water pump**, monitored via **Blynk** — and contains **zero** occurrences of "Raspberry Pi" (extracted text verified programmatically with pypdf).

The CV was NOT modified this pass. The portfolio reflects the report (ESP32-based), which is the correct, primary-documented version. Correcting the CV is a PDF-content edit that should be done deliberately by the owner (or a later approved pass), not silently by the site migration. The only honest hint on the site is the general skills list, which lists "Raspberry Pi" and "Arduino Uno" as hardware skills (also present in the CV) — that is not a project claim and was left as-is.

### Deployment-ready status (2nd pass)

- Structure unchanged: single-page static at repo root, assets under `assets/images`, `assets/documents`, `assets/reference`.
- All local `href`/`src` references point to files that exist on disk in this repository.
- No Vercel artifacts in the repo; canonical/OG/robots/sitemap all use the apex `erickpradhan.com.np`.
- The working tree contains the intended move of production files into `assets/` plus new `robots.txt`/`sitemap.xml`. These still need `git add`; nothing must be committed with the old-root deletions replayed as losses. **Do not `git add -A` blindly and push** — the move must be committed as a rename/inclusion so the new files land in the repo.
- `assets/reference/` is intentionally non-production reference material — keep it for now (see remaining issues).

## Verification — 1st pass (2026-09-22)

Done after the first migration edits:

- `node --check script.js` — JS syntax OK (verified by command, Node installed).
- HTML parsed with a python `HTMLParser` — no unclosed/mismatched tags (verified by command).
- JSON-LD block parses as valid JSON (verified by command).
- All local `href`/`src` assets exist on disk after the move (verified by command): favicon, Porfolio.jpg, both project PDFs, CV PDF, styles.css, script.js.
- All internal anchors resolve to existing `id`s (verified by command).
- CSS braces balanced (verified by command).
- `canonical`, `og:url`, `og:image`, `twitter:image` all = valid apex-domain URLs; zero `www.` references in `index.html` (verified by command).
- `robots.txt` and `CNAME` contain the exact apex entries; sitemap `<loc>` is `https://erickpradhan.com.np/` (verified by command).
- No `vercel`/`vercel.app`/`vercel.com` references remain in site code; the only remaining string is the protective `.vercel` line in `.gitignore` and this historical note (verified by grep).
- External links (GitHub repos/profile, LinkedIn, YouTube, mailto, Google Fonts) untouched (verified by inspection).
- Reduced-motion handling unchanged and still present (verified by inspection).
- Still fully static, no framework/build (verified by inspection).

## Verification — 2nd pass (2026-09-22)

Re-ran the full local verification suite after the changes above (all passed by command):

1. `node --check script.js` — JS syntax OK.
2. HTML parsed — no unclosed/mismatched tags; `no-js`/`js` class swap present in markup.
3. JSON-LD `Person` block valid; `url` = `https://erickpradhan.com.np/`.
4. All 7 local `href`/`src` references resolve to existing files (incl. space-named PDFs and `%20`-encoded links).
5. All internal anchors (`#work`, `#about`, `#skills`, `#lab`, `#contact`, `#main-content`) resolve to existing `id`s.
6. CSS braces balanced (266/266); reveal hiding now gated on `html.js` for no-JS readability.
7. `CNAME` = `erickpradhan.com.np`; `robots.txt` points at apex sitemap; `sitemap.xml` well-formed with apex `<loc>`.
8. canonical + og:url = apex; zero `vercel.*` / `vercel.json` / `www.erickpradhan.com.np` in site code (the only `www.` left is the legitimate LinkedIn external URL).
9. Assistant `aria-expanded` present on both triggers and updated from JS; stale delayed replies guarded by an epoch counter.
10. Mobile-menu open focuses first link, Escape returns focus, link click closes without yanking focus (code-inspection verified).
11. Both project GitHub repos (`ErickPradhan/Iot-Smart-Agricultural-System`, `ErickPradhan/DiwaliSales-DataAnalysis`) confirmed public and reachable (fetched live via web).
12. Project statistics cross-checked against the primary documents: Diwali (11,251 rows; ANOVA F=2.477, p=0.00166; χ²=1634.97, p≈1.45×10⁻²⁹⁶; top states UP/Maharashtra/Karnataka; top categories clothing/food/electronics) — all match the report; IoT six-phase verification and ESP32/Arduino IDE/DHT11/HC-SR04/moisture/Blynk hardware list match the report.

Not performed this pass: no real browser runtime testing (no browser available in this environment — no desktop/headless Chrome/Edge/Firefox found), so desktop load, live assistant open/close, mobile menu interaction, PDF link downloads, and external-link clicks were verified by static inspection + code reasoning only, not by live runtime. DNS/HTTPS against the live domain also still requires the deployment to land.

## Remaining known issues

- Card descriptions and expandable content are hardcoded in `index.html` (single-file pattern by design).
- Legacy images kept in `assets/reference/` for safety — could be deleted later once everyone is sure they are unused (confirmed unreferenced by code). They are non-production reference material by design and remain in this pass.
- `Porfolio.png` (2.2 MB) is the master source and is kept in `reference/`; only the ~187 KB JPEG is served.
- CV describes the IoT academic project as "Raspberry Pi and Arduino Uno" with a "monitoring dashboard", which conflicts with the project report's ESP32 / Arduino IDE / DHT11 / HC-SR04 / Blynk implementation (report verified to contain no "Raspberry Pi"). The portfolio is report-accurate; the CV is untouched by design. Updating the CV is a deliberate PDF-content edit for the owner (or a future approved pass) — it should be fixed so documents agree.
- The working tree's current state is a file move into `assets/` plus new `robots.txt`/`sitemap.xml`. It is deployment-ready as a repository state, but the move has NOT been staged/committed. Commit it as an intentional inclusion of the moved/new files (do not let the old-root deletions be replayed as data loss), then push to `main` for GitHub Pages to serve.
- No CI/Lighthouse/HTML validator automation is wired up; no live-browser runtime test was possible in this environment.

## Future recommendations

1. Stage the move deliberately (`git add` the `assets/` tree, `robots.txt`, `sitemap.xml`, and the modified `index.html`/`styles.css`/`script.js`/`PROJECT_STATE.md`/`README.md`), commit, then push to `main` — GitHub Pages + Cloudflare DNS are already the intended architecture; verify the deployed apex URL resolves after it lands.
2. Update the CV's IoT academic-project entry to the report-accurate hardware (ESP32 / Arduino IDE / DHT11 / HC-SR04 / Blynk) so the CV and report agree. Owner-approved PDF edit.
3. Optionally delete `assets/reference/*` after confirming Git history retains the removed duplicates.
4. Add a third project card only with real documented evidence (repo + PDF).
5. Keep the assistant rule-based, or in a future iteration link it to a real service — never make it look like an LLM while it is not one.

## V2-A targeted bug-fix pass (2026-09-22)

Scope: only the two release-blocking command-palette bugs found by independent review, plus the optional terminal-output cap. No redesign, no new features, no dependency changes, no CV/PDF edits, no Vercel, no architecture/DNS changes. Files touched: `script.js` (all fixes), `PROJECT_STATE.md`, `README.md` (already documented V2-A in the prior pass).

### Bug 1 — palette typeahead read the wrong dataset key (fixed)

- **Bug:** `filterPalette()` called `li.dataset.search`, but `data-search` lives on the command **button** inside each `<li>` (`<button data-action=… data-search=…>`). `li.dataset.search` is `undefined`, so any non-empty query threw `TypeError: Cannot read properties of undefined (reading 'includes')` and broke filtering. (Empty query short-circuited via `!q`, so the palette only appeared to work when not typing.)
- **Fix:** `filterPalette()` now reads `(btn.dataset.search || "").includes(q)` — the correct element and safely guarded. Command list, aliases, and markup unchanged.

### Bug 2 — palette allowed Tab to escape the modal (fixed)

- **Bug:** the palette has `role="dialog" aria-modal="true"` but no focus trap; pressing Tab on `#paletteInput` moved focus out of the overlay onto the page behind it.
- **Fix:** added a lightweight keydown trap on `#paletteOverlay` (no library): it collects the palette's tabbable controls (`button,input` excluding `tabindex="-1"` command buttons), cycles Tab/Shift+Tab with wraparound, never advances past the overlay, and pulls focus back inside if it is ever outside or on a `tabindex="-1"` row. The command rows remain non-tab-stops (arrow keys select them), preserving the single-tab-stop combobox pattern.

### Optional — terminal output cap (implemented)

- Terminal output was unbounded (one echo + one result per command). Added `termTrim()` capping retained nodes at 60 (oldest removed first), called after echo and after result. History array (in-memory) untouched; `clear` still clears fully; visible UX unchanged.

### Verification (this pass)

1. `node --check script.js` — JS syntax OK.
2. Existing project verification script — **PASS** (HTML balance, JSON-LD, anchors, 7 local refs, CSS braces, no-js gate, CNAME, robots, sitemap, canonical/og:url apex, no Vercel/www in site code, aria-expanded, menu focus, assistant epoch guard).
3. Palette logic harness (Node, no browser): 8 commands parse from markup; empty query restores all; `work`/`proj`/`ask`/`resume`/`skill` aliases each filter to the correct single command; no-match → 0 visible; **no TypeError on non-empty queries**; source now uses `btn.dataset.search`.
4. Focus-trap simulation (Node): Tab from close→input, input→close (wrap); Shift+Tab input→close, close→input (wrap); stray/focused-`tabindex="-1"` row and outside-palette focus both pulled back inside — focus can never escape.
5. Regression checks by inspection: Ctrl/Cmd+K toggle intact; Escape priority palette→assistant→mobile-menu intact; palette-input Escape still `stopPropagation`; `closePalette()` still restores focus to `paletteOpener`; assistant Tab trap unchanged; mobile-menu focus return unchanged; terminal submit/history/clear logic unchanged (only the trim added).
6. No browser runtime testing possible in this environment (no browser installed) — actual in-browser Tab/keyboard/Run behaviors were validated by logic simulation and static reasoning, not live runtime. Recommend a quick manual browser check after deploy.

### Status

- Command list unchanged. `index.html`/`styles.css` untouched by this pass (all fixes are in `script.js`).
- Not committed/pushed; working tree contains prior V2-A work plus these fixes.
- V2-A is now **ready to commit** once the owner is satisfied (still uncommitted by design per instructions).

## V2-A final command-palette fix pass (2026-09-22)

Scope: two tiny palette fixes only (per independent review). No redesign, no features, no dependency/architecture/DNS/CV changes. File touched: `script.js` (2 changes). Nothing committed/pushed.

### Fix A — focus escape recovery (focusin containment)

- **Bug:** the palette's Tab trap handled Tab/Shift+Tab traversal, but if focus landed on an element outside `#paletteOverlay` (e.g. clicking `.brand`, programmatic focus), it could remain outside the `aria-modal` dialog.
- **Fix:** added a lightweight document-level `focusin` handler (no library): while the palette is open, any focus entering an element outside `#paletteOverlay` is immediately moved back to `#paletteInput` (the palette's intended focus target). The existing Tab/Shift+Tab keydown trap is kept for correct wraparound; Tab never leaves the dialog, and the `focusin` net is the recovery mechanism for anything that still lands outside. The `focusin` handler is inert when the palette is closed, so `closePalette()` restoring focus to `paletteOpener` is unaffected. Assistant trap and mobile menu untouched.

### Fix B — clear stale active selection on no match

- **Bug:** with zero visible results, `aria-activedescendant` was cleared, but the previously active hidden command could still keep `.active` and `aria-selected="true"`.
- **Fix:** `setActivePalette()` no-match branch now resets `paletteIndex=0`, removes `.active` from every command, sets `aria-selected="false"` on every command, and empties `aria-activedescendant`. When matches return, `filterPalette()` re-establishes the first visible result as active. ArrowUp/ArrowDown/Enter behavior unchanged; arrows while nothing is visible are self-healing (index resets, nothing selected).

### Verification (this pass)

- `node --check script.js` — JS syntax OK.
- Existing `verify_all.py` — **PASS** (HTML balance, JSON-LD, anchors, 7 local refs, CSS braces, no-js gate, CNAME/robots/sitemap/canonical/og apex, zero Vercel/www in site code, aria-expanded, menu focus, assistant epoch guard).
- Node runtime harness executing the **actual shipped** `setActivePalette`/`filterPalette`/`visiblePaletteItems` and the extracted `focusin` listener via `node:vm` against mock DOMs: typeahead (`""`→all, `work`/`resume` → correct single match, no TypeError); no-match (all hidden, `aria-activedescendant` empty, `.active` cleared from every command, zero `aria-selected="true"`, empty-state shown, index reset 0); matches-return (first command active again); ArrowDown→item2 / ArrowUp→item1; ArrowDown over zero matches self-heals; focus-outside recovery (open + outside → input refocused; inside → left alone; closed → inert).
- Prior-pass regression harness re-run — **PASS** (Tab/Shift+Tab wrap, Ctrl/Cmd+K, Escape priority, focus restore, assistant trap, mobile menu, terminal cap).
- No browser runtime testing possible in this environment (no browser installed) — behaviors validated by real-code execution in a mock DOM plus static reasoning; a quick manual browser smoke test is still recommended after deploy.

### Status

- V2-A (features + all three bug-fix passes) is complete, verified, and uncommitted in the working tree — **ready to commit** when the owner chooses.