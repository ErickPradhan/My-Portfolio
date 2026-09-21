# Project Overview

This project is a single-page portfolio website for Erick Pradhan, positioned as an AI/ML engineer and computing student. It is implemented as a static, front-end-only site with no framework, package manager, backend, or build pipeline. The experience is intentionally designed as a dark, futuristic portfolio with animated sections, a custom neural background canvas, project cards, and a rule-based AI assistant chat modal.

The site is built to be lightweight, portable, and deployable on Vercel static hosting with no code generation or server runtime. The repository currently contains a small root-level structure with HTML, CSS, JavaScript, PDFs, and image assets only.

# Current Architecture

The application is a single-page portfolio with all primary content embedded in the root-level HTML file rather than split into components or routes. There is no client-side routing system, no React/Vue/etc. codebase, and no backend or API layer.

The architecture follows a classic static HTML/CSS/JS pattern:
- `index.html` contains the complete page structure and UI content.
- `styles.css` contains the full design system, page layout, responsive rules, and animations.
- `script.js` contains all interactive behaviors such as canvas animation, scroll reveal, nav highlighting, mobile menu, magnetic hover effects, and the AI assistant rules engine.
- Static media files such as PDFs and images are served directly from the root and referenced by relative paths.
- Deployment is handled by `vercel.json` and Vercel static hosting configuration.

This is a static portfolio architecture, not a multi-page app or a framework-driven application.

# Technology Stack

Verified items from the codebase:
- HTML5
- CSS3
- Vanilla JavaScript
- Google Fonts (Inter and Space Grotesk)
- Vercel static hosting
- No package.json present
- No npm install dependencies present
- No framework detected (`React`, `Next.js`, `Vue`, `Angular`, etc.)
- No build tool detected (`Vite`, `Webpack`, `Parcel`, etc.)
- No TypeScript configuration detected
- No backend framework detected
- No database or server-side runtime detected

Unverified or not present:
- No authenticated API integration observed in source
- No external AI model integration observed; the assistant is local rule-based JavaScript logic only
- No environment variables file was found in the project root

# File/Folder Map

Project root: `c:\Users\lenovo legion\Downloads\My Porfolio\erick-pradhan-ai-portfolio`

Important files and folders:
- `index.html` — complete page markup and section content
- `styles.css` — all styling, design tokens, responsive rules, animations
- `script.js` — interactions and assistant logic
- `README.md` — project usage and maintenance guidance
- `PROJECT_STATE.md` — current project snapshot / source of truth
- `vercel.json` — Vercel deployment settings and static asset headers
- `.gitignore` — excludes `.vercel` metadata from Git
- `.vercel/project.json` — Vercel project metadata
- `favicon.svg` — site favicon
- `Porfolio.jpg` — portfolio hero image used in the main layout
- `Porfolio.png` — source image for the portrait
- `PortfolioImg.png` — legacy/duplicate image asset
- `PortfolioImg1.png` — legacy/duplicate image asset
- `Erick_Pradhan.pdf` — CV PDF
- `IoT Smart Agriculture System.pdf` — project PDF
- `Diwali Sales Data Analysis.pdf` — project PDF
- `audit-desktop.png` and `audit-desktop-final.png` — likely audit screenshots; not referenced by the app

Notable absence:
- There is no `src/` directory
- There is no `public/` directory
- There is no `components/` directory
- There is no `package.json`
- There is no `node_modules`
- There is no `.env` file or environment config file with secrets

# Important Components

The page is not composed from reusable framework components; instead, it uses distinct sections and repeated inline blocks defined directly in `index.html`.

Important sections in `index.html`:
- Header navigation and brand
- Hero section with portrait and calls to action
- Ticker marquee
- Process section explaining how work is approached
- Work/projects section
- About section
- Skills section
- Journey/timeline section
- AI Lab mock terminal section
- CV section
- Contact section
- AI assistant chat modal
- Footer

Notable behaviors defined in `script.js`:
- Canvas-based animated network background
- Reveal-on-scroll effect using `IntersectionObserver`
- Scroll spy highlighting for nav links
- Mobile navigation toggle
- Magnetic hover effect on buttons
- 3D tilt effect for project cards
- AI assistant open/close + suggestion buttons
- Keyboard focus-management within the assistant dialog
- Easter egg triggered by typing the key sequence "matrix"

# Routes and Navigation

This project uses a single-page structure and anchor-based navigation only.

Internal anchors in `index.html`:
- `#work`
- `#about`
- `#skills`
- `#lab`
- `#contact`

These are linked through the top navigation and appear as smooth-scroll jumps via CSS. There are no route files, no route config, and no router library.

External links include:
- GitHub
- LinkedIn
- YouTube
- Project repositories
- PDF downloads

