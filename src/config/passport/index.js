const passport = require('passport');
const localStrategy = require('./strategy/local.strategy');
const jwtStrategy = require('./strategy/jwt.strategy');
const session = require('./session');

session.disableSession(passport)
passport.use(localStrategy);
passport.use(jwtStrategy);

/**
 *
 * @type {Passport}
 */
module.exports = passport;
