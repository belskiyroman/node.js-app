const { GraphQLObjectType } = require('graphql');
const loadGQLFields = require('../../utilities/index-resolver.utility').moduleLoad;

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: loadGQLFields(__dirname)
});

module.exports = QueryType;
