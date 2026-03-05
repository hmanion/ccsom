# CCSOM Website

Static, GitHub Pages-ready website for sharing the
Campaign Content Support Operating Model internally.

## Pages

- `index.html` - Landing page summarising the model, objectives, and core principles.
- `campaign-levels.html` - Campaign levels, writer experience, and decision tree.
- `governance.html` - Quality ownership and process/QA governance.
- `structured-support.html` - Structured support definition, criteria, ladder, and recurring issues.
- `planning-calls.html` - Planning call prep, weekly rhythm, and sign-off by seniority.

## Project Structure

- `styles/base.css` - Shared visual system (tokens, typography, nav, cards).
- `styles/pages.css` - Page-level layouts and component styles.
- `scripts/data.js` - Content/data source aligned to the 5-page IA.
- `scripts/nav.js` - Active nav highlighting and mobile nav toggle.
- `scripts/interactions.js` - Page renderers for landing, campaign levels, governance, structured support, and planning calls.
- `assets/TodayDigital_Icon.png` - Brand asset.

## Run Locally

```bash
cd /Users/jamesmaskell/Desktop/CCSOM
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Notes

- All links are relative for GitHub Pages compatibility.
- No build tooling is required.
