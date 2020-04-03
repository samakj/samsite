import { FilterSet } from '@samsite/components/projects-page/filter-bar/filter-set';

export interface ProjectFilterBarPropsType {
    stateFilters: FilterSet<string>;
    keywordFilters: FilterSet<string>;
    availableStates: Set<string>;
    availableKeywords: Set<string>;
    addStateFilter: Function;
    removeStateFilter: Function;
    addKeywordFilter: Function;
    removeKeywordFilter: Function;
}

export interface FilterDropDownPropsType {
    selected: FilterSet<string>;
    available: Set<string>;
    addFilter: Function;
    removeFilter: Function;
}
