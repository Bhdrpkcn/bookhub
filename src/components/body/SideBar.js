import React, {useEffect} from "react";
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

  //Show favorites working now but only displays that the stored item within its page !! 
  const showFavorites = () => {
    dispatch(setDisplayFavorites());
  };

  useEffect(() => {
    // Refetch books when displayFavorites changes
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
