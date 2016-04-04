// Dependencies
import router from 'koa-router';
import render from '../util/render.js';
import actions from '../actions/actions';

/**
 * Home
 */
function *view_home() {
  const lists = yield actions.list();
  this.body = yield render('home', {
    lists,
  });
}

/**
 * Add goal
 */
function *view_add() {
  const goals = yield actions.list();
  this.body = yield render('add', {
    goals,
  });
}

/**
 * Add goal
 */
function *form_add() {
  const newGoal = yield actions.add(this.request.body);
  this.redirect('/goals/add');
}

const Router = router();
/**
 * App Routes
 */
Router.get('/', view_home);
Router.get('/goals/add', view_add);
Router.post('/goals/add', form_add);

/**
 * API Routes
 */
Router.get('/api/goals', actions.list);

export default Router;
