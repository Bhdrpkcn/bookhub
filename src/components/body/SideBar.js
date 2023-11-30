import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { removeAllFavorites } from "../../redux/reducers/bookSlice";
const SideBar = () => {
const dispatch = useDispatch();

const handleClearLocalStorage = () => {
  dispatch(removeAllFavorites());
};

const showFavorites = () => {
  dispatch()
}
  return (
    <div className="sidebar">
      <ul>
      <Button onClick={handleClearLocalStorage}>Remove Favorites</Button>
      <Button onClick={showFavorites}>Show Favorites</Button>
      </ul>
    </div>
  );
};

export default SideBar;
