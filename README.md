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

Create a new `.md` file in `src/content/recipes/` with this frontmatter:

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

## Navigation

Every page has a fixed top bar with a hamburger button — on mobile _and_ desktop — that opens
`src/components/Sidebar.astro`, an off-canvas drawer listing every recipe title alphabetically —
names only, no tags. The entry for the recipe being viewed is highlighted; `Layout.astro` takes a
`current` prop (the recipe slug) to mark it. The drawer closes on the ✕ button, the backdrop, or
`Escape`. Clicking a recipe navigates to the same page its tile on the homepage links to.

## Tags

`tags` is a string array in frontmatter, used purely as metadata — there is no tag cloud and no
filtering. Tags render as chips on the homepage tiles, as a subtitle in the sidebar entries, and
under the title on each recipe page.

Existing tags: `meso`, `riba`, `vege`, `pasta`, `pizza`, `sushi`, `pita`, `salata`, `juha`,
`desert`, `pecivo`, `dorucak`. Add new ones freely. Use lowercase, no diacritics.

## Images

Drop image files into `src/content/recipes/images/` (or anywhere under `src/content/recipes/`) and
reference them with `image: ./images/file.jpg`. The field is optional — leave it commented out until
an image is ready.

## Deploy

Pushing to `master` runs the GitHub Actions workflow in `.github/workflows/deploy.yml`, which builds
and publishes to GitHub Pages. The site is served at `/recepti/`. Update the `site` field in
`astro.config.mjs` if the host changes.
