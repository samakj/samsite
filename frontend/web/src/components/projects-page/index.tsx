import React, { useState } from 'react';

import '@samsite/components/projects-page/style.scss';
import { ProjectsPagePropsType } from '@samsite/components/projects-page/types';
import { ProjectDataType, data } from '@samsite/components/projects-page/data';
import { ProjectCard } from '@samsite/components/projects-page/project-card';

const setHasAny = (set: Set<any>, testValues: any[]): boolean => {
    for (const value of testValues) {
        if (set.has(value)) return true
    }

    return false
};

export const ProjectsPage: React.FunctionComponent<ProjectsPagePropsType> = ({}) => {
    const [stateFilters, updateStateFilters] = useState(new Set());
    const [keywordFilters, updateKeywordFilters] = useState(new Set());
    const possibleStateFilters: Set<string> = new Set();
    const possibleKeywordFilters: Set<string> = new Set();
    const projectCards: JSX.Element[] = [];

    data.forEach(
        (project: ProjectDataType) => {
            let passesStateFilter: boolean = true;
            let passesKeywordFilter: boolean = false;

            if (!stateFilters.size) {
                possibleStateFilters.add(project.state);
            } else if (!stateFilters.has(project.state)) {
                possibleStateFilters.add(project.state);
                passesStateFilter = false;
            }


            project.keywords.forEach((keyword: string) =>  {
                if (!keywordFilters.size) {
                    possibleKeywordFilters.add(keyword);
                    passesKeywordFilter = true;
                } else if (!keywordFilters.has(keyword)) {
                    possibleKeywordFilters.add(keyword);
                } else {
                    passesKeywordFilter = true;
                }
            });

            if (passesStateFilter && passesKeywordFilter) {
                projectCards.push(<ProjectCard project={project} key={project.name} />)
            }
        }
    );

    return (
        <main className="projects-page page-width-wrapper">
            <div className="projects">
            { projectCards }
            </div>
        </main>
    );
};
