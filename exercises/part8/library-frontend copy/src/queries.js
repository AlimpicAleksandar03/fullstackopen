import { gql } from "@apollo/client";

export const authorsAndBooks = gql`
  query {
    allAuthors {
      bookCount
      name
      born
    }
    allBooks {
      author {
        name
        born
      }
      genres
      published
      id
      title
    }
  }
`;
export const loginMutation = gql`
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const bookMutation = gql`
  mutation (
    $author: String
    $published: Int
    $title: String
    $genres: [String]
  ) {
    addBook(
      author: $author
      published: $published
      title: $title
      genres: $genres
    ) {
      author {
        bookCount
        born
        name
      }
      published
      title
      genres
    }
  }
`;
export const authorMutation = gql`
  mutation ($name: String, $setBornTo: Int) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
    }
  }
`;
export const me = gql`
  query {
    me {
      favoriteGenre
      username
      id
    }
  }
`;
