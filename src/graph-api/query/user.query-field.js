const GraphQLID = require('graphql/type/scalars').GraphQLID;
const GraphQLNonNull = require('graphql/type').GraphQLNonNull;
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
