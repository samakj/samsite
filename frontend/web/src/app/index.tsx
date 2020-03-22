import React from 'react';
import { Store } from 'redux';
import { History } from 'history';
import { Provider } from 'react-redux';

import { loadStore } from '@samsite/store';
import '@samsite/components/styles/default.scss';

export interface AppPropsType {
    preloadedState: object;
    history: History;
}

export const App: React.FunctionComponent<AppPropsType> = ({
    children,
    preloadedState,
    history,
}) => {
    const store: Store = loadStore(preloadedState, history);

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
