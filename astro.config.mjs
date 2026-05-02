import { defineConfig } from 'astro/config';

// Deployed under https://teodragovic.com/recepti/.
export default defineConfig({
    site: 'https://teodragovic.com',
    base: '/recepti',
    trailingSlash: 'always',
    build: {
        format: 'directory',
    },
});
