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
    .replace(/([A-Z])/, ' $1')
    .toLowerCase()
    .trim()
    .split(' ');
};

module.exports.joinCamelCase = function (arrStr) {
  return arrStr
    .join(' ')
    .toLowerCase()
    .trim()
    .replace(/\s(.)/, (_, firstCharacter) => firstCharacter.toUpperCase());
};

module.exports.splitPascalCase = function (str) {
  return str
    .replace(/([A-Z])/, ' $1')
    .toLowerCase()
    .trim()
    .split(' ');
};

module.exports.joinPascalCase = function (arrStr) {
  return arrStr
    .join(' ')
    .toLowerCase()
    .trim()
    .replace(/(^.)|\s(.)/, (_, firstCharacter) => firstCharacter.toUpperCase());
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
