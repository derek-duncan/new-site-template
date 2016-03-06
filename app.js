'use strict';

// Dependencies
import Koa from 'koa';
import logger from 'koa-logger';
import serve from 'koa-static-cache';
import json from 'koa-json';
import compress from 'koa-compress';
import path from 'path';
import http from 'http';

import config from './config.js';

import controller from './controllers/controller.js';
import actions from './actions/actions.js';

// Main app
const app = new Koa();

// Connect to mongoose
// const connect = () => {
//   const options = {
//     server: {
//       socketOptions: {
//         keepAlive: 1
//       }
//     }
//   };
//   mongoose.connect(config.mongodb.url, options);
// };
// connect();
// mongoose.connection.on('error', console.log);
// mongoose.connection.on('disconnected', connect);

// Setup Koa modules
app.use(logger());
app.use(json());

// Routes
app.use(controller.routes());
app.use(controller.allowedMethods());

// Serve static files
let publicDirectory = path.join(__dirname, 'public');
let cacheOptions = {
  maxAge: 60 * 60 * 24,
  gzip: true
};
app.use(serve(publicDirectory, cacheOptions));

app.use(compress());

const server = http.createServer(app.callback());
server.listen(config.koa.port);
console.log(`listening on port ${config.koa.port}`);

export default app;

