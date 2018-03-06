const { mergeSchemas } = require('graphql-tools');

const schemas = [
  require('./user'),
];

module.exports = mergeSchemas({ schemas });
