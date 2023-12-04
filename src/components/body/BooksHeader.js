import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setCurrentPage, setSortBy } from "../../redux/reducers/bookSlice";
import { fetchBooks } from "../../redux/reduxActions/booksActions";

const BooksHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = useSelector((state) => state.books.currentPage);

  const handlePageChange = () => {
    const queryParams = new URLSearchParams(location.search);
    const nextPage = currentPage + 1;

    dispatch(setCurrentPage(nextPage));

    queryParams.set("_page", String(nextPage));

    navigate(`?${queryParams.toString()}`);

    dispatch(fetchBooks());
  };

  const handleSortByRating = () => {
    const queryParams = new URLSearchParams(location.search);
    const newSort = "rating&_order=desc"; //added order=asc for lowest rating first

    dispatch(setSortBy(newSort));

    queryParams.set("_sortBy", newSort);

    navigate(`?${queryParams.toString()}`);

    dispatch(fetchBooks());
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get("_page") || 1;
    const sortBy = queryParams.get("_sortBy") || "";

    dispatch(setCurrentPage(Number(page)));
    dispatch(setSortBy(sortBy));
    dispatch(fetchBooks());
  }, [location.search, dispatch]);

  return (
    <div className="booksHeader">
      BooksHeader
      <div>
        <button onClick={handlePageChange}>Load Next Page</button>
        <button onClick={handleSortByRating}>Sort By Rating</button>
      </div>
    </div>
  );
};

export default BooksHeader;
