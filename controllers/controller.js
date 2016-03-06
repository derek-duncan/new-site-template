// Dependencies
import router from 'koa-router';

import config from '../config.js';
import render from '../lib/render.js';

const Router = router();

Router.get('/', home);

export default Router;

/**
 * Home
 */
function *home(next) {
  this.body = yield render('home');
}
