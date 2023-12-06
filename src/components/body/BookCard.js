import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/reducers/bookSlice";
import { SearchOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
// import "./bookCard.scss";
import "./bookCard.css";

const BookCard = ({ books, book }) => {
  const dispatch = useDispatch();
  const favoritedArray = useSelector((state) => state.books.favorited || []);
  console.log("Favorited default:", favoritedArray);

  const handleAddToFavorite = () => {
    dispatch(addToFavorites({ book }));
  };

  const handleClearFavorite = () => {
    dispatch(removeFromFavorites({ book }));
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleCardClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div>
      <div className="book-card">
        <div className="book-image">
          <img alt={book.title} src={book.image_url} />
        </div>
        <div className="book-details">
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">{book.authors}</p>
          <p className="book-rating">{book.rating}</p>
        </div>
        <div className="book-actions">
          <button onClick={handleAddToFavorite}>Add to Favorites</button>
          <button onClick={handleClearFavorite}>Clear Favorite</button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;

//   return (
//     <div className="books-container">
//       <div className="card">
//         <div
//           key={book.id}
//           // className={`card ${openCard === book.id ? "open" : ""}`}
//           onClick={() => handleCardClick(book.id)}
//         >
//           <img className="book-img" alt={book.title} src={book.image_url} />

//           <div className="book-cred">
//             <div className="title">{book.title}</div>
//             <div className="author">{book.authors}</div>
//             <div className="book-summary">
//               {"DESCRIPTION HERE" || "No synopsis available"}
//             </div>
//           </div>

//           <div className="book-actions">
//             <div className="members">
//               <span className="current">{book.rating}/5</span>
//             </div>
//             <div className="hidden bottom">
//               <button className="simple">Join</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookCard;
