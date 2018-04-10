const { GraphQLObjectType } = require('graphql');
const { loadModule: loadGQLFields, splitDashCase } = require('../../utilities');
const inputCase = (str) => splitDashCase(str.split('.')[0]);

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: loadGQLFields(__dirname, { inputCase })
});

module.exports = QueryType;
