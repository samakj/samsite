import { StateObjectType, StoreObjectType } from '@samsite/store/types';
import { InstagramMediaStateType, InstagramUserStateType } from '@samsite/store/handlers/instagram/types';
import { fetchInstagramMediaStoreHandler } from '@samsite/store/handlers/instagram/media';

export const getInstagramMediaSelector = (
    state: StoreObjectType<InstagramMediaStateType>,
    id: InstagramMediaStateType['id'],
): InstagramMediaStateType =>
    id && fetchInstagramMediaStoreHandler.storeMaps.getKeyValue(state, id);

export const getInstagramMediasSelector = (
    state: StoreObjectType<InstagramMediaStateType>,
    ids: InstagramMediaStateType['id'][],
): StateObjectType<InstagramMediaStateType> =>
    ids && fetchInstagramMediaStoreHandler.storeMaps.getKeysValue(state, ids);

export const getInstagramUserMediasSelector = (
    state: StoreObjectType<InstagramMediaStateType>,
    username: InstagramUserStateType['username'],
): StateObjectType<InstagramMediaStateType> => {
    if (username) {
        const allMedia = fetchInstagramMediaStoreHandler.storeMaps.getValue(state);

        if (allMedia) {
            return Object.values(allMedia).reduce(
                (
                    acc: StateObjectType<InstagramMediaStateType>,
                    media: InstagramMediaStateType,
                ) => {
                    if (media.username === username) {
                        acc[media.id] = media
                    }

                    return acc
                },
                {},
            )
        }
    }

    return null
};

export const getAllInstagramMediasSelector = (
    state: StoreObjectType<InstagramMediaStateType>,
): StateObjectType<InstagramMediaStateType> =>
    fetchInstagramMediaStoreHandler.storeMaps.getValue(state);
