const UserLoginType = require('../types/user-login.type');

module.exports = {
  type: UserLoginType,

  resolve (parent, args, {req}) {
    return req.user.currentLogin;
  }
};