const HTTP_CODE = require('../../constants/http-code.const');
const { SUPPORT: SUPPORT_EMAIL, ENSURE_TRAILING_SLASH } = require('../../constants');
const { sendError, APIValidationError } = require('../../utilities');
const mailService = require('../../services/mail.service');
const mail = require('../../mails');
const models = require('../../db/models');

class AuthController {
  constructor (sendError, { sequelize, User, UserRestoreData }, mailService, mail) {
    this.sendError = sendError;
    this.sequelize = sequelize;
    this.UserModel = User;
    this.UserRestoreDataModel = UserRestoreData;
    this.mailService = mailService;
    this.mail = mail;
  }

  async registration (req, res) {
    try {
      const user = await this.UserModel.create(req.body);
      const fail = async (err) => {
        await user.destroy();
        this.sendError(err, res);
      };

      req.login(
        user,
        { session: false },
        () => this.sendEmailConfirmation(req, res, fail)
      );
    } catch (err) {
      this.sendError(err, res);
    }
  }

  async sendEmailConfirmation ({ user, body }, res, next) {
    try {
      const userRestoreData = await user.takeUserRestoreData();
      const emailToken = await userRestoreData.createEmailToken();
      const link = body.link ? body.link.replace(ENSURE_TRAILING_SLASH, '$1/') : '';
      const mail = this.mail.registrationMail(SUPPORT_EMAIL, user.email, { emailToken, link });
      await userRestoreData.save();
      await this.mailService.sendMail(mail);
      this._sendData(res, { message: 'check your email' });
    } catch (err) {
      next
        ? next(err)
        : this.sendError(err, res);
    }
  }

  async emailConfirmation (req, res) {
    try {
      if (!req.body.emailToken) {
        const err = new APIValidationError('emailToken', 'the emailToken param is required.');
        return this.sendError(err, res, HTTP_CODE.BAD_REQUEST);
      }

      const userRestoreData = await this.UserRestoreDataModel.findOne({
        where: { email_token: req.body.emailToken }
      });

      if (!userRestoreData) {
        const err = new APIValidationError('emailToken', 'Invalid reset token.');
        return this.sendError(err, res, HTTP_CODE.BAD_REQUEST);
      }

      await userRestoreData.validate({ fields: ['emailTokenExp'] });
      const user = await userRestoreData.getUser();

      await this.sequelize.transaction(async (transaction) => {
        user.emailConfirmed = true;
        await user.save({ transaction });
        await userRestoreData.destroy({ transaction });
      });

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
        const userRestoreData = await user.takeUserRestoreData();
        const resetToken = await userRestoreData.createResetToken();
        const link = req.body.link ? req.body.link.replace(ENSURE_TRAILING_SLASH, '$1/') : '';
        const mail = this.mail.forgotPasswordMail(SUPPORT_EMAIL, user.email, {link, resetToken});
        await userRestoreData.save();
        await this.mailService.sendMail(mail);
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

      const userRestoreData = await this.UserRestoreDataModel.findOne({
        where: { reset_token: req.body.resetToken }
      });

      if (!userRestoreData) {
        const err = new APIValidationError('resetToken', 'Invalid reset token.');
        return this.sendError(err, res, HTTP_CODE.BAD_REQUEST);
      }

      await userRestoreData.validate({ fields: ['resetTokenExp'] });
      await this.sequelize.transaction(async (transaction) => {
        const user = await userRestoreData.getUser();
        user.password = req.body.password;
        await user.save({ transaction });
        await userRestoreData.destroy({ transaction });
      });

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
