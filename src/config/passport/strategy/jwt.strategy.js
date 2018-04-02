const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bearerExtractor = ExtractJwt.fromAuthHeaderAsBearerToken();
const { User } = require('../../../db/models');

const tokenExtractor = (req) => {
  return req.query.access_token || bearerExtractor(req);
};
const jwtOptions = {
  jwtFromRequest: tokenExtractor,
  secretOrKey: process.env.SECRET,
  passReqToCallback: true,
};

const handler = async (req, payload, done) => {
  try {
    const user = await User.findById(payload.id);

    if (user) {
      let logins = await user.getAllUserLogin({ where: { token: tokenExtractor(req) } });
      user.currentLogin = logins[0];
    }

    user && user.currentLogin
      ? done(null, user)
      : done(null, null);
  } catch (err) {
    done(err);
  }
};

module.exports = new JwtStrategy(jwtOptions, handler);
