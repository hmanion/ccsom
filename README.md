# CCSOM Website

Static multi-page website for sharing the **Campaign Content Support Operating Model** internally.

## Overview

This site is built with plain HTML, CSS, JS, and inline SVG (no build step required), and is ready to host on GitHub Pages.

## Pages

- `index.html` - Overview and core principles.
- `support-levels.html` - Support levels and decision flowchart.
- `roles.html` - Role detail accordions and capability matrix.
- `governance.html` - Planning governance, planning QA, and sign-off.
- `escalation.html` - Escalation criteria, ladder, and recurring issues.
- `target-state.html` - Without/With model comparison and target outcomes.

## Project Structure

- `styles/base.css` - Shared visual system (tokens, typography, nav, cards).
- `styles/pages.css` - Page-level components (flowchart shell, tables, slider toggle, accordions).
- `scripts/data.js` - Operating model content/data source.
- `scripts/nav.js` - Active nav highlighting + mobile nav menu toggle.
- `scripts/interactions.js` - Dynamic rendering + interactions (accordions, ladder, comparison toggle).
- `assets/TodayDigital_Icon.png` - Brand asset.

## Run Locally

Because this is static HTML, open `index.html` directly in a browser.

For a cleaner local server flow:

```bash
cd /Users/jamesmaskell/Desktop/CCSOM
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Interaction Hooks

Used by `scripts/interactions.js`:

- `data-accordion` - Expanding/collapsing role cards.
- `data-ladder-step` - Escalation ladder selection.
- `data-compare-toggle` - Target state without/with slider switch.

## Notes

- Navigation labels are shared across all pages and link to static `.html` files.
- Relative paths are used throughout for GitHub Pages compatibility.
