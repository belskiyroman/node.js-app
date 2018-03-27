const UserType = require('../types/user.type');

module.exports = {
  type: UserType,

  resolve (parent, args, { req }) {
    return req.user;
  }
};
