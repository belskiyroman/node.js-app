const { GraphQLObjectType } = require('graphql');
const loadGQLFields = require('../../utilities/index-resolver.utillity').moduleLoad;

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: loadGQLFields(__dirname)
});

module.exports = QueryType;
