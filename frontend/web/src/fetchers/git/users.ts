import { apiRoot } from '@samsite/fetchers/git/config';
import { fetchGitUserStoreHandler } from '@samsite/store/handlers/git/users';
import {
    defaultErrorHandler,
    generateFetchRequest,
} from '@samsite/factories/fetch/fetchRequestFactory';
import { GitUserResponseType } from '@samsite/fetchers/git/types';
import { GitUserStateType } from '@samsite/store/handlers/git/types';
import { FetchRequestType } from '@samsite/factories/fetch/types';
import { StateObjectType } from '@samsite/store/types';

export const fetchGitUserResponseHandler = <ResponseObjectType, HandledResponseType>(
    response: GitUserResponseType,
): StateObjectType<GitUserStateType> => ({
    [response.login]: {
        username: response.login,
        id: response.id,
        avatarUrl: response.avatar_url,
        url: response.html_url,
        reposUrl: response.repos_url,
        name: response.name,
        company: response.company,
        blog: response.blog,
        location: response.location,
        email: response.email,
        hireable: response.hireable,
        bio: response.bio,
        publicRepos: response.public_repos,
        publicGists: response.public_gists,
    },
});

export const fetchGitUser = (username: string): FetchRequestType =>
    generateFetchRequest<GitUserResponseType, GitUserStateType>(
        `${apiRoot}/users/${username}`,
        fetchGitUserStoreHandler.dispatchers,
        fetchGitUserResponseHandler,
        defaultErrorHandler,
    );
