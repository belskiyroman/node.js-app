const { GraphQLError, Kind, GraphQLScalarType } = require('graphql');

const DateISO = new GraphQLScalarType({
  name: 'DateISO',

  serialize (value) {
    const date = new Date(value);
    return date.toISOString();
  },

  parseValue (value) {
    return new Date(value);
  },

  parseLiteral ({ kind, value }) {
    try {
      if (kind !== Kind.STRING) {
        throw new RangeError();
      }

      return new Date(value);
    } catch (err) {
      throw new GraphQLError('Expected a date string in ISO8601 format.')
    }
  },
})

module.exports = DateISO;
