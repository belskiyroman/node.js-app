const User = require('../../db/models/index').User;

const serializeUser = (user, cb) => {
  cb(null, user.id)
};

const deserializeUser = (id, cb) => {
  User
    .findById(id)
    .then(user => cb(null, user))
    .catch(cb);
};

module.exports.initSession = (passport) => {
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);
  return passport;
};

module.exports.disableSession = (passport) => {
  const authenticate = passport.authenticate;

  passport.authenticate = function (strategy, options, callback) {
    if (!options || typeof options === 'function') {
      callback = options;
      options = {};
    }
    options.session = false;
    return authenticate.call(this, strategy, options, callback);
  };

  return passport;
};
