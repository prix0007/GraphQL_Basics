import React from "react";
import { useQuery, useMutation } from '@apollo/client';
import { getBooksQuery, removeBook } from '../queries/queries';
import BookDetails from './BookDetails';

const BookList = () => {
  const { loading, error, data } = useQuery(getBooksQuery);
  const [deleteBook, {loading: mLoading}] = useMutation(removeBook);
  // console.log( data)
  const [state, setState] = React.useState({
    selected: null
  });

  const deleteBookItem = (id) => {
    console.log(id);
    deleteBook({
      variables: {
        id
      },
      refetchQueries: [{ query: getBooksQuery }]
    })
  }

  const displayBooks = () => {
    if(loading){
      return <div>Loading...</div>
    } else {
      return data.books.map(book => {
        return (
          <div>
            <li key={book.id} onClick={(e) => {setState({selected: book.id})}}>
              {
                mLoading ? <span>Loading... </span>:<span>{book.name}</span>
              }
            </li>
            <span className="delete-item" onClick={() => deleteBookItem(book.id)}>X</span>
          </div>
          
        )
      })
    }

  }

  return <div>
    <ul id="book-list">
      {displayBooks()}
    </ul>
    <BookDetails bookId={state.selected} />
  </div>;
};

export default BookList;
