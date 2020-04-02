import React from 'react';

import '@samsite/components/projects-page/style.scss';
import { ProjectsPagePropsType } from '@samsite/components/projects-page/types';
import { ProjectDataType, data } from '@samsite/components/projects-page/data';
import { ProjectCard } from '@samsite/components/projects-page/project-card';

export const ProjectsPage: React.FunctionComponent<ProjectsPagePropsType> = ({}) => {
    return (
        <main className="projects-page page-width-wrapper">
            <div className="projects">
            {
                data.map((project: ProjectDataType) => <ProjectCard project={project} />)
            }
            </div>
        </main>
    );
};
