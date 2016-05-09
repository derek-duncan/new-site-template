import passport from 'passport';
import router from 'koa-router';
import render from '../util/render.js';

const view_login = function *view_login() {
  this.body = yield render('login');
}

const form_login = function *form_login() {
  var ctx = this
  yield passport.authenticate('local', function*(err, user, info) {
    if (err) throw err;
    if (user === false) {
      ctx.status = 401;
      ctx.redirect('/');
    } else {
      yield ctx.login(user);
      ctx.redirect('/profile');
    }
  }).call(this)
}

/**
 * Logout
 */
const logout = function *logout() {
  this.logout();
  this.redirect('/');
}

const auth = router();

auth.get('/login', view_login);
auth.get('/logout', logout);
auth.post('/login', form_login);

export default auth;
