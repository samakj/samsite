import { generateFetchStoreHandler } from '@samsite/factories/fetch/storeHandlerFactory';
import { gitUserStoreKey } from '@samsite/store/keys';
import { GitUserStateType } from '@samsite/store/handlers/git/types';

export const fetchGitUserStoreHandler = generateFetchStoreHandler<GitUserStateType>(
    gitUserStoreKey,
    false,
);
