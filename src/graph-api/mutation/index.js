const { GraphQLObjectType } = require('graphql');
const { loadModule: loadGQLFields, splitDashCase } = require('../../utilities');
const inputCase = (str) => splitDashCase(str.split('.')[0]);

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: loadGQLFields(__dirname, { inputCase })
});

module.exports = MutationType;
