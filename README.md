# Nantje Bischoff: personal portfolio

Static site (plain HTML, CSS and a little JavaScript). No build step.
German is the main language; English lives under `/en/`.

## Pages
| German (main) | English |
|---|---|
| `index.html` (`/`) | `en/index.html` (`/en/`) |
| `ueber-mich.html` | `en/about.html` |
| `portfolio.html` | `en/portfolio.html` |
| `social-media-beratung.html` | `en/social-media-consulting.html` |
| `impressum.html` | `en/impressum.html` |

## Content (edit here, not in the HTML)
- `content/*.json`: German texts. `site.json` also holds email, social links and portrait, which are shared with the English version. `clients.json` (client names and logos) is shared too.
- `content/en/*.json`: English texts only.
- `assets/`: styles, script, images (`assets/img`).

## Editing without code (Pages CMS)
1. Go to pagescms.org and sign in with GitHub.
2. Open this repository. The `.pages.yml` file defines the editor, with German and English sections.
3. Add a second person under the repository's collaborators so both can edit.
4. Upload images and client logos through the CMS; they go to `assets/img`.

## Deploy
Push to GitHub, import the repo on Vercel (framework preset: Other, no build command, output directory: root). `vercel.json` enables clean URLs (`/ueber-mich`, `/en/about`).

## To do before launch
- Replace placeholder texts, numbers, client names and email in `content/`.
- Add a portrait to `assets/img` and select it in the site settings. Until then a colourful placeholder shape is shown.
- Add client logos (or leave names only).
- Optional: add `cv-de.pdf` and `cv.pdf` to the repo root for the CV download buttons.
- Complete the Impressum (German version is binding). Germany also requires a Datenschutzerklärung (privacy policy); fonts load from Google Fonts, so mention that or self-host the fonts.
