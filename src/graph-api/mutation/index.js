const { GraphQLObjectType } = require('graphql');
const loadGQLFields = require('../../utilities/index-resolver.utillity').moduleLoad;

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: loadGQLFields(__dirname)
});

module.exports = MutationType;
