import { apiRoot } from '@samsite/fetchers/git/config';
import {
    defaultErrorHandler,
    generateFetchRequest,
} from '@samsite/factories/fetch/fetchRequestFactory';
import { GitRepoCommitResponseType } from '@samsite/fetchers/git/types';
import { FetchRequestType } from '@samsite/factories/fetch/types';
import { StateObjectType } from '@samsite/store/types';
import { fetchGitCommitsStoreHandler } from '@samsite/store/handlers/git/commits';
import { GitCommitStateType } from '@samsite/store/handlers/git/types';

export const fetchGitRepoCommitsResponseHandler = <ResponseObjectType, HandledResponseType>(
    response: GitRepoCommitResponseType[],
): StateObjectType<GitCommitStateType> =>
    response.reduce(
        (
            acc: StateObjectType<GitCommitStateType>,
            commit: GitRepoCommitResponseType,
        ): StateObjectType<GitCommitStateType> => {
            acc[commit.sha] = {
                url: commit.html_url,
                sha: commit.sha,
                message: commit.commit.message,
                date: commit.commit.committer.date,
            };
            return acc;
        },
        {},
    );

export const fetchGitRepoCommits = (
    owner: string,
    repo: string,
    author?: string,
): FetchRequestType =>
    generateFetchRequest<GitRepoCommitResponseType[], GitCommitStateType>(
        `${apiRoot}/repos/${owner}/${repo}/commits?${author ? `author=${author}` : ''}`,
        fetchGitCommitsStoreHandler.dispatchers,
        fetchGitRepoCommitsResponseHandler,
        defaultErrorHandler,
    );
