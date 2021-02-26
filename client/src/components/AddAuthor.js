import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
 addAuthorMutation,
 getAuthorsQuery
} from "../queries/queries";

const AddBook = () => {
  const [
    addAuthor,
    { loading: mLoading, error: mError, data: mData },
  ] = useMutation(addAuthorMutation);
  
  console.log(mLoading, mError, mData);
  
  const [state, setState] = React.useState({
    name: "",
    age: "",
    error: ""
  });

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
        addAuthor({
            variables: {
              name: state.name,
              age: parseInt(state.age),
            },
            refetchQueries: [{ query: getAuthorsQuery }],
          });
          setState({
              name: '',
              age: ''
          })
    }
    
  };

  return (
    <form id="add-author" onSubmit={submitForm}>
      <h3>Add Author</h3>
      <div className="field">
        <label>Name: </label>
        <input type="text" name="name" value={state.name} onChange={handleChange} />
      </div>
      <div className="field">
        <label>Age: </label>
        <input type="number" name="age" value={state.age} onChange={handleChange} />
      </div>
      <div>
        <p>{state.error}</p>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;
