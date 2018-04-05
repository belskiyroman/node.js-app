const fs = require('fs');
const path = require('path');
const stringUtilities = require('./string.utility');

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
 * @param {boolean} [options.module] - Load modules if module is a dir
 * @param {boolean} [options.spred] - Merge all the fields of the modules in one object
 * @param {string} [options.prefix] - Prefix will be add into start into each the key of module.
 * @param {string} [options.postfix] - Postfix will be add into end into each the key of module.
 * @param {string[]} [options.ext] - array of file extensions for moduleLoad as module
 * @param {nameCase|split} [options.inputCase] - function get a string and return an array of words
 * @param {nameCase|join} [options.outputCase] - function get an array of strings and return a key string for a module
 * @param {string[]} [options.exclude] - List of excluded files
 * @param {function} [getModule] - function for moduleLoad a module
 * @return {object} Module (all exports from a dir)
 */
module.exports.moduleLoad = function (pathToDir, options = {}, getModule = require) {
  try {
    const optionsDefault = {
      module: true,
      spred: false,
      prefix: '',
      postfix: '',
      ext: ['.js'],
      inputCase: nameCase.DASH_CASE,
      outputCase: nameCase.CAMEL_CASE,
      exclude: ['index.js'],
    };
    const opts = {...optionsDefault, ...options};

    return fs.readdirSync(pathToDir).reduce((res, node) => {
      const pathToNode = path.join(pathToDir, node);
      const stat = fs.statSync(pathToNode);
      const [moduleName] = path.basename(node).split('.');
      const isFileModule = stat.isFile() && opts.ext.includes(path.extname(node)) && !opts.exclude.includes(node);
      const isDirModule = opts.module && stat.isDirectory() && fs.existsSync(path.join(pathToNode, 'index.js'));
      const split = decoratorCase.get(opts.inputCase).split || opts.inputCase;
      const join = decoratorCase.get(opts.outputCase).join || opts.outputCase;

      if (isFileModule || isDirModule) {
        const currentModule = getModule(pathToNode);

        if (opts.spred && currentModule.constructor === Object) {
          return Object.assign(res, currentModule);
        }

        const key = opts.prefix + join(split(moduleName)) + opts.postfix;
        res[key] = currentModule;
      }

      return res;
    }, {});
  } catch (err) {
    console.error(`Error when loading part of module "${pathToDir}".`);
    throw err;
  }
};
