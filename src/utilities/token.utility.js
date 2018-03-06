const jwt = require('jsonwebtoken');
const SESSION_TTL = Math.floor(Date.now() / 1000) + parseInt(process.env.SESSION_TTL);
const SECRET = process.env.SECRET;

module.exports.tokenCreate = (payload) => {
  return jwt.sign({...payload, exp: SESSION_TTL}, SECRET);
}

module.exports.tokenDecode = (token) => {
  return jwt.decode(token);
}

module.exports.tokenValid = (payload) => {
  return jwt.verify(payload, SECRET, { maxAge: SESSION_TTL });
}
