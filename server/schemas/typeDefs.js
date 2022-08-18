const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [bookSchema]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {

  }

  type Mutation {

  }
`;

module.exports = typeDefs