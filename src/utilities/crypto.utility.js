const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const SESSION_TTL = Math.floor((Date.now() + Number(process.env.SESSION_TTL) * 1000) / 1000);
const SECRET = process.env.SECRET;

module.exports.tokenCreate = (payload) => {
  console.log(new Date(SESSION_TTL * 1000));
  return jwt.sign({...payload, exp: SESSION_TTL}, SECRET);
};

module.exports.tokenDecode = (token) => {
  return jwt.decode(token);
};

module.exports.tokenValid = (payload) => {
  return jwt.verify(payload, SECRET, { maxAge: SESSION_TTL });
};

module.exports.getHash = (password = '') => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

module.exports.generateHash = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(32, (err, buf) => err
      ? reject(err)
      : resolve(buf.toString('hex'))
    );
  })
};
