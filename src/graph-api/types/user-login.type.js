const GraphQLString = require('graphql/type/scalars').GraphQLString;
const GraphQLObjectType = require('graphql').GraphQLObjectType;
const DateISO = require('../scalars').DateISO;

const UserLoginType = new GraphQLObjectType({
  name: 'UserLogin',

  fields: () => ({
    token: { type: GraphQLString },
    created_at: { type: DateISO },
    exp: { type: DateISO },
  }),
});

module.exports = UserLoginType;
