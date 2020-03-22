import { lazy } from 'react';

import { RouteType } from '@samsite/routing/types';
import { PlaceholderElement } from '@samsite/components/Placeholder';

export const routes: RouteType[] = [
    {
        path: '/',
        component: PlaceholderElement,
        lazyComponent: lazy(() => Promise.resolve({ default: PlaceholderElement })),
        exact: true,
    },
];
