'use strict';

// Dependencies
import Koa from 'koa';
import logger from 'koa-logger';
import serve from 'koa-static-cache';
import json from 'koa-json';
import compress from 'koa-compress';
import bodyparser from 'koa-bodyparser';
import session from 'koa-session';
import passport from 'koa-passport';
import path from 'path';
import http from 'http';
import fs from 'fs';
import mongoose from 'mongoose';

import config from './config.js';

import controllers from './lib/controllers/controllers';

// Main app
const app = new Koa();

// Connect to mongoose
const connect = () => {
  const options = {
    server: {
      socketOptions: {
        keepAlive: 1,
      },
    },
  };
  mongoose.connect(config.mongodb.url, options);
};
connect();
mongoose.connection.on('error', console.log); // eslint-disable-line no-console
mongoose.connection.on('disconnected', connect);

// Initiate models
const modelsDir = path.join(__dirname, 'lib', 'models');
fs.readdirSync(modelsDir).forEach(modelFilename => {
  const modelPath = path.join(modelsDir, modelFilename);
  if (modelFilename.indexOf('.js') >= 0) require(modelPath);
});

// Setup Koa modules
app.use(logger());
app.use(json());

app.use(bodyparser());

app.keys = ['secret'];
app.use(session(app));

require('./lib/util/auth.js');
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(controllers.routes());
app.use(controllers.allowedMethods());

// Serve static files
const publicDirectory = path.join(__dirname, 'public');
const cacheOptions = {
  maxAge: 60 * 60 * 24,
  gzip: true,
};
app.use(serve(publicDirectory, cacheOptions));

app.use(compress());

const server = http.createServer(app.callback());
server.listen(config.koa.port);
console.log(`listening on port ${config.koa.port}`); // eslint-disable-line no-console

export default app;
