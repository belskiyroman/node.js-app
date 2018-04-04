const HTTP_CODE = require('../../constants/http-code.const');
const { SUPPORT: SUPPORT_EMAIL, ENSURE_TRAILING_SLASH } = require('../../constants');
const { sendError, APIValidationError } = require('../../utilities');
const mailService = require('../../services/mail.service');
const mail = require('../../mails');
const models = require('../../db/models');

class AuthController {
  constructor (sendError, { sequelize, User }, mailService, mail) {
    this.sendError = sendError;
    this.sequelize = sequelize;
    this.UserModel = User;
    this.mailService = mailService;
    this.mail = mail;
  }

  async registration (req, res) {
    try {
      req.login(
        this.UserModel.build(req.body),
        { session: false },
        () => this.sendEmailConfirmation(req, res)
      );
    } catch (err) {
      this.sendError(err, res);
    }
  }

  async sendEmailConfirmation ({ user, body }, res) {
    try {
      const emailToken = await user.createEmailToken();
      const link = body.link ? body.link.replace(ENSURE_TRAILING_SLASH, '$1/') : '';
      const mail = this.mail.registrationMail(SUPPORT_EMAIL, user.email, { emailToken, link });
      await this.mailService.sendMail(mail);
      await user.save();
      this._sendData(res, { message: 'check your email' });
    } catch (err) {
      this.sendError(err, res);
    }
  }

  async emailConfirmation (req, res) {
    try {
      if (!req.body.emailToken) {
        const err = new APIValidationError('emailToken', 'the emailToken param is required.');
        return this.sendError(err, res, HTTP_CODE.BAD_REQUEST);
      }

      const user = await this.UserModel.findOne({
        where: { email_token: req.body.emailToken }
      });

      if (!user) {
        const err = new APIValidationError('emailToken', 'Invalid the emailToken.');
        return this.sendError(err, res, HTTP_CODE.BAD_REQUEST);
      }

      await user.validate({ fields: ['emailTokenExp'] });
      user.confirmEmail();
      await user.save();

      req.login(
        user,
        { session: false },
        () => this.login(req, res)
      );
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

      const user = await this.UserModel.findOne({
        where: { email: req.body.email }
      });

      if (user) {
        const resetToken = await user.createResetToken();
        const link = req.body.link ? req.body.link.replace(ENSURE_TRAILING_SLASH, '$1/') : '';
        const mail = this.mail.forgotPasswordMail(SUPPORT_EMAIL, user.email, {link, resetToken});
        await this.mailService.sendMail(mail);
        await user.save();
      }

      // if the user does not exist, we also send a success message for protection against brute force
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

      const user = await this.UserModel.findOne({
        where: { reset_token: req.body.resetToken }
      });

      if (!user) {
        const err = new APIValidationError('resetToken', 'Invalid the resetToken.');
        return this.sendError(err, res, HTTP_CODE.BAD_REQUEST);
      }

      await user.validate({ fields: ['resetTokenExp'] });
      user.setNewPassword(req.body.password);
      await user.save();

      this._sendData(res);
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

module.exports = new AuthController(sendError, models, mailService, mail);
