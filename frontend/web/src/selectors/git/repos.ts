import { StateObjectType, StoreObjectType } from '@samsite/store/types';
import { GitRepoStateType, GitUserStateType } from '@samsite/store/handlers/git/types';
import { fetchGitReposStoreHandler } from '@samsite/store/handlers/git/repos';

export const getGitRepoSelector = (
    state: StoreObjectType<GitRepoStateType>,
    id: GitRepoStateType['id'],
): GitRepoStateType =>
    id && fetchGitReposStoreHandler.storeMaps.getKeyValue(state, id);

export const getGitReposSelector = (
    state: StoreObjectType<GitRepoStateType>,
    ids: GitRepoStateType['id'][],
): StateObjectType<GitRepoStateType> =>
    ids && fetchGitReposStoreHandler.storeMaps.getKeysValue(state, ids);

export const getGitUserReposSelector = (
    state: StoreObjectType<GitRepoStateType>,
    username: GitUserStateType['username'],
): StateObjectType<GitRepoStateType> =>{
    if (username) {
        const allMedia = fetchGitReposStoreHandler.storeMaps.getValue(state);

        if (allMedia) {
            return Object.values(allMedia).reduce(
                (
                    acc: StateObjectType<GitRepoStateType>,
                    repo: GitRepoStateType,
                ) => {
                    if (repo.owner.username === username) {
                        acc[repo.id] = repo
                    }

                    return acc
                },
                {},
            )
        }
    }

    return null
};

export const getAllGitReposSelector = (
    state: StoreObjectType<GitRepoStateType>,
): StateObjectType<GitRepoStateType> =>
    fetchGitReposStoreHandler.storeMaps.getValue(state);
