const GraphQLList = require('graphql').GraphQLList;
const UserLoginType = require('../types/user-login.type');

module.exports = {
  type: new GraphQLList(UserLoginType),

  resolve (parent, args, {req, models}) {
    const { gte } = models.Sequelize.Op;
    return req.user.getAllUserLogin({ where: { exp: { [gte]: new Date() } } });
  }
};
