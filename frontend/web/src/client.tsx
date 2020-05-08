import React from 'react';
import { hydrate } from 'react-dom';
import { ClientRouter } from '@samsite/routing/router';
import { createBrowserHistory, History } from 'history';

import { App } from '@samsite/app';
import { tryRegisterServiceWorker } from '@samsite/service-worker/try-register-service-worker';
// @ts-ignore: Has to be old style for webpack plugin.
import templateParameters from '@samsite/page-templates/template-parameters';

declare global {
    interface Window {
        __PRELOADED_STATE__: object;
        google: { maps: object };
    }
}

const browserHistory: History = createBrowserHistory();

hydrate(
    <App preloadedState={window.__PRELOADED_STATE__} history={browserHistory}>
        <ClientRouter history={browserHistory} />
    </App>,
    document.getElementById(templateParameters.appMountId),
);

tryRegisterServiceWorker();
