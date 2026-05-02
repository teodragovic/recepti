# Recipes

Small Astro blog of personal recipes (content in Croatian). Deploys to GitHub Pages under the
`/recepti` path.

## Develop

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

## Format

Prettier is configured with `prettier-plugin-astro`.

```sh
npm run format        # write
npm run format:check  # check only
```

## Adding a recipe

Create a new `.md` file in `src/content/recepti/` with this frontmatter:

```md
---
title: 'Recipe name'
tags: [pasta, meso]
servings: 3
calories: 500
protein: 25
carbs: 50
fat: 20
# image: "./images/recipe-name.jpg"   # optional, add later
# sourceUrl: "https://..."             # optional
---

## Sastojci

- ...

## Priprema

- ...
```

## Tags

`tags` is a string array in frontmatter. The homepage renders one chip per tag (with counts) and
filters the list client-side. Tags are also rendered on each recipe page and link back to the
filtered homepage via `#tag`.

Existing tags: `meso`, `riba`, `vegetarijansko`, `pasta`, `pizza`, `sushi`, `pita`, `salata`,
`juha`, `desert`, `pecivo`, `dorucak`. Add new ones freely — they appear in the filter
automatically. Use lowercase, no diacritics.

## Images

Drop image files into `src/content/recepti/images/` (or anywhere under `src/content/recepti/`) and
reference them with `image: ./images/file.jpg`. The field is optional — leave it commented out until
an image is ready.

## Deploy

Pushing to `master` runs the GitHub Actions workflow in `.github/workflows/deploy.yml`, which builds
and publishes to GitHub Pages. The site is served at `/recepti/`. Update the `site` field in
`astro.config.mjs` if the host changes.
