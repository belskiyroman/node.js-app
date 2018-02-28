module.exports = require('../../utils/require-schema')(
  require.resolve('./book.graphql'),
  require('./book.resolver')
);
