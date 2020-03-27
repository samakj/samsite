import { ExtendableEvent, FetchEvent } from '@samsite/service-worker/types';
import { CACHE_FULL_NAME, DEV_DONT_CACHE, DONT_CACHE, PRECACHE_FILES } from '@samsite/service-worker/config';

const COMBINED_DONT_CACHE = [...DONT_CACHE, ...(process.env.NODE_ENV === 'development' ? DEV_DONT_CACHE : [])];

self.addEventListener('install', (event: ExtendableEvent): void => {
    console.log('Installing service worker...');
    event.waitUntil(
        caches
            .open(CACHE_FULL_NAME)
            .then(
                (cache: Cache): Promise<void> => {
                    console.log('Cache opened, adding files...');
                    return cache.addAll(PRECACHE_FILES);
                },
            )
            .catch((error: Error): void => {
                console.log('Error installing service worker: ', error);
            }),
    );
});

self.addEventListener('fetch', (event: FetchEvent): void => {
    event.respondWith(
        caches.match(event.request).then(
            (response: Response): Promise<Response> => {
                if (response) {
                    return Promise.resolve(response);
                }
                return performFetchRequest(event.request);
            },
        ),
    );
});

const isInDontCache = (url: string): boolean => {
    for (const pattern of COMBINED_DONT_CACHE) {
        if (url.match(pattern)) return true;
    }
    return false;
};

const performFetchRequest = (request: Request): Promise<Response> => {
    const fetchRequestClone = request.clone();
    const cacheRequestClone = request.clone();

    return fetch(fetchRequestClone).then((response: Response) => {
        if (response && response.status === 200) {
            const cacheResponseClone = response.clone();
            caches.open(CACHE_FULL_NAME).then((cache: Cache): void => {
                if (!isInDontCache(request.url)) {
                    cache.put(cacheRequestClone, cacheResponseClone);
                }
            });
        }

        return response;
    });
};
