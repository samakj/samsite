import { lazy } from 'react';

import { RouteType } from '@samsite/routing/types';
import { PersonalPage } from '@samsite/components/personal-page';

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
];
