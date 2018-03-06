module.exports = `
type User {
    firstName: String,
    lastName: String,
    email: String,
}

type Query {
    user(id: ID): User,
    me: User
}

`;
