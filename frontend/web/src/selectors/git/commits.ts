import { StateObjectType, StoreObjectType } from '@samsite/store/types';
import { GitCommitStateType } from '@samsite/store/handlers/git/types';
import { fetchGitCommitsStoreHandler } from '@samsite/store/handlers/git/commits';

export const getGitCommitSelector = (
    state: StoreObjectType<GitCommitStateType>,
    sha: GitCommitStateType['sha'],
): GitCommitStateType => sha && fetchGitCommitsStoreHandler.storeMaps.getKeyValue(state, sha);

export const getGitCommitsSelector = (
    state: StoreObjectType<GitCommitStateType>,
    shas: GitCommitStateType['sha'][],
): StateObjectType<GitCommitStateType> =>
    shas && fetchGitCommitsStoreHandler.storeMaps.getKeysValue(state, shas);

export const getAllGitCommitsSelector = (
    state: StoreObjectType<GitCommitStateType>,
): StateObjectType<GitCommitStateType> => fetchGitCommitsStoreHandler.storeMaps.getValue(state);
