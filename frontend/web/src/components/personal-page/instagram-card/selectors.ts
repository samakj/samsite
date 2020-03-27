import { StoreObjectType } from '@samsite/store/types';
import {
    GitCommitStateType,
    GitRepoStateType,
    GitUserStateType,
} from '@samsite/store/handlers/git/types';
import { getGitUserSelector } from '@samsite/selectors/git/users';
import { GitCardPropsType } from '@samsite/components/personal-page/git-card/types';
import { getGitUserReposSelector } from '@samsite/selectors/git/repos';
import { getAllGitCommitsSelector } from '@samsite/selectors/git/commits';
import { getInstagramUserSelector } from '@samsite/selectors/instagram/users';
import { InstagramCardPropsType } from '@samsite/components/personal-page/instagram-card/types';
import {
    InstagramMediaStateType,
    InstagramUserStateType,
} from '@samsite/store/handlers/instagram/types';
import { getInstagramUserMediasSelector } from '@samsite/selectors/instagram/media';

export const getCardUserSelector = (
    state: StoreObjectType<InstagramUserStateType>,
    props: InstagramCardPropsType,
) => getInstagramUserSelector(state, props.username);

export const getCardUserMediaSelector = (
    state: StoreObjectType<InstagramMediaStateType>,
    props: InstagramCardPropsType,
) => getInstagramUserMediasSelector(state, props.username);
