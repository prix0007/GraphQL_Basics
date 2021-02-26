import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";

const AddBook = () => {
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [
    addBook,
    { loading: mLoading, error: mError, data: mData },
  ] = useMutation(addBookMutation);
  console.log(mLoading, mError, mData);
  const [state, setState] = React.useState({
    name: "",
    genre: "",
    authorId: "",
    error: ""
  });

  const displayAuthors = () => {
    if (loading) {
      return <option id="loading">Loading Authors...</option>;
    } else {
      return data.authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const checkForm = () => {
      let counter =0 ;
      Object.keys(state).forEach(key => {
          if(key !== 'error' && state[key].length === 0){
              setState({
                  ...state,
                  error:  `Field ${key} needs to be filled.`
              })
              return false;
          } else {
              counter++;
          }
      });
      console.log(counter)
      if(counter === Object.keys(state).length){
          return true;
      }
  }

  const submitForm = (e) => {
    e.preventDefault();
    // console.log(state);
    if(checkForm()){
        addBook({
            variables: {
              name: state.name,
              genre: state.genre,
              authorId: state.authorId,
            },
            refetchQueries: [{ query: getBooksQuery }],
          });
          setState({
              name: '',
              genre: '',
              authorId: ''
          })
    }
    
  };

  return (
    <form id="add-book" onSubmit={submitForm}>
      <h3>Add Book</h3>
      <div className="field">
        <label>Book Name: </label>
        <input type="text" name="name" value={state.name} onChange={handleChange} />
      </div>
      <div className="field">
        <label>Genre: </label>
        <input type="text" name="genre" value={state.genre} onChange={handleChange} />
      </div>
      <div className="field">
        <label>Author: </label>
        <select name="authorId" onChange={handleChange}>
          <option id="select_author" value="">Select Author</option>
          {displayAuthors()}
        </select>
      </div>
      <div>
        <p>{state.error}</p>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;
