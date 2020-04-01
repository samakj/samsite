import { lazy } from 'react';

import { RouteType } from '@samsite/routing/types';
import { PersonalPage } from '@samsite/components/personal-page';
import { DigitalCvPage } from '@samsite/components/digital-cv-page';
import { InDevPage } from '@samsite/components/in-dev-page';

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
        path: '/digital-cv/',
        component: DigitalCvPage,
        lazyComponent: lazy(() => Promise.resolve({ default: DigitalCvPage })),
        exact: true,
    },
    {
        path: '/projects/',
        component: InDevPage,
        lazyComponent: lazy(() => Promise.resolve({ default: InDevPage })),
        exact: true,
    },

    {
        path: '/personal/travel/',
        component: InDevPage,
        lazyComponent: lazy(() => Promise.resolve({ default: InDevPage })),
        exact: true,
    },
];
