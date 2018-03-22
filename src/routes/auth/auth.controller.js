const sendError = require('../../utilities/errors.utility').sendError
const User = require('../../db/models').User;

class AuthController {
  constructor (UserModel, sendError) {
    this.UserModel = UserModel;
    this.sendError = sendError;
  }

  /**
   *
   * @param req
   * @param res
   * @returns {Promise.<void>}
   */
  async registration (req, res) {
    try {
      const newUser = await this.UserModel.create(req.body);
      req.login(newUser, {session: false}, () => this.login(req, res));
    } catch (err) {
      this.sendError(res, err);
    }
  }

  /**
   *
   * @param req
   * @param res
   * @returns {Promise.<void>}
   */
  async login (req, res) {
    try {
      const { token } = await req.user.createUserLogin({});
      this._sendData(res, { token });
    } catch (err) {
      this.sendError(res, err);
    }
  }

  /**
   *
   * @param req
   * @param res
   * @returns {Promise.<void>}
   */
  async logout ({user}, res) {
    try {
      await user.removeUserLogin(user.currentLogin);
      this._sendData(res);
    } catch (err) {
      this.sendError(res, err);
    }
  }

  /**
   *
   * @param res
   * @param data
   * @private
   */
  _sendData (res, data = null) {
    res.send({
      success: true,
      data,
    });
  };
}

/**
 *
 * @type {AuthController}
 */
module.exports = new AuthController(User, sendError);
