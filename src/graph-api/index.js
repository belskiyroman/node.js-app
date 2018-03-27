const GraphQLSchema = require('graphql').GraphQLSchema;
const query = require('./query');
const mutation = require('./mutation');

module.exports = new GraphQLSchema({ query, mutation });
