import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import {
  removeAllFavorites,
  setDisplayFavorites,
} from "../../redux/reducers/bookSlice";
import { fetchBooks } from "../../redux/reduxActions/booksActions";

const SideBar = () => {
  const dispatch = useDispatch();
  const displayFavorites = useSelector((state) => state.books.displayFavorites);

  const handleClearLocalStorage = () => {
    dispatch(removeAllFavorites());
  };

  const showFavorites = () => {
    dispatch(setDisplayFavorites());
  };

  useEffect(() => {
    dispatch(fetchBooks());
  }, [displayFavorites, dispatch]);

  return (
    <div className="sidebar">
      <Button onClick={handleClearLocalStorage}>Remove Favorites</Button>
      <Button onClick={showFavorites}>
        Display Favorites Only
        <input
          type="checkbox"
          checked={displayFavorites}
          onChange={showFavorites}
        />
      </Button>
    </div>
  );
};

export default SideBar;
