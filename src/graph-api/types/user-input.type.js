const { GraphQLString, GraphQLInputObjectType } = require('graphql');

const UserInputType = new GraphQLInputObjectType({
  name: 'UserInput',

  fields: () => ({
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    password: { type: GraphQLString },
    currentPassword: { type: GraphQLString },
  }),
});

module.exports = UserInputType;
