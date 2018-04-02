const {
  EACH_LARGE_LETTER,
  EACH_LETTER_AFTER_SPACE,
  EACH_LETTER_OF_EACH_WORD
} = require('../constants/regexp.const');

module.exports.splitDashCase = function (str) {
  return str
    .toLowerCase()
    .trim()
    .split('-');
};

module.exports.joinDashCase = function (arrStr) {
  return arrStr
    .join('-')
    .toLowerCase()
    .trim();
};

module.exports.splitCamelCase = function (str) {
  return str
    .replace(EACH_LARGE_LETTER, ' $1')
    .toLowerCase()
    .trim()
    .split(' ');
};

module.exports.joinCamelCase = function (arrStr) {
  return arrStr
    .join(' ')
    .toLowerCase()
    .trim()
    .replace(
      EACH_LETTER_AFTER_SPACE,
      (_, firstCharacter) => firstCharacter.toUpperCase()
    );
};

module.exports.splitPascalCase = function (str) {
  return str
    .replace(EACH_LARGE_LETTER, ' $1')
    .toLowerCase()
    .trim()
    .split(' ');
};

module.exports.joinPascalCase = function (arrStr) {
  return arrStr
    .join(' ')
    .toLowerCase()
    .trim()
    .replace(
      EACH_LETTER_OF_EACH_WORD,
      (_, firstCharacter) => firstCharacter.toUpperCase()
    );
};

module.exports.splitSnakeCase = function (str) {
  return str
    .toLowerCase()
    .trim()
    .split('_');
};

module.exports.joinSnakeCase = function (arrStr) {
  return arrStr
    .join('_')
    .toLowerCase()
    .trim();
};
