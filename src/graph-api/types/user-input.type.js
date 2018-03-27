const GraphQLString = require('graphql/type/scalars').GraphQLString;
const GraphQLInputObjectType = require('graphql').GraphQLInputObjectType;

const UserInputType = new GraphQLInputObjectType({
  name: 'UserInput',

  fields: () => ({
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

module.exports = UserInputType;
