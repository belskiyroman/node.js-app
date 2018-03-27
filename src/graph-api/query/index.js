const GraphQLObjectType = require('graphql').GraphQLObjectType;
const loadGQLFields = require('../../utilities/index-resolver.utillity').load;

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: loadGQLFields(__dirname)
});

module.exports = QueryType;