All external links open in a new tab using `target="_blank"` and `rel="noopener noreferrer"` when present.

# Data Flow

Data flow is minimal and entirely front-end driven:
- Content is directly embedded in `index.html`.
- Styling is static in `styles.css`.
- Interactions are logic-driven in `script.js`.
- The AI assistant does not call an external API; it uses a local `answers` array and regex matching in JavaScript.
- No fetch, axios, GraphQL, or REST calls were found in the inspected source.
- No backend nor database layer is present.
- No state management library is in use.

This means the site is effectively a static content presentation layer with client-side effects only.

# APIs and Integrations

No backend API integration is found in the project source.

Observed integrations:
- Google Fonts CDN for typography
- Vercel static hosting configuration
- External social/profile links
- PDF assets served directly from the root

Not observed:
- No Firebase integration
- No Supabase integration
- No CMS integration
- No analytics SDK
- No payment integration
- No user auth system

The AI assistant is not connected to an LLM or server endpoint; it is a rule-based local helper.

# AI/ML Functionality

The site presents itself as an AI/ML engineer portfolio, but the actual AI functionality present is limited and local.

Verified AI-related behavior:
- A floating “Ask AI”/“Ask Erick AI” assistant appears in the interface.
- It is implemented in `script.js` using a static array of question patterns and matching answers.
- It recognizes user input via regular expressions and responds with prewritten responses.
- It includes a few suggested prompts and a chat UI.

What is not present:
- No model inference runtime
- No OpenAI/Anthropic/Gemini API key usage
- No external AI service call
- No vector database or RAG workflow
- No custom ML model deployment

Therefore this project can be described as “portfolio branding plus a front-end AI assistant mockup,” not a real AI product backend.

# Design System

The overall aesthetic is a dark, futuristic, cyber-tech look.

Design tokens in `styles.css`:
- `--bg`: near-black background
- `--panel`: dark gray panels
- `--text`: light text
- `--muted`: gray text
- `--line`: faint border color
- `--blue` / `--blue2`: primary accent colors
- `--max`: max content width

Observed styling patterns:
- High contrast dark surfaces
- Blue accent glow and neon-like hover states
- Lowercase and uppercase label styling with letter spacing
- Sharp corners with subtle glassmorphism via translucent panels
- Strong typography hierarchy using Space Grotesk and Inter
- Responsive layout based on standard breakpoints and CSS grid/flexbox

# Animations and Interactions

The project uses CSS and JavaScript for light motion layering.

Observed animations:
- Network background canvas animation
- Reveal-on-scroll animations for sections
- Magnetic button movement
- 3D tilt on project cards
- Marquee ticker loop
- Sensor pulse animation in the IoT-themed project visual
- Animated sales chart bars
- Cursor glow following pointer movement
- Focus ring accessibility outlines
- Matrix easter egg color override

Motion behavior is reduced for users who prefer reduced motion via `prefers-reduced-motion` checks.

# Projects/Cards/Links

The portfolio includes two primary project cards in `index.html`.

Project 1: IoT Smart Agriculture
- File reference: `index.html`
- Summary: sensor-driven smart agriculture monitoring with Raspberry Pi and Arduino Uno
- Technologies: Python, Arduino Uno, Raspberry Pi, IoT
- Project PDF: `IoT Smart Agriculture System.pdf`
- Repository: external GitHub link
- Current link pattern: `View Project` and `View Repository`

Project 2: Diwali Sales Data Analysis
- File reference: `index.html`
- Summary: sales analysis with Python-based data cleaning and exploratory analysis
- Technologies: Python, Pandas, NumPy, Matplotlib, SciPy
- Project PDF: `Diwali Sales Data Analysis.pdf`
- Repository: external GitHub link
- Current link pattern: `View Project` and `View Repository`

Important note:
- No project data is abstracted into a JSON file or CMS; the cards are hardcoded directly in the HTML.
- The project visuals are CSS-based illustrations rather than imported asset images.

# Assets

Important asset files at the root:
- `Porfolio.jpg` — primary portrait image used in hero section
- `Porfolio.png` — original portrait source
- `Erick_Pradhan.pdf` — resume/cv
- `IoT Smart Agriculture System.pdf` — IoT project PDF
- `Diwali Sales Data Analysis.pdf` — sales analysis PDF
- `favicon.svg` — site favicon

Legacy or unused-looking assets:
- `PortfolioImg.png`
- `PortfolioImg1.png`
- `audit-desktop.png`
- `audit-desktop-final.png`

These are not clearly referenced in the main page logic and appear to be leftover or support files rather than currently active app assets.

# Dependencies

The project does not include dependency management or package installation steps.

Current dependency state:
- No `package.json`
- No `package-lock.json`
- No `node_modules`
- No npm dependencies
- No framework lockfile

