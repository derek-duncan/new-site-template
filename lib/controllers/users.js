import router from 'koa-router';
import render from '../util/render.js';
import actions from '../actions/actions';

const _view = {
  /**
   * View user
   */
  show: function *show() {
    const id = this.params.id;
    const user = yield actions.users.findOneById(id);
    this.body = yield render('users/view', {
      title: 'Account',
      user,
    });
  },

  profile: function *profile() {
    const user = this.req.user;
    if (user) {
      this.body = yield render('users/profile', {
        user
      });
    } else {
      this.redirect('/login');
    }
  },

  /**
   * Add user
   */
  add: function *add() {
    this.body = yield render('users/add', {
      title: 'Signup',
    });
  },
};

const _post = {
  /**
   * Add user
   */
  add: function *add() {
    const newUser = yield actions.users.add(this.request.body);
    this.redirect(`/users/${newUser._id}`);
  },

  /**
   * Cancel user
   */
  cancel: function *cancel() {
    yield actions.users.cancel(this.params.id);
    this.redirect('/');
  },
};

const users = router();

users.get('/users/add', _view.add);
/** just an alias of /users/add */
users.get('/join', _view.add);

users.get('/users/:id', _view.show);
users.get('/profile', _view.profile);

users.post('/users/add', _post.add);
users.post('/users/:id', _post.cancel);

export default users;
