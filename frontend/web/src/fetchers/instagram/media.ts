import { apiRoot } from '@samsite/fetchers/instagram/config';
import {
    defaultErrorHandler,
    generateFetchRequest,
} from '@samsite/factories/fetch/fetchRequestFactory';
import { FetchRequestType } from '@samsite/factories/fetch/types';
import { StateObjectType } from '@samsite/store/types';
import { InstagramMediaResponseType } from '@samsite/fetchers/instagram/types';
import { InstagramMediaStateType } from '@samsite/store/handlers/instagram/types';
import { fetchInstagramMediaStoreHandler } from '@samsite/store/handlers/instagram/media';

export const fetchInstagramMediaResponseHandler = <ResponseObjectType, HandledResponseType>(
    response: InstagramMediaResponseType,
): StateObjectType<InstagramMediaStateType> => ({
    [response.id]: {
        caption: response.caption,
        mediaType: response.media_type,
        mediaUrl: response.media_url,
        thumbnailUrl: response.thumbnail_url,
        permalink: response.permalink,
        timestamp: response.timestamp,
        username: response.username,
        id: response.id,
    },
});

export const fetchInstagramMedia = (id: string): FetchRequestType =>
    generateFetchRequest<InstagramMediaResponseType, InstagramMediaStateType>(
        `${apiRoot}/${id}` +
            `?fields=caption,media_type,media_url,permalink,thumbnail_url,timestamp,username` +
            `&access_token=${process.env.REACT_APP_INSTAGRAM_ACCESS_TOKEN}`,
        fetchInstagramMediaStoreHandler.dispatchers,
        fetchInstagramMediaResponseHandler,
        defaultErrorHandler,
    );
