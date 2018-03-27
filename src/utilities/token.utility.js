const jwt = require('jsonwebtoken');
const SESSION_TTL = Math.floor((Date.now() + (parseInt(process.env.SESSION_TTL)*1000)) / 1000);
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
