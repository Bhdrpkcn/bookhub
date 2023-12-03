import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../redux/reduxActions/booksActions";
import BooksHeader from "./BooksHeader";
import BookCard from "./BookCard";
import { FloatButton } from "antd";

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
    <div>
      <BooksHeader />
      <div>
        <div className="booksContainer">
          {books.loading && <p>Loading...</p>}
          {books.error && <p>Error: {books.error}</p>}
          {<FloatButton.BackTop />}
          {!books.loading &&
            !books.error &&
            books.data.map((book, index) => (
              <BookCard key={book.id || index} book={book} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default BooksContainer;
