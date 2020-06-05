import { gql } from '@apollo/client'

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      author
      genres
      id
    }
  }
`

export const ALL_BOOKS_AND_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
    allBooks {
      title
      author
      published
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`

export const SET_BORN = gql`
  mutation setBorn($name: String!, $birthYear: Int!) {
    editAuthor(name: $name, setBornTo: $birthYear) {
      name
      born
    }
  }
`
