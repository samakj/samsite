import { generateFetchStoreHandler } from '@samsite/factories/fetch/storeHandlerFactory';
import { gitReposStoreKey } from '@samsite/store/keys';
import { GitRepoStateType } from '@samsite/store/handlers/git/types';

export const fetchGitReposStoreHandler = generateFetchStoreHandler<GitRepoStateType>(
    gitReposStoreKey,
    false,
);
