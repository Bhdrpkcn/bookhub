import React from "react";
import { useDispatch } from "react-redux";
import { fetchBooks } from "../../redux/reduxActions/booksActions";

const BooksHeader = () => {
  const dispatch = useDispatch();

  const handlePageChange = (newPage) => {

    dispatch(fetchBooks({ page: newPage }));
  };
  return (
    <div className="booksHeader">
      BooksHeader
      <button onClick={() => handlePageChange(2)}>Load Page 2</button>
    </div>
  );
};

export default BooksHeader;
