import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import {
  removeAllFavorites,
  setDisplayFavorites,
} from "../../redux/reducers/bookSlice";
const SideBar = () => {
  const dispatch = useDispatch();
  const displayFavorites = useSelector((state) => state.books.displayFavorites);

  const handleClearLocalStorage = () => {
    dispatch(removeAllFavorites());
  };

  const showFavorites = () => {
    dispatch(setDisplayFavorites());
  };

  return (
    <div className="sidebar">
      <ul>
        <Button onClick={handleClearLocalStorage}>Remove Favorites</Button>
        <Button onClick={showFavorites}>Show Favorites</Button>
        <label>
          Display Favorites Only
          <input
            type="checkbox"
            checked={displayFavorites}
            onChange={showFavorites}
          />
        </label>
      </ul>
    </div>
  );
};

export default SideBar;
