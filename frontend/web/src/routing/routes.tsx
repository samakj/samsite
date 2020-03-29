import { lazy } from 'react';

import { RouteType } from '@samsite/routing/types';
import { PersonalPage } from '@samsite/components/personal-page';
import { ProfessionalPage } from '@samsite/components/professional-page';

export const routes: RouteType[] = [
    {
        path: '/',
        component: PersonalPage,
        lazyComponent: lazy(() => Promise.resolve({ default: PersonalPage })),
        exact: true,
    },
    {
        path: '/personal/',
        component: PersonalPage,
        lazyComponent: lazy(() => Promise.resolve({ default: PersonalPage })),
        exact: true,
    },
    {
        path: '/professional/',
        component: ProfessionalPage,
        lazyComponent: lazy(() => Promise.resolve({ default: ProfessionalPage })),
        exact: true,
    },
];
