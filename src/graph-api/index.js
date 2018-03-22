const { mergeSchemas } = require('graphql-tools');

const schemas = [
  require('./user'),
];

/**
 *
 * @type {GraphQLSchema}
 */
module.exports = mergeSchemas({ schemas });
