const sendError = require('../../utilities/errors.utility').sendError;
const User = require('../../db/models').User;

class AuthController {
  constructor (UserModel, sendError) {
    this.UserModel = UserModel;
    this.sendError = sendError;
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
      const { token } = await req.user.createUserLogin({});
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

  _sendData (res, data = null) {
    res.send({
      success: true,
      data,
    });
  };
}

module.exports = new AuthController(User, sendError);
