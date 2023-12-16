import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/reducers/bookSlice";
import { Card, Badge } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import "./bookCard.css";


const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { Meta } = Card;
  const isBookFavorited = useSelector(state => state.books.favorited.includes(book.title));

  const handleToggleFavorite = () => {
    
    if (isBookFavorited) {
      dispatch(removeFromFavorites({ book }));
    } else {
      dispatch(addToFavorites({ book }));
    }
  };

  const handleCardClick = (event) => {
    setIsOpen(!isOpen);
  };

  return (
    <Badge.Ribbon text={book.rating} color="yellow" style={{
      marginRight: "10px",
      marginTop: "10px",
      visibility: isOpen ? "hidden" : "visible",

    }}>

    <div className={`book-card ${isOpen ? "open" : ""}`}>
      <Card className="card" hoverable  onClick={handleCardClick}>
        <div className="book-content">
          <div className="book-image">
            <img
              alt={book.title}
              src={book.image_url}
              className={isOpen ? "blurred" : ""}
            />
          </div>
          <div className="book-details">
            <Meta title={book.title} description={book.authors} />
          </div>
        </div>
        {isOpen && (
          <div className="overlay">
            <p className="book-description" onClick={handleCardClick}>{book.description}</p>
            <div className="book-actions">
            <button onClick={handleToggleFavorite}>
                {isBookFavorited ? <MinusOutlined /> : <PlusOutlined />}
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
    </Badge.Ribbon>

  );
};

export default BookCard;
