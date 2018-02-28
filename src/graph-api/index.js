const { mergeSchemas } = require('graphql-tools');

const schemas = [
  require('./book'),
];

module.exports = mergeSchemas({ schemas });
