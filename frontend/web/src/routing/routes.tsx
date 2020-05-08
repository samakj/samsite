import React from 'react';

import { RouteType } from '@samsite/routing/types';
import { PersonalPage } from '@samsite/components/personal-page';
import { DigitalCvPage } from '@samsite/components/digital-cv-page';
import { ProjectsPage } from '@samsite/components/projects-page';
import { TravelPage } from '@samsite/components/travel-page';

export const routes: RouteType[] = [
    {
        path: '/',
        component: PersonalPage,
        exact: true,
    },
    {
        path: '/personal/',
        component: PersonalPage,
        exact: true,
    },
    {
        path: '/digital-cv/',
        component: DigitalCvPage,
        exact: true,
    },
    {
        path: '/projects/',
        component: ProjectsPage,
        exact: true,
    },

    {
        path: '/personal/travel/',
        component: TravelPage,
        exact: true,
    },
];
