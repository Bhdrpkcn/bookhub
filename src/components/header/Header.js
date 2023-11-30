import React, { useEffect } from "react";
import "./header.css";
import User from "./User";
import {
  setCurrentPage,
  setSearchQuery,
  setSortBy,
} from "../../redux/reducers/bookSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchBooks } from "..//..//redux/reduxActions/booksActions";

import { Input } from "antd";

const Header = () => {
  const { Search } = Input;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchQuery = useSelector((state) => state.books.searchQuery);

  const handleInputChange = (e) => {
    const newSearchQuery = e.target.value;

    dispatch(setSearchQuery(newSearchQuery));

    navigate(`?q=${encodeURIComponent(newSearchQuery)}`);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get("q") || "";

    dispatch(setSearchQuery(q));
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

  useEffect(() => {
    resetStateToDefault();
  }, [dispatch]);

  return (
    <div className="header">
      <button onClick={homeHandler}>logo</button>
      <Search
        className="searchBar"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="input search loading with enterButton"
        enterButton
      />

      <User />
    </div>
  );
};

export default Header;
