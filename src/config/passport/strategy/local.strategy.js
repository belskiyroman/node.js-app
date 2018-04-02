const { User } = require('../../../db/models');
const LocalStrategy = require('passport-local').Strategy;
const options = {
  usernameField: 'email',
  passwordField: 'password',
  session: false,
};

const handler = async (email, password, done) => {
  try {
    const user = await User.findOne({ where: { email: email } });
    user && user.comparePassword(password)
      ? done(null, user)
      : done(null, null);
  } catch (err) {
    done(err);
  }
};

module.exports = new LocalStrategy(options, handler);
