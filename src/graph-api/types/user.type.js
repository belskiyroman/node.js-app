const GraphQLString = require('graphql/type/scalars').GraphQLString;
const GraphQLID = require('graphql/type/scalars').GraphQLID;
const GraphQLList = require('graphql').GraphQLList;
const GraphQLObjectType = require('graphql').GraphQLObjectType;
const UserLoginType = require('./user-login.type');

const UserType = new GraphQLObjectType({
  name: 'User',

  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    currentLogin: {
      type: UserLoginType,

      resolve (parent, args, { req }) {
        return req.user.currentLogin;
      }
    },
    activeLogin: {
      type: new GraphQLList(UserLoginType),

      resolve (parent, args, { req, models }) {
        const { gte } = models.Sequelize.Op;
        return req.user.getAllUserLogin({ where: { exp: { [gte]: new Date() } } });
      }
    },
  }),
});

module.exports = UserType;
