import React from "react";
import "./bookCard.css";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites } from "../../redux/reducers/bookSlice";
import { Button } from "antd";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const favoritedArray = useSelector(
    (state) => state.books.favorited || []
  );
  console.log("Favorited default:", favoritedArray);

  const handleAddToFavorite = () => {
    if (!favoritedArray.some((favBook) => favBook.id === book.id)) {
      dispatch(addToFavorites({ book }));
      console.log("Favorited Array:", favoritedArray);
    } else {
      console.log("Book is already favorited");
    }
  };

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
          <Button onClick={handleAddToFavorite}>Add</Button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
