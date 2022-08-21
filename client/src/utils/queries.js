import { gql } from '@apollo/client'

export const ME = gql`
  query me {
    me {
      _id
      username
      books
    }
  }
`

export const searchGoogleBooks = (query) => {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
  };