import React, { Suspense } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { StaticRouter, Route, Switch } from 'react-router-dom';

import {
    ClientRouterPropsType,
    RoutesSwitchPropsType,
    RouteType,
    ServerRouterPropsType,
} from '@samsite/routing/types';
import { routes } from '@samsite/routing/routes';
import { isClientSide } from '@samsite/utils/render-side';

export const RoutesSwitch: React.FunctionComponent<RoutesSwitchPropsType> = () => {
    return (
        <Switch>
            {routes.map(
                (route: RouteType): JSX.Element => (
                    <Route
                        path={route.path}
                        exact={route.exact || false}
                        component={isClientSide() ? route.lazyComponent : route.component}
                        key={route.path}
                    />
                ),
            )}
        </Switch>
    );
};

export const ClientRouter: React.FunctionComponent<ClientRouterPropsType> = ({ history }) => {
    return (
        <ConnectedRouter history={history}>
            <Suspense fallback={<div>Loading...</div>}>
                <RoutesSwitch />
            </Suspense>
        </ConnectedRouter>
    );
};

export const ServerRouter: React.FunctionComponent<ServerRouterPropsType> = ({
    context,
    location,
}) => {
    return (
        <StaticRouter context={context} location={location}>
            <RoutesSwitch />
        </StaticRouter>
    );
};
