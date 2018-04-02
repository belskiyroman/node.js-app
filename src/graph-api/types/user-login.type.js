const { GraphQLString, GraphQLObjectType } = require('graphql');
const { DateISO } = require('../scalars');

const UserLoginType = new GraphQLObjectType({
  name: 'UserLogin',

  fields: () => ({
    token: { type: GraphQLString },
    created_at: { type: DateISO },
    exp: { type: DateISO },
  }),
});

module.exports = UserLoginType;
