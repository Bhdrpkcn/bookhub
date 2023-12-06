import React, { useEffect } from "react";
import "./header.css";
import User from "./User";
import { fetchBooks } from "..//..//redux/reduxActions/booksActions";
import {
  setCurrentPage,
  setSearchQuery,
  setSortBy,
} from "../../redux/reducers/bookSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "antd";

const Header = () => {
  const { Search } = Input;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchQuery = useSelector((state) => state.books.searchQuery);
  const currentPage = useSelector((state) => state.books.currentPage);

  const handleInputChange = (e) => {
    const newSearchQuery = e.target.value;

    dispatch(setSearchQuery(newSearchQuery));

    navigate(`?q=${encodeURIComponent(newSearchQuery)}`);
  };

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
    queryParams.set("_page", "1"); 
  
    navigate(`?${queryParams.toString()}`);
    
    dispatch(setCurrentPage(1)); 
  
    dispatch(fetchBooks());
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get("q") || "";
    const page = queryParams.get("_page") || 1;
    const sortBy = queryParams.get("_sortBy") || "";

    dispatch(setSearchQuery(q));
    dispatch(setCurrentPage(Number(page)));
    dispatch(setSortBy(sortBy));
    dispatch(fetchBooks());
  }, [location.search, dispatch]);

  const resetStateToDefault = () => {
    dispatch(setCurrentPage(1));
    dispatch(setSearchQuery(""));
    dispatch(setSortBy(""));
    navigate(`/`);

    dispatch(fetchBooks());
  };

  const homeHandler = () => {
    resetStateToDefault();
  };

  return (
    <div>
      <div  className="header">

      <div
        onClick={homeHandler}
        style={{ paddingLeft: "1rem", cursor: "pointer" }}
      >
        logoBookHub
      </div>
      <Search
        className="searchBar"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="find your books !"
        enterButton
      />
      <User />
      </div>
      <div  className="header">
      <button onClick={handlePageChange}>Load Next Page</button>
        <button onClick={handleSortByRating}>Sort By Rating</button>

      </div>
     
    </div>
  );
};

export default Header;
