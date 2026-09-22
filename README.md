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
4. Update the education, experience, certification, and assistant-answer content when your profile changes.
5. After any content change, update `robots.txt`, `sitemap.xml`, and the canonical/Open Graph `og:image` URL if paths changed.

## Notes on the assistant

The "Ask Erick" panel is a **local rule-based assistant** (a static list of question patterns and answers in `script.js`). It does not call any external AI service or API. Keep it honest when editing: the site note "not connected to an external AI service" should stay true.

No framework or build step is required.