External runtime dependency:
- Google Fonts via HTML `<link>` tags

Other than that, the site runs entirely from static files.

# Implemented Features

Confirmed implemented features:
- Single-page portfolio layout
- Fixed header navigation
- Hero section with portrait and CTAs
- Updated hero copy focused on practical AI/data/software problem solving
- New process section describing the working approach
- Work section with two project cards and clearer factual project summaries
- About section with personal statement
- Skills section with technical stack blocks
- Timeline/education and experience section
- AI Lab mock section
- Contact links section with clearer internship/collaboration positioning
- CV download button
- AI helper modal with suggestions and prewritten answers
- Animated network background
- Scroll reveal effects
- Mobile menu
- Reduced-motion support
- Contact/social links

# In-Progress Features

The codebase shows signs of ongoing experimentation, but not a complete feature pipeline.

Examples of likely in-progress or aspirational items:
- The AI Lab section describes “exploring” capabilities such as LLM/RAG and AI automation.
- These are styled as prototypes, not connected functionality.
- The project cards are present but the content is static and not data-driven.
- The assistant is rule-based instead of model-backed.

These should be treated as “conceptual or prototype-stage representations,” not production-ready AI systems.

# Known Bugs

Confirmed or highly likely issues from static inspection:
- `index.html` contains a `.chart-line` element in the sales visual that has no active CSS rule or styling in the inspected style file. This is harmless but indicates unfinished or dead cosmetic markup.
- The project contains duplicate or legacy asset files (`PortfolioImg.png`, `PortfolioImg1.png`) that are not clearly used, increasing clutter.
- The live Vercel deployment can fall behind the local source, which means the published site may not reflect current changes until redeployed.
- There is no automated validation pipeline or browser test suite for this project.

Unverified items:
- There may be visual polish issues not detectable from static file review alone.
- There may be cross-browser behaviors not yet validated in a browser automation run.

# Technical Debt

The project is intentionally lightweight, but it still has some debt:
- Hardcoded HTML content instead of structured data
- Repeated markup patterns with no component separation
- No automated tests or QA process
- Lack of build tooling and CI/CD validation
- One-off CSS and JS logic rather than modular organization
- Legacy image files left in the root
- Unused or incomplete visual elements
- No production-readiness patterns for API or data handling (because there is no backend)

This is not necessarily a bug, but it does limit maintainability as the portfolio grows.

# Security Notes

The project does not expose obvious secrets.

What was checked:
- No `.env` file found in the workspace root
- No API keys or tokens were found in the inspected files
- No backend secret handling was detected
- No server-side credential logic was found

Security considerations:
- Static files are public by design
- PDFs and image assets are directly served by the root; they may be discoverable by URL
- `vercel.json` uses cache headers for a few assets, which is standard for static front-end hosting
- External links are safe from the code perspective (`rel="noopener noreferrer"`)

No sensitive information should be inferred from the project contents.

# Verification Status

Read-only audit status:
- File structure reviewed: Yes
- Core app files inspected: Yes (`index.html`, `styles.css`, `script.js`, `vercel.json`, `README.md`, `.gitignore`, `.vercel/project.json`)
- Deployment configuration reviewed: Yes
- Asset inventory reviewed: Yes
- Static architecture understood: Yes
- Runtime build/test execution: Not available / not applicable; no package.json or framework build step exists
- Browser runtime validation: Not fully automated in this environment; the project is static and was audited by direct source review rather than a full test suite

This means the audit is source-level and architecture-level, but not a full end-to-end automated verification run.

# Recent Changes

Recent work observed in the project state:
- The project is currently a static portfolio with a custom AI assistant, animated visual treatment, and PDF project links.
- The local project files have been reviewed and documented as the authoritative source for the portfolio structure.
- The documentation file `PROJECT_STATE.md` has been updated to reflect the current state of the project.
- 2026-09-21: revised hero copy to be more truthful and recruiter-facing; added a process section; expanded project descriptions with factual bullet points; clarified contact language without inventing new experience or projects.

# Next Recommended Steps

Recommended next steps, in order:
1. Keep the project as a static portfolio unless a real framework migration is planned.
2. Remove or archive unused legacy asset files to reduce clutter.
3. Add a lightweight validation process if the project grows, even if it remains static.
4. Decide whether the AI assistant should remain a static mock or be upgraded to a real backend-connected assistant.
5. If the project is meant to be public-facing, ensure all current local changes are deployed to Vercel before sharing the site.
6. Add a proper project status note if more portfolio items or case studies are added.
7. Consider converting hardcoded project data to a structured data source when the portfolio becomes larger than a small static site.
8. Add a minimal automated smoke check if a build/test workflow is introduced later.

The current project is a functioning static portfolio, but it is intentionally simple and not yet a full application stack.
