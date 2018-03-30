const passport = require('passport');
const controller = require('./auth.controller');

module.exports = function (app) {
  app.post('/api/registration', (...args) => controller.registration(...args));
  app.post('/api/login', passport.authenticate('local'), (...args) => controller.login(...args));
  app.post('/api/logout', passport.authenticate('jwt'), (...args) => controller.logout(...args));
  app.post('/api/forgot-password', (...args) => controller.forgotPassword(...args));
  app.post('/api/reset-password', (...args) => controller.resetPassword(...args));
};
