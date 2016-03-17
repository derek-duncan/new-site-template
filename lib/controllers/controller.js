// Dependencies
import router from 'koa-router';
import render from '../util/render.js';
import actions from '../actions/actions';

/**
 * Home
 */
function *home() {
  const lists = yield actions.list();
  this.body = yield render('home', {
    lists,
  });
}

const Router = router();
Router.get('/', home);

export default Router;
