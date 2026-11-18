# jc-portfolio-v2

Joshua Collado's portfolio, rebuilt from scratch. Static site (Eleventy), deployed to GitHub Pages as a preview. The live site, jc-portfolio.codes, still runs from `Blackphenixlord/blackphenixlord.github.io` and isn't touched by this repo.

## Run it

```
npm install
npm run serve          # http://localhost:8080/jc-portfolio-v2/
npm run build          # writes _site/
npm run check:content  # fails if any fact from the old site is missing
```

## Where things live

- `src/_data/projects.js`: every project and the five case studies (sheets 1–5)
- `src/_data/experience.js`: NASA HUNCH, UTRGV, RECON, Nerdvana
- `src/_data/site.js`: contact details, nav, hidden things, contact form keys
- `src/assets/site.css`, `src/assets/site.js`: all styles and behaviour
- `tools/build-images.mjs`: photo sizes (AVIF/WebP/JPG) from the originals in the old repo
- `tools/build-og.py`: social share images (run after a build)
- `tools/facts.json`: the facts `check:content` looks for
- `TODO.md`: the slots still waiting on real content

## Design

Engineering drawing sheets: drafting-film background, teal-black ink, one variable typeface (Archivo) whose width axis does the work. The signature is the title block, the ruled grid an engineer fills in on every drawing. Work still in progress gets a red revision cloud. The JC logo is the original from the old repo, unchanged.

## Going live

When this replaces jc-portfolio.codes: set `SITE_URL` to the domain, `PATH_PREFIX` to `/` and `SITE_PREVIEW=0` in the workflow so search engines can index it.
