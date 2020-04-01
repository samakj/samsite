import React, { lazy } from 'react';

import { RouteType } from '@samsite/routing/types';
import { PersonalPage } from '@samsite/components/personal-page';
import { DigitalCvPage } from '@samsite/components/digital-cv-page';
import { InDevPage } from '@samsite/components/in-dev-page';

export const routes: RouteType[] = [
    {
        path: '/',
        component: PersonalPage,
        lazyComponent: lazy(
            () => import('@samsite/components/personal-page')
                .then(exports => ({ default: exports.PersonalPage })),
        ),
        exact: true,
    },
    {
        path: '/personal/',
        component: PersonalPage,
        lazyComponent: lazy(
            () => import('@samsite/components/personal-page')
                .then(exports => ({ default: exports.PersonalPage })),
        ),
        exact: true,
    },
    {
        path: '/digital-cv/',
        component: DigitalCvPage,
        lazyComponent: lazy(
            () => import('@samsite/components/digital-cv-page')
                .then(exports => ({ default: exports.DigitalCvPage })),
        ),
        exact: true,
    },
    {
        path: '/projects/',
        component: InDevPage,
        lazyComponent: lazy(
            () => import('@samsite/components/in-dev-page')
                .then(exports => ({ default: exports.InDevPage })),
        ),
        exact: true,
    },

    {
        path: '/personal/travel/',
        component: InDevPage,
        lazyComponent: lazy(
            () => import('@samsite/components/in-dev-page')
                .then(exports => ({ default: exports.InDevPage })),
        ),
        exact: true,
    },
];
