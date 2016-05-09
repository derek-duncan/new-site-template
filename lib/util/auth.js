import passport from 'koa-passport';
import actions from '../actions/actions';

passport.serializeUser(function serializeUser(user, done) {
  return done(null, user.id);
});

passport.deserializeUser(function deserializeUser(id, done) {
  return done(null, user);
});

const LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy(function(email, password, done) {

  const user = actions.users.findOneByEmail(email);
  const userExists = user;
  const passwordMatches = user.password === password;

  if (userExists && passwordMatches) {
    return done(null, user)
  } else {
    return done(null, false)
  }
}));
