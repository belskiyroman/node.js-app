const ValidationError = require('sequelize').ValidationError;
const DatabaseError = require('sequelize').DatabaseError;
const HTTP_CODE = require('../constants/http-code.const');

class APIError extends Error {}
class APIValidationError extends Error {
  constructor (...args) {
    super();

    this.errors = args.length > 1
      ? [{ path: args[0], message: args[1] }]
      : Object.entries(...args).map(([path, message]) => ({path, message}));
  }
}

module.exports.APIError = APIError;
module.exports.APIValidationError = APIValidationError;

module.exports.sendError = (err, res, statusCode) => {
  let errors = [{message: 'Internal server error.'}];
  let status = statusCode || HTTP_CODE.INTERNAL_SERVER_ERROR;

  if (err instanceof ValidationError) {
    status = HTTP_CODE.UNPROCESSABLE_ENTITY;
    errors = this.friendlySequelizeValidationError(err.errors);
  } else if (err instanceof DatabaseError) {
    status = HTTP_CODE.SERVICE_UNAVAILABLE;
  } else if (err instanceof APIError) {
    errors = [{message: err.message}];
  } else if (err instanceof APIValidationError) {
    errors = err.errors;
  }

  res.status(status).send({
    errors,
    success: false,
  });

  if (process.env.NODE_ENV !== 'production') {
    console.error(err)
  }
};

module.exports.friendlySequelizeValidationError = (errors) => {
  return errors.map(item => {
    return {
      path: item.path,
      message: item.message
    };
  });
};
