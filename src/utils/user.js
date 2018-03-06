const crypto = require('crypto');

module.exports.getHash = (password = '') => {
  return crypto.createHash('sha256').update(password).digest('hex');
}
