import { renderToString } from 'react-dom/server';
import React from 'react';
import { Request, Response } from 'express';
import { matchPath, match } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';
import path from 'path';

import { routes } from '@samsite/routing/routes';
import { RouteType } from '@samsite/routing/types';
import { ServerRouter } from '@samsite/routing/router';
import { App } from '@samsite/app';
import fs from 'fs';
import cheerio from 'cheerio';

const getRouteMatch = (url: string): match =>
    routes.reduce((acc: match, route: RouteType): match => matchPath(url, route) || acc, null);

const getPreloadedState = (noSSR: boolean = false): Promise<object> =>
    new Promise((resolve: Function) => (noSSR ? resolve({}) : resolve({ test: 123 })));

const renderFullPage = (htmlToInject: string, preloadedState: object): string => {
    const html: string = fs.readFileSync('src/page-templates/default.html').toString();
    const $ = cheerio.load(html);

    $('#app-root').html(htmlToInject);
    $('body').append(`
        <script >
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\\u003c')}
        </script>
    `);

    return $.html();
};

export const getPageSource = (request: Request, response: Response): Promise<Response> => {
    const routeMatch: match = getRouteMatch(request.path);

    if (!routeMatch) {
        console.error(`'${request.url}' didn't match any endpoint in routes.`);
        response.status(404).json({
            status_code: 404,
            error_type: 'PAGE_NOT_FOUND',
        });
        return;
    }

    return getPreloadedState(request.query['noSSR'])
        .then(
            (preloadedState: object): Response => {
                const context = {};
                const history: MemoryHistory = createMemoryHistory({
                    initialEntries: [routeMatch.path],
                });

                return response.status(200).send(
                    renderFullPage(
                        renderToString(
                            <App preloadedState={preloadedState} history={history}>
                                <ServerRouter context={context} location={request.url} />
                            </App>,
                        ),
                        preloadedState,
                    ),
                );
            },
        )
        .catch(
            (error): Response => {
                console.error(error);
                return response.status(500).json({
                    status_code: 500,
                    error_type: 'SERVER_ERROR',
                });
            },
        );
};
