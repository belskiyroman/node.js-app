class Book {
  static get () {
    return Promise.resolve([
      {
        title: "Harry Potter and the Sorcerer's stone",
        author: 'J.K. Rowling',
      },
      {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
      },
    ]);
  }
};

module.exports = Book;
