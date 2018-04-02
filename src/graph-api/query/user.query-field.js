const { GraphQLNonNull, GraphQLID } = require('graphql');
const UserType = require('../types/user.type');

module.exports = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },

  resolve (parent, { id }, { models }) {
    return models.User.findById(id);
  }
};
