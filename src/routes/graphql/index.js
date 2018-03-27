const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const passport = require('passport');
const schema = require('../../graph-api');
const models = require('../../db/models');

module.exports = function (app) {
  // GraphiQL, a visual editor for queries
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

  // The GraphQL endpoint
  app.use('/graphql',
    passport.authenticate('jwt'),
    graphqlExpress(req => {
      return {
        schema,
        context: { req, models },
      };
    })
  );
};
