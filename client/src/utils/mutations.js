import { gql } from '@apollo/client'

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($userId: ID!, $book: String!) {
    saveBook(userId: $userId, book: $book) {
      _id
      username
      books
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation deleteBook($book: String!) {
    deleteBook(book: $book) {
      _id
      username
      books
      }
    }
  }
`;




