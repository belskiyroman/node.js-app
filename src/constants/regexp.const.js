module.exports.STRONG_PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-za-z0-9]/;
module.exports.ENSURE_TRAILING_SLASH = /(\w(?!\/))$/;
module.exports.EACH_LARGE_LETTER = /([A-Z])/g;
module.exports.EACH_LETTER_AFTER_SPACE = /\s(.)/g;
module.exports.EACH_LETTER_OF_EACH_WORD = /(^|\s|\W|_)+(.)/g;
module.exports.EACH_SPECIAL_SYMBOL = /\W|_/g;
module.exports.EACH_SPECIAL_SYMBOL_BEFORE_SPACE = /(\W|_)\s/g;
module.exports.FIRST_LETTER_IN_WORD = /_?(\w)/;
