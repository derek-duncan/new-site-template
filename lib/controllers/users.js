import router from 'koa-router';
import render from '../util/render.js';
import actions from '../actions/actions';

/**
 * View user
 */
const view_user = function *view_user() {
  const id = this.params.id;
  const user = yield actions.users.findOneById(id);
  this.body = yield render('users/view', {
    title: 'Account',
    user,
  });
}

const view_profile = function *view_profile() {
  const user = this.req.user;
  if (user) {
    this.body = yield render('users/profile', {
      user
    });
  } else {
    this.redirect('/login');
  }
}

/**
 * Add user
 */
const view_add_user = function *view_add_user() {
  this.body = yield render('users/add', {
    title: 'Signup',
  });
}

/**
 * Add user
 */
const form_add_user = function *form_add_user() {
  const newUser = yield actions.users.add(this.request.body);
  this.redirect(`/users/${newUser._id}`);
}

/**
 * Cancel user
 */
const form_cancel_user = function *form_cancel_user() {
  yield actions.users.cancel(this.params.id);
  this.redirect('/');
}

const users = router();

users.get('/users/add', view_add_user);
users.get('/users/:id', view_user);
users.get('/profile', view_profile);

users.post('/users/add', form_add_user);
users.post('/users/:id', form_cancel_user);

export default users;
