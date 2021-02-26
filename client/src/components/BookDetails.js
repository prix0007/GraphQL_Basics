import React from "react";
import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/queries";

const BookDetails = (props) => {
  // console.log(props);
  const { loading , data } = useQuery(getBookQuery, {
    variables: { id: props.bookId },
  });
  // console.log(data)

  const displayBookDetails = () => {
    if (loading) {
      return <div>Loading...</div>;
    } else {
      if(data){
        const { book } = data;
        return <div>
          <h2>
            {book.name}
          </h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <ul className="other-books">
            {
              book.author.books.map((item) => {
                return <li key={item.id}>{item.name}</li>
              })
            }
          </ul>
        </div>
      } else {
        return <div>No Book Selected</div>
      }
    }
  };

  return (
    <div>
      <div id="book-details">
        {displayBookDetails()}
      </div>
    </div>
  );
};

export default BookDetails;
