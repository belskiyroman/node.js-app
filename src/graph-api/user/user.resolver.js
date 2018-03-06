const resolvers = {
  Query: {
    user (parent, args, { models }, info) {
      return models.User.findById(args.id);
    },
    me (parent, args, { req }, info) {
      return req.user;
    }
  },
  // Mutation: {
  //   me (parent, args, context, info) {
  //     return context.req.user;
  //   }
  // }
};

module.exports = resolvers;
