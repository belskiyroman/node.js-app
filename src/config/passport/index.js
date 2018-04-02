const passport = require('passport');
const session = require('./session');

session.disableSession(passport);
passport.use(require('./strategy/local.strategy'));
passport.use(require('./strategy/jwt.strategy'));

module.exports = passport;
