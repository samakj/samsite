import React, { useState } from 'react';

import '@samsite/components/projects-page/style.scss';
import { ProjectsPagePropsType } from '@samsite/components/projects-page/types';
import { ProjectDataType, data } from '@samsite/components/projects-page/data';
import { ProjectCard } from '@samsite/components/projects-page/project-card';
import { ProjectFilterBar } from '@samsite/components/projects-page/filter-bar';
import { FilterSet } from '@samsite/components/projects-page/filter-bar/filter-set';

export const ProjectsPage: React.FunctionComponent<ProjectsPagePropsType> = ({}) => {
    const initialAvailableStateFilters = new FilterSet<string>();
    const initialAvailableKeywordFilters = new FilterSet<string>();

    data.forEach((project: ProjectDataType) => {
        initialAvailableStateFilters.add(project.state);
        project.keywords.forEach((keyword: string) => initialAvailableKeywordFilters.add(keyword));
    });

    const [stateFilters, updateStateFilters] = useState(new FilterSet<string>());
    const [keywordFilters, updateKeywordFilters] = useState(new FilterSet<string>());
    const [availableStates, updateAvailableStates] = useState(initialAvailableStateFilters);
    const [availableKeywords, updateAvailableKeywords] = useState(initialAvailableKeywordFilters);

    const projectCards: JSX.Element[] = data.map((project: ProjectDataType) => (
        <ProjectCard
            project={project}
            visible={
                (!stateFilters.size || stateFilters.has(project.state)) &&
                (!keywordFilters.size || keywordFilters.hasAny(project.keywords))
            }
            key={project.name}
        />
    ));

    const addStateFilter = (state: string) => {
        updateStateFilters(stateFilters.stateChangeAdd(state));
        updateAvailableStates(availableStates.stateChangeDelete(state));
    };
    const removeStateFilter = (state: string) => {
        updateStateFilters(stateFilters.stateChangeDelete(state));
        updateAvailableStates(availableStates.stateChangeAdd(state));
    };
    const addKeywordFilter = (keyword: string) => {
        updateKeywordFilters(keywordFilters.stateChangeAdd(keyword));
        updateAvailableKeywords(availableKeywords.stateChangeDelete(keyword));
    };
    const removeKeywordFilter = (keyword: string) => {
        updateKeywordFilters(keywordFilters.stateChangeDelete(keyword));
        updateAvailableKeywords(availableKeywords.stateChangeAdd(keyword));
    };

    return (
        <main className="projects-page page-width-wrapper">
            <ProjectFilterBar
                stateFilters={stateFilters}
                keywordFilters={keywordFilters}
                availableStates={availableStates}
                availableKeywords={availableKeywords}
                addStateFilter={addStateFilter}
                removeStateFilter={removeStateFilter}
                addKeywordFilter={addKeywordFilter}
                removeKeywordFilter={removeKeywordFilter}
            />
            <div className="projects">{projectCards}</div>
        </main>
    );
};
