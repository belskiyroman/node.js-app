const User = require('../../../db/models/index').User;
const LocalStrategy = require('passport-local').Strategy;
const options = {
  usernameField: 'email',
  passwordField: 'password',
  session: false,
};

const handler = (email, password, done) => {
  User.findOne({ where: {email: email} })
    .then(user => {
      user && user.comparePassword(password)
        ? done(null, user)
        : done(null, null);
    })
    .catch(done);
};

module.exports = new LocalStrategy(options, handler);
