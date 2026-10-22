# Nantje Bischoff: personal portfolio

Static site (plain HTML, CSS and a little JavaScript). No build step.

## Structure
- `index.html`: landing page
- `about.html`: about me and CV
- `portfolio.html`: proof of work
- `social-media-consulting.html`: what I offer
- `impressum.html`: legal notice (fill in the placeholders in [brackets])
- `content/*.json`: editable English content (site settings, services, portfolio, CV)
- `de/`: German pages (`/de/`, `/de/ueber-mich`, `/de/portfolio`, `/de/social-media-beratung`, `/de/impressum`)
- `content/de/*.json`: German texts. Email, social links and portrait are shared and edited once in the English site settings.
- `assets/`: styles, script, images (`assets/img`)

## Editing without code (Pages CMS)
1. Go to pagescms.org and sign in with GitHub.
2. Open this repository. The `.pages.yml` file defines the editor.
3. Add a second person under the repository's collaborators so both can edit.
4. Upload images through the CMS; they go to `assets/img`.

## Deploy
Push to GitHub, import the repo on Vercel (framework preset: Other, no build command, output directory: root). `vercel.json` enables clean URLs (`/about`).

## To do before launch
- Replace placeholder texts, numbers and email in `content/` and the pages.
- Add a portrait to `assets/img` and select it in Site settings.
- Optional: add `cv.pdf` (English) and `cv-de.pdf` (German) to the repo root for the CV download buttons.
- Complete the Impressum. Germany also requires a Datenschutzerklärung (privacy policy); Fonts are loaded from Google Fonts, so mention that or self-host the fonts.
