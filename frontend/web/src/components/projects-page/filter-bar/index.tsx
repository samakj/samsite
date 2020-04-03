import React, { useState } from 'react';

import '@samsite/components/projects-page/filter-bar/style.scss';
import {
    ProjectFilterBarPropsType,
    FilterDropDownPropsType,
} from '@samsite/components/projects-page/filter-bar/types';

const stringToClassName = (s: string): string => s.replace(' ', '-').toLowerCase();

const FilterDropDown: React.FunctionComponent<FilterDropDownPropsType> = ({
    selected,
    available,
    addFilter,
    removeFilter,
}) => {
    const [availableVisible, updateAvailableVisible] = useState(false);

    return (
        <div className="filter-drop-down" onClick={() => updateAvailableVisible(!availableVisible)}>
            <ul className="selected">
                {Array.from(selected)
                    .sort()
                    .map((state: string, index: number) => (
                        <li className={`filter -${stringToClassName(state)}`} key={index}>
                            {state}
                        </li>
                    ))}
            </ul>
            <ul className={`available -${availableVisible ? 'show' : 'hide'}`}>
                {Array.from(selected)
                    .sort()
                    .map((state: string, index: number) => (
                        <li
                            className="item -remove"
                            key={index}
                            onClick={() => removeFilter(state)}
                        >
                            <div className={`filter -${stringToClassName(state)}`}>{state}</div>
                        </li>
                    ))}
                {selected.size ? <hr /> : null}
                {Array.from(available)
                    .sort()
                    .map((state: string, index: number) => (
                        <li className="item -add" key={index} onClick={() => addFilter(state)}>
                            <div className={`filter -${stringToClassName(state)}`}>{state}</div>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export const ProjectFilterBar: React.FunctionComponent<ProjectFilterBarPropsType> = ({
    stateFilters,
    keywordFilters,
    availableStates,
    availableKeywords,
    addStateFilter,
    removeStateFilter,
    addKeywordFilter,
    removeKeywordFilter,
}) => {
    return (
        <div className="project-filter-bar">
            <div className="filter-group">
                <div className="filter-label">States:</div>
                <FilterDropDown
                    selected={stateFilters}
                    available={availableStates}
                    addFilter={addStateFilter}
                    removeFilter={removeStateFilter}
                />
            </div>
            <div className="filter-group">
                <div className="filter-label">Keywords:</div>
                <FilterDropDown
                    selected={keywordFilters}
                    available={availableKeywords}
                    addFilter={addKeywordFilter}
                    removeFilter={removeKeywordFilter}
                />
            </div>
        </div>
    );
};
