// Dependencies
import router from 'koa-router';
import render from '../util/render.js';

/**
 * Home
 */
function *home() {
  this.body = yield render('home');
}

const Router = router();
Router.get('/', home);

export default Router;
