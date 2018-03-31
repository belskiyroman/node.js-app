const HTTP_CODE = require('../../constants/http-code.const');
const SUPPORT_EMAIL = require('../../constants/email.const').SUPPORT;
const ENSURE_TRAILING_SLASH = require('../../constants/regexp.const').ENSURE_TRAILING_SLASH;
const sendError = require('../../utilities/errors.utility').sendError;
const APIValidationError = require('../../utilities/errors.utility').APIValidationError;
const generateHash = require('../../utilities/crypto.utility').generateHash;
const mailService = require('../../services/mail.service');
const models = require('../../db/models');

class AuthController {
  constructor (sendError, { sequelize, User, UserResetPassword }, generateHash, mailService) {
    this.sendError = sendError;
    this.sequelize = sequelize;
    this.UserModel = User;
    this.UserResetPassword = UserResetPassword;
    this.generateHash = generateHash;
    this.mailService = mailService;
  }

  async registration (req, res) {
    try {
      const newUser = await this.UserModel.create(req.body);
      req.login(newUser, {session: false}, () => this.login(req, res));
    } catch (err) {
      this.sendError(err, res);
    }
  }

  async login (req, res) {
    try {
      const { token } = await req.user.createUserLogin();
      this._sendData(res, { token });
    } catch (err) {
      this.sendError(err, res);
    }
  }

  async logout (req, res) {
    try {
      await req.user.currentLogin.destroy();
      this._sendData(res);
    } catch (err) {
      this.sendError(err, res);
    }
  }

  async forgotPassword (req, res) {
    try {
      if (!req.body.email) {
        const err = new APIValidationError('email', 'the email param is required.');
        return this.sendError(err, res, HTTP_CODE.BAD_REQUEST);
      }

      const successMessage = { message: 'check your email' };
      const user = await this.UserModel.find({
        where: { email: req.body.email }
      });

      if (!user) {
        // this case for security when emails try to brute force
        return this._sendData(res, successMessage);
      }

      const { resetToken } = await user.createUserResetPassword();
      const link = req.body.link ? req.body.link.replace(ENSURE_TRAILING_SLASH, '$1/') : '';
      const mail = {
        from: SUPPORT_EMAIL,
        to: user.email,
        subject: 'Reset password',
        text: `Hello,
        This is a confirmation that the password for your account ${user.email} will be changed.
        For confirm ${link ? 'going to the link' : 'use this token'}: ${link}${resetToken}.
        If you did not request a password reset, please ignore this email.
        `,
      };

      await this.mailService.sendMail(mail);
      this._sendData(res, { message: 'check your email' });
    } catch (err) {
      this.sendError(err, res);
    }
  }

  async resetPassword (req, res) {
    try {
      const validationError = {};

      if (!req.body.resetToken) {
        validationError.resetToken = 'the resetToken param is required.'
      }
      if (!req.body.password) {
        validationError.password = 'the password param is required.'
      }
      if (Object.keys(validationError).length) {
        const err = new APIValidationError(validationError);
        return this.sendError(err, res, HTTP_CODE.BAD_REQUEST);
      }

      await this.sequelize.transaction(async (transaction) => {
        const resetPassword = await this.UserResetPassword.find({
          where: { reset_token: req.body.resetToken }
        });

        if (!resetPassword) {
          const err = new APIValidationError('resetToken', 'Invalid reset token.');
          return this.sendError(err, res, HTTP_CODE.BAD_REQUEST);
        }

        await resetPassword.validate();
        const user = await resetPassword.getUser();
        user.password = req.body.password;
        await user.save({transaction});
        await this.UserResetPassword.destroy({
          transaction,
          where: { user_id: user.id }
        });

        this._sendData(res);
      });
    } catch (err) {
      this.sendError(err, res);
    }
  }

  _sendData (res, data = null) {
    res.send({
      success: true,
      data,
    });
  };
}

module.exports = new AuthController(sendError, models, generateHash, mailService);
