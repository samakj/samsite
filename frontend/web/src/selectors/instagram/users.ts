import { StateObjectType, StoreObjectType } from '@samsite/store/types';
import { InstagramUserStateType } from '@samsite/store/handlers/instagram/types';
import { fetchInstagramUserStoreHandler } from '@samsite/store/handlers/instagram/users';

export const getInstagramUserSelector = (
    state: StoreObjectType<InstagramUserStateType>,
    username: InstagramUserStateType['username'],
): InstagramUserStateType =>
    username && fetchInstagramUserStoreHandler.storeMaps.getKeyValue(state, username);

export const getInstagramUsersSelector = (
    state: StoreObjectType<InstagramUserStateType>,
    usernames: InstagramUserStateType['username'][],
): StateObjectType<InstagramUserStateType> =>
    usernames && fetchInstagramUserStoreHandler.storeMaps.getKeysValue(state, usernames);

export const getAllInstagramUsersSelector = (
    state: StoreObjectType<InstagramUserStateType>,
): StateObjectType<InstagramUserStateType> =>
    fetchInstagramUserStoreHandler.storeMaps.getValue(state);
