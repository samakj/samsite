import { apiRoot } from '@samsite/fetchers/instagram/config';
import { defaultErrorHandler, generateFetchRequest } from '@samsite/factories/fetch/fetchRequestFactory';
import { FetchRequestType } from '@samsite/factories/fetch/types';
import { StateObjectType } from '@samsite/store/types';
import { InstagramUserResponseType } from '@samsite/fetchers/instagram/types';
import { InstagramUserStateType } from '@samsite/store/handlers/instagram/types';
import { fetchInstagramUserStoreHandler } from '@samsite/store/handlers/instagram/users';

export const fetchInstagramUserResponseHandler = <ResponseObjectType, HandledResponseType>(
    response: InstagramUserResponseType,
): StateObjectType<InstagramUserStateType> => ({
    [response.username]: {
        username: response.username,
        id: response.id,
        accountType: response.account_type,
        mediaCount: response.media_count,
        media: Object.values(response.media.data).reduce(
            (
                acc: {[id: string]: string},
                value: {id: string}
            ): {[id: string]: string} => {
                acc[value.id] = value.id;
                return acc
            },
            {},
        ),
    }
});

export const fetchInstagramMe = (): FetchRequestType =>
    generateFetchRequest<InstagramUserResponseType, InstagramUserStateType>(
        `${apiRoot}/me` +
        `?fields=username,media,account_type,media_count` +
        `&access_token=${process.env.REACT_APP_INSTAGRAM_ACCESS_TOKEN}`,
        fetchInstagramUserStoreHandler.dispatchers,
        fetchInstagramUserResponseHandler,
        defaultErrorHandler,
    );
