import { generateFetchStoreHandler } from '@samsite/factories/fetch/storeHandlerFactory';
import { gitRepoCommitsStoreKey } from '@samsite/store/keys';
import { GitCommitStateType } from '@samsite/store/handlers/git/types';

export const fetchGitCommitsStoreHandler = generateFetchStoreHandler<GitCommitStateType>(
    gitRepoCommitsStoreKey,
    false,
);
