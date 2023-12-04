import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../redux/reduxActions/booksActions";
import { fetchBooksStart, fetchBooksSuccess, fetchBooksFailure } from "../../redux/reducers/bookSlice";
import BooksHeader from "./BooksHeader";
import BookCard from "./BookCard";
import { FloatButton } from "antd";

const BooksContainer = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);
  const query = useSelector((state) => state.books.searchQuery);
  const favoritedIds = useSelector((state) => state.books.favorited);
  const displayFavorites = useSelector(
    (state) => state.books.displayFavorites
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchBooksStart()); // Dispatch the start action before fetching

        const response = await fetch(
          `https://example-data.draftbit.com/books?q=${query}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // If displaying favorites only, filter the books based on favoritedIds
        const favoritesData = displayFavorites
          ? data.filter((book) => favoritedIds.includes(book.id))
          : data;

        // Dispatch the appropriate action based on displayFavorites condition
        dispatch(
          displayFavorites
            ? fetchBooksSuccess(favoritesData)
            : fetchBooksSuccess(data)
        );

      } catch (error) {
        console.error("Error fetching books:", error);
        dispatch(fetchBooksFailure(error.message));
      }
    };

    fetchData();
  }, [dispatch, query, favoritedIds, displayFavorites]);

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
