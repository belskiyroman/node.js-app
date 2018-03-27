const GraphQLObjectType = require('graphql').GraphQLObjectType;
const loadGQLFields = require('../../utilities/index-resolver.utillity').load;

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: loadGQLFields(__dirname)
});

module.exports = MutationType;
