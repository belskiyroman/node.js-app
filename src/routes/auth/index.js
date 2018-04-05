const passport = require('passport');
const { sendError } = require('../../utilities');
const mailService = require('../../services/mail.service');
const mail = require('../../mails');
const models = require('../../db/models');
const AuthController = require('./auth.controller');

const controller = new AuthController(sendError, models, mailService, mail);

module.exports = function (app) {
  app.post('/api/registration', (...args) => controller.registration(...args));
  app.post('/api/login', passport.authenticate('local'), (...args) => controller.login(...args));
  app.post('/api/logout', passport.authenticate('jwt'), (...args) => controller.logout(...args));
  app.post('/api/send-email-confirmation', passport.authenticate('jwt'), (...args) => controller.sendEmailConfirmation(...args));
  app.post('/api/email-confirmation', (...args) => controller.emailConfirmation(...args));
  app.post('/api/forgot-password', (...args) => controller.forgotPassword(...args));
  app.post('/api/reset-password', (...args) => controller.resetPassword(...args));
};
