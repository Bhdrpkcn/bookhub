import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../reduxActions/booksActions";
import BooksHeader from "./BooksHeader";
import BookCard from "./BookCard";

const BooksContainer = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);
  const query = useSelector((state) => state.books.searchQuery);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchBooks({ query }));
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchData();
  }, [dispatch, query]);

  return (
    <>
      <BooksHeader />
      <div className="booksContainer">
        {books.loading && <p>Loading...</p>}
        {books.error && <p>Error: {books.error}</p>}
        {!books.loading &&
          !books.error &&
          books.data.map((book, index) => (
            <BookCard key={book.id || index} book={book} />
          ))}
      </div>
    </>
  );
};

export default BooksContainer;
