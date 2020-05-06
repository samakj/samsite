import { ProjectDataType } from '@samsite/components/projects-page/data';
import { GitRepoStateType } from '@samsite/store/handlers/git/types';

export interface ProjectCardPropsType {
    project: ProjectDataType;
    visible: boolean;
    onFetchGitRepo: Function;
    repo: GitRepoStateType;
}
