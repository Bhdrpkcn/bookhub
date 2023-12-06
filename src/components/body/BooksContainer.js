import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../redux/reduxActions/booksActions";
import BookCard from "./BookCard";
import { FloatButton } from "antd";

const BooksContainer = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);
  const favoritedIds = useSelector((state) => state.books.favorited);
  const displayFavorites = useSelector((state) => state.books.displayFavorites);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchBooks());
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchData();
  }, [dispatch, displayFavorites, favoritedIds]);

  return (
    <div className="book-container">
      {books.loading && <p>Loading...</p>}
      {books.error && <p>Error: {books.error}</p>}
      {<FloatButton.BackTop />}
      {!books.loading &&
        !books.error &&
        books.data.map((book, index) => (
          <BookCard key={book.id || index} book={book} />
        ))}
    </div>
  );
};

export default BooksContainer;
