import co from 'co';
import passport from 'koa-passport';
import actions from '../actions/actions';

passport.serializeUser(function serializeUser(user, done) {
  return done(null, user.id);
});

passport.deserializeUser(function deserializeUser(id, done) {
  co(function*() {
    const user = yield actions.users.findOneById(id);
    return user;
  }).then((user) => {
    return done(null, user);
  });
});

const LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy(function (email, password, done) {
  co(function*() {
    const user = yield actions.users.findOneByEmail(email);
    const userExists = user;
    const passwordMatches = user.password === password;

    if (userExists && passwordMatches) {
      return user;
    } else {
      return false;
    }
  }).then((user) => {
    return done(null, user)
  });
}));
