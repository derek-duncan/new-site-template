import passport from 'passport';
import router from 'koa-router';
import render from '../util/render.js';

const _view = {
  login: function *login() {
    this.body = yield render('login');
  },
};

const _get = {
  /**
   * Logout
   */
  logout: function *logout() {
    this.logout();
    this.redirect('/');
  },
};

const _post = {
  /**
   * Passport login endpoint
   */
  login: function *login() {
    var ctx = this
    yield passport.authenticate('local', function* (err, user, info) {
      if (err) throw err;
      if (user === false) {
        ctx.status = 401;
        ctx.redirect('/');
      } else {
        yield ctx.login(user);
        ctx.redirect('/profile');
      }
    })();
  },
};

const auth = router();

auth.get('/login', _view.login);
auth.get('/logout', _get.logout);
auth.post('/login', _post.login);

export default auth;
