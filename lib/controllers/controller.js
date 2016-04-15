// Dependencies
import router from 'koa-router';
import render from '../util/render.js';
import actions from '../actions/actions';

/**
 * Home
 */
function *view_home() {
  const lists = yield actions.goals.list();
  this.body = yield render('home', {
    title: 'Goals',
    lists,
  });
}

/**
 * Add goal
 */
function *view_add() {
  const goals = yield actions.goals.list();
  this.body = yield render('add', {
    title: 'Your Goals',
    goals,
  });
}

/**
 * Add goal
 */
function *form_add() {
  const newGoal = yield actions.goals.add(this.request.body);
  this.redirect('/goals/add');
}

/**
 * Remove goal
 */
function *form_remove() {
  const id = this.params.id;
  const goal = yield actions.goals.remove(id);
  this.redirect('/goals/add');
}

/** Users */

/**
 * View user
 */
function *view_user() {
  const id = this.params.id;
  const user = yield actions.users.findOneById(id);
  this.body = yield render('users/view', {
    title: 'Account',
    user,
  });
}

/**
 * Add user
 */
function *view_add_user() {
  this.body = yield render('users/add', {
    title: 'Signup',
  });
}

/**
 * Add user
 */
function *form_add_user() {
  const newUser = yield actions.users.add(this.request.body);
  this.redirect(`/users/${newUser._id}`);
}

/**
 * Add user
 */
function *form_cancel_user() {
  yield actions.users.cancel(this.params.id);
  this.redirect('/');
}

const Router = router();
/**
 * App Routes
 */
Router.get('/', view_home);
Router.get('/goals/add', view_add);
Router.post('/goals/add', form_add);
Router.post('/goals/:id', form_remove);

Router.get('/users/add', view_add_user);
Router.post('/users/add', form_add_user);
Router.get('/users/:id', view_user);
Router.post('/users/:id', form_cancel_user);

/**
 * API Routes
 */
Router.get('/api/goals', actions.goals.list);

export default Router;
