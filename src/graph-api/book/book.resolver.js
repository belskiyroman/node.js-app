const casual = require('casual');

const books = [];
let number = 50;

while (number--) {
  books.push({
    author: casual.full_name,
    title: casual.title
  })
}

const resolvers = {
  Query: { books: () => books },
};

module.exports = resolvers;
