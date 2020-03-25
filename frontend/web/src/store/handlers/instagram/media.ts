import { generateFetchStoreHandler } from '@samsite/factories/fetch/storeHandlerFactory';
import { instagramMediaStoreKey } from '@samsite/store/keys';
import { InstagramMediaStateType } from '@samsite/store/handlers/instagram/types';

export const fetchInstagramMediaStoreHandler = generateFetchStoreHandler<InstagramMediaStateType>(
    instagramMediaStoreKey,
    false,
);
