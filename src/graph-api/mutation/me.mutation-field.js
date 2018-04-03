const { GraphQLError } = require('graphql/error/GraphQLError');
const UserType = require('../types/user.type');
const UserInputType = require('../types/user-input.type');

module.exports = {
  type: UserType,
  description: 'Object type of User, current user.',
  args: {
    userData: { type: UserInputType }
  },

  resolve (parent, { userData }, { req }) {
    if (!req.user.comparePassword(userData.currentPassword)) {
      throw new GraphQLError('Incorrect the currentPassword.');
    }
    return req.user.update(userData);
  }
};
