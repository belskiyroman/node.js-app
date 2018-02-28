const Book = require('../../models/book.model');

const mockResolvers = {
  Query: {
    books: () => {
      return Book.get();
    }
  },
};

module.exports = mockResolvers;
