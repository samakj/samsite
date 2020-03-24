import { StoreObjectType } from '@samsite/store/types';
import { GitCommitStateType, GitRepoStateType, GitUserStateType } from '@samsite/store/handlers/git/types';
import { getGitUserSelector } from '@samsite/selectors/git/users';
import { GitCardPropsType } from '@samsite/components/personal-page/git-card/types';
import { getGitUserReposSelector } from '@samsite/selectors/git/repos';
import { getAllGitCommitsSelector } from '@samsite/selectors/git/commits';

export const getCardUserSelector = (
    state: StoreObjectType<GitUserStateType>,
    props: GitCardPropsType
) => getGitUserSelector(state, props.username);

export const getCardUserReposSelector = (
    state: StoreObjectType<GitRepoStateType>,
    props: GitCardPropsType
) => getGitUserReposSelector(state, props.username);

export const getLatestCommitSelector = (
    state: StoreObjectType<GitCommitStateType>,
) => {
    const allCommits = getAllGitCommitsSelector(state);
    let latestCommit: GitCommitStateType = null;

    if (allCommits) {
        Object.values(allCommits).forEach(
            (commit: GitCommitStateType) => {
                if (!latestCommit || commit.date > latestCommit.date) {
                    latestCommit = commit
                }
            }
        )
    }

    return latestCommit
};
