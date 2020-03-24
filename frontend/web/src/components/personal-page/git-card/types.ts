import { GitCommitStateType, GitRepoStateType, GitUserStateType } from '@samsite/store/handlers/git/types';
import { StateObjectType } from '@samsite/store/types';

export interface GitCardPropsType {
    username: string;
    user: GitUserStateType;
    repos: StateObjectType<GitRepoStateType>;
    latestCommit: GitCommitStateType;

    onFetchGitUser: (username: string) => void;
    onFetchGitUserRepos: (username: string) => void;
    onFetchGitRepoCommits: (owner: string, repo: string, author?: string) => void;
}
