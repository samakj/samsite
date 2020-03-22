import React from 'react';
import { render } from 'react-dom';
import { ClientRouter } from '@samsite/routing/router';
import { createBrowserHistory, History } from 'history';

import { App } from './app';

declare global {
    interface Window {
        __PRELOADED_STATE__: object;
    }
}

const browserHistory: History = createBrowserHistory();

render(
    <App preloadedState={window.__PRELOADED_STATE__} history={browserHistory}>
        <ClientRouter history={browserHistory} />
    </App>,
    document.getElementById('app-root'),
);
