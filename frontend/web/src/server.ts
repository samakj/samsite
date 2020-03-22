import express, { Express } from 'express';
import cors from 'cors';

import { getPageSource } from '@samsite/ssr';
import { defaultPort, staticEndpoint, staticRoot } from '@samsite/ssr/config';

const port: string = process.env.PORT || defaultPort;
const server: Express = express();

server.use(cors());
server.use(staticEndpoint, express.static(staticRoot));

server.get('*', getPageSource);

server.listen(port);
console.log(`Listening at http://localhost:${port}`);
