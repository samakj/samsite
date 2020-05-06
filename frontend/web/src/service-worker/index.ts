import { ExtendableEvent, FetchEvent } from '@samsite/service-worker/types';
import {
    CACHE_EXPIRY,
    CACHE_FULL_NAME,
    DEV_DONT_CACHE,
    DONT_CACHE,
    PRECACHE_FILES
} from '@samsite/service-worker/config';

const COMBINED_DONT_CACHE = [...DONT_CACHE, ...(process.env.NODE_ENV === 'development' ? DEV_DONT_CACHE : [])];

self.addEventListener('install', (event: ExtendableEvent): void => {
    console.log('Installing service worker...');
    event.waitUntil(
        cleanCaches()
            .then(getCurrentCache)
            .then(
                (cache: Cache): Promise<void> => {
                    console.log(`Cache opened, adding files...`);
                    return cache.addAll(PRECACHE_FILES);
                },
            )
            .catch(
                (error: Error): void => {
                    console.log('Error installing service worker: ', error);
                }
            )
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

const cleanCaches = (): Promise<void> => caches
    .keys()
    .then(
        (cacheNames: string[]): void => {
            for (const cacheName of cacheNames) {
                if (cacheName.indexOf(CACHE_FULL_NAME) == 0) {
                    const cacheOpened = parseInt(
                        cacheName.replace(`${CACHE_FULL_NAME}@`, ''),
                        10,
                    );

                    if (+ new Date() - cacheOpened > CACHE_EXPIRY) {
                        console.log(`Deleting old cache '${cacheName}'.`);
                        caches.delete(cacheName)
                    }
                }
            }
        },
    );

const getCurrentCache = (): Promise<Cache> => caches
    .keys()
    .then(
        (cacheNames: string[]): string => {
            for (const cacheName of cacheNames) {
                if (cacheName.indexOf(CACHE_FULL_NAME) == 0) {
                    const cacheOpened = parseInt(
                        cacheName.replace(`${CACHE_FULL_NAME}@`, ''),
                        10,
                    );

                    if (+ new Date() - cacheOpened < CACHE_EXPIRY) {
                        return cacheName
                    }
                }
            }

            return `${CACHE_FULL_NAME}@${+ new Date()}`
        },
    )
    .then((currentCache: string): Promise<Cache> => caches.open(currentCache));

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
            getCurrentCache().then((cache: Cache): void => {
                if (!isInDontCache(request.url)) {
                    cache.put(cacheRequestClone, cacheResponseClone);
                }
            });
        }

        return response;
    });
};
