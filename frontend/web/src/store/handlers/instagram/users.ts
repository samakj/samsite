import { generateFetchStoreHandler } from '@samsite/factories/fetch/storeHandlerFactory';
import { instagramUsersStoreKey } from '@samsite/store/keys';
import { InstagramUserStateType } from '@samsite/store/handlers/instagram/types';

export const fetchInstagramUserStoreHandler = generateFetchStoreHandler<InstagramUserStateType>(
    instagramUsersStoreKey,
    false,
);
