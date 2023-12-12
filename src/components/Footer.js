import React from "react";
import { fetchBooks } from "../redux/reduxActions/booksActions";
import { setCurrentPage } from "../redux/reducers/bookSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { itemsPerPage } from "../redux/reduxActions/booksActions";
import { Pagination } from "antd";

const Footer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = useSelector((state) => state.books.currentPage);
  const maxPageCount = 240 / itemsPerPage;

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > maxPageCount) {
      return;
    }

    const queryParams = new URLSearchParams(location.search);
    queryParams.set("_page", String(newPage));

    dispatch(setCurrentPage(newPage));
    navigate(`?${queryParams.toString()}`);
    dispatch(fetchBooks());
  };


  return (
    <div className="footer">
      <div className="footerContainer">
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={maxPageCount * itemsPerPage}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default Footer;
