import { defineConfig } from 'astro/config';

// Deployed to GitHub Pages under the /recipes path.
// Update `site` if you publish under a different user/org.
export default defineConfig({
    site: 'https://teodragovic.github.io',
    base: '/recipes',
    trailingSlash: 'always',
    build: {
        format: 'directory',
    },
});
