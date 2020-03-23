import { StateObjectType, StoreObjectType } from '@samsite/store/types';
import { GitUserStateType } from '@samsite/store/handlers/git/types';
import { fetchGitUserStoreHandler } from '@samsite/store/handlers/git/users';

export const getUserSelector = (
    state: StoreObjectType<GitUserStateType>,
    username: GitUserStateType['username'],
): GitUserStateType =>
    username && fetchGitUserStoreHandler.storeMaps.getKeyValue(state, username);

export const getUsersSelector = (
    state: StoreObjectType<GitUserStateType>,
    usernames: GitUserStateType['username'][],
): StateObjectType<GitUserStateType> =>
    usernames && fetchGitUserStoreHandler.storeMaps.getKeysValue(state, usernames);

export const getAllUsersSelector = (
    state: StoreObjectType<GitUserStateType>,
): StateObjectType<GitUserStateType> =>
    fetchGitUserStoreHandler.storeMaps.getValue(state);
