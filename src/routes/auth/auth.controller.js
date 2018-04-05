const HTTP_CODE = require('../../constants/http-code.const');
const { SUPPORT: SUPPORT_EMAIL, ENSURE_TRAILING_SLASH } = require('../../constants');
const { APIValidationError } = require('../../utilities');

class AuthController {
  constructor (sendError, { User }, mailService, mail) {
    this.sendError = sendError;
    this.UserModel = User;
    this.mailService = mailService;
    this.mail = mail;
  }

  /**
   *
   * @param req
   * @param req.body.password
   * @param req.body.email
   * @param req.body.firstName
   * @param req.body.lastName
   * @param res
   * @return {Promise.<void>}
   */
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

  /**
   *
   * @param req
   * @param {User} req.user
   * @param {string} [req.body.link]
   * @param res
   * @return {Promise.<void>}
   */
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

  /**
   *
   * @param req
   * @param {string} req.body.emailToken
   * @param res
   * @return {Promise.<void>}
   */
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

  /**
   *
   * @param req
   * @param {User} req.user
   * @param res
   * @return {Promise.<void>}
   */
  async login ({ user }, res) {
    try {
      const { token } = await user.createUserLogin();
      this._sendData(res, { token });
    } catch (err) {
      this.sendError(err, res);
    }
  }

  /**
   *
   * @param req
   * @param {User} req.user
   * @param res
   * @return {Promise.<void>}
   */
  async logout ({ user }, res) {
    try {
      await user.currentLogin.destroy();
      this._sendData(res);
    } catch (err) {
      this.sendError(err, res);
    }
  }

  /**
   *
   * @param req
   * @param {string} req.body.email
   * @param {string} [req.body.link]
   * @param res
   * @return {Promise.<void>}
   */
  async forgotPassword ({ body }, res) {
    try {
      if (!body.email) {
        const err = new APIValidationError('email', 'the email param is required.');
        return this.sendError(err, res, HTTP_CODE.BAD_REQUEST);
      }

      const user = await this.UserModel.findOne({
        where: { email: body.email }
      });

      if (user) {
        const resetToken = await user.createResetToken();
        const link = body.link ? body.link.replace(ENSURE_TRAILING_SLASH, '$1/') : '';
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

  /**
   *
   * @param req
   * @param {string} req.body.resetToken
   * @param {string} req.body.password
   * @param res
   * @return {Promise.<void>}
   */
  async resetPassword ({ body }, res) {
    try {
      const validationError = {};

      if (!body.resetToken) {
        validationError.resetToken = 'the resetToken param is required.'
      }
      if (!body.password) {
        validationError.password = 'the password param is required.'
      }
      if (Object.keys(validationError).length) {
        const err = new APIValidationError(validationError);
        return this.sendError(err, res, HTTP_CODE.BAD_REQUEST);
      }

      const user = await this.UserModel.findOne({
        where: { reset_token: body.resetToken }
      });

      if (!user) {
        const err = new APIValidationError('resetToken', 'Invalid the resetToken.');
        return this.sendError(err, res, HTTP_CODE.BAD_REQUEST);
      }

      await user.validate({ fields: ['resetTokenExp'] });
      user.setNewPassword(body.password);
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

module.exports = AuthController;
