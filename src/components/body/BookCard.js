import React from "react";
import "./bookCard.css";

const BookCard = ({ book }) => {


  return (
    <div className="BookCard">
      <div className="bookImg">
        {book.image_url && <img src={book.image_url} alt={book.title} />}
      </div>
      <div className="bookCred">
        <div className="bookName"> {book.title} </div>
        <div className="bookDetails">
          <div className="bookAuthor">{book.authors}</div>
          <div className="bookYear">FIX YEAR !!</div>
          {book.rating}
        </div>
      </div>
      <div className="bookSynopsis">
        <div>Synopsis:</div>
        <p>{book.description}</p>
      </div>
    </div>
  );
};

export default BookCard;
