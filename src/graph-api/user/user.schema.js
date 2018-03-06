const { makeExecutableSchema } = require('graphql-tools');

module.exports = makeExecutableSchema({
  typeDefs: require('./user.type-defs'),
  resolvers: require('./user.resolver'),
});
