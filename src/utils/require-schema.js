const { makeExecutableSchema } = require('graphql-tools');
const fs = require('fs');

module.exports = (path, resolvers = {}) => {
  const typeDefs = fs.readFileSync(path).toString();
  return makeExecutableSchema({typeDefs, resolvers});
}
