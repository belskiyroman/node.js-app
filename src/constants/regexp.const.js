module.exports.STRONG_PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-za-z0-9]/;
module.exports.ENSURE_TRAILING_SLASH = /(\w(?!\/))$/;
module.exports.EACH_LARGE_LETTER = /([A-Z])/g;
module.exports.EACH_LETTER_AFTER_SPACE = /\s(.)/g;
module.exports.EACH_LETTER_OF_EACH_WORD = /(^.)|\s(.)/g;
