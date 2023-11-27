import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setCurrentPage } from "../../redux/reducers/bookSlice";
import { fetchBooks } from "../../redux/reduxActions/booksActions";

const BooksHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = useSelector((state) => state.books.currentPage);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get("_page") || "";

    // Update Redux state with the current page from URL
    dispatch(setCurrentPage(Number(page)));

    // Fetch books when the page changes
    dispatch(fetchBooks({ page: Number(page) }));
  }, [location.search, dispatch]);

  const handlePageChange = () => {
    const queryParams = new URLSearchParams(location.search);
    const nextPage = currentPage + 1;

    // Update Redux state with the next page
    dispatch(setCurrentPage(nextPage));

    // Include the existing search parameters in the new URL
    queryParams.set("_page", String(nextPage));

    // Navigate to the new URL
    navigate(`?${queryParams.toString()}`);

    // Fetch books for the next page
    dispatch(fetchBooks({ page: nextPage }));
  };

  return (
    <div className="booksHeader">
      BooksHeader
      <button onClick={handlePageChange}>Load Next Page</button>
    </div>
  );
};

export default BooksHeader;
