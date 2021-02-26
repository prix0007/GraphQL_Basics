import { gql } from '@apollo/client';

const getBooksQuery = gql`
  query {
    books {
      name
      id
    }
  }
`;

const getAuthorsQuery = gql`
  query {
    authors {
      name
      id
    }
  }
`;

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!){
    addBook(name: $name, genre: $genre, authorId: $authorId){
        name
        id
    }
  }
`;

const addAuthorMutation = gql`
  mutation($name: String!, $age: Int! ){
    addAuthor(name: $name, age: $age){
      name
    }
  }
`;

const removeBook = gql`
  mutation($id: ID!){
    deleteBook(id: $id){
      name
    }
  }
`;


const getBookQuery = gql`
  query($id: ID!){
    book(id: $id){
      id
      name
      genre
      author{
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

export {
    getAuthorsQuery,
    getBooksQuery,
    addBookMutation,
    getBookQuery,
    addAuthorMutation,
    removeBook
}