const fs = require('fs');
const path = require('path');
const stringUtilities = require('../utilities/string.utillity');

/**
 *
 * @type {{PASCAL_CASE: Symbol, CAMEL_CASE: Symbol, SNAKE_CASE: Symbol, DASH_CASE: Symbol}}
 */
const nameCase = module.exports = {
  PASCAL_CASE: Symbol('PASCAL_CASE'),
  CAMEL_CASE: Symbol('CAMEL_CASE'),
  SNAKE_CASE: Symbol('SNAKE_CASE'),
  DASH_CASE: Symbol('DASH_CASE'),
};

const decoratorCase = new Map()
  .set(nameCase.CAMEL_CASE, {
    split: stringUtilities.splitCamelCase,
    join: stringUtilities.joinCamelCase,
  })
  .set(nameCase.DASH_CASE, {
    split: stringUtilities.splitDashCase,
    join: stringUtilities.joinDashCase,
  })
  .set(nameCase.PASCAL_CASE, {
    split: stringUtilities.splitPascalCase,
    join: stringUtilities.joinPascalCase,
  })
  .set(nameCase.SNAKE_CASE, {
    split: stringUtilities.splitSnakeCase,
    join: stringUtilities.joinSnakeCase,
  });

const optionsDefault = {
  module: true,
  includeNameSpace: false,
  ext: ['.js'],
  inputCase: nameCase.DASH_CASE,
  outputCase: nameCase.CAMEL_CASE,
  exclude: ['index.js'],
};

/**
 * @callback split
 * @param {string} str
 *
 * @callback join
 * @param {string[]} arrStr
 */

/**
 *
 * @param {string} pathToDir
 * @param {object} [options]
 * @param {boolean} [options.module] - Load modules if module is a dir.
 * @param {boolean} [options.includeNameSpace] - The namespace is the directory name of the module. Namespace will by add to each the key of module.
 * @param {string[]} [options.ext] - array of file extensions for load as module
 * @param {nameCase|split} [options.inputCase] - function get a string and return an array of words
 * @param {nameCase|join} [options.outputCase] - function get an array of strings and return a key string for a module
 * @param {string[]} [options.exclude] - List of excluded files
 * @param {function} [getModule] - function for load a module
 * @return {object} Module (all exports from a dir)
 */
module.exports.load = function (pathToDir, options = optionsDefault, getModule = require) {
  try {
    const namespace = path.basename(pathToDir).replace(/[\W_]/g, ' ').split(' ');
    options.exclude = options.exclude ? ['index.js', ...options.exclude] : ['index.js'];

    return fs.readdirSync(pathToDir).reduce((res, node) => {
      const pathToNode = path.join(pathToDir, node);
      const stat = fs.statSync(pathToNode);
      const [moduleName] = path.basename(node).split('.');
      const isFileModule = stat.isFile() && options.ext.includes(path.extname(node)) && !options.exclude.includes(node);
      const isDirModule = options.module && stat.isDirectory() && fs.existsSync(path.join(pathToNode, 'index.js'));
      const split = decoratorCase.get(options.inputCase).split || options.inputCase;
      const join = decoratorCase.get(options.outputCase).join || options.outputCase;

      if (isFileModule || isDirModule) {
        const keyParts = options.includeNameSpace
          ? split(moduleName).push(...namespace)
          : split(moduleName);
        const key = join(keyParts);
        res[key] = getModule(pathToNode);
      }

      return res;
    }, {});
  } catch (err) {
    console.error(`Error when loading part of module "${pathToDir}".`);
    throw err;
  }
};
