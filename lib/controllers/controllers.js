import router from 'koa-router';
import passport from 'passport';
import render from '../util/render.js';

import users from './users';
import playlists from './playlists';
import auth from './auth';

/**
 * Home
 */
function *view_home() {
  this.body = yield render('home', {
    title: 'Home',
  });
}

/**
 * Users
 */

const controllers = router();
/**
 * App Routes
 */
controllers.use(users.routes());
controllers.use(playlists.routes());
controllers.use(auth.routes());
controllers.get('/', view_home);

export default controllers;
