/* Service worker for Recepti — offline support + install.
 *
 * Strategy:
 *  - App shell (home, manifest, icons) is precached in a versioned cache so
 *    updates ship cleanly when SHELL_VERSION is bumped.
 *  - Everything a user actually opens (recipe pages, images, styles) is stored
 *    in a stable runtime cache that is NEVER purged on update, so once a recipe
 *    has been opened it stays available offline forever.
 */

const SCOPE_PATH = new URL(self.registration.scope).pathname; // e.g. "/recepti/"
const SHELL_VERSION = 'v2';
const SHELL_CACHE = `recepti-shell-${SHELL_VERSION}`;
const RUNTIME_CACHE = 'recepti-runtime'; // stable across updates → cached forever

const SHELL_ASSETS = [
    SCOPE_PATH,
    `${SCOPE_PATH}manifest.webmanifest`,
    `${SCOPE_PATH}icons/icon-192.png`,
    `${SCOPE_PATH}icons/icon-512.png`,
    `${SCOPE_PATH}favicon.svg`,
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(SHELL_CACHE)
            .then((cache) => cache.addAll(SHELL_ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((keys) =>
                Promise.all(
                    keys
                        // Drop only stale shell caches; keep the runtime cache.
                        .filter((key) => key.startsWith('recepti-shell-') && key !== SHELL_CACHE)
                        .map((key) => caches.delete(key))
                )
            )
            .then(() => self.clients.claim())
    );
});

// Cache a response for later; ignore opaque/failed responses.
function cachePut(cacheName, request, response) {
    if (response && response.ok && response.type === 'basic') {
        const clone = response.clone();
        caches.open(cacheName).then((cache) => cache.put(request, clone));
    }
    return response;
}

self.addEventListener('fetch', (event) => {
    const { request } = event;

    // Only handle same-origin GETs within this app's scope.
    if (request.method !== 'GET') return;
    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return;
    if (!url.pathname.startsWith(SCOPE_PATH)) return;

    // Page navigations (recipes, home): network-first, fall back to cache,
    // then to the cached home page as a last-resort offline shell.
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then((response) => cachePut(RUNTIME_CACHE, request, response))
                .catch(() =>
                    caches
                        .match(request)
                        .then((cached) => cached || caches.match(SCOPE_PATH))
                )
        );
        return;
    }

    // Static assets (styles, scripts, images, icons): stale-while-revalidate —
    // serve from cache instantly, refresh in the background when online.
    event.respondWith(
        caches.match(request).then((cached) => {
            const network = fetch(request)
                .then((response) => cachePut(RUNTIME_CACHE, request, response))
                .catch(() => cached);
            return cached || network;
        })
    );
});
