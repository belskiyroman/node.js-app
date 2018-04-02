const { User } = require('../../db/models');

const serializeUser = (user, cb) => {
  cb(null, user.id)
};

const deserializeUser = async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
};

module.exports.initSession = (passport) => {
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);
  return passport;
};

module.exports.disableSession = (passport) => {
  const authenticate = passport.authenticate;

  passport.authenticate = function (strategy, options = {}, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    return authenticate.call(this, strategy, { ...options, session: false }, callback);
  };

  return passport;
};
