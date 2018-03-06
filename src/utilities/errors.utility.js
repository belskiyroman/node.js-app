const ValidationError = require('sequelize').ValidationError;
const DatabaseError = require('sequelize').DatabaseError;
const HTTP_CODE = require('../constants/http-code.const');

module.exports.sendError = (res, err, statusCode) => {
  let errors = [{message: 'Internal server error.'}];
  let status = statusCode || HTTP_CODE.INTERNAL_SERVER_ERROR;

  if (err instanceof ValidationError) {
    status = HTTP_CODE.UNPROCESSABLE_ENTITY;
    errors = this.friendlySequelizeValidationError(err.errors);
  } else if (err instanceof DatabaseError) {
    status = HTTP_CODE.SERVICE_UNAVAILABLE;
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
