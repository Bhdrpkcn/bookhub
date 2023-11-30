import React from "react";
import "./bookCard.css";

const BookCard = ({ book }) => {
  return (
    <div className="BookCard">
      {book.image_url && (
        <img className="bookImg" src={book.image_url} alt={book.title} />
      )}
      <div className="bookCred">
        <div className="bookName"> {book.title} </div>
        <div className="bookDetails">
          <div className="bookAuthor">{book.authors}</div>
          {book.rating}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
