import { apiRoot } from '@samsite/fetchers/git/config';
import { fetchGitReposStoreHandler } from '@samsite/store/handlers/git/repos';
import { defaultErrorHandler, generateFetchRequest } from '@samsite/factories/fetch/fetchRequestFactory';
import { GitUserRepoResponseType } from '@samsite/fetchers/git/types';
import { FetchRequestType } from '@samsite/factories/fetch/types';
import { StateObjectType } from '@samsite/store/types';
import { GitRepoStateType } from '@samsite/store/handlers/git/types';

export const fetchGitUserReposResponseHandler = <ResponseObjectType, HandledResponseType>(
    response: GitUserRepoResponseType[]
): StateObjectType<GitRepoStateType> => response.reduce(
    (acc: StateObjectType<GitRepoStateType>, repo: GitUserRepoResponseType): StateObjectType<GitRepoStateType> => {
        acc[repo.id] = {
            id: repo.id,
            name: repo.name,
            fullName: repo.full_name,
            private: repo.private,
            url: repo.html_url,
            description: repo.description,
            commitsUrl: repo.commits_url,
            owner: {
                username: repo.owner.login,
                id: repo.owner.id,
            },
        };
        return acc
    },
    {},
);

export const fetchGitUserRepos = (
    username: string,
): FetchRequestType =>
    generateFetchRequest<GitUserRepoResponseType[], GitRepoStateType>(
        `${apiRoot}/users/${username}/repos`,
        fetchGitReposStoreHandler.dispatchers,
        fetchGitUserReposResponseHandler,
        defaultErrorHandler,
    );
