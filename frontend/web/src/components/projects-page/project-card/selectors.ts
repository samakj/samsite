import { StoreObjectType } from '@samsite/store/types';
import { GitRepoStateType } from '@samsite/store/handlers/git/types';
import { getGitRepoSelector } from '@samsite/selectors/git/repos';
import { ProjectCardPropsType } from '@samsite/components/projects-page/project-card/types';

export const getCardRepoSelector = (
    state: StoreObjectType<GitRepoStateType>,
    props: ProjectCardPropsType,
) => props.project.gitRepoId && getGitRepoSelector(state, parseInt(props.project.gitRepoId, 10));